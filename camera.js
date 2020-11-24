var camNearOrtho = -15;
var camFarOrtho = 15;
var camRadius = 1;
var camTheta  = 0.0;
var camPhi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var camLeft = -15.0;
var camRight = 15.0;
var camYTop = 15.0;
var camBottom = -15.0;

var  camFovy = 60.0;  // Field-of-view in Y direction angle (in degrees)
var  camAspect = 1.0;       // Viewport aspect ratio
var camNearPers = 0.3;
var camFarPers = 15;

var eye;
const camAt = vec3(0.0, 0.0, 0.0);
const camUp = vec3(0.0, 1.0, 0.0);

var isCameraOrtho = true;

var orthoSettings;
var perpectiveSettings;

function setupCommonCameraSettings()
{
    document.getElementById("radiusSliderID").oninput = function(event) {
        camRadius = event.target.value;
     };
     document.getElementById("thetaSlider").oninput = function(event) {
         camTheta = event.target.value * Math.PI / 180.0;
     };
     document.getElementById("phiSlider").oninput = function(event) {
         camPhi = event.target.value * Math.PI / 180.0;
     };
}

function setupOrthoCameraUI()
{
    document.getElementById("depthSlider").oninput = function(event) {
            camFarOrtho = event.target.value / 2;
            camNearOrtho = -event.target.value / 2;
    };

    document.getElementById("heightSlider").oninput = function(event) {
            camYTop = event.target.value / 2;
            camBottom = -event.target.value / 2;
    };
    document.getElementById("widthSlider").oninput = function(event) {
            camRight = event.target.value / 2;
            camLeft = -event.target.value / 2;
    };
};

function setupPrespectiveCameraSettings()
{
    document.getElementById("zFarSlider").oninput = function(event) {
        camFarPers = event.target.value;
    };
    document.getElementById("zNearSlider").oninput = function(event) {
        camNearPers = event.target.value;
    };
    document.getElementById("aspectSlider").oninput = function(event) {
            camAspect = event.target.value;
    };
    document.getElementById("fovSlider").oninput = function(event) {
            camFovy = event.target.value;
    };
};

function setupCameraSelection()
{
    orthoSettings = document.getElementsByName( "orthoSettings");
    perpectiveSettings = document.getElementsByName( "perspectiveSettings");

    let radioButtons = document.getElementsByName( "selectedCam");
    for ( let i = 0; i < radioButtons.length; i++)
    {
        radioButtons[ i].onclick = function( event)
        {
            isCameraOrtho = event.target.id === "orthoRadioButton";
            if ( isCameraOrtho)
            {
                lockCameraSettings( false, true);
            }
            else
            {
                lockCameraSettings( true, false);
            }
        }
    }
    lockCameraSettings( false, true);
}

function lockCameraSettings( setOrtho, setPerspective)
{
    for ( let j = 0; j < perpectiveSettings.length; j++)
    {
        perpectiveSettings[ j].disabled = setPerspective;
    }

    for ( let j = 0; j < orthoSettings.length; j++)
    {
        orthoSettings[ j].disabled = setOrtho;
    }
}