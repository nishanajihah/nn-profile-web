<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import * as THREE from 'three';
	
	// Define properties with updated colors for futuristic blue/yellow/white scheme
	export let mainColor = '#0066ff'; // Primary blue color
	export let accentColor1 = '#ffde21'; // Yellow accent
	export let accentColor2 = '#ffffff'; // White accent
	export let density = 60; // Increased particle density
	export let interactivity = 0.65; // Mouse movement sensitivity (0-1)
	export let pulsating = true; // Enable pulsating effect
	export let angled = true; // Create an angled grid effect
	export let dynamicLighting = true; // Enable dynamic lighting effects
	export let particleSize = 0.5; // Size of the grid particles

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
	// Convert hex to THREE.Color - new color scheme (blue/yellow/white)
	const blueColor = new THREE.Color(mainColor);
	const yellowColor = new THREE.Color(accentColor1);
	const whiteColor = new THREE.Color(accentColor2);
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
		scene = new THREE.Scene();		scene.background = new THREE.Color('#030518'); // Darker blue-black for more futuristic feel
		scene.fog = new THREE.FogExp2('#030518', 0.0018); // Slightly denser fog for depth
		// Setup camera with wider perspective for better immersion
		camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 55;
		camera.position.y = 8;
		camera.position.x = 5; // Slightly offset for more dynamic view
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
		
	// Create grid points with angled design - avoiding central area
		for (let i = -divisions; i <= divisions; i += 2) {
			for (let j = -divisions; j <= divisions; j += 2) {
				const x = i * gridStep;
				// Create an angled grid effect if enabled
				const y = angled ? (i * 0.25) + (Math.sin(j * 0.5) * 2) : 0;
				const z = j * gridStep;
				
				// Calculate distance from center
				const distFromCenter = Math.sqrt(x * x + z * z);
				
				// Skip points in the center area to avoid interfering with content
				if (distFromCenter < gridSize * 0.3) {
					continue;
				}
				
				// Add more pronounced height variation for futuristic feel
				const waveHeight = Math.sin(i * 0.5) * Math.cos(j * 0.3) * 3;
				
				points.push(x, y + waveHeight, z);
				
				// Updated color distribution for blue/yellow/white scheme
				let color;
				const normalizedDist = Math.min(1, distFromCenter / (gridSize * 0.8));
				
				// Distribute colors based on distance with updated scheme
				if (normalizedDist < 0.4) {
					color = blueColor; // Blue further from center
				} else if (normalizedDist < 0.7) {
					// Mix blue with yellow
					const mixFactor = (normalizedDist - 0.4) / 0.3;
					color = blueColor.clone().lerp(yellowColor, mixFactor);
				} else {
					// Mix yellow with white toward edges
					const mixFactor = (normalizedDist - 0.7) / 0.3;
					color = yellowColor.clone().lerp(new THREE.Color(accentColor2), mixFactor);
				}
				
				// Add randomness to colors
				if (Math.random() > 0.85) {
					// Some random accent points
					color = Math.random() > 0.5 ? yellowColor : new THREE.Color(accentColor2);
				}
						colors.push(color.r, color.g, color.b);
			}
		}
		
		// Create grid geometry
		const gridGeometry = new THREE.BufferGeometry();
		gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
		gridGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
				// Create enhanced material for grid points with better glow effect
		const gridMaterial = new THREE.PointsMaterial({
			size: particleSize,
			vertexColors: true,
			transparent: true,
			opacity: 0.9,
			sizeAttenuation: true,
			depthWrite: false,
			// Enhanced bloom-like effect
			alphaTest: 0.05
		});
		
		// If browser supports it, add a better point appearance
		if (browser) {
			try {
				const textureLoader = new THREE.TextureLoader();
				const texture = textureLoader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTEyLTE5VDE2OjU1OjA3LTA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0xMi0xOVQxNjo1ODozMi0wODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0xMi0xOVQxNjo1ODozMi0wODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmZDhlOTY1NS0zZWY4LTRhNDgtOTIzYy1kYjI0NTU2NjNkYTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ZmQ4ZTk2NTUtM2VmOC00YTQ4LTkyM2MtZGIyNDU1NjYzZGEwIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZmQ4ZTk2NTUtM2VmOC00YTQ4LTkyM2MtZGIyNDU1NjYzZGEwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmZDhlOTY1NS0zZWY4LTRhNDgtOTIzYy1kYjI0NTU2NjNkYTAiIHN0RXZ0OndoZW49IjIwMTgtMTItMTlUMTY6NTU6MDctMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5vxTlIAAAIL0lEQVRYw5WXe4xU1R3HP+fc1977mJ3ZWZaFZXnJUpAGLKVSGy2iLaKIUuuzGtFGo1Vbrf/YNJU0qbGJtWltGrWJtZrYpNpoGyGISCptw6NAgQuB5bEssAvL7uzsY2bu3Hvv6R8zd5iZHRDak5zMvXPP/X1/v9/3e84RHMcBoIG2Y6f3A+8DTgCH/ncXgSWf2+QAXuqDI8DO0z2vcuDh3UrKOw0hdilNOIqiRbzku4IQpKvKE+//tKHlYO7bSogdCrQh8C1N3dDckoJdWQTaWvtQim6l1E5LZ55QjlrpBzpG2Ryt8SlHiM1K83vgeeDZxY03fQE4sRBBAcCB/T+rNqXcZBjaLkWKvcBHgf1nF/WcChgDXgVeAN5WSm33leouapx2ItEeTEOcVocG9wOPLmycfjEg5jVQnWzYIIS8T2k5F3ZvEMshdv8bYBjQBoSA80qpF33lPGaZmR/MiN7Qm/fxlTrvJ31RCPE9KNBAKXU9sE9KeT2AaUBNaQulNMMwUVKdMwGLgD8A15umwbonbuG6tRKlei6KqFbeCu7/1uZbEYRCQtROZBJr+4Z6aW9vpz87gB3yUIEDF7Dl4DVgr1JqpxDiFaXUp7JZj0c3j/DMDxcsgMCmmmAvl1y9luXz0nQ+8yp7ijOVCKWxu7s7shzXZcbMmXR1dtLa0kIqHsfQDPKFPAJxLgqcBrYopZ4ErgG+MRaLsH1HAze+/9B8RV+397MYepgLVywndvESDnaf5anffEAsGoVmkC0VOHLkCJnz5lFeXs7cmTPo7+9nbGyMSCRCIpFgzmUFlBLFFXgCJeVLQsjHBLoIdB44BNRoGqxc2MDDjx9j5fIu0jVNuG4Gw7AwDD1YQp2BoSEaGxu5YsUKtm/fzsDp01RWVyOEIB6Pc+3GtTQ0NHDo8CH6+geKK3D1vHnzt8+a8d7goZ7uP8RiZfTPnuMrMzOZTC6Clk4TCYdxXA8xgR9JVVQQiURoaWlhb3Mziqsuimia5q5oNLo+mUj0j46N9ZQm7H8rcMOHd/YsW7Jo8/vuuuvWF7ds+UVnb++3yzKZTW+9tY/GxYspLy9n6dKl9PT0kM/nS6ptamoqrNZYScnAJS389HCKbbuqSrJiLC+xbbtQlKLruViWhWVZhEIhlFKYpolSioJTQNd1zGAjztrrkzIkCkqm12VrTot0NHLHpk13VA9+4P5Prb399p1l6fQ9sUjkpx3Hjz84PDx86OFHHokdO3Zs04oVK/YDeJ6HZVmks1GefC7HwGCEv+yoZu/+BCNjFkIIdA1sGzrO6uzYF+e1nWm6uh1WXV5g6UUjrL/qIO9ZphEKh0NKqXdMTQjdMDRluqZpZsobTAMZj8cjixYtmtHW3l44efLkO729vftc133JcZy8COD5SvGzJwt0D2jYYci6FpYlsUxJPOZz40qXjSsynO/VUErwxGaX3QcjNDVKVq8ssG5ljnhMoQGGnOQHEBZCTL9d1zn3CjQ1NakHH3zQSyQSf4pGow/H4/FzN5UQ/PkVjePnRQlORLggh4hLopECK5fm+eimLO9fbZNOekjxTrR/vzSNXY12YH8ByUxdFJeueAWUUq5lWZ1lZWXHimp9F69s1zhxWhQJKaUQsYB4xGfDKpfbPjDG6itcQpac4O3r04KfP5ngwGGDmioV8DDlCkxnBTzPcxzH+Vc8Hj+vlJp0FTPDBh0npxKaWGqPe1bZ3HNbhiWLXHTdRSnB0Kjgka05ntoaIetolIV9TEN9QchpmgDBGwO4gH+u3aBpmoQsC8dxihhCE1M9A9D0OR7lcZ0vfHyEDaudgDTB1pfLeOT3caTUgsXWiKUUyYRPXdonyEWaJiRCaJMQhhSjoEip/3mGANtiKDV9veZYVpJMSSonCAUeED58wyibP5tGVxanzxbYsr0M25GYRuCLAiFg7lyfxobCOZAVJxRAMBPzroBSalLGyrMMukYmW+SY8MiSJcXnNkxirCwo4lJocnRbjHBYgArwFVSUK5YvzWEacjy/JozAuEQFnYmRn06Jaan16D+in/NrZckJnDW14v+10Wnp9CkPef0bYY60GvgKTAM2XO0ybYpy/PAZvLji1FnJE0+Hae80qakOTjNYAk2MF4sLyaRq2/NU7DxGzEnM+bI84qJrChELYISjEJIQ1ogn/KB4wVlKMTAkeG5bhF/+McFQRqOy3GfjaifoOZUCTaZTU7EOLGt6OJnpA9M0kVKilAo6tRwObo0wrSbopIpy6DoYIg10e4T6xRbuoE3XCUUmq9M3oDNrkUcsGuSWEAxl4LldYXbuizBnpscDt2VZOD84QYQMfuCkV8zJHt/fipCndF3H931c16W/v5+GhgbyuRyP/Wk69atuJRLPYugSr5Cnva2Njra2nKbcw7ru9SilcsBbwNZUgcee9chlCyAFoZAMkOd2tpU158E/xEwrgaZp+L5/oQsOh8ls2vQ1Lr30kkv37N3Lu5YvZ+nSpSxevJjm5mYikQi6rmMYRo7gOZEB9gK/Bv7qeVPfnSTZQHBQXO+zZWuIrz7sEo8GSx5ggCRo/ncs+6anb7rppmXr1q2L33HHHdTX19PZ2UlfXx+6rhONRvF9n4aGhgBHKTK53E+B3YWCUwplprO+B53H4IkX4OhJ0DWI2JDNg5wQIqtdNHPmzC9Om9YQX7p02cxFixazfPlyotEotm0zNjZ24b5hmiajo6MMDQ0RiZQDcgP4BMThwbUgpda+76OUKnbDUwBW0m2nLhyrVq1izpw5pFIplFIIIcjlcti2jRCCaDRKLBYjn89TXl6O67q8vT9QwHEcstks551OMhnbyuWK46UchgkaUjo1VVV/q62tTVRWVmJZVvFkVzz11KTT6aDC7iLC2NhYp5TKAVGC7vkyYAAwgP8CCxVwfO2z7Q8AAAAASUVORK5CYII=');
				gridMaterial.map = texture;
			} catch (e) {
				// Fallback for environments where textures don't load
				console.error('Could not load point texture:', e);
			}
		}
		
		// Create the grid point cloud
		grid = new THREE.Points(gridGeometry, gridMaterial);
		scene.add(grid);
		
	// Add floating accent elements with enhanced visual options
		const addFloatingElement = (geometry: THREE.BufferGeometry, color: THREE.Color, position: [number, number, number], scale: number = 1, wireframe: boolean = true) => {
			const material = new THREE.MeshBasicMaterial({
				color: color,
				transparent: true,
				opacity: 0.6,
				wireframe: wireframe
			});
			
			const mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(...position);
			mesh.scale.set(scale, scale, scale);
			scene.add(mesh);
			waveObjects.push(mesh);
			
			return mesh;
		};
		
		// Create random geometries spread throughout the screen for futuristic look
		if (pulsating) {
			// Create geometries away from the center
			
			// Generate random positions around the scene but avoid center
			const generateRandomPosition = (): [number, number, number] => {
				let x, y, z;
				// Ensure objects are not in the central area
				do {
					x = (Math.random() - 0.5) * gridSize * 2;
					y = (Math.random() - 0.5) * gridSize * 1.5;
					z = (Math.random() - 0.5) * gridSize * 2;
				} while (Math.sqrt(x*x + z*z) < gridSize * 0.4);
				
				return [x, y, z];
			};
			
			// Various geometry types for diversity
			const geometries = [
				// Small blue cubes
				...Array(6).fill(0).map(() => ({
					geo: new THREE.BoxGeometry(1, 1, 1),
					color: blueColor,
					pos: generateRandomPosition(),
					scale: 0.8 + Math.random() * 1.2,
					wire: true
				})),
				// Yellow tetrahedrons
				...Array(5).fill(0).map(() => ({
					geo: new THREE.TetrahedronGeometry(1),
					color: yellowColor,
					pos: generateRandomPosition(),
					scale: 0.5 + Math.random() * 1.5,
					wire: true
				})),
				// White dodecahedrons
				...Array(4).fill(0).map(() => ({
					geo: new THREE.DodecahedronGeometry(1),
					color: new THREE.Color(accentColor2),
					pos: generateRandomPosition(),
					scale: 0.6 + Math.random() * 0.8,
					wire: true
				})),
				// Blue torus knots
				...Array(2).fill(0).map(() => ({
					geo: new THREE.TorusKnotGeometry(1, 0.3, 64, 8),
					color: blueColor,
					pos: generateRandomPosition(),
					scale: 0.8 + Math.random() * 0.7,
					wire: true
				})),
				// Yellow rings
				...Array(4).fill(0).map(() => ({
					geo: new THREE.RingGeometry(1, 1.4, 12),
					color: yellowColor,
					pos: generateRandomPosition(),
					scale: 1.2 + Math.random() * 1.8,
					wire: false
				}))
			];
			
			// Add all geometries to scene
			geometries.forEach(item => {
				addFloatingElement(item.geo, item.color, item.pos, item.scale, item.wire);
			});
		}		// Enhanced lighting for futuristic look
		
		// Add stronger ambient light
		const ambientLight = new THREE.AmbientLight(0x444466); // Slightly blue tint
		scene.add(ambientLight);
		
		// Add directional lights for better depth and highlights
		const directionalLight1 = new THREE.DirectionalLight(0x0066ff, 0.6); // Blue light
		directionalLight1.position.set(1, 1, 1);
		scene.add(directionalLight1);
		
		// Add second directional light from opposite direction
		const directionalLight2 = new THREE.DirectionalLight(0xffde21, 0.4); // Yellow light
		directionalLight2.position.set(-1, -0.5, -1);
		scene.add(directionalLight2);
		
		// Add a subtle point light for atmosphere
		if (dynamicLighting) {
			const pointLight = new THREE.PointLight(0xffffff, 0.6, 50);
			pointLight.position.set(0, 15, 10);
			scene.add(pointLight);
		}
		
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
