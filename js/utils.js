function set_FPS_mode(scene, canvas, camera){
	//We start without being locked.
	var isLocked = false;

	// On click event, request pointer lock
	scene.onPointerDown = function (evt) {

		//true/false check if we're locked, faster than checking pointerlock on each single click.
		if (!isLocked) {
			canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock || false;
			if (canvas.requestPointerLock) {
				canvas.requestPointerLock();
			}
		}

		//continue with shooting requests or whatever :P
		//evt === 0 (left mouse click)
		//evt === 1 (mouse wheel click (not scrolling))
		//evt === 2 (right mouse click)
	};

	// Event listener when the pointerlock is updated (or removed by pressing ESC for example).
	var pointerlockchange = function () {
		var controlEnabled = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || false;

		// If the user is already locked
		if (!controlEnabled) {
			camera.detachControl(canvas);
			isLocked = false;
		} else {
			camera.attachControl(canvas);
			isLocked = true;
		}
	};

	// Attach events to the document
	document.addEventListener("pointerlockchange", pointerlockchange, false);
	document.addEventListener("mspointerlockchange", pointerlockchange, false);
	document.addEventListener("mozpointerlockchange", pointerlockchange, false);
	document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

}


function attachSound(scene, objName, sounds, sounds_clic, sounds_look){
	let mesh = scene.getMeshByName(objName);
	for (var i in sounds) {
		let son = scene.getSoundByName(sounds[i]);
		son.attachToMesh(mesh);
	}

	mesh.metadata.sounds_clic = []
	for (var i in sounds_clic){
		let son = scene.getSoundByName(sounds_clic[i]);
		mesh.metadata.sounds_clic.push(son)
	}

	mesh.metadata.sounds_look = []
	for (var i in sounds_look){
		let son = scene.getSoundByName(sounds_look[i]);
		mesh.metadata.sounds_look.push(son)
	}
}
