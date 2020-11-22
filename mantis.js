var bodyId = 0;
var neckId = 1;
var headId = 2;
var leftUpperClawId = 3;
var leftMiddleClawId = 4;
var leftLowerClawId = 5;
var rightUpperClawId = 6;
var rightMiddleClawId = 7;
var rightLowerClawId = 8;
var frontLeftLegId = 9;
var frontRightLegId = 10;
var backLeftLegId = 11;
var backRightLegId = 12;
var leftWingId = 13;
var rightWingId = 14;

var modelIDNames = [
    "body",
    "neck",
    "head",
    "left Upper Claw",
    "left Middle Claw",
    "left Lower Claw",
    "right Upper Claw",
    "right Middle Claw",
    "right Lower Claw",
    "front Left Leg",
    "front Right Leg",
    "back Left Leg",
    "back Right Leg",
    "left Wing",
    "right Wing"
]

var bodyAngleY = 15;
var bodyAngleZ = 16;

var bodyHeight = 6.0;
var bodyWidth = 2.0;
var neckHeight = 6.0;
var neckWidth = 1.0;
var headHeight = 2.0;
var headWidth = 1.5;
var upperClawHeight = 3.0;
var middleClawHeight = 2.0;
var lowerClawHeight = 2.0;
var upperClawWidth  = 0.5;
var middleClawWidth  = 0.5;
var lowerClawWidth  = 0.5;
var legHeight  = 0.5;
var legWidth  = 0.5;
var legThick = 4.0;
var wingHeight = 6.0;
var wingWidth = 5.0;
var wingThick = 0.25;

var theta = [120, -45, 45, 45, 0, -30, 90, -90, 45, 0, 0, 0, 0, 0, 0, 0, 150];

var transforms = {
    "body": {
       "pos": [ 0.0, neckHeight - headHeight * 0.2, 0.0],
       "rot": [ theta[bodyId], theta[bodyAngleY], theta[bodyAngleZ]], 
       "scale": [ 1, 1, 1]
    },
    "neck": {
        "pos": [ 0.0, bodyHeight - neckHeight * 0.1, -neckWidth * 0.5],
        "rot": [ theta[neckId], 0, 0],
        "scale": [ 1, 1, 1]
     },
     "head": {
        "pos": [ 0.0, neckHeight - headHeight * 0.2, 0.0],
        "rot": [ theta[headId], 0, 0],
        "scale": [ 1, 1, 1]
     },
     "left Upper Claw": {
        "pos": [ neckWidth - upperClawWidth * 0.5, upperClawHeight, 0.0],
        "rot": [ theta[rightUpperClawId], 0, 0],
        "scale": [ 1, 1, 1]
     },
     "left Middle Claw": {
        "pos": [ 0.0, upperClawHeight, 0.0],
        "rot": [ theta[rightMiddleClawId], 0, 0],
        "scale": [ 1, 1, 1]
     },
     "left Lower Claw": {
        "pos": [ 0.0, lowerClawHeight, 0.0],
        "rot": [ theta[rightLowerClawId], 0, 0],
        "scale": [ 1, 1, 1]
     },
     "right Upper Claw": {
        "pos": [ -( neckWidth - upperClawWidth * 0.5), upperClawHeight, 0.0],
        "rot": [ theta[leftUpperClawId], 0, 0],
        "scale": [ 1, 1, 1]
     },
     "right Middle Claw": {
        "pos": [ 0.0, upperClawHeight * 0.0, 0.0],
        "rot": [ theta[leftMiddleClawId], 0, 0],
        "scale": [ 1, 1, 1]
     },
     "right Lower Claw": {
        "pos": [ 0.0, lowerClawHeight + middleClawHeight * 0.5, 0.0],
        "rot": [ theta[leftLowerClawId], 0, 0],
        "scale": [ 1, 1, 1]
     },
     "front Left Leg": {
        "pos": [ bodyWidth - 2.5 * legWidth, bodyHeight - 2.5 * legHeight, bodyWidth + 2 * legWidth],
        "rot": [ theta[frontRightLegId], 0, 0],
        "scale": [ 1, 1, 1]
     },
     "front Right Leg": {
        "pos": [ -bodyWidth + 2.5 * legWidth, bodyHeight - 2.5 * legHeight, bodyWidth + 2 * legWidth],
        "rot": [ theta[frontLeftLegId], 0, 0],
        "scale": [ 1, 1, 1]
     },
     "backLeftLegId": {
        "pos": [ bodyWidth - 2.5 * legWidth, bodyHeight - 5.5 * legHeight, bodyWidth + 2 * legWidth],
        "rot": [ theta[backRightLegId], 0, 0],
        "scale": [ 1, 1, 1]
     },
     "back Right Leg": {
        "pos": [ -bodyWidth + 2.5 * legWidth, bodyHeight - 5.5 * legHeight, bodyWidth + 2 * legWidth],
        "rot": [ theta[backLeftLegId], 0, 0],
        "scale": [ 1, 1, 1]
     },
     "left Wing": {
        "pos": [ bodyWidth + wingWidth * 0.25, 0, -4 * wingThick],
        "rot": [ theta[leftWingId], 0, 0],
        "scale": [ 1, 1, 1]
     },
     "right Wing": {
        "pos": [ -bodyWidth - wingWidth * 0.25, 0, -4 * wingThick],
        "rot": [ theta[rightWingId], 0, 0],
        "scale": [ 1, 1, 1]
     }
};

function createNode(transform, render, sibling, child){
    var node = {
    transform: transform,
    render: render,
    sibling: sibling,
    child: child,
    }
    return node;
}

function initNodes(Id) {

    var curTF;
    
    switch(Id) {
    
    case bodyId:
    
        curTF = transforms[ "body"];
        m = getModelViewMatrix( curTF);
        figure[bodyId] = createNode( m, body, null, neckId );
        break;

    case neckId:    

        curTF = transforms[ "neck"];
        m = getModelViewMatrix( curTF);
        figure[neckId] = createNode( m, neck, frontLeftLegId, headId);
        break;

    case headId:    

        curTF = transforms[ "head"];
        m = getModelViewMatrix( curTF);
        figure[headId] = createNode( m, head, leftUpperClawId, null);
        break;
    
    case rightUpperClawId:
    
        curTF = transforms[ "right Upper Claw"];
        m = getModelViewMatrix( curTF);
        figure[leftUpperClawId] = createNode( m, upperClaw, rightUpperClawId, leftMiddleClawId );
        break;

    case rightMiddleClawId:

        curTF = transforms[ "right Middle Claw"];
        m = translate(0.0, upperClawHeight * 0.0, 0.0);
        m = mult(m, rotate(theta[leftMiddleClawId], 1, 0, 0));
        figure[leftMiddleClawId] = createNode( m, middleClaw, null, leftLowerClawId );
        break;

    case rightLowerClawId:

        curTF = transforms[ "right Lower Claw"];
        m = translate(0.0, lowerClawHeight + middleClawHeight*0.5, 0.0);
        m = mult(m, rotate(theta[leftLowerClawId], 1, 0, 0));
        figure[leftLowerClawId] = createNode( m, lowerClaw, null, null );
        break;

    case leftUpperClawId:
    
        curTF = transforms[ "left Upper Claw"];
        m = translate(neckWidth-upperClawWidth*0.5, upperClawHeight, 0.0);
        m = mult(m, rotate(theta[rightUpperClawId], 1, 0, 0));
        figure[rightUpperClawId] = createNode( m, upperClaw, null, rightMiddleClawId );
        break;

    case leftMiddleClawId:

        curTF = transforms[ "left Middle Claw"];
        m = translate(0.0, upperClawHeight, 0.0);
        m = mult(m, rotate(theta[rightMiddleClawId], 1, 0, 0));
        figure[rightMiddleClawId] = createNode( m, middleClaw, null, rightLowerClawId );
        break;

    case leftLowerClawId:

        curTF = transforms[ "left Lower Claw"];
        m = translate(0.0, lowerClawHeight, 0.0);
        m = mult(m, rotate(theta[rightLowerClawId], 1, 0, 0));
        figure[rightLowerClawId] = createNode( m, lowerClaw, null, null );
        break;
    
    case frontRightLegId:
    
        curTF = transforms[ "front Right Leg"];
        m = translate(-bodyWidth+2.5*legWidth, +bodyHeight-2.5*legHeight, bodyWidth+2*legWidth);
        m = mult(m , rotate(theta[frontLeftLegId], 1, 0, 0));
        figure[frontLeftLegId] = createNode( m, leg, frontRightLegId, null );
        break;

    case frontLeftLegId:
    
        curTF = transforms[ "front Left Leg"];
        m = translate(+bodyWidth-2.5*legWidth, +bodyHeight-2.5*legHeight, bodyWidth+2*legWidth);
        m = mult(m, rotate(theta[frontRightLegId], 1, 0, 0));
        figure[frontRightLegId] = createNode( m, leg, backLeftLegId, null );
        break;
    
    
    case backRightLegId:

        curTF = transforms[ "back Right Leg"];
        m = translate(-bodyWidth+2.5*legWidth, +bodyHeight-5.5*legHeight, bodyWidth+2*legWidth);
        m = mult(m, rotate(theta[backLeftLegId], 1, 0, 0));
        figure[backLeftLegId] = createNode( m, leg, backRightLegId, null );
        break;

    case backLeftLegId:

        curTF = transforms[ "back Left Leg"];
        m = translate(+bodyWidth-2.5*legWidth, +bodyHeight-5.5*legHeight, bodyWidth+2*legWidth);
        m = mult(m, rotate(theta[backRightLegId], 1, 0, 0));
        figure[backRightLegId] = createNode( m, leg, leftWingId, null );
        break;
    

    case leftWingId:

        curTF = transforms[ "left Wing"];
        m = translate(bodyWidth+wingWidth*0.25, 0, -4*wingThick);
        m = mult(m, rotate(theta[leftWingId], 1, 0, 0));
        figure[leftWingId] = createNode( m, wing, rightWingId, null );
        break;

    case rightWingId:

        curTF = transforms[ "right Wing"];
        m = translate(-bodyWidth-wingWidth*0.25, 0, -4*wingThick);
        m = mult(m, rotate(theta[rightWingId], 1, 0, 0));
        figure[rightWingId] = createNode( m, wing, null, null );
        break;
    
    }
}

function getModelViewMatrix( curTF)
{
    var m = mat4();
    m = translate( curTF[ "pos"][ 0], curTF[ "pos"][ 1], curTF[ "pos"][ 2]);
    m = mult(m, rotate( curTF["rot"][ 0], 1, 0, 0 ));
    m = mult(m, rotate( curTF["rot"][ 1], 0, 1, 0));
    m = mult(m, rotate( curTF["rot"][ 2], 0, 0, 1));
    m = mult(m, scale4( curTF["scale"][ 0], curTF["scale"][ 1], curTF["scale"][ 2]));
    return m;
}

function traverse(Id) {
   
    if(Id == null) return; 
    stack.push(modelViewMatrix);
    modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);
    figure[Id].render();
    if(figure[Id].child != null) traverse(figure[Id].child); 
     modelViewMatrix = stack.pop();
    if(figure[Id].sibling != null) traverse(figure[Id].sibling); 
 }
 
 function body() {
 
     instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5*bodyHeight, 0.0) );
     instanceMatrix = mult(instanceMatrix, scale4( bodyWidth, bodyHeight, bodyWidth));
     gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));

     prepareData( pointsArray, colorsArray);

     for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
 }
 
 function neck() {
    
     instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * neckHeight, 0.0 ));
     instanceMatrix = mult(instanceMatrix, scale4(neckWidth, neckHeight, neckWidth) );
     gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));

     prepareData( pointsArray, colorsArray);

     for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
 }

 function head() {
    
     instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * headHeight, 0.0 ));
     instanceMatrix = mult(instanceMatrix, scale4(headWidth, headHeight, headWidth) );
     gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
     
     prepareData( headSpherePoints, sphereColors);

     gl.drawArrays( gl.TRIANGLES, 0, headSpherePoints.length);
 }
 
 function upperClaw() {
 
     instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperClawHeight, 0.0) );
     instanceMatrix = mult(instanceMatrix, scale4(upperClawWidth, upperClawHeight, upperClawWidth) );
     gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));

     prepareData( pointsArray, colorsArray);

     for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
 }
 
 function middleClaw() {
 
     instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * middleClawHeight, 0.0) );
     instanceMatrix = mult(instanceMatrix, scale4(middleClawWidth, middleClawHeight, middleClawWidth) );
     gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));

     prepareData( pointsArray, colorsArray);

     for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
 }
 
 function lowerClaw() {
 
     instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerClawHeight, 0.0) );
     instanceMatrix = mult(instanceMatrix, scale4(lowerClawWidth, lowerClawHeight, lowerClawWidth) );
     gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));

     prepareData( pointsArray, colorsArray);

     for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
 }
 
 function  leg() {
 
     instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * legHeight, 0.0) );
     instanceMatrix = mult(instanceMatrix, scale4(legWidth, legHeight, legThick) );
     gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));

     prepareData( pointsArray, colorsArray);

     for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
 }
 
 function wing() {
 
     instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * wingHeight, 0.0) );
     instanceMatrix = mult(instanceMatrix, scale4(wingWidth, wingHeight, wingThick) );
     gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));

     prepareData( pointsArray, colorsArray);

     for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
 }

 function prepareData( pointsArray, colorsArray, normal = null, texture = null)
 {
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
 }