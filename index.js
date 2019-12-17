const soundUriBase = "./assets/sounds/"
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
var sequences = {};
var sounds = []
var shadowGenerator
const maxVolume = 1
//We start without being locked.
var isLocked = false;
window.onload = function (){
	loadJSON('./scene.json', (data) => {

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
		light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0,1,0), scene) ;
		var light2 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);

		light.intensity = 2

		scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
		scene.fogDensity = 0.02;
		scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);


		shadowGenerator = new BABYLON.ShadowGenerator(1024, light2);


		// Sky material
		var skyboxMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
		skyboxMaterial.backFaceCulling = false;
		skyboxMaterial.luminance = 0.5
		skyboxMaterial.rayleigh = 2;
		skyboxMaterial.inclination = 0.6; // The solar inclination, related to the solar azimuth in interval [0, 1]
		skyboxMaterial.azimuth = 0.75;
		// Sky mesh (box)
		var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
		skybox.material = skyboxMaterial;

		// load sound
		for (var i in data.sons){
			sound = data.sons[i];
			sounds.push(loadSound(scene, sound.nom,sound.uri, sound.volume, sound.spatial));

		}
		for (var i in data.sequenceur) {
			let s = data.sequenceur[i]
			sequences[s.nom] = new Sequenceur(s.nom, s.loop, s.sons)
		}

		camera = create_camera("camera");
		create_ground(scene, "ground");
		// load object
		for (var i in data.meshs) {
			let obj = data.meshs[i]
			let m = null;
			switch (obj.type) {
				case 'ground':
				m = create_ground(scene, obj.nom);
				break;
				case 'sphere':
				m = create_sphere(scene, obj);
				attachSound(scene, obj);
				break;
				case 'tree':
				m = create_tree(scene, obj);
				attachSound(scene, obj);
				break;
				case 'pine_tree':
				m = create_pine_tree(scene, obj);
				attachSound(scene, obj);
				break;
				default:
			}
			if (obj.hasOwnProperty("radius_nimbus")){
				if (m !== null) {
					m.metadata.radius_nimbus = obj.radius_nimbus;
				}
			}
			shadowGenerator.addShadowCaster(m, true)


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
		var ready = false
		engine.runRenderLoop(function(){
			if (!allSoundReady()) {
				return 0;
			}else if (!ready) {
				console.log("Sound Ready")
				playclassicSound()
				ready = true
			}

			let dt = engine.getDeltaTime();
			whatchObject(dt);
			updateNimbus();
			updateReticle();
			scene.render();

		}) ;
	})

	// Callback de retaillage
	window.addEventListener("resize", function (){engine.resize();});

	// Callback de click
	window.addEventListener("click", (event) =>{
		if (!isLocked) return;
		handleClick(scene,event)
	})

}
