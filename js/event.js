function handleClick(scene, event) {
	var pickResult = scene.pick(window.innerWidth/2, window.innerHeight/2);
	if(pickResult.hit && pickResult.distance < 10){
		let mesh = pickResult.pickedMesh;
		playMeshSounds(getMeshSounds(mesh, 'sounds_clic'));
	}
}


function playMeshSounds(sounds){
	for (var s in sounds) {
		sounds[s].play()
	}
}

function getMeshSounds(mesh, event){
	let sounds = []
	if (mesh.metadata !== null){
		if ( mesh.metadata.hasOwnProperty(event)){
			sounds = mesh.metadata[event]
		}
	} else if (mesh.parent !== null) {
		if ( mesh.parent.metadata.hasOwnProperty(event)){
			sounds = mesh.parent.metadata[event]
		}
	}
	return sounds;
}

function whatchObject (dt) {
	var pickResult = scene.pick(window.innerWidth/2, window.innerHeight/2);
	if(pickResult.hit && pickResult.distance < 10){
		if (pickResult.pickedMesh.uniqueId == focusObject){
			timeSpendOnFocusObject += dt;
		} else {
			focusObject = pickResult.pickedMesh.uniqueId;
			timeSpendOnFocusObject = 0;
			focusSoundPlayed = false;
		}
		if (timeSpendOnFocusObject > focusTime && !focusSoundPlayed){
			playMeshSounds(getMeshSounds(pickResult.pickedMesh, 'sounds_look'));
			focusSoundPlayed = true;
		}
	}
}


function updateReticle(){
	var pickResult = scene.pick(window.innerWidth/2, window.innerHeight/2);
	if(pickResult.hit && pickResult.distance < 10){
		let mesh = pickResult.pickedMesh;
		if (getMeshSounds(mesh, 'sounds_clic').length > 0 || getMeshSounds(pickResult.pickedMesh, 'sounds_look').length > 0){
			reticle.color = "Green";
			reticle.background = "Green";
		}
		else {
			reticle.color = "red"
			reticle.background = "red";
		}
	}
	else {
		reticle.color = "red";
		reticle.background = "red";
	}
}
