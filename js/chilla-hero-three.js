// Three.js Animated Hero for Chilla
// Organic Morphing Shapes - "Chill" Financial Intelligence Visualization

let scene, camera, renderer;
let morphingShape;
let particleSystem;
let wireframeShape;
let ambientParticles;
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;
let morphProgress = 0;
let currentShapeIndex = 0;

// Define shapes that represent financial concepts
const shapes = [
  { name: 'sphere', segments: 32 },      // Unity, wholeness, completeness
  { name: 'torus', segments: 32 },       // Flow, circulation, markets
  { name: 'octahedron', detail: 2 },     // Precision, clarity, decisions
  { name: 'icosahedron', detail: 1 }     // Complexity, intelligence, analysis
];

function initThreeJS() {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;

  // Remove old background elements
  const oldBackground = heroSection.querySelector('.hero-background');
  if (oldBackground) {
    const ambientGrid = oldBackground.querySelector('.ambient-grid');
    const flowingLines = oldBackground.querySelector('.flowing-lines');
    if (ambientGrid) ambientGrid.remove();
    if (flowingLines) flowingLines.remove();
  }

  // Create scene with subtle fog
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 40, 100);

  // Create camera
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 30);

  // Create renderer with smooth antialiasing
  renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Insert canvas
  const heroBackground = heroSection.querySelector('.hero-background') || heroSection;
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.zIndex = '1';
  
  if (heroBackground.classList && heroBackground.classList.contains('hero-background')) {
    heroBackground.style.opacity = '1';
    heroBackground.appendChild(renderer.domElement);
  } else {
    const bgDiv = document.createElement('div');
    bgDiv.className = 'hero-background';
    bgDiv.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 1;';
    bgDiv.appendChild(renderer.domElement);
    heroSection.insertBefore(bgDiv, heroSection.firstChild);
  }

  // Build the morphing visualization
  createMorphingShape();
  createWireframeOverlay();
  createParticleSystem();
  createAmbientParticles();

  // Sophisticated lighting for depth and mood
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0x4a9eff, 1.0);
  keyLight.position.set(10, 10, 20);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x88ddff, 0.6);
  fillLight.position.set(-10, -5, 15);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0x6b8cff, 0.8, 50);
  rimLight.position.set(0, 0, -10);
  scene.add(rimLight);

  // Event listeners
  document.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('resize', onWindowResize, false);

  animate();
}

// Create the main morphing shape
function createMorphingShape() {
  // Start with an icosahedron
  const geometry = new THREE.IcosahedronGeometry(6, 2);
  
  // Store original positions for morphing
  geometry.userData.originalPositions = geometry.attributes.position.array.slice();
  
  const material = new THREE.MeshPhongMaterial({
    color: 0x4a9eff,
    emissive: 0x2a5ebb,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.9,
    flatShading: false,
    shininess: 100,
    specular: 0x88ddff
  });
  
  morphingShape = new THREE.Mesh(geometry, material);
  scene.add(morphingShape);
  
  // Prepare morph targets
  prepareMorphTargets(geometry);
}

// Prepare different shape configurations for morphing
function prepareMorphTargets(geometry) {
  const positions = geometry.attributes.position.array;
  const vertexCount = positions.length / 3;
  
  // Store different shape configurations
  geometry.userData.spherePositions = new Float32Array(positions.length);
  geometry.userData.torusPositions = new Float32Array(positions.length);
  geometry.userData.octaPositions = new Float32Array(positions.length);
  geometry.userData.crystalPositions = new Float32Array(positions.length);
  
  // Generate sphere positions
  for (let i = 0; i < vertexCount; i++) {
    const i3 = i * 3;
    const x = positions[i3];
    const y = positions[i3 + 1];
    const z = positions[i3 + 2];
    
    const length = Math.sqrt(x * x + y * y + z * z);
    const radius = 6;
    
    geometry.userData.spherePositions[i3] = (x / length) * radius;
    geometry.userData.spherePositions[i3 + 1] = (y / length) * radius;
    geometry.userData.spherePositions[i3 + 2] = (z / length) * radius;
  }
  
  // Generate torus positions
  for (let i = 0; i < vertexCount; i++) {
    const i3 = i * 3;
    const x = positions[i3];
    const y = positions[i3 + 1];
    const z = positions[i3 + 2];
    
    const angle = Math.atan2(z, x);
    const distFromCenter = Math.sqrt(x * x + z * z);
    const majorRadius = 5;
    const minorRadius = 2.5;
    
    const newDistFromCenter = majorRadius + Math.cos(angle * 3) * minorRadius;
    
    geometry.userData.torusPositions[i3] = Math.cos(angle) * newDistFromCenter;
    geometry.userData.torusPositions[i3 + 1] = y * 0.6 + Math.sin(angle * 3) * minorRadius;
    geometry.userData.torusPositions[i3 + 2] = Math.sin(angle) * newDistFromCenter;
  }
  
  // Generate octahedron positions
  for (let i = 0; i < vertexCount; i++) {
    const i3 = i * 3;
    const x = positions[i3];
    const y = positions[i3 + 1];
    const z = positions[i3 + 2];
    
    const scale = 6;
    geometry.userData.octaPositions[i3] = Math.sign(x) * Math.pow(Math.abs(x), 0.6) * scale / 4;
    geometry.userData.octaPositions[i3 + 1] = Math.sign(y) * Math.pow(Math.abs(y), 0.6) * scale / 4;
    geometry.userData.octaPositions[i3 + 2] = Math.sign(z) * Math.pow(Math.abs(z), 0.6) * scale / 4;
  }
  
  // Generate crystal/sharp positions
  for (let i = 0; i < vertexCount; i++) {
    const i3 = i * 3;
    const x = positions[i3];
    const y = positions[i3 + 1];
    const z = positions[i3 + 2];
    
    const length = Math.sqrt(x * x + y * y + z * z);
    const spikeFactor = 1 + Math.abs(Math.sin(i * 0.5)) * 0.8;
    
    geometry.userData.crystalPositions[i3] = (x / length) * 6 * spikeFactor;
    geometry.userData.crystalPositions[i3 + 1] = (y / length) * 6 * spikeFactor;
    geometry.userData.crystalPositions[i3 + 2] = (z / length) * 6 * spikeFactor;
  }
}

// Create wireframe overlay for technical aesthetic
function createWireframeOverlay() {
  const geometry = new THREE.IcosahedronGeometry(6.1, 2);
  const material = new THREE.MeshBasicMaterial({
    color: 0x88ddff,
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  
  wireframeShape = new THREE.Mesh(geometry, material);
  scene.add(wireframeShape);
}

// Create flowing particle system around the shape
function createParticleSystem() {
  const particleCount = 150;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const radius = 8 + Math.random() * 6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);
    
    velocities.push({
      theta: theta,
      phi: phi,
      radius: radius,
      speed: 0.002 + Math.random() * 0.003
    });
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const material = new THREE.PointsMaterial({
    color: 0x88ddff,
    size: 0.12,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending
  });
  
  particleSystem = new THREE.Points(geometry, material);
  particleSystem.userData.velocities = velocities;
  scene.add(particleSystem);
}

// Create ambient background particles
function createAmbientParticles() {
  const particleCount = 200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 60;
    positions[i3 + 1] = (Math.random() - 0.5) * 60;
    positions[i3 + 2] = (Math.random() - 0.5) * 60;
    
    sizes[i] = Math.random() * 0.5 + 0.1;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  
  const material = new THREE.PointsMaterial({
    color: 0x4a9eff,
    size: 0.08,
    transparent: true,
    opacity: 0.3,
    sizeAttenuation: true
  });
  
  ambientParticles = new THREE.Points(geometry, material);
  scene.add(ambientParticles);
}

function onMouseMove(event) {
  targetMouseX = (event.clientX / window.innerWidth - 0.5);
  targetMouseY = (event.clientY / window.innerHeight - 0.5);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  
  const time = Date.now() * 0.001;
  
  // Smooth camera parallax following mouse
  mouseX += (targetMouseX - mouseX) * 0.03;
  mouseY += (targetMouseY - mouseY) * 0.03;
  
  camera.position.x = mouseX * 5;
  camera.position.y = -mouseY * 4;
  camera.lookAt(0, 0, 0);
  
  // Morph between shapes
  if (morphingShape) {
    const geometry = morphingShape.geometry;
    const positions = geometry.attributes.position.array;
    
    // Update morph progress
    morphProgress += 0.002;
    
    // Determine current and next shape
    const shapeDuration = 4; // seconds per shape
    const totalShapes = 4;
    const currentTime = morphProgress % (shapeDuration * totalShapes);
    const shapeIndex = Math.floor(currentTime / shapeDuration);
    const nextShapeIndex = (shapeIndex + 1) % totalShapes;
    const morphT = (currentTime % shapeDuration) / shapeDuration;
    
    // Smooth easing
    const eased = morphT < 0.5 
      ? 2 * morphT * morphT 
      : 1 - Math.pow(-2 * morphT + 2, 2) / 2;
    
    // Get source and target positions
    const shapeNames = ['spherePositions', 'torusPositions', 'octaPositions', 'crystalPositions'];
    const sourcePositions = geometry.userData[shapeNames[shapeIndex]];
    const targetPositions = geometry.userData[shapeNames[nextShapeIndex]];
    
    // Interpolate positions
    for (let i = 0; i < positions.length; i++) {
      positions[i] = sourcePositions[i] + (targetPositions[i] - sourcePositions[i]) * eased;
    }
    
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    
    // Smooth rotation
    morphingShape.rotation.x = time * 0.1;
    morphingShape.rotation.y = time * 0.15;
    morphingShape.rotation.z = time * 0.05;
    
    // Subtle color pulse
    const hue = (time * 0.05) % 1;
    const brightness = 0.3 + Math.sin(time * 0.8) * 0.1;
    morphingShape.material.emissiveIntensity = brightness;
  }
  
  // Sync wireframe with main shape
  if (wireframeShape && morphingShape) {
    wireframeShape.rotation.copy(morphingShape.rotation);
    
    // Copy positions with slight scale
    const mainGeo = morphingShape.geometry;
    const wireGeo = wireframeShape.geometry;
    const mainPos = mainGeo.attributes.position.array;
    const wirePos = wireGeo.attributes.position.array;
    
    for (let i = 0; i < wirePos.length; i += 3) {
      wirePos[i] = mainPos[i] * 1.02;
      wirePos[i + 1] = mainPos[i + 1] * 1.02;
      wirePos[i + 2] = mainPos[i + 2] * 1.02;
    }
    
    wireGeo.attributes.position.needsUpdate = true;
  }
  
  // Animate particle system - orbital motion
  if (particleSystem) {
    const positions = particleSystem.geometry.attributes.position.array;
    const velocities = particleSystem.userData.velocities;
    
    for (let i = 0; i < velocities.length; i++) {
      const vel = velocities[i];
      const i3 = i * 3;
      
      // Update orbital angle
      vel.theta += vel.speed;
      
      // Calculate new position
      positions[i3] = vel.radius * Math.sin(vel.phi) * Math.cos(vel.theta);
      positions[i3 + 1] = vel.radius * Math.sin(vel.phi) * Math.sin(vel.theta);
      positions[i3 + 2] = vel.radius * Math.cos(vel.phi) + Math.sin(time + i) * 0.5;
    }
    
    particleSystem.geometry.attributes.position.needsUpdate = true;
    
    // Subtle rotation
    particleSystem.rotation.y = time * 0.05;
  }
  
  // Animate ambient particles - gentle floating
  if (ambientParticles) {
    const positions = ambientParticles.geometry.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
      // Gentle drift
      positions[i] += Math.sin(time * 0.3 + i) * 0.01;
      positions[i + 1] += Math.cos(time * 0.2 + i) * 0.01;
      
      // Wrap around
      if (Math.abs(positions[i]) > 30) positions[i] *= -0.9;
      if (Math.abs(positions[i + 1]) > 30) positions[i + 1] *= -0.9;
      if (Math.abs(positions[i + 2]) > 30) positions[i + 2] *= -0.9;
    }
    
    ambientParticles.geometry.attributes.position.needsUpdate = true;
    ambientParticles.rotation.y = time * 0.02;
  }
  
  renderer.render(scene, camera);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThreeJS);
} else {
  initThreeJS();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (renderer) {
    renderer.dispose();
  }
  
  if (morphingShape) {
    morphingShape.geometry.dispose();
    morphingShape.material.dispose();
  }
  
  if (wireframeShape) {
    wireframeShape.geometry.dispose();
    wireframeShape.material.dispose();
  }
  
  if (particleSystem) {
    particleSystem.geometry.dispose();
    particleSystem.material.dispose();
  }
  
  if (ambientParticles) {
    ambientParticles.geometry.dispose();
    ambientParticles.material.dispose();
  }
});
