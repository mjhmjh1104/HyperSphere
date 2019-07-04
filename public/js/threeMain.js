window.addEventListener('load', function () {
  var WIDTH = document.body.clientWidth, HEIGHT = document.body.clientHeight - 150;
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0xFFFFFF);
  var camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
  scene.add(camera);

  var geo = new THREE.IcosahedronGeometry(5);
  var material = new THREE.MeshLambertMaterial({ color: 0x55efc4 });
  material.transparent = true;
  material.opacity = .7;
  material.depthWrite = false;
  var mesh = new THREE.Mesh(geo, material);
  mesh.material.side = THREE.DoubleSide;
  scene.add(mesh);

  var light = new THREE.PointLight(0xFFFFFF, 1.2);
  light.position.set(50, 50, 50);
  scene.add(light);

  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  document.body.appendChild(renderer.domElement);

  WIDTH = document.body.clientWidth;
  HEIGHT = document.body.clientHeight - 150;
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
  renderer.setSize(WIDTH, HEIGHT);

  camera.position.z = 30;
  renderer.render(scene, camera);

  var raycaster = new THREE.Raycaster();

  window.addEventListener('resize', function () {
    WIDTH = document.body.clientWidth;
    HEIGHT = document.body.clientHeight - 150;
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
    renderer.setSize(WIDTH, HEIGHT);
    renderer.render(scene, camera);
  });

  requestAnimationFrame(function Rotate() {
    mesh.rotation.y += (Math.PI * .2 * ((scale - 1) * 5 + 1)) / 180;
    mesh.rotation.x += (Math.PI * .2 * ((scale - 1) * 5 + 1)) / 180;
    renderer.render(scene, camera);
    requestAnimationFrame(Rotate);
  });

  requestAnimationFrame(function MeshScale() {
    scale += (targetScale - scale) / 10;
    mesh.scale.set(scale, scale, scale);
    requestAnimationFrame(MeshScale);
  });

  window.addEventListener('mousemove', function MouseMove(e) {
    e.preventDefault();
    var mouseVector = new THREE.Vector3(2 * (e.clientX / window.innerWidth) - 1, 1 - 2 * ((e.clientY - InternalVisual) / HEIGHT), .5);
    mouseVector.unproject(camera);
    raycaster.set(camera.position, mouseVector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObject(mesh, true);
    var meshSelected = false;
    if (intersects.length > 0) {
      if (intersects[0].object == mesh) {
        meshSelected = true;
        smoothScale(intersects[0].object, 2);
      }
    }
    if (!meshSelected) smoothScale(mesh, 1);
  }, false);
});

var scale = 1, targetScale = 1;
function smoothScale(object, newScale) {
  targetScale = newScale;
}
