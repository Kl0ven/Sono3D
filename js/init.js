var canvas, engine ;

function init(){
  var canvas = document.getElementById("renderCanvas") ; 
  var engine = new BABYLON.Engine(canvas,true) ; 
  var scene  = createScene() ; 
  engine.runRenderLoop(function(){scene.render();}) ; 
  window.addEventListener('resize',function(){engine.resize();}) ; 
}
