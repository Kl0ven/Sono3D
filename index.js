
var canvas = null ;
var engine = null ;
var scene  = null ;
var camera = null ;
var light  = null ;
var elements = []
var footstep;
var spot;
var timeSpendOnFocusObject = 0;
var focusObject;
const focusTime = 3000;
var focusSoundPlayed = false
var reticle;
//We start without being locked.
var isLocked = false;
window.onload = function (){
	loadJSON('./azure.json', (data) => {

		data = JSON.parse(data)
		// Création du moteur graphique
		// ============================
		canvas = document.getElementById("canvas") ;
		engine = new BABYLON.Engine(canvas,true) ;
		scene  = new BABYLON.Scene(engine) ;

		scene.gravity = new BABYLON.Vector3(0.0,-9.8,0.0) ;
		// ==============================================================================================
		// Création de sources lumineuses
		// ==============================================================================================
		light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0.0,1.0,0.0), scene) ;
		light.intensity = 0.5
		spot = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0, 30, 0), new BABYLON.Vector3(0, -1, 0), Math.PI / 3, 2, scene);
		spot.diffuse = new BABYLON.Color3(185/255, 246/255, 1);
		spot.specular = new BABYLON.Color3(1, 1, 1);

		// load sound
		for (var i in data.sounds){
			sound = data.sounds[i];
			loadSound(scene, sound.name,sound.uri, sound.params, elements);

		}
		// load object
		for (var i in data.objects) {
			let obj = data.objects[i]

			switch (obj.type) {
				case 'camera':
				camera = create_camera(obj.name, obj.params);
				break;
				case 'ground':
				create_ground(scene, obj.name, obj.params);
				break;
				case 'sphere':
				create_sphere(scene, obj.name, obj.params);
				attachSound(scene, obj.name, obj.attached_sound, obj.attached_sound_clic, obj.attached_sound_look);
				break;
				case 'tree':
				create_tree(scene, obj.name, obj.params);
				attachSound(scene, obj.name, obj.attached_sound, obj.attached_sound_clic, obj.attached_sound_look);
				break;
				default:
				console.log("error in switch case");
			}
		}

		var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

		reticle = new BABYLON.GUI.Ellipse();
		reticle.width = "10px"
		reticle.height = "10px";
		reticle.color = "red";
		reticle.thickness = 1;
		reticle.background = "red";
		advancedTexture.addControl(reticle);


		set_FPS_mode(scene, canvas, camera);

		engine.runRenderLoop(function(){
			let dt = engine.getDeltaTime();
			whatchObject(dt);
			updateReticle();
			scene.render();

		}) ;

		// Append glTF model to scene.
		BABYLON.SceneLoader.Append("https://www.babylonjs-playground.com/scenes/BoomBox/", "BoomBox.gltf", scene, function (scene) {
		let obj = scene.getMeshByID("BoomBox");
		obj.scaling = new BABYLON.Vector3(20,20,20);
		obj.position.y = 1;

		});
	})

	// Callback de retaillage
	window.addEventListener("resize", function (){engine.resize();});

	// Callback de click
	window.addEventListener("click", (event) =>{
		if (!isLocked) return;
		handleClick(scene,event)
	})

}
