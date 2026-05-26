<script lang="ts">
  import { T, useTask } from '@threlte/core';
  import { Float, OrbitControls } from '@threlte/extras';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';
  import { carouselClickPulse } from '$lib/stores/carouselInteraction';

  /** scrollProgress: 0 = hero, 0.5 = projects, 1 = repos (since sections reordered) */
  export let scrollProgress: number = 0;

  // Normalized mouse coordinates (-1 to 1)
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  const burstRotation = spring(0, { stiffness: 0.05, damping: 0.3 });

  $: {
    if ($carouselClickPulse > 0) {
      burstRotation.set($burstRotation + Math.PI / 2); // 90 degree spin
    }
  }

  onMount(() => {
    if (!browser) return;
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  });

  let time = 0;
  useTask((delta: number) => {
    time += delta;
    // Smooth lerp for mouse
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;
  });

  // Derived reactive values for the 3 macro phases (Hero -> Projects -> Repos)
  // Phase 0 (Hero):     0 to 0.5 progress -> opacity peak at 0
  // Phase 1 (Projects): 0.5 to 1.0 progress -> opacity peak at 0.5
  // Phase 2 (Repos):    1.0 progress -> opacity peak at 1.0

  $: phase = scrollProgress * 2; // 0..2
  $: heroOpacity   = Math.max(0, 1 - phase * 1.5);
  $: projOpacity   = Math.max(0, 1 - Math.abs(phase - 1) * 1.8);
  $: repoOpacity   = Math.max(0, (phase - 1) * 1.5);

  // Camera lerp
  $: camZ = 10 + scrollProgress * 5;
  $: camY = scrollProgress * 4;

  // Light intensity morphing
  $: pointIntensity = 2 + scrollProgress * 4;
  $: ambientIntensity = 0.15 + scrollProgress * 0.2;

  type Position = [x: number, y: number, z: number];
  interface NodeItem {
    pos: Position;
    size: number;
    speed: number;
  }
  const nodes: NodeItem[] = [
    { pos: [-4, 2, -1], size: 0.6, speed: 0.4 },
    { pos: [4, -1, 0], size: 0.8, speed: -0.3 },
    { pos: [0, 4, -4], size: 0.5, speed: 0.6 },
    { pos: [-3, -3, 2], size: 0.7, speed: -0.5 },
    { pos: [5, 1, -3], size: 0.4, speed: 0.7 },
    { pos: [-2, 0, 4], size: 0.9, speed: -0.2 }
  ];
</script>

<!-- Camera that drifts with scroll -->
<T.PerspectiveCamera makeDefault position={[mouseX * 2, camY + mouseY * 2, camZ]} fov={50}>
  <OrbitControls
    enableZoom={false}
    enableDamping
    autoRotate
    autoRotateSpeed={0.3 + scrollProgress * 1.5}
    enablePan={false}
  />
</T.PerspectiveCamera>

<!-- Lighting that evolves (Strictly Gold/Silver/White) -->
<T.AmbientLight intensity={ambientIntensity} />
<T.DirectionalLight position={[5 + mouseX * 2, 10 + mouseY * 2, 5]} intensity={1.5} color="#ffffff" />
<T.PointLight position={[-5, 0, -5]} intensity={pointIntensity} color="#ffd700" />
<T.PointLight position={[6, -3, 3]} intensity={pointIntensity * 0.6} color="#c0c0c0" />

<!-- ========== PHASE 0: HERO — Grand Icosahedron ========== -->
{#if heroOpacity > 0.01}
  <Float floatIntensity={2} rotationIntensity={0.5} speed={1.5}>
    <T.Mesh
      rotation.y={time * 0.15 + mouseX * 0.5}
      rotation.x={time * 0.08 - mouseY * 0.5}
      scale={[heroOpacity * 1.2, heroOpacity * 1.2, heroOpacity * 1.2]}
      position={[0, (1 - heroOpacity) * -5, 0]} 
    >
      <T.IcosahedronGeometry args={[3, 1]} />
      <T.MeshStandardMaterial
        color="#111111"
        wireframe={true}
        emissive="#ffde21"
        emissiveIntensity={0.5}
        transparent={true}
        opacity={heroOpacity}
      />
    </T.Mesh>
  </Float>

  <Float floatIntensity={1} rotationIntensity={1.5} speed={1}>
    <T.Mesh position={[5, 1.5, -2]} rotation.z={time * 0.3}>
      <T.OctahedronGeometry args={[0.7]} />
      <T.MeshStandardMaterial
        color="#ffd700"
        emissive="#ffd700"
        emissiveIntensity={0.7}
        wireframe={true}
        transparent={true}
        opacity={heroOpacity * 0.8}
      />
    </T.Mesh>
  </Float>
{/if}

<!-- ========== PHASE 1: PROJECTS — Tapering Mechanical Serpent & Stars ========== -->
{#if projOpacity > 0.01}
  <!-- Background Sparks / Stars -->
  <Float floatIntensity={1} rotationIntensity={0.5} speed={0.5}>
    {#each Array(50) as _, i}
      <T.Mesh 
        position={[
          (Math.random() - 0.5) * 30, 
          (Math.random() - 0.5) * 20, 
          -10 + (Math.random() * 5)
        ]}
      >
        <T.SphereGeometry args={[0.05 + Math.random() * 0.05, 8, 8]} />
        <T.MeshBasicMaterial color={Math.random() > 0.5 ? "#ffd700" : "#ffffff"} transparent={true} opacity={projOpacity * (0.3 + Math.random() * 0.5)} />
      </T.Mesh>
    {/each}
  </Float>

  <!-- The Mechanical Serpent -->
  {#each Array(20) as _, i}
    <Float floatIntensity={1.5} rotationIntensity={1} speed={1.2}>
      <T.Group 
        position={[
          // Snake sweeps tighter across the screen
          -8 + (i * 0.8) + mouseX * 1.5, 
          // Elegant undulating wave
          Math.sin(time * 1.5 + i * 0.5) * 3 + mouseY * 1.5, 
          // Depth wave
          -4 + Math.cos(time * 1.2 + i * 0.4) * 2
        ]} 
        scale={[
          projOpacity * (1.6 - i * 0.06), 
          projOpacity * (1.6 - i * 0.06), 
          projOpacity * (1.6 - i * 0.06)
        ]}
      >
        <!-- Inner Core (Icosahedron) -->
        <T.Mesh rotation.x={time * 0.8 + $burstRotation} rotation.y={time * 0.5 + i}>
          <T.IcosahedronGeometry args={[0.4, 0]} />
          <T.MeshStandardMaterial 
            color="#000000" 
            emissive="#ffd700" 
            emissiveIntensity={2} 
            wireframe={true} 
            transparent={true} 
            opacity={projOpacity} 
          />
        </T.Mesh>

        <!-- Mechanical Vertebrae Shell (Torus) -->
        <T.Mesh rotation.x={Math.PI / 2} rotation.y={time + i} rotation.z={$burstRotation}>
          <T.TorusGeometry args={[0.7, 0.08, 8, 24]} />
          <T.MeshStandardMaterial color="#000000" emissive="#ffde21" emissiveIntensity={1} wireframe={true} transparent={true} opacity={projOpacity * 0.8} />
        </T.Mesh>
        
        <!-- 2D HUD Ring (Dashed Data Ring) -->
        <T.Mesh rotation.x={Math.PI / 2.5} rotation.z={time * 2.5 + $burstRotation * 2 + i}>
          <T.RingGeometry args={[1.0, 1.05, 32, 1]} />
          <T.MeshBasicMaterial color="#ffffff" wireframe={true} transparent={true} opacity={projOpacity * 0.6} />
        </T.Mesh>

        <!-- Orbital Ring -->
        <T.Mesh rotation.x={Math.sin(time + i)} rotation.y={Math.cos(time + i)} rotation.z={-time * 2 - $burstRotation}>
          <T.RingGeometry args={[1.4, 1.45, 24]} />
          <T.MeshBasicMaterial color="#ffd700" transparent={true} opacity={projOpacity * 0.4} />
        </T.Mesh>
        
        <!-- Center Solid Pearl -->
        <T.Mesh>
          <T.SphereGeometry args={[0.15, 16, 16]} />
          <T.MeshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} transparent={true} opacity={projOpacity} />
        </T.Mesh>
      </T.Group>
    </Float>
  {/each}
{/if}

<!-- ========== PHASE 2: REPOS — Yellow Constellation Nodes ========== -->
{#if repoOpacity > 0.01}
  {#each nodes as node, idx}
    <Float floatIntensity={1.5} rotationIntensity={1} speed={1.5}>
      <T.Mesh
        position={[
          node.pos[0] + mouseX * 0.5 + Math.sin(time + idx) * (1 - repoOpacity) * 8, 
          node.pos[1] + mouseY * 0.5 + Math.cos(time + idx) * (1 - repoOpacity) * 8, 
          node.pos[2]
        ]}
        rotation.x={time * node.speed}
        rotation.y={time * node.speed * 0.7}
        scale={[repoOpacity * 1.2, repoOpacity * 1.2, repoOpacity * 1.2]}
      >
        <T.BoxGeometry args={[node.size, node.size, node.size]} />
        <T.MeshStandardMaterial
          color="#ffde21"
          wireframe={idx % 2 === 0}
          emissive="#ffd700"
          emissiveIntensity={0.8}
          transparent={true}
          opacity={repoOpacity * 0.9}
        />
      </T.Mesh>
    </Float>
  {/each}
{/if}
