var bodyId = 0;
var neckId = 1;
var headId = 2;
var leftUpperClawId = 3;
var leftMiddleClawId = 4;
var leftLowerClawId = 5;
var rightUpperClawId = 6;
var rightMiddleClawId = 7;
var rightLowerClawId = 8;
var frontLeftUpperLegId = 9;
var frontLeftMiddleLegId = 10;
var frontLeftLowerLegId = 11;
var frontRightUpperLegId = 12;
var frontRightMiddleLegId = 13;
var frontRightLowerLegId = 14;
var backLeftUpperLegId = 15;
var backLeftMiddleLegId = 16;
var backLeftLowerLegId = 17;
var backRightUpperLegId = 18;
var backRightMiddleLegId = 19;
var backRightLowerLegId = 20;
var leftWingId = 21;
var rightWingId = 22;

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
    "front Left Upper Leg",
    "front Left Middle Leg",
    "front Left Lower Leg",
    "front Right Upper Leg",
    "front Right Middle Leg",
    "front Right Lower Leg",
    "back Left Upper Leg",
    "back Left Middle Leg",
    "back Left Lower Leg",
    "back Right Upper Leg",
    "back Right Middle Leg",
    "back Right Lower Leg",
    "left Wing",
    "right Wing"
] 

// Proportions are: 0-Width, 1-Height, 2-Length
var bodyProportions = [2.0, 2.0, 8.0];
var neckProportions = [1.0, 8.0, 1.0];
var headProportions = [1, 1.5, 1];
var upperClawProportions = [0.5, 3.0, 0.5];
var middleClawProportions = [0.5, 2.0, 0.5];
var lowerClawProportions = [0.5, 2.0, 0.5];
var upperLegProportions = [0.5, 0.5, 0.5];
var middleLegProportions = [0.5, 0.5, 0.5];
var lowerLegProportions = [0.5, 0.5, 0.5];
var wingProportions = [5.0, 6.0];

// Model View Transforms
var transforms = [
    { //"body",
       "pos": [ 0.0, 0, 0.0],
       "rot": [ 0, 0, 0], 
       "scale": [ 1, 1, 1]
    },
    { //"neck",
        "pos": [ 0.0, 0.5*bodyProportions[1] + 0.5*neckProportions[1] , 0.5*bodyProportions[2] - 0.5*neckProportions[2]],
        "rot": [ 45, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"head",
        "pos": [ 0.0, 0.5*neckProportions[1] + 1.3*headProportions[1], 0.4*neckProportions[2] + 0.5*headProportions[2]],
        "rot": [ 45, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"left Upper Claw",
        "pos": [ neckProportions[0] - upperClawProportions[0] * 0.5, 0.2*neckProportions[1] + 0.5*upperClawProportions[1], 0.3*neckProportions[2] + 0.5*upperClawProportions[2]],
        "rot": [ 45, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"left Middle Claw",
        "pos": [ 0.0, middleClawProportions[1], 0.0],
        "rot": [ 0, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"left Lower Claw",
        "pos": [ 0.0, lowerClawProportions[1], 0.0],
        "rot": [ -30, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"right Upper Claw",
        "pos": [ -( neckProportions[0] - upperClawProportions[0] * 0.5), upperClawProportions[1], 0.0],
        "rot": [ 90, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"right Middle Claw",
        "pos": [ 0.0,  middleClawProportions[1], 0.0],
        "rot": [ -90, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"right Lower Claw",
        "pos": [ 0.0, middleClawProportions[1] + lowerClawProportions[1] * 0.5, 0.0],
        "rot": [ 45, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"front Upper Left Leg",
        "pos": [ 0, 0, 0],
        "rot": [ 0, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"front Middle Left Leg",
        "pos": [ 0, 0, 0],
        "rot": [ 0, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"front Lower Left Leg",
        "pos": [ 0, 0, 0],
        "rot": [ 0, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"front Upper Right Leg",
        "pos": [ 0, 0, 0], 
        "rot": [ 0, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"front Middle Right Leg",
        "pos": [ 0, 0, 0],
        "rot": [ 0, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"front Lower Right Leg",
        "pos": [ 0, 0, 0],
        "rot": [ 0, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"back Upper Left Leg",
        "pos": [ 0, 0, 0],
        "rot": [ 0, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"back Middle Left Leg",
        "pos": [ 0, 0, 0],
        "rot": [ 0, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"back Lower Left Leg",
        "pos": [ 0, 0, 0],
        "rot": [ 0, 0, 0],
        "scale": [ 1, 1, 1]
     },
    { //"back Upper Right Leg",
        "pos": [ 0, 0, 0],
        "rot": [ 0, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"back Middle Right Leg",
        "pos": [ 0, 0, 0],
        "rot": [ 0, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"back Lower Right Leg",
        "pos": [ 0, 0, 0],
        "rot": [ 0, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { //"left Wing",
        "pos": [ bodyProportions[0] + wingProportions[0] * 0.25, 0, -4 * wingProportions[2]],
        "rot": [ 0, 0, 0],
        "scale": [ 1, 1, 1]
     },
     { // "right Wing"
        "pos": [ -bodyProportions[0] - wingProportions[0] * 0.25, 0, -4 * wingProportions[2]],
        "rot": [ 0, 0, 0],
        "scale": [ 1, 1, 1]
     }
]; //************************** SOME USE I THINK VALUES THEY SHOULD NOT USE -> FOR EXAMPLE BACK RIGHT LEG USES THETA OF BACKLEFTLEGID AND THERE ARE MANY MORE EXAMPLES LIKE THIS! */

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
    cube();
    var curTF = transforms[Id];
    
    switch(Id) {
    
    case bodyId:
        m = getModelViewMatrix( curTF);
        figure[bodyId] = createNode( m, body, null, neckId );
        break;

    case neckId:    
        m = getModelViewMatrix( curTF, vec3(0, 0.5*neckProportions[1], 0.5*neckProportions[2]));
        figure[neckId] = createNode( m, neck, frontRightUpperLegId, headId);
        break;

    case headId:    
        m = getModelViewMatrix( curTF, vec3(0, 0.5*headProportions[1], 0.5*headProportions[2]));
        figure[headId] = createNode( m, head, rightUpperClawId, null);
        break;
    
    case rightUpperClawId:
        m = getModelViewMatrix( curTF, vec3(0.5*neckProportions[0], 0.5*upperClawProportions[1], 0.5*upperClawProportions[2]));
        figure[rightUpperClawId] = createNode( m, upperClaw, leftUpperClawId, rightMiddleClawId );
        break;

    case rightMiddleClawId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[rightMiddleClawId] = createNode( m, middleClaw, null, rightLowerClawId );
        break;

    case rightLowerClawId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[rightLowerClawId] = createNode( m, lowerClaw, null, null );
        break;

    case leftUpperClawId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[leftUpperClawId] = createNode( m, upperClaw, null, leftMiddleClawId );
        break;

    case leftMiddleClawId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[leftMiddleClawId] = createNode( m, middleClaw, null, leftLowerClawId );
        break;

    case leftLowerClawId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[leftLowerClawId] = createNode( m, lowerClaw, null, null );
        break;
    
    case frontRightUpperLegId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[frontRightUpperLegId] = createNode( m, upperLeg, frontLeftUpperLegId, frontRightMiddleLegId );
        break;

    case frontRightMiddleLegId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[frontRightMiddleLegId] = createNode( m, middleLeg, null, frontRightLowerLegId );
        break;

    case frontRightLowerLegId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[frontRightLowerLegId] = createNode( m, lowerLeg, null, null );
        break;

    case frontLeftUpperLegId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[frontLeftUpperLegId] = createNode( m, upperLeg, backLeftUpperLegId, frontLeftMiddleLegId );
        break;
       
    case frontLeftMiddleLegId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[frontLeftMiddleLegId] = createNode( m, middleLeg, null, frontLeftLowerLegId );
        break;
    
    case frontLeftLowerLegId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[frontLeftLowerLegId] = createNode( m, lowerLeg, null, null );
        break;  

    case backLeftUpperLegId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[backLeftUpperLegId] = createNode( m, upperLeg, backRightUpperLegId, backLeftMiddleLegId );
        break;
    
    case backLeftMiddleLegId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[backLeftMiddleLegId] = createNode( m, middleLeg, null, backLeftLowerLegId );
        break;
    
    case backLeftLowerLegId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[backLeftLowerLegId] = createNode( m, lowerLeg, null, null );
        break;

    case backRightUpperLegId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[backRightUpperLegId] = createNode( m, upperLeg, leftWingId, backRightMiddleLegId );
        break;

    case backRightMiddleLegId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[backRightMiddleLegId] = createNode( m, middleLeg, null, backRightLowerLegId );
        break;

    case backRightLowerLegId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[backRightLowerLegId] = createNode( m, lowerLeg, null, null );
        break;

    case leftWingId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[leftWingId] = createNode( m, wing, rightWingId, null );
        break;

    case rightWingId:
        m = getModelViewMatrix( curTF, vec3(0, 0, 0));
        figure[rightWingId] = createNode( m, wing, null, null );
        break;
    
    }
}

function getModelViewMatrix( curTF, rotationPoint = vec3(0, 0, 0))
{
    var m = mat4();
    m = translate( curTF[ "pos"][ 0], curTF[ "pos"][ 1], curTF[ "pos"][ 2]);
    m = mult (m, translate(-rotationPoint[0], -rotationPoint[1], -rotationPoint[2]));
    m = mult(m, rotate( curTF["rot"][ 0], 1, 0, 0 ));
    m = mult(m, rotate( curTF["rot"][ 1], 0, 1, 0));
    m = mult(m, rotate( curTF["rot"][ 2], 0, 0, 1));
    m = mult (m, translate(rotationPoint[0], rotationPoint[1], rotationPoint[2]));
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
 
     instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.0, 0.0) );
     instanceMatrix = mult(instanceMatrix, scale4(bodyProportions[0], bodyProportions[1], bodyProportions[2]));
     gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));

     prepareData( pointsArray, colorsArray);

     for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
 }
 
 function neck() {
    
     instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.0, 0.0 ));
     instanceMatrix = mult(instanceMatrix, scale4(neckProportions[0], neckProportions[1], neckProportions[2]) );
     gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));

     prepareData( pointsArray, colorsArray);

     for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
 }

 function head() {
    
     instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.0, 0.0 ));
     instanceMatrix = mult(instanceMatrix, scale4(headProportions[0], headProportions[1], headProportions[2]) );
     gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
     
     prepareData( spherePoints, sphereColors);

     gl.drawArrays( gl.TRIANGLES, 0, spherePoints.length);
 }
 
 function upperClaw() {
 
     instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.0, 0.0) );
     instanceMatrix = mult(instanceMatrix, scale4(upperClawProportions[0], upperClawProportions[1], upperClawProportions[2]) );
     gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));

     prepareData( pointsArray, colorsArray);

     for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
 }
 
 function middleClaw() {
 
     instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.0, 0.0) );
     instanceMatrix = mult(instanceMatrix, scale4(middleClawProportions[0], middleClawProportions[1], middleClawProportions[2]) );
     gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));

     prepareData( pointsArray, colorsArray);

     for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
 }
 
 function lowerClaw() {
 
     instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.0, 0.0) );
     instanceMatrix = mult(instanceMatrix, scale4(lowerClawProportions[0], lowerClawProportions[1], lowerClawProportions[2]) );
     gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));

     prepareData( pointsArray, colorsArray);

     for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
 }
 
 function  upperLeg() {
 
     instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.0, 0.0) );
     instanceMatrix = mult(instanceMatrix, scale4(upperLegProportions[0], upperLegProportions[1], upperLegProportions[2]) );
     gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));

     prepareData( pointsArray, colorsArray);

     for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
 }

 function  middleLeg() {
 
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.0, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(middleLegProportions[0], middleLegProportions[1], middleLegProportions[2]) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));

    prepareData( pointsArray, colorsArray);

    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function  lowerLeg() {
 
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.0, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4(lowerLegProportions[0], lowerLegProportions[1], lowerLegProportions[2]) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));

    prepareData( pointsArray, colorsArray);

    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}
 
 function wing() {
 
     instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.0, 0.0) );
     instanceMatrix = mult(instanceMatrix, scale4(wingProportions[0], wingProportions[1], wingProportions[2]) );
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