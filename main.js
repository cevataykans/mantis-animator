
var canvas;
var gl;
var program;

var projectionMatrix; 
var modelViewMatrix;
var camModelViewMatrix;

var instanceMatrix;

var camModelViewLoc;
var modelViewMatrixLoc;
var projectionMatrixLoc;
var normalMatrixLoc;

var colorI = 0;


var numNodes = 23;
var numAngles = 69;
var angle = 0;

var numVertices = 24;

var stack = [];

var figure = [];

for( var i=0; i<numNodes; i++) figure[i] = createNode(null, null, null, null);

var vBuffer;
var modelViewLoc;

var pointsArray = [];
var colorsArray = [];
var cubeNormals = [];

var spherePoints = [];
var sphereColors = [];
var sphereNormals = [];

var cyclinderPoints = [];
var cyclinderColors = [];
var cyclinderNormals = [];

//-------------------------------------------

function scale4(a, b, c) { // WHAT IZ DIZ FUNCTION??? MOVE TO MV.JS
   var result = mat4();
   result[0][0] = a;
   result[1][1] = b;
   result[2][2] = c;
   return result;
};

//--------------------------------------------

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader");
    
    gl.useProgram( program);
    gl.enable(gl.DEPTH_TEST);

    instanceMatrix = mat4();
    modelViewMatrix = mat4();
    camModelViewMatrix = mat4();

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    camModelViewLoc = gl.getUniformLocation(program, "camModelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");

    //********  POINT GENERATION  *********//
    cube();
    changeCubeColor(colorsArray);
    findSpherePoints( 0.5, 0.5, 0.5, spherePoints, sphereNormals);
    changeSphereColor(sphereColors);
    findCyclinderPoints(0.5, 0.5, cyclinderPoints, cyclinderNormals);
    changeCyclinderColor(cyclinderColors);
    //********  POINT GENERATION END *********//
    
    for(i=0; i<numNodes; i++) initNodes(i);
    
    //********  UI  *********//
    buildModelUI( bodyId, null);
    configureTransformUI();
    setupCameraUI();
    setupAnimationUI();

    // FPS
    canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;

    document.exitPointerLock = document.exitPointerLock ||
                           document.mozExitPointerLock;

    canvas.onclick = function() {
        canvas.requestPointerLock();
    };

    // Hook pointer lock state change events for different browsers
    document.addEventListener('pointerlockchange', lockChangeAlert, false);
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false); 
    // END FPS

    //********  UI  END *********//

    startRender(60);
}

function changeTransformMatrix(event)
{
    if ( previousButton !== null)
    {
        let num = parseFloat(event.target.value);
        console.log(num);
        if ( !Number.isNaN( num) )
        {
            // copy values from transformUI that holds inputs that 
            let modelTransform = transforms[ previousButton.value];
            let transformKeys = [ "pos", "rot", "scale"];
            // has the values! to the corresponding transformMatrix found by previousButton
            for ( let i = 0; i < 3; i++)
            {
                for ( let j = 0; j < 3; j++)
                {
                    modelTransform[ transformKeys[ i]][ j] = parseFloat( transformUI[ i][ j].value);
                }
            }
            initNodes( parseFloat( previousButton.value)); // do not change!
        }
    }
}

var previousButton = null;
var currentTransform;
function handleModelPieceClick( event)
{
    if ( previousButton !== null)
    {
        previousButton.disabled = false;
    }
    previousButton = event.target;
    previousButton.disabled = true;

    // find corresponding transform matrix
    let modelTransform = transforms[ previousButton.value];
    let transformKeys = [ "pos", "rot", "scale"];
    // Send bodydata to the transform UI!
    for ( let i = 0; i < 3; i++)
    {
        for ( let j = 0; j < 3; j++)
        {
            transformUI[ i][ j].value = modelTransform[ transformKeys[ i]][ j];
        }
    }
};

var fps, fpsInterval, startTime, now, then, elapsed;
function startRender(fpsCount)
{
    fpsInterval = 1000 / fpsCount;
    then = Date.now();
    startTime = then;
    render();
};

var render = function() {

        requestAnimFrame(render);

        now = Date.now();
        elapsed = now - then;

        if (elapsed > fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % fpsInterval);
    
            // Put your drawing code here
            gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

            if ( isAnimPlaying)
            {
                animateMantis();
            }

            if ( isCameraOrtho)
            {
                eye = vec3( camRadius * Math.sin( camPhi), camRadius * Math.sin( camTheta), camRadius * Math.cos( camPhi));
                camModelViewMatrix = lookAt(eye, camAt, camUp);
                projectionMatrix = ortho( camLeft, camRight, camBottom, camYTop, camNearOrtho, camFarOrtho);
            }
            else
            {
                eye = cameraTransform[ "pos"];
                if ( enableHardFocus)
                {
                    camModelViewMatrix = lookAt(eye, transforms[0]["pos"], vec3( realCamOrientation[1]));
                }
                else
                {
                    let lookDirection = getLookDirection( 100, 2);
                    lookDirection = add( eye, lookDirection);
                    camModelViewMatrix = lookAt(eye, lookDirection, vec3( realCamOrientation[1]));
                }
                projectionMatrix = perspective(camFovy, camAspect, camNearPers, camFarPers);
            }
            gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
            gl.uniformMatrix4fv( camModelViewLoc, false, flatten(camModelViewMatrix) );

            traverse(bodyId);
            ground();
            moveCamera();
        }
};