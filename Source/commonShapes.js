var sectorCount = 50; // Change names
var stackCount = 50; //TODO: add sectorCount and stackCount as an argument!

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


//*******************  Ellipsoid *******************//

function findSpherePoints( xRadius, yRadius, zRadius, points, normals)
{
    var spherePointIndices = [];

    var x, y, z, xyAngle;

    var sectorStep = 2 * Math.PI / sectorCount;
    var stackStep = Math.PI / stackCount;
    var sectorAngle, stackAngle;

    for ( let i = 0; i <= stackCount; i++)
    {
        stackAngle = Math.PI / 2 - i * stackStep; // PI / 2 to - PI / 2
        xyAngle = Math.cos( stackAngle);
        z = zRadius * Math.sin( stackAngle);

        for ( let j = 0; j <= sectorCount; j++)
        {
            sectorAngle = j * sectorStep;

            x = xRadius * xyAngle * Math.cos( sectorAngle);
            y = yRadius * xyAngle * Math.sin( sectorAngle);

            // push point!
            spherePointIndices.push( vec4( x, y, z, 1) );
        }
    }
    findSphereTriangles( spherePointIndices, points, normals);
}

function findSphereTriangles( spherePointIndices, points, normals)
{
    let upper, lower;
    for ( let i = 0; i < stackCount; i++)
    {
        upper = i * (sectorCount + 1); // currentStack beginning
        lower = upper + sectorCount + 1; // nextStack beginning

        for ( let j = 0; j < sectorCount; j++, upper++, lower++)
        {
            if ( i != 0)
            {
                // Push real vertices
                points.push( spherePointIndices[ upper] );
                points.push( spherePointIndices[ upper + 1]) ;
                points.push( spherePointIndices[ lower] );
                
                // push normals!
                var upArrow = subtract( spherePointIndices[ upper + 1], spherePointIndices[ upper]);
                var leftArrow = subtract( spherePointIndices[ lower], spherePointIndices[ upper]);
                var normalToPush = normalize( cross( upArrow, leftArrow));
                normalToPush = vec4( normalToPush);
                normalToPush[ 3] = 0.0;

                normals.push( normalToPush);
                normals.push( normalToPush);
                normals.push( normalToPush);

                // push texture!!
            }

            if ( i != (stackCount - 1))
            {
                points.push( spherePointIndices[ upper + 1]);
                points.push( spherePointIndices[ lower + 1]);
                points.push( spherePointIndices[ lower]);

                // push normals!
                var upArrow = subtract( spherePointIndices[ upper + 1], spherePointIndices[ lower]);
                var leftArrow = subtract( spherePointIndices[ lower + 1], spherePointIndices[ lower]);
                var normalToPush = normalize( cross( upArrow, leftArrow));
                normalToPush = vec4( normalToPush);
                normalToPush[ 3] = 0.0;

                normals.push( normalToPush);
                normals.push( normalToPush);
                normals.push( normalToPush);

                // push texture!!
            }
        }
    }
}

//*******************  Cyclinder *******************//

function findCyclinderPoints( radius, height, points)
{
    var cyclinderPointIndices = [];

    let x, y;

    let sectorStep =  2 * Math.PI / sectorCount;
    var sectorAngle;
    // Lower circle
    for ( let i = 0; i <= sectorCount; i++)
    {
        sectorAngle = sectorStep * i;
        x = radius * Math.cos( sectorAngle);
        y = radius * Math.sin( sectorAngle);

        // Push points
        cyclinderPointIndices.push( vec4( x, y, -height / 2, 1) );
    }

    // Upper circle
    for ( let i = 0; i <= sectorCount; i++)
    {
        // push points
        var temp = cyclinderPointIndices[ i];
        cyclinderPointIndices.push( vec4( temp[ 0], temp[ 1], temp[ 2] + height, 1) );
    }
    findCyclinderTriangles( cyclinderPointIndices, points);
}

function findCyclinderTriangles( cyclinderPointIndices, points)
{
    let upper = sectorCount + 1;
    for ( let i = 0; i < sectorCount; i++)
    {
        // side
        points.push( cyclinderPointIndices[ i]);
        points.push( cyclinderPointIndices[ i + 1]);
        points.push( cyclinderPointIndices[ i + 1 + upper]);

        points.push( cyclinderPointIndices[ i]);
        points.push( cyclinderPointIndices[ i + 1 + upper]);
        points.push( cyclinderPointIndices[ i + upper]);

        // lower circle
        points.push( cyclinderPointIndices[ i] );
        points.push( cyclinderPointIndices[ i + 1]);
        points.push( vec4( 0, 0, cyclinderPointIndices[ i][ 2], 1));

        // upper circle
        points.push( cyclinderPointIndices[ i + 1 + upper] );
        points.push( cyclinderPointIndices[ i + upper]);
        points.push( vec4( 0, 0, -cyclinderPointIndices[ i][ 2], 1));

        // Push colors

        // Push normals

        // Push textures
    }
}

//*******************  Square *******************//

function quad(a, b, c, d) {
    pointsArray.push(vertices[a]); 
    pointsArray.push(vertices[b]); 
    pointsArray.push(vertices[c]);     
    pointsArray.push(vertices[d]);    
}


function cube()
{
   quad( 1, 0, 3, 2 );
   quad( 2, 3, 7, 6 );
   quad( 3, 0, 4, 7 );
   quad( 6, 5, 1, 2 );
   quad( 4, 5, 6, 7 );
   quad( 5, 4, 0, 1 );
}

function changeSphereColor(colorArray, rgbColor = [0, 1, 0, 1])
{
    sphereColors = [];
    for ( let i = 0; i < stackCount; i++)
    {
        for ( let j = 0; j < sectorCount; j++)
        {
            if ( i != 0)
            {
                sphereColors.push(rgbColor);
                sphereColors.push(rgbColor);
                sphereColors.push(rgbColor);
            }

            if ( i != (stackCount - 1))
            {
                sphereColors.push(rgbColor);
                sphereColors.push(rgbColor);
                sphereColors.push(rgbColor);
            }
        }
    }       
}

function changeCyclinderColor(colorArray, rgbColor = [0, 1, 0, 1])
{
    for (i = 0; i < sectorCount*12; i++)
    {
        colorArray[i] = rgbColor;
    }
}

function changeCubeColor(rgbColor = [0, 1, 0, 1]) 
{
    colorsArray = [];
    for (p = 0; p < 24; p++)
    {
        colorsArray.push(rgbColor);
    }
}