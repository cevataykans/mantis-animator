function saveJSON(filename, data) 
{
	// download file!
	const a = document.createElement('a');

	let jsonData = JSON.stringify( data, null, 4);
  	const file = new Blob([ jsonData], {type: "text/plain"});
  
  	a.href= URL.createObjectURL( file);
  	a.download = filename;
  	a.click();

	URL.revokeObjectURL(a.href);
};

function loadJSON(event)
{
	let fileReader = new FileReader();
	fileReader.onload = () =>
	{
		// parse json file

		// attach it to the animation ui and display the loaded animation set!

		console.log( "File read!");



		// programData = JSON.parse( fileReader.result);
		// convexShape.loadData( programData.shapeData);
		// bgColor = convertArrayToVec4( programData.bgColorData);
		// curveColor = convertArrayToVec4( programData.curveColorData);
		
		// // Update UI to display new data and render again
		// document.getElementById( "backgroundColorID").value = RGBtoHexColor( bgColor);
		// document.getElementById( "curveColorPickerID").value = RGBtoHexColor( curveColor);
		// let slider = document.getElementById( "kochSliderID");
		// slider.value = convexShape.iterationCount;
		// document.getElementById( "kochLabelID").innerHTML = slider.value;
		// render();
	};
	fileReader.readAsText( event.target.files[ 0]);
};