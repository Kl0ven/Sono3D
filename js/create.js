function create_camera(name, params){
	// console.log("creation camera");
	// Création de la caméra
	// =====================

	camera = new BABYLON.FreeCamera(name,
									params.hasOwnProperty('position') ? new BABYLON.Vector3(params.position[0],
																							params.position[1],
																							params.position[2]) : new BABYLON.Vector3(0,1.7,0),
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



function create_ground(scene, name, params){
	let sol = BABYLON.Mesh.CreateGround(name,200.0,200.0,2.0,scene) ;
	sol.checkCollisions = true ;
	sol.material              = new BABYLON.StandardMaterial("blanc",scene) ;
	sol.material.diffuseColor  = new BABYLON.Color3(1.0,1.0,1.0) ;
	sol.metadata = {"type": 'ground'}
	return sol
}


function create_sphere(scene, name, params){
	let sph = BABYLON.Mesh.CreateSphere(name,20,params.radius,scene) ;
	sph.material              = new BABYLON.StandardMaterial("rouge",scene) ;
	sph.material.diffuseColor  = new BABYLON.Color3(1.0,1.0,1.0) ;
	let x = 0,y = 0,z = 0 ;
	if (params.hasOwnProperty("position")){
		[x,y,z] = params.position
	}
	sph.position.x = x ;
	sph.position.y = y ;
	sph.position.z = z ;
	sph.metadata = {"type": 'sphere'}
	return sph;

}


function create_tree(scene, name, params){
	let woodMaterial = new BABYLON.StandardMaterial("wood1", scene);
    let woodTexture1 = new BABYLON.WoodProceduralTexture("materiautext", 512, scene);
    woodTexture1.ampScale = 50;
    woodMaterial.diffuseTexture = woodTexture1;

    let leafMaterial = new BABYLON.StandardMaterial("leafMaterial", scene);
    leafMaterial.diffuseColor = new BABYLON.Color3(0.5, 1, 0.5);
	let tree = QuickTreeGenerator(name, params.sizebranch, params.sizetrunk, params.radius, woodMaterial, leafMaterial, scene);
	let x = 0,y = 0,z = 0 ;
	if (params.hasOwnProperty("position")){
		[x,y,z] = params.position
	}
	tree.position.x = x ;
	tree.position.y = y ;
	tree.position.z = z ;
	tree.metadata = {"type": 'tree'}
	return tree
}
