function loadJSON (url, callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
}


function loadSound(scene, name, uri, vol, spatial){
	var son = new BABYLON.Sound(
		name,
		soundUriBase + uri,
		scene,
		function(){},
		{loop: false ,
		 autoplay: false,
		 spatialSound: spatial}) ;
		son.distanceModel = "exponential";
		son.setVolume(maxVolume)
		return son
}
