var transformUI = [
    [],
    [],
    []
];

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
};

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
                    modelTransform[ transformKeys[ i]][ j] = parseInt( transformUI[ i][ j].value);
                }
            }
            initNodes( parseInt( previousButton.value)); // do not change!
        }
    }
};

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
