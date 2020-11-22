
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

//-------------------------------------------

function scale4(a, b, c) {
   var result = mat4();
   result[0][0] = a;
   result[1][1] = b;
   result[2][2] = c;
   return result;
}

//--------------------------------------------

/*
function sphere()
{
    var SPHERE_DIV = 12;
    var i, ai, si, ci;
    var j, aj, sj, cj;
    var p1, p2;

    // Vertices
    var vertices = [], indices = [];
    for (j = 0; j <= SPHERE_DIV; j++) {
        aj = j * Math.PI / SPHERE_DIV;
        sj = Math.sin(aj);
        cj = Math.cos(aj);
        for (i = 0; i <= SPHERE_DIV; i++) {
            ai = i * 2 * Math.PI / SPHERE_DIV;
            si = Math.sin(ai);
            ci = Math.cos(ai);

            pointsArray.push(si * sj);  // X
            pointsArray.push(cj);       // Y
            pointsArray.push(ci * sj);  // Z
        }
    }

    // Indices
    for (j = 0; j < SPHERE_DIV; j++) {
        for (i = 0; i < SPHERE_DIV; i++) {
            p1 = j * (SPHERE_DIV+1) + i;
            p2 = p1 + (SPHERE_DIV+1);

            pointsArray.push(p1);
            pointsArray.push(p2);
            pointsArray.push(p1 + 1);

            pointsArray.push(p1 + 1);
            pointsArray.push(p2);
            pointsArray.push(p2 + 1);
        }
    }
}*/


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
    
    cube();

    cBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
        
    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
    document.getElementById("slider0").onchange = function(event) {
        theta[bodyId ] = event.target.value;
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
    
    render();
}


var render = function() {

        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
        traverse(bodyId);
        requestAnimFrame(render);
}