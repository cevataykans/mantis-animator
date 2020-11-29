This project is made by Cevat Aykan Sevinc and Talha Sen.

Students ids:

Talha Sen - 21702020
Cevat Aykan Sevinc - 21703201

HOW TO RUN:

	Enter "Executables" folder. Select index.html file. Right click this file. Choose open with option. You must choose any of your favorite web browser. This web browser must support WebGL. When the page is loaded on the browser, the application must be ready to use.

	We will introduce you to the functionalities of our application step by step:

MODEL HIERARCHY WINDOW and TRANSFORM WINDOW:

	This is the window where you can manipulate the model's transforms. We were inspired by Unity game engine's UI design for this part. Basically, if you click on a button in this window. On the right hand side, you will see that under the TRANSFORM WINDOW that the selected model part's transform values are shown here. This way, you can select a piece in this window and manipulate it on the TRANSFORM WINDOW. For example, if you select the body and make the z value of the position 5, the model would be at world coordinates (0, 0, 5). The model always spawns at (0, 0, 0).

CAMERA:

	We have added both orthographic and perspective camera settings to our project. Here is how they work:

1) CAMERA TRANSFORM

	Camera transform window is obscured. The user has to scroll down to view it completely. However, we do not think this is a problem as it is rarely used. Here, you can manually set the transform of the camera regardless of the camera type. But this is the boring way, we do not recommend it, hence this is why it is rarely used. We suggest you to use perspective camera. Here is why:

2) PERSPECTIVE CAMERA

	You will see the default CAMERA SETTINGS is set to perspective camera. As soon as the page loads, CLICK on the canvas. You will see that your mouse pointer has disappeared and whenever you rotate your mouse the world scene shakes. This is because you are in First Person mode. Here are the keys to control First Person Camera:

w: move forward of the camera's local forward direction (+z)
s: move backward of the camera's local forward direction (-z)
a: move right of the camera's local right direction (+x)
d: move left of the camera's local right direction (-x)

shift: move up of the camera's local up direction (+y)
alt: move down of the camera's local down direction (-y)

move mouse to right-left: turn the camera to the right or left.
move mouse to up-down: turn the camera to up or down (unfortunately, this movement type is buggy. The camera always rotates around the global +x vector. This means that when you are behind the model, the camera control is fine, when you are directly at the side of the model, you see that the camera rotates around the model with respect to the +x vector instead of the expected behavior and when you are directly facing the model, the up-down movement of the mouse is inverted, this is the only bug [we hopefully believe] in our project).

	When you are in perspective mode, you can change the perspective camera settings under PERSPECTIVE SETTINGS. Notice that you are not allowed to touch Orthographic settings while you are in the perspective mode. The inverse is also true.

	You may notice the HARD FOCUS feature under CAMERA SETTINGS. This only works in the perspective mode. When you toggle this, the camera will always look at the model's center, wherever you are. 

3) ORTHOGRAPHIC CAMERA

	The orthographic camera rotates around an invisible sphere, looking at the model. You can control the angles and other related settings under ORTHOGRAPHIC SETTINGS. To understand the model better and for animations, we recommend you to use perspective mode,

4) ANIMATION WINDOW

4.1) CREATING AN ANIMATION

	Firstly, you must indicate a name for the animation under ANIMATION FACTORY. Next, click "Start Capture". As soon as you click this, the application starts the listen for the incoming "Save Frame" events. Moreover, it captures the current gesture of the model. Therefore, the model will always start to animate in the states of the current transforms. 

	Manipulate the model through Model Hierarchy Window and Transform Window. When give the next gesture to the model. Click on the "Save Frame". Here is an important point. Notice the Frame Count indicating a number. The application renders at 60 FPS. Therefore, if you want your model to change the current gesture to the next gesture in 1 second, you should set the Frame Count to 60. If you want 2 seconds, it should be 120. Half a second is 30 FPS. The frame count is saved whenever you hit save frame button or finish capture button in order to interpolate by the previously saved frame. 

	Ultimately, you will set many frames and once you decide the next gesture you want to set must be the final gesture, in other words, the final frame that would end the animation, click "Finish Capture". As a result, you will observe that the animation is added to the ANIMATOR to be played and the animation can now be saved to the local device, along with other animations created.

4.2) SAVING/LOADING

	Once you create a set of animations or a single one, you can save your animations to not lose them. Under ANIMATION WINDOW, set the filename for the animations to be saved. Next, click save. If you permit your computer to download the file, the animations would be safely stored on your local device. Lastly, to load your previously created animations, simply click "Choose File" under ANIMATION WINDOW. Select the animation file downloaded from the application and accept it. You will observe that once the file is loaded, ANIMATOR would have the previously created animations ready to be played. Furthermore, any  fresh animations created will be added to this collection of animations. However, to not lose progress, you must not forget to save your progress again.

4.3) PLAYING ANIMATIONS

	Once you create an animation or load a saved animation file, you can select your animations under ANIMATOR and click play to play them. The stop button cancels the animation. Once you hit stop, you cannot resume the animation. If you toggle loop option BEFORE you play the animation, the animation will continuously repeat itself.

	We have provided a set of animations along with this submission. This set includes 5 animations. We recommend you to launch IdleFly animation without loop at first, then with loop to see the looping effect. Our favorite animation is the one called Kung Fu because this is like the signature move of a Praying Mantis. The complex animations are called "Olympics" and "Superhero-Landing". Unfortunately, we forget to translate the model in the forward direction in "Olympics". This is not a bug.

Enjoy the Mantis Simulator as much as we enjoyed developing it!
	
	