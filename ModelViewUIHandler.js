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