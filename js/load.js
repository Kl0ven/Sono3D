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


function loadSound(scene, name, uri, params){
	var son = new BABYLON.Sound(
		name,
		uri,
		scene,
		function(){},
		{loop:params.loop == 'true' ? true : false ,
		 autoplay:params.autoplay== 'true' ? true : false,
		 spatialSound:params.spatialSound== 'true' ? true : false}) ;
	if (params.hasOwnProperty('timeCode')){
		son.setVolume(0)
		setTimeout(() => {
			son.play();
			son.setVolume(params.volume, 3)
			console.log(son);
		},params.timeCode * 1000);
	} else {
		son.distanceModel = "exponential";
		son.setVolume(params.volume)
	}


}
