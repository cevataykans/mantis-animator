
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

var colorI = 0;


var numNodes = 15;
var numAngles = 17;
var angle = 0;

var numVertices = 24;

var stack = [];

var figure = [];

for( var i=0; i<numNodes; i++) figure[i] = createNode(null, null, null, null);

var vBuffer;
var modelViewLoc;

var pointsArray = [];
var colorsArray = [];

var headSpherePoints = [];
var sphereColors = [];

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
    findSpherePoints( 0.5, 0.5, 0.5, headSpherePoints, sphereColors);
    cube();
    //********  POINT GENERATION END *********//
    
    for(i=0; i<numNodes; i++) initNodes(i);
    
    //********  UI  *********//
    buildModelUI( bodyId, null);
    configureTransformUI();

    setupCameraSelection()
    setupCommonCameraSettings();
    setupOrthoCameraUI();
    setupPrespectiveCameraSettings();
    //********  UI  END *********//

    render();
}

function buildModelUI( curID, parentID)
{
    if ( curID == null) return;

    buildUIElement( curID, parentID);

    if (figure[ curID].child != null)
    {
        buildModelUI( figure[ curID].child, curID); 
    }
    if (figure[ curID].sibling != null) 
    {
        buildModelUI( figure[ curID].sibling, parentID);
    }
}

function buildUIElement( curID, parentID)
{
    var parentNode = document.getElementById( "menu" + parentID);
        if ( parentNode == undefined)
        {
            parentNode = document.createElement("UL");
            parentNode.id = "menu" + parentID;

            let childNode = document.getElementById( "child" + parentID);
            childNode.appendChild( parentNode);
        }

        var node = document.createElement("LI");
        node.id = "child" + curID;

        var nodeButton = document.createElement( "button");
        nodeButton.id = "button" + curID;
        nodeButton.value = curID; // hold the value so that when button click, 
                                  // get corresponding name, 
                                  // than get the transform from the dictionary, than display!
        nodeButton.onclick = handleModelPieceClick;
        node.appendChild( nodeButton);

        var textnode = document.createTextNode( modelIDNames[ curID].toUpperCase() );
        nodeButton.appendChild( textnode);

        parentNode.appendChild( node);
};

var transformUI = [
    [],
    [],
    []
];
function configureTransformUI()
{
    let inputList = document.getElementsByClassName( "transformInput");
    for ( let i = 0; i < 3; i++)
    {
        for ( let j = 0; j < 3; j++)
        {
            transformUI[i].push( inputList[ i * 3 + j]);
            transformUI[i][ j].oninput = changeTransformMatrix;
        }
    }
};

function changeTransformMatrix(event)
{
    if ( previousButton !== null)
    {
        let num = parseInt(event.target.value);
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
                    modelTransform[ transformKeys[ i]][ j] = transformUI[ i][ j].value;
                }
            }
            initNodes( parseInt( previousButton.value)); // do not change!
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

var render = function() {

        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

        if ( isCameraOrtho)
        {
            eye = vec3( camRadius * Math.sin( camPhi), camRadius * Math.sin( camTheta), camRadius * Math.cos( camPhi));
            //camModelViewMatrix = lookAt( eye, camAt , camUp);
            projectionMatrix = ortho( camLeft, camRight, camBottom, camYTop, camNearOrtho, camFarOrtho);
        }
        else
        {
            eye = vec3( camRadius * Math.sin( camTheta) * Math.cos( camPhi), camRadius * Math.sin( camTheta) * Math.sin( camPhi), camRadius * Math.cos( camTheta));
            //camModelViewMatrix = lookAt(eye, camAt , camUp);
            projectionMatrix = perspective(camFovy, camAspect, camNearPers, camFarPers);
        }
        camModelViewMatrix = lookAt(eye, camAt , camUp);

        gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
        gl.uniformMatrix4fv( camModelViewLoc, false, flatten(camModelViewMatrix) );

        traverse(bodyId);
        requestAnimFrame(render);
};