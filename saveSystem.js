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
		loadedAnimations = JSON.parse( fileReader.result);

		// // Update UI to display new data and render again
		updateAnimationsUIAfterLoad( loadedAnimations);
	};
	fileReader.readAsText( event.target.files[ 0]);
};