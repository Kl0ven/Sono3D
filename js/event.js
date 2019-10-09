function handleClick(scene, event) {
	var pickResult = scene.pick(event.clientX, event.clientY) ;
	if(pickResult.hit && pickResult.distance < 4){
		console.log(pickResult, pickResult.pickedMesh.name) ;
		if(pickResult.pickedMesh.id == 'trunk'){
			console.log("tronc");
		}
	}
}
