<script lang="ts">
  import { T, useTask } from '@threlte/core';
  import * as THREE from 'three';
  import { calculateGridScale, scrollProgress } from '$lib/logic/about/story';
  import StoryShapes from './StoryShapes.svelte';

  // Massive Halftone Grid Settings for an infinite look
  const gridSize = 80; 
  const spacing = 1.6;
  const totalInstances = gridSize * gridSize;
  
  let instancedMesh = $state<THREE.InstancedMesh>();
  const dummy = new THREE.Object3D();
  
  let windowWidth = $state(typeof window !== 'undefined' ? window.innerWidth : 1000);
  let windowHeight = $state(typeof window !== 'undefined' ? window.innerHeight : 1000);
  let pointerX = 0;
  let pointerY = 0;

  function handlePointerMove(e: PointerEvent) {
    if (windowWidth < 1338) return;
    pointerX = (e.clientX / windowWidth) * 2 - 1;
    pointerY = -(e.clientY / windowHeight) * 2 + 1;
  }
  
  let targetX = 0;
  let targetY = 0;
  let startTime = Date.now();

  const geometry = new THREE.BoxGeometry(1, 1, 0.1);
  const material = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    roughness: 0.2,
    metalness: 0.9
  });

  useTask(() => {
    if (!instancedMesh) return;
    
    const time = (Date.now() - startTime) / 1000;

    if (windowWidth < 1338) {
      pointerX = 0;
      pointerY = 0;
    }

    targetX += (pointerX * (gridSize * spacing) / 2 - targetX) * 0.05;
    targetY += (pointerY * (gridSize * spacing) / 2 - targetY) * 0.05;

    let i = 0;
    const offset = (gridSize * spacing) / 2;

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const posX = x * spacing - offset + (spacing/2);
        const posY = y * spacing - offset + (spacing/2);
        
        const scaleEffect = calculateGridScale(posX, posY, targetX, targetY, 25, time, windowWidth < 1338);
        const finalScale = Math.max(0.01, 0.02 + scaleEffect * 0.85);
        
        dummy.position.set(posX, posY, 0);
        dummy.scale.set(finalScale, finalScale, 1);
        
        dummy.rotation.x = scaleEffect * Math.PI * 0.4;
        dummy.rotation.y = scaleEffect * Math.PI * 0.4;
        
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
        i++;
      }
    }
    
    instancedMesh.instanceMatrix.needsUpdate = true;
  });

  // Dynamic Camera bound to GSAP Scroll Progress
  let camY = $derived(-10 + ($scrollProgress * 20)); // Pans up as story progresses
  let camZ = $derived(50 - ($scrollProgress * 15));  // Zooms in slightly
  let camRotX = $derived(0.15 - ($scrollProgress * 0.3)); // Tilts
</script>

<svelte:window 
  bind:innerWidth={windowWidth} 
  bind:innerHeight={windowHeight} 
  onpointermove={handlePointerMove} 
/>

<!-- Storytelling reactive camera -->
<T.PerspectiveCamera
  makeDefault
  position={[0, camY, camZ]}
  rotation={[camRotX, 0, 0]}
  fov={45}
/>

<T.DirectionalLight position={[10, 20, 20]} intensity={2.5} color="#ffffff" />
<T.DirectionalLight position={[-10, -20, -10]} intensity={1.5} color="#8ab4f8" />
<T.AmbientLight intensity={0.5} />

<T.InstancedMesh
  args={[geometry, material, totalInstances]}
  bind:ref={instancedMesh}
/>

<StoryShapes />
