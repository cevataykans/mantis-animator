var animationsFileNameInput;
var newAnimationFileName;
var frameCounter;
var animationSelector;
var loopCheckbox;

function setupAnimationUI()
{
    function setupInputUIVariables()
    {
        animationsFileNameInput = document.getElementById( "animationFileNameInput");
        newAnimationFileName = document.getElementById( "animationNameInput");
        frameCounter = document.getElementById( "fpsCounter");
        animationSelector = document.getElementById( "animSelector");
        loopCheckbox = document.getElementById( "loopCheckBox");
    };

    function setupSavingSystem()
    {
        let saveButton = document.getElementById( "saveAnimationsButton");
        saveButton.addEventListener( "click", (event) => {
            
            // save the aniamtions!
            //saveJSON( animationsFileNameInput.value, null);

        }, false);

        let loadButton = document.getElementById( "loadAnimationsButton");
        loadButton.addEventListener( "input",  loadJSON, false);
    };

    function setupAnimationButtons()
    {
        // get buttons and add click events!
    };

    setupInputUIVariables();
    setupSavingSystem();
    setupAnimationButtons();
};

function updateAnimationsUIAfterLoad()
{

};