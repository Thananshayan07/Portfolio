
// Initialize Three.js for the background
function initThreeJS() {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // Create particles with a different geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
        colorArray[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    // Create a different material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 5;
    
    // Mouse movement variables
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation function
    function animate() {
        requestAnimationFrame(animate);
        
        // Animate particles with a different pattern
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.002;
        
        // Move particles based on mouse position
        particlesMesh.rotation.x += mouseY * 0.0005;
        particlesMesh.rotation.y += mouseX * 0.0005;
        
        // Update individual particles
        const positions = particlesGeometry.attributes.position.array;
        const colors = particlesGeometry.attributes.color.array;
        const time = Date.now() * 0.001;
        
        for (let i = 0; i < positions.length; i += 3) {
            // Create a wave-like motion
            positions[i] += Math.sin(time + i) * 0.003;
            positions[i + 1] += Math.cos(time + i) * 0.003;
            positions[i + 2] += Math.sin(time + i) * 0.002;
            
            // Update colors slowly
            colors[i] = 0.5 + 0.5 * Math.sin(time * 0.5 + i * 0.01);
            colors[i + 1] = 0.5 + 0.5 * Math.sin(time * 0.7 + i * 0.01);
            colors[i + 2] = 0.5 + 0.5 * Math.sin(time * 0.9 + i * 0.01);
        }
        
        particlesGeometry.attributes.position.needsUpdate = true;
        particlesGeometry.attributes.color.needsUpdate = true;
        
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();
}

// Initialize the Three.js background
initThreeJS();

// Create simple chart
function createChart() {
    const chart = document.getElementById('chart');
    const values = [120, 180, 150, 220, 170, 250, 230, 190, 210, 280, 300, 320];
    
    values.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = `${value / 4}px`;
        bar.style.left = `${index * 60 + 30}px`;
        chart.appendChild(bar);
    });
}

// Initialize chart
createChart();
