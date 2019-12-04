function create_camera(name){
	// console.log("creation camera");
	// Création de la caméra
	// =====================

	camera = new BABYLON.FreeCamera(name,
								     new BABYLON.Vector3(0,1.7,0),
									scene) ;

	camera.checkCollisions = true ;
	camera.ellipsoid = new BABYLON.Vector3(1.0,0.7,1.0) ;
	camera.applyGravity = true ;
	camera.keysUp = [90,38];
	camera.keysDown = [40,83];
	camera.keysLeft = [81,37];
	camera.keysRight = [68,39];
	camera.attachControl(canvas) ;
	camera.inertia = 0;
	camera.angularSensibility  = 1000;


	return camera
}



function create_ground(scene, name){
	let sol = BABYLON.Mesh.CreateGround(name,200.0,200.0,2.0,scene) ;
	sol.checkCollisions = true ;
	sol.material = new BABYLON.StandardMaterial("blanc",scene) ;
	// sol.material.diffuseColor  = new BABYLON.Color3(1.0,0,0) ;
	sol.material.diffuseTexture = new BABYLON.Texture('./assets/textures/grass.png',scene);
	sol.material.specularTexture = new BABYLON.Texture('./assets/textures/grass.png',scene);
	sol.material.emissiveTexture = new BABYLON.Texture('./assets/textures/grass.png',scene);
	sol.material.ambientTexture = new BABYLON.Texture('./assets/textures/grass.png',scene);
	sol.material.diffuseTexture.uScale = 10.0;
	sol.material.diffuseTexture.vScale = 10.0;
	sol.material.specularTexture.uScale = 10.0;
	sol.material.specularTexture.vScale = 10.0;
	sol.material.emissiveTexture.uScale = 10.0;
	sol.material.emissiveTexture.vScale = 10.0;
	sol.material.ambientTexture.uScale = 10.0;
	sol.material.ambientTexture.vScale = 10.0;
	sol.metadata = {"type": 'ground'}
	return sol
}


function create_sphere(scene, obj){
	let name = obj.nom;

	let sph = BABYLON.Mesh.CreateSphere(name,20,1,scene) ;
	sph.material              = new BABYLON.StandardMaterial("rouge",scene) ;
	sph.material.diffuseColor  = new BABYLON.Color3(1.0,1.0,1.0) ;

	sph.position.x = obj.x ;
	sph.position.y = obj.y ;
	sph.position.z = obj.z ;
	sph.scaling.x = obj.scale_x
	sph.scaling.y = obj.scale_y
	sph.scaling.z = obj.scale_z
	sph.metadata = {"type": 'sphere'}
	return sph;

}


function create_tree(scene, obj){
	let name = obj.nom
	let woodMaterial = new BABYLON.StandardMaterial("wood1", scene);
    let woodTexture1 = new BABYLON.WoodProceduralTexture("materiautext", 512, scene);
    woodTexture1.ampScale = 50;
    woodMaterial.diffuseTexture = woodTexture1;

    let leafMaterial = new BABYLON.StandardMaterial("leafMaterial", scene);
    leafMaterial.diffuseColor = new BABYLON.Color3(0.5, 1, 0.5);
	leafMaterial.diffuseTexture = new BABYLON.Texture('./assets/textures/pine.jpg',scene);
	leafMaterial.diffuseTexture.uScale = 10.0;
	leafMaterial.diffuseTexture.vScale = 10.0;
	let tree = QuickTreeGenerator(name, 17, 12, 3, woodMaterial, leafMaterial, scene);

	tree.position.x = obj.x ;
	tree.position.y = obj.y ;
	tree.position.z = obj.z ;
	tree.scaling.x = obj.scale_x
	tree.scaling.y = obj.scale_y
	tree.scaling.z = obj.scale_z
	tree.metadata = {"type": 'tree'}
	return tree
}

function create_pine_tree(scene, obj){
	let name = obj.nom
	let woodMaterial = new BABYLON.StandardMaterial("wood1", scene);
    let woodTexture1 = new BABYLON.WoodProceduralTexture("materiautext", 512, scene);
    woodTexture1.ampScale = 50;
    woodMaterial.diffuseTexture = woodTexture1;

    let leafMaterial = new BABYLON.StandardMaterial("leafMaterial", scene);
    leafMaterial.diffuseColor = new BABYLON.Color3(0.5, 1, 0.5);
	leafMaterial.diffuseTexture = new BABYLON.Texture('./assets/textures/pine.jpg',scene);
	leafMaterial.diffuseTexture.uScale = 10.0;
	leafMaterial.diffuseTexture.vScale = 10.0;
	let tree = simplePineGenerator(5, 50, woodMaterial, leafMaterial, scene);
	tree.name = name;
	tree.position.x = obj.x ;
	tree.position.y = obj.y + 1 ;
	tree.position.z = obj.z ;
	tree.scaling.x = obj.scale_x
	tree.scaling.y = obj.scale_y
	tree.scaling.z = obj.scale_z
	tree.metadata = {"type": 'pine_tree'}
	return tree
}
