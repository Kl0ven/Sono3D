function set_FPS_mode(scene, canvas, camera){

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
			setTimeout(() => {
				isLocked = true;
			}, 100);

		}
	};

	// Attach events to the document
	document.addEventListener("pointerlockchange", pointerlockchange, false);
	document.addEventListener("mspointerlockchange", pointerlockchange, false);
	document.addEventListener("mozpointerlockchange", pointerlockchange, false);
	document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

}


function attachSound(scene, obj){
	let mesh = scene.getMeshByName(obj.nom);

	if (obj.nom_seq_classic !== null) {
		mesh.metadata.seq_classic = getSeqByName(obj.nom_seq_classic)
		mesh.metadata.seq_classic.play('classic')
	}

	if (obj.nom_seq_focus !== null) {
		mesh.metadata.seq_focus = getSeqByName(obj.nom_seq_focus)
	}

	if (obj.nom_seq_nimbus !== null) {
		mesh.metadata.seq_nimbus = getSeqByName(obj.nom_seq_nimbus)
	}

	if (obj.nom_seq_click !== null) {
		mesh.metadata.seq_click = getSeqByName(obj.nom_seq_click)
	}
}

function getSeqByName(name){
	return sequences[name];
}
