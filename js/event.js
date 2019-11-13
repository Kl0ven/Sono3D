function handleClick(scene, event) {
	var pickResult = scene.pick(window.innerWidth/2, window.innerHeight/2);
	if(pickResult.hit && pickResult.distance < 10){
		let mesh = pickResult.pickedMesh;
		playSeq(mesh, 'seq_click');
	}
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
			playSeq(pickResult.pickedMesh, 'seq_focus');
			focusSoundPlayed = true;
		}
	}
}


function updateReticle(){
	var pickResult = scene.pick(window.innerWidth/2, window.innerHeight/2);
	if(pickResult.hit && pickResult.distance < 10){
		let mesh = pickResult.pickedMesh;
		if (mesh.metadata !== null && (mesh.metadata.seq_click !== undefined || mesh.metadata.seq_focus !== undefined)){
			reticle.color = "Green";
			reticle.background = "Green";
		}else if (mesh.parent !== null && mesh.parent.metadata !== null && (mesh.parent.metadata.seq_click !== undefined || mesh.parent.metadata.seq_focus !== undefined)) {
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

function updateNimbus() {
	let camPos = new BABYLON.Vector3();
	camPos = camera.globalPosition;
	let nearestObjects = scene.meshes
	let obj;
	let direction;
	let objectPosition;
	var ray;
	for (var i in nearestObjects) {
		obj = nearestObjects[i];
		objectPosition = obj.getAbsolutePosition().clone()
		if (obj.metadata !== null && obj.metadata.hasOwnProperty('radius_nimbus') && BABYLON.Vector3.Distance(camPos, objectPosition) < obj.metadata.radius_nimbus){
			playSeq(obj, "seq_nimbus");
		}
	}
}


function playSeq(mesh, type) {
	if(mesh.metadata !== null && mesh.metadata.hasOwnProperty(type) && !mesh.metadata[type].isPlaying()){
		mesh.metadata[type].play()
	}else if (mesh.parent !== null && mesh.parent.metadata !== null && mesh.parent.metadata.hasOwnProperty(type) && !mesh.parent.metadata[type].isPlaying()) {
		mesh.parent.metadata[type].play()
	}
}
