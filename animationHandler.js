var isCaptureOn = false;
var loopAnimation = false;
var animations = [

];

var newAnimation;
var newFrameIndex;

function startCapture()
{
    console.log( "Capture started!");
    isCaptureOn = true;
    newFrameIndex = 0;

    newAnimation = {};
    newAnimation[ "name"] = newAnimationNameInput.value;
    newAnimation[ "frames"] = [];
    newAnimation[ "frames"].push( {});
    //newAnimation[ "frames"][ newFrameIndex].push( {});
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
    }
};

function setAnimationToPlay( animationName, isLoop)
{
    loopAnimation = isLoop;

    // get the current animation by searching its name!
};

function playAnimation()
{

};


// play animation logic here, interpolation etc... choosing which animation to play etc,
// loadAnimation for example sets the current index for the next aniamtion to play