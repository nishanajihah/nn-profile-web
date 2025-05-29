<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import * as THREE from 'three';
		// Define properties with default values
	export let mainColor = '#ffde21'; // Primary yellow color
	export let accentColor1 = '#ff21de'; // Pink accent
	export let accentColor2 = '#21deff'; // Blue accent
	export let density = 50; // Particle density
	export let interactivity = 0.65; // Mouse movement sensitivity (0-1)
	export let pulsating = true; // Enable pulsating effect
	export let angled = true; // Create an angled grid effect
	export let dynamicLighting = true; // Enable dynamic lighting effects
	export let particleSize = 0.6; // Size of the grid particles

	// TypeScript declarations
	let container: HTMLDivElement;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let grid: THREE.Points;
	let waveObjects: THREE.Mesh[] = [];
	let clock: THREE.Clock;
	let animationId: number;	let mouseX = 0;
	let mouseY = 0;
	let targetMouseX = 0;
	let targetMouseY = 0;
	let windowHalfX = 0;
	let windowHalfY = 0;

	// Convert hex to THREE.Color
	const yellowColor = new THREE.Color(mainColor);
	const pinkColor = new THREE.Color(accentColor1);
	const blueColor = new THREE.Color(accentColor2);
		// Initialize window dimensions only in browser
	$: if (browser) {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
	}
	
	// Track mouse movement for interactive effects with smoothing
	function onMouseMove(event: MouseEvent) {
		if (!browser) return;
		
		// Normalized mouse coordinates (-1 to 1)
		targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
		targetMouseY = -((event.clientY / window.innerHeight) * 2 - 1);
	}
	// Debounced resize handler for better performance
	let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
		function onWindowResize() {
		if (!browser) return;
		
		// Cancel previous resize timeout
		if (resizeTimeout !== null) {
			clearTimeout(resizeTimeout);
		}
		
		// Debounce resize operations
		resizeTimeout = setTimeout(() => {
			// Check device capabilities on resize
			checkDeviceCapabilities();
			
			// Update viewport dimensions
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;
			
			// Update camera aspect
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			
			// Set renderer size
			renderer.setSize(window.innerWidth, window.innerHeight);
			
			// Adjust pixel ratio based on device
			if (isLowPowerDevice) {
				renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio));
			} else {
				renderer.setPixelRatio(window.devicePixelRatio);
			}
		}, 250); // Wait 250ms before applying resize changes
	}
	// TypeScript declarations for performance optimization
	let lastFrameTime = 0;
	const targetFramerate = 60; // Target framerate (adjust based on device capabilities)
	const frameInterval = 1000 / targetFramerate;
	let isLowPowerDevice = false;
		// Check if device is likely a low-power one based on user agent and screen
	function checkDeviceCapabilities() {
		if (!browser) return;
		
		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		const isSmallScreen = window.innerWidth < 768;
		isLowPowerDevice = isMobile || isSmallScreen;
		
		// Adjust quality based on device
		if (isLowPowerDevice && renderer) {
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
		}
	}
		// Animation loop with more complex effects and performance optimization
	function animate(currentTime = 0) {
		if (!browser) return;
		
		animationId = requestAnimationFrame(animate);
		
		// Frame rate control for better performance
		const deltaTime = currentTime - lastFrameTime;
		if (deltaTime < frameInterval && !isLowPowerDevice) {
			return; // Skip frame if we're rendering too quickly on powerful devices
		}
		lastFrameTime = currentTime;
		
		// Smooth mouse following with dampened movement
		mouseX += (targetMouseX - mouseX) * 0.05;
		mouseY += (targetMouseY - mouseY) * 0.05;
		
		const time = clock.getElapsedTime();
		
		// Animate grid
		if (grid) {
			// Gentle floating movement
			grid.rotation.x = Math.sin(time * 0.2) * 0.05;
			grid.rotation.y = Math.sin(time * 0.1) * 0.08;
			
			// Mouse interactivity with performance adaptation
			if (interactivity > 0) {
				const interactivityFactor = isLowPowerDevice ? interactivity * 0.5 : interactivity;
				grid.rotation.x += mouseY * 0.2 * interactivityFactor;
				grid.rotation.y += mouseX * 0.2 * interactivityFactor;
			}
			
			// Update any shader uniforms if using them
			const material = grid.material as THREE.ShaderMaterial;
			if (material.uniforms && material.uniforms.uTime) {
				material.uniforms.uTime.value = time;
			}
		}
		
		// Animate wave objects
		waveObjects.forEach((wave, i) => {
			// Different phase for each wave
			const phase = i * 0.2;
			wave.position.y = Math.sin(time + phase) * 2;
			
			if (pulsating) {
				// Scale pulsating
				const scale = 1 + Math.sin(time * 0.5 + phase) * 0.1;
				wave.scale.set(scale, scale, scale);
			}
			
			// Rotation based on mouse position
			if (interactivity > 0) {
				wave.rotation.x = mouseY * 0.5 * interactivity;
				wave.rotation.z = mouseX * 0.5 * interactivity;
			}
		});
		
		renderer.render(scene, camera);
	}	onMount(() => {
		// Only run Three.js in the browser
		if (!browser) return;
		
		// Initialize clock for animations
		clock = new THREE.Clock();
		
		// Check device capabilities for performance optimizations
		checkDeviceCapabilities();
		
		// Setup scene with subtle background color
		scene = new THREE.Scene();
		scene.background = new THREE.Color('#050505');
		scene.fog = new THREE.FogExp2('#050505', 0.0015);

		// Setup camera with good perspective
		camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 60;
		camera.position.y = 10;
		camera.lookAt(0, 0, 0);
		// Create renderer with adaptive quality settings
		renderer = new THREE.WebGLRenderer({
			antialias: !isLowPowerDevice, // Disable antialiasing on low-power devices
			powerPreference: isLowPowerDevice ? 'low-power' : 'high-performance',
			precision: isLowPowerDevice ? 'mediump' : 'highp'
		});
		
		// Set appropriate pixel ratio (limit for low-power devices)
		renderer.setPixelRatio(isLowPowerDevice ? Math.min(1.5, window.devicePixelRatio) : window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x000000, 0);
		
		// Use more efficient tone mapping for mobile
		renderer.toneMapping = isLowPowerDevice ? THREE.LinearToneMapping : THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1;
		
		// Add to container
		container.appendChild(renderer.domElement);
		
		// Create modern grid effect
		const gridSize = 40; // Controls grid extent
		const divisions = density; // More divisions = denser grid
		const gridStep = gridSize / divisions;
		
		const points = [];
		const colors = [];
		
		// Create grid points with angled design
		for (let i = -divisions; i <= divisions; i += 2) {
			for (let j = -divisions; j <= divisions; j += 2) {
				const x = i * gridStep;
				// Create an angled grid effect if enabled
				const y = angled ? (i * 0.25) + (Math.sin(j * 0.5) * 2) : 0;
				const z = j * gridStep;
				
				// Add some height variation
				const waveHeight = Math.sin(i * 0.5) * Math.cos(j * 0.3) * 2;
				
				points.push(x, y + waveHeight, z);
				
				// Color distribution
				let color;
				const distFromCenter = Math.abs(i) + Math.abs(j);
				const normalizedDist = Math.min(1, distFromCenter / divisions);
				
				// Main color in center, accents on edges
				if (normalizedDist < 0.4) {
					color = yellowColor;
				} else if (normalizedDist < 0.7) {
					// Mix main color with accent1
					const mixFactor = (normalizedDist - 0.4) / 0.3;
					color = yellowColor.clone().lerp(pinkColor, mixFactor);
				} else {
					// Mix accent1 with accent2 toward edges
					const mixFactor = (normalizedDist - 0.7) / 0.3;
					color = pinkColor.clone().lerp(blueColor, mixFactor);
				}
				
				// Add randomness to colors
				if (Math.random() > 0.85) {
					// Some random accent points
					color = Math.random() > 0.5 ? pinkColor : blueColor;
				}
						colors.push(color.r, color.g, color.b);
			}
		}
		
		// Create grid geometry
		const gridGeometry = new THREE.BufferGeometry();
		gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
		gridGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
				// Create shader material with pulse effect
		const gridMaterial = new THREE.PointsMaterial({
			size: particleSize,
			vertexColors: true,
			transparent: true,
			opacity: 0.8,
			sizeAttenuation: true,
			depthWrite: false,
			// Add some bloom-like effect with higher alphaTest
			alphaTest: 0.1
		});
		
		// Create the grid point cloud
		grid = new THREE.Points(gridGeometry, gridMaterial);
		scene.add(grid);
		
		// Add floating accent elements
		const addFloatingElement = (geometry: THREE.BufferGeometry, color: THREE.Color, position: [number, number, number], scale: number = 1) => {
			const material = new THREE.MeshBasicMaterial({
				color: color,
				transparent: true,
				opacity: 0.5,
				wireframe: true
			});
			
			const mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(...position);
			mesh.scale.set(scale, scale, scale);
			scene.add(mesh);
			waveObjects.push(mesh);
			
			return mesh;
		};
		
		// Add some geometric accent shapes
		if (pulsating) {
			// Yellow torus
			addFloatingElement(
				new THREE.TorusGeometry(8, 0.5, 16, 50), 
				yellowColor,
				[0, -5, 0], 
				1.5
			);
			
			// Pink icosahedron
			addFloatingElement(
				new THREE.IcosahedronGeometry(3, 0), 
				pinkColor,
				[15, 5, -10], 
				1
			);
			
			// Blue octahedron
			addFloatingElement(
				new THREE.OctahedronGeometry(2, 0), 
				blueColor,
				[-12, 8, -5], 
				1.2
			);
		}
		// Add subtle ambient light
		const ambientLight = new THREE.AmbientLight(0x333333);
		scene.add(ambientLight);
		
		// Add directional light for some depth
		const directionalLight = new THREE.DirectionalLight(yellowColor, 0.5);
		directionalLight.position.set(1, 1, 1);
		scene.add(directionalLight);
		
		// Set up event listeners
		window.addEventListener('resize', onWindowResize);
		document.addEventListener('mousemove', onMouseMove);
				// Start animation
		animate();
				// Return cleanup function
		return () => {
			// Remove event listeners
			window.removeEventListener('resize', onWindowResize);
			document.removeEventListener('mousemove', onMouseMove);
			
			// Clear any pending timeouts
			if (resizeTimeout !== null) {
				clearTimeout(resizeTimeout);
			}
			
			// Cancel animation frame
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
			
			// Clean up Three.js resources
			if (grid) {
				scene.remove(grid);
				grid.geometry.dispose();
				(grid.material as THREE.Material).dispose();
			}
			
			// Clean up wave objects
			waveObjects.forEach(wave => {
				scene.remove(wave);
				wave.geometry.dispose();
				(wave.material as THREE.Material).dispose();
			});
			
			// Clean up renderer
			renderer.dispose();
			if (renderer.domElement && renderer.domElement.parentNode) {
				container.removeChild(renderer.domElement);
			}
		};
	});
</script>

<div bind:this={container} class="absolute top-0 left-0 z-0 h-full w-full">
	<!-- Three.js will render into this container -->
</div>

<style>
	div {
		overflow: hidden;
		pointer-events: none; /* Let mouse events pass through to elements below */
	}
</style>
