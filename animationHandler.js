var isCaptureOn = false;
var loopAnimation = false;
var animations = [
];

var newAnimation;
var newFrameIndex;

var isAnimPlaying = false;
var animationToPlay;
var framesToPlay;
var frameIndex = 0;
var frameCounterToNextFrame = 0;

function startCapture()
{
    if ( newAnimationNameInput.value === "")
    {
        alert( "Please indicate an animation name!");
        return;
    }
    console.log( "Capture started!");
    isCaptureOn = true;
    newFrameIndex = 0;

    newAnimation = {};
    newAnimation[ "name"] = newAnimationNameInput.value;
    newAnimation[ "frames"] = [];
    newAnimation[ "frames"].push( {});
    newAnimation[ "frames"][ newFrameIndex][ "frame"] = JSON.parse( JSON.stringify( transforms));
    newFrameIndex += 1;
};

function setFrame()
{
    if ( isCaptureOn)
    {
        console.log( "saving frame!");

        newAnimation[ "frames"].push( {});
        newAnimation[ "frames"][ newFrameIndex][ "frame"] = JSON.parse( JSON.stringify( transforms));
        newAnimation[ "frames"][ newFrameIndex - 1][ "fpsCount"] = frameCounter.value;
        newFrameIndex += 1;
    }
};

function finishCapture()
{
    if ( isCaptureOn)
    {
        console.log( "finishing capture!");

        newAnimation[ "frames"].push( {});
        newAnimation[ "frames"][ newFrameIndex][ "frame"] = JSON.parse( JSON.stringify( transforms));
        newAnimation[ "frames"][ newFrameIndex - 1][ "fpsCount"] = frameCounter.value;
        animations.push( newAnimation);
        isCaptureOn = false;

        // Add to the UI select!
        animationSelector.add( new Option( newAnimation[ "name"]));
    }
};

function playAnimation()
{
    if ( animationSelector.length > 0 && !isCaptureOn)
    {
        // Redundancy here! refactor!
        let curAnimation =  animationSelector.item( animationSelector.selectedIndex).value;
        if ( curAnimation !== undefined || curAnimation !== null)
        {            
            // Set the data for the interpolation!
            animationToPlay = animations[ animationSelector.selectedIndex];
            animationToPlay = animationToPlay[ "frames"];
            loopAnimation = loopCheckbox.checked;

            // Set the current location to where the animation was recorded!
            transforms = animationToPlay[ 0][ "frame"];
            for ( let i = 0; i < numNodes; i++)
            {
                initNodes( i);
            }

            frameIndex = 0;
            frameCounterToNextFrame = 0;
            isAnimPlaying = true;
        }
    }
    else
    {
        alert( "Please select an animation first!");
    }
};

function stopAnimation()
{
    if ( isAnimPlaying)
    {
        isAnimPlaying = false;
    }
};

function animateMantis()
{
    if ( frameIndex !== animationToPlay.length - 1)
    {

        // Interpolate all models here!
        for ( let i = 0; i < transforms.length; i++)
        {
            interpolateModel( transforms[ i], animationToPlay[ frameIndex][ "frame"][ i],
                animationToPlay[ frameIndex + 1][ "frame"][ i], animationToPlay[ frameIndex]["fpsCount"]);
            initNodes( i);
        }

        frameCounterToNextFrame += 1;
        if ( frameCounterToNextFrame == animationToPlay[ frameIndex]["fpsCount"])
        {
            frameIndex += 1;
            frameCounterToNextFrame = 0;
        }
        console.log( "interpolating!!");
    }
    else
    {
        if ( loopAnimation)
        {
            frameIndex = 0;
            frameCounterToNextFrame = 0;

            // Set the current location to where the animation was recorded!
            transforms = animationToPlay[ 0][ "frame"];
            for ( let i = 0; i < numNodes; i++)
            {
                initNodes( i);
            }
        }
        else
        {
            console.log( "Ending animation!");
            // Animation has stopped, no loop option is selected, stop.
            isAnimPlaying = false;
        }
    }
};

let debugIndex = 1;
function interpolateModel( model, from, to, fpsCount)
{
    // interpolate 
    fpsCount = parseFloat( fpsCount);
    let interpolation = interpolate( from["pos"], to["pos"], fpsCount);
    model[ "pos"] = add( model[ "pos"], interpolation);

    interpolation = interpolate( from["rot"], to["rot"], fpsCount);
    model[ "rot"] = add( model[ "rot"], interpolation);

    interpolation = interpolate( from["scale"], to["scale"], fpsCount);
    model[ "scale"] = add( model[ "scale"], interpolation);
};

function interpolate( from, to, fpsCount)
{
    let difference = subtract( to, from);
    difference[ 0] = difference[ 0] / fpsCount;
    difference[ 1] = difference[ 1] / fpsCount;
    difference[ 2] = difference[ 2] / fpsCount;
    return difference;
}

// play animation logic here, interpolation etc... choosing which animation to play etc,
// loadAnimation for example sets the current index for the next aniamtion to play