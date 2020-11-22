var sectorCount = 20; // Change names
var stackCount = 20; //TODO: add sectorCount and stackCount as an argument!

//*******************  Ellipsoid *******************//

function findSpherePoints( xRadius, yRadius, zRadius, points)
{
    var spherePointIndices = [];

    var x, y, z, xyAngle;
    var nx, ny, nz;
    var inverseLength = 1 / radius;

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
    findSphereTriangles( spherePointIndices, points);
}

function findSphereTriangles( spherePointIndices, points)
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
                points.push( spherePointIndices[ lower]) ;
                points.push( spherePointIndices[ upper + 1] );
                
                // push normals!
            
                // push colors?

                // push texture!!
            }

            if ( i != (stackCount - 1))
            {
                points.push( spherePointIndices[ upper + 1]);
                points.push( spherePointIndices[ lower]);
                points.push( spherePointIndices[ lower + 1]);

                // push normals!
            
                // push colors?

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
        cyclinderPointIndicess.push( vec4( x, y, -height / 2, 1) );

        // Push colors

        // Push normals

        // Push textures
    }

    // Upper circle
    for ( let i = 0; i <= sectorCount; i++)
    {
        // push points
        var temp = cyclinderPoints[ i];
        cyclinderPointIndices.push( vec4(temp[ 0], temp[ 1], temp[ 2] + height, 1) );

        // Push colors

        // Push normals

        // Push textures
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
    }
}

//*******************  Square *******************//

function quad(a, b, c, d) {
    pointsArray.push(vertices[a]); 
    pointsArray.push(vertices[b]); 
    pointsArray.push(vertices[c]);     
    pointsArray.push(vertices[d]);    
    for (p = 0; p < 4; p++)
    {
        colorsArray.push(vertexColors[colorI]);
    }
    colorI = (++colorI) % 8;
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