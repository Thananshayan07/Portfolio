
                                                                                                                                                                                                                                                                                                                                                                                            
        document.addEventListener('DOMContentLoaded', function() {
            // Preloader
            const preloader = document.querySelector('.preloader');
            window.addEventListener('load', function() {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            });

            // Navigation
            const menuBtn = document.querySelector('.menu-btn');
            const navLinks = document.querySelector('.nav-links');
            const navbar = document.querySelector('.navbar');
            
            menuBtn.addEventListener('click', function() {
                menuBtn.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    navbar.classList.add('sticky');
                } else {
                    navbar.classList.remove('sticky');
                }
                
                // Active section indicator
                const sections = document.querySelectorAll('section');
                const navItems = document.querySelectorAll('.nav-links a');
                
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (pageYOffset >= sectionTop - 300) {
                        current = section.getAttribute('id');
                    }
                });
                
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + current) {
                        item.classList.add('active');
                    }
                });
            });
            
            // Close mobile menu when clicking a link
            const navItems = document.querySelectorAll('.nav-links a');
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    if (navLinks.classList.contains('active')) {
                        menuBtn.classList.remove('active');
                        navLinks.classList.remove('active');
                    }
                });
            });

            // Typing Animation
            const typed = new Typed('.typing', {
                strings: ['ICT student', 'Front-End Web Developer', 'UI UX Designer', 'Graphic Designer'],
                typeSpeed: 100,
                backSpeed: 100,
                loop: true
            });

            // Project Filter
            const filterBtns = document.querySelectorAll('.filter-btn');
            const projectBoxes = document.querySelectorAll('.project-box');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterBtns.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    
                    projectBoxes.forEach(box => {
                        if (filter === 'all' || box.getAttribute('data-category') === filter) {
                            box.style.display = 'block';
                        } else {
                            box.style.display = 'none';
                        }
                    });
                });
            });

            // Skills Animation
            const skillBars = document.querySelectorAll('.bar span');
            window.addEventListener('scroll', function() {
                if (window.scrollY > document.querySelector('#skills').offsetTop - 400) {
                    skillBars.forEach(bar => {
                        const width = bar.parentElement.querySelector('h3 span').textContent;
                        bar.style.width = width;
                        bar.style.opacity = 1;
                    });
                }
            });

            // Form Submission
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Message sent successfully!');
                    this.reset();
                });
            }

            // GSAP Animations with ScrollTrigger
            initAnimations();
        });

        function initThreeJS() {
            // Check if Three.js is loaded
            if (typeof THREE === 'undefined') {
                console.error('Three.js is not loaded');
                return;
            }

            const container = document.getElementById('canvas-container');
            if (!container) return;

            // Scene
            const scene = new THREE.Scene();

            // Camera
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 5;

            // Renderer
            const renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);

            // Create particles with geometry and material
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 3000;
            
            const posArray = new Float32Array(particlesCount * 3);
            const colorArray = new Float32Array(particlesCount * 3);
            
            for (let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 10;
                colorArray[i] = Math.random();
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

            // Create particle material
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.03,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                sizeAttenuation: true
            });

            // Create the particle system
            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);

            // Add ambient light
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            // Add point light
            const pointLight = new THREE.PointLight(0x6c63ff, 1, 100);
            pointLight.position.set(5, 5, 5);
            scene.add(pointLight);

            // Mouse movement effect
            let mouseX = 0;
            let mouseY = 0;
            document.addEventListener('mousemove', (event) => {
                mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            });

            // Animation
            function animate() {
                requestAnimationFrame(animate);
                
                // Rotate particles
                particlesMesh.rotation.x += 0.0005;
                particlesMesh.rotation.y += 0.0005;
                
                // Move particles based on mouse position
                const positions = particlesMesh.geometry.attributes.position.array;
                for (let i = 0; i < particlesCount; i++) {
                    const i3 = i * 3;
                    
                    // Create wave-like movement
                    positions[i3] += Math.sin(Date.now() * 0.001 + i) * 0.0005;
                    positions[i3 + 1] += Math.cos(Date.now() * 0.001 + i) * 0.0005;
                    
                    // Add mouse interaction
                    positions[i3] += mouseX * 0.01;
                    positions[i3 + 1] += mouseY * 0.01;
                }
                particlesMesh.geometry.attributes.position.needsUpdate = true;
                
                renderer.render(scene, camera);
            }
            animate();

            // Resize handler
            window.addEventListener('resize', function() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }

        function initAnimations() {
            // Check if GSAP is loaded
            if (typeof gsap === 'undefined') {
                console.error('GSAP is not loaded');
                return;
            }

            // Initialize ScrollTrigger
            gsap.registerPlugin(ScrollTrigger);

            // Section animations
            gsap.utils.toArray('section').forEach(section => {
                gsap.fromTo(section, 
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                            onEnter: () => section.classList.add('active')
                        }
                    }
                );
            });

            // Animate each section's elements
            // About section
            gsap.from('.image-box', {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '#about',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            // Education section
            gsap.utils.toArray('.education-content').forEach((item, i) => {
                gsap.fromTo(item, 
                    { x: -20, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: i * 0.2,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                            onEnter: () => item.classList.add('active')
                        }
                    }
                );
            });

            // Projects section
            gsap.utils.toArray('.project-box').forEach((project, i) => {
                gsap.fromTo(project, 
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: i * 0.1,
                        scrollTrigger: {
                            trigger: project,
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                            onEnter: () => project.classList.add('active')
                        }
                    }
                );
            });

            // Skills section
            gsap.utils.toArray('.icon-box').forEach((icon, i) => {
                gsap.fromTo(icon, 
                    { y: 20, opacity: 0, rotationZ: -10 },
                    {
                        y: 0,
                        opacity: 1,
                        rotationZ: 0,
                        duration: 0.5,
                        delay: i * 0.1,
                        scrollTrigger: {
                            trigger: icon,
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                            onEnter: () => icon.classList.add('active')
                        }
                    }
                );
            });

            // Contact section
            gsap.utils.toArray('.info-box').forEach((box, i) => {
                gsap.fromTo(box, 
                    { x: -20, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: i * 0.2,
                        scrollTrigger: {
                            trigger: box,
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                            onEnter: () => box.classList.add('active')
                        }
                    }
                );
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            // Preloader
            const preloader = document.querySelector('.preloader');
            window.addEventListener('load', function() {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            });

            // Navigation
            const menuBtn = document.querySelector('.menu-btn');
            const navLinks = document.querySelector('.nav-links');
            const navbar = document.querySelector('.navbar');
            
            menuBtn.addEventListener('click', function() {
                menuBtn.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    navbar.classList.add('sticky');
                } else {
                    navbar.classList.remove('sticky');
                }
                
                // Active section indicator
                const sections = document.querySelectorAll('section');
                const navItems = document.querySelectorAll('.nav-links a');
                
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (pageYOffset >= sectionTop - 300) {
                        current = section.getAttribute('id');
                    }
                });
                
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + current) {
                        item.classList.add('active');
                    }
                });
            });
            
            // Close mobile menu when clicking a link
            const navItems = document.querySelectorAll('.nav-links a');
            navItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    // Prevent default jump behavior
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        // Close mobile menu if open
                        if (navLinks.classList.contains('active')) {
                            menuBtn.classList.remove('active');
                            navLinks.classList.remove('active');
                        }
                        
                        // Calculate position with navbar height
                        const navbarHeight = navbar.offsetHeight;
                        const targetPosition = targetSection.offsetTop - navbarHeight;
                        
                        // Smooth scroll to section
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // ... (rest of the JavaScript remains the same) ...
        });
    