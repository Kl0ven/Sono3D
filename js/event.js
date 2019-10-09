function handleClick(scene, event) {
	var pickResult = scene.pick(window.innerWidth/2, window.innerHeight/2) ;
	if(pickResult.hit && pickResult.distance < 10){
		let mesh = pickResult.pickedMesh;
		let sounds = []
		if (mesh.metadata !== null){
			if ( mesh.metadata.hasOwnProperty('sounds_clic')){
				sounds = mesh.metadata.sounds_clic
			}
		} else if (mesh.parent !== null) {
			if ( mesh.parent.metadata.hasOwnProperty('sounds_clic')){
				sounds = mesh.parent.metadata.sounds_clic
			}
		}
		for (var s in sounds) {
			sounds[s].play()
		}
	}
}
