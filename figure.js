
var canvas;
var gl;
var program;

var projectionMatrix; 
var modelViewMatrix;

var instanceMatrix;

var modelViewMatrixLoc;

var vertices = [

    vec4( -0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5, -0.5, -0.5, 1.0 ),
    vec4( -0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5, -0.5, -0.5, 1.0 )
];

var vertexColors = [
    [ 0.0, 0.0, 0.0, 1.0 ],  // black
    [ 1.0, 0.0, 0.0, 1.0 ],  // red
    [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
    [ 0.0, 1.0, 0.0, 1.0 ],  // green
    [ 0.0, 0.0, 1.0, 1.0 ],  // blue
    [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
    [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
    [ 1.0, 1.0, 1.0, 1.0 ]   // white
];

var colorI = 0;


var numNodes = 15;
var numAngles = 17;
var angle = 0;

var theta = [120, -45, 45, 45, 0, -30, 90, -90, 45, 0, 0, 0, 0, 0, 0, 0, 150];

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

function scale4(a, b, c) {
   var result = mat4();
   result[0][0] = a;
   result[1][1] = b;
   result[2][2] = c;
   return result;
}

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
    
    projectionMatrix = ortho(-15.0,15.0,-15.0, 15.0,-15.0,15.0);
    modelViewMatrix = mat4();

        
    gl.uniformMatrix4fv(gl.getUniformLocation( program, "modelViewMatrix"), false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( gl.getUniformLocation( program, "projectionMatrix"), false, flatten(projectionMatrix) );
    
    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix")
    
    // Find points for shapes
    findSpherePoints( 0.5, 0.5, 0.5, headSpherePoints, sphereColors);
    console.log( "Sphere color count: " + sphereColors.length);
    cube();
    
    document.getElementById("slider0").onchange = function(event) {
        theta[bodyId] = event.target.value;
        initNodes(bodyId);
    };

    document.getElementById("slider1").onchange = function(event) {
        theta[bodyAngleY] = event.target.value;
        initNodes(bodyId);
    };

    document.getElementById("slider2").onchange = function(event) {
         theta[bodyAngleZ] = event.target.value;
         initNodes(bodyId);
    };
    for(i=0; i<numNodes; i++) initNodes(i);
    
    buildModelUI( bodyId, null);

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
        var textnode = document.createTextNode( modelIDNames[ curID].toUpperCase() );
        node.appendChild(textnode); 
        parentNode.appendChild( node);
}

var render = function() {

        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
        traverse(bodyId);
        requestAnimFrame(render);
}