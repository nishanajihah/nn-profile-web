<script lang="ts">
  import { T, useTask } from '@threlte/core';
  import { Float, OrbitControls } from '@threlte/extras';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';
  import { carouselClickPulse } from '$lib/logic/code/interactions';

  /** scrollProgress: 0 = hero, 0.5 = projects, 1 = repos */
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

  // Smooth interpolated phase & opacities for seamless scrolling up & down
  $: phase = scrollProgress * 2; // 0..2
  $: heroOpacity = Math.max(0, Math.min(1, 1 - phase * 1.4));
  $: projOpacity = Math.max(0, Math.min(1, 1 - Math.abs(phase - 1) * 1.1));
  $: repoOpacity = Math.max(0, Math.min(1, (phase - 1) * 1.4));

  // Smooth Camera lerp
  $: camZ = 10 + scrollProgress * 4;
  $: camY = scrollProgress * 3;

  // Light intensity morphing
  $: pointIntensity = 2 + scrollProgress * 3;
  $: ambientIntensity = 0.2 + scrollProgress * 0.2;

  // Pre-generate deterministic starfield positions once for smooth performance & no re-renders
  interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
    color: string;
    speed: number;
    opacityMultiplier: number;
  }

  const starCount = 150;
  const stars: Star[] = Array.from({ length: starCount }, (_, i) => ({
    x: (Math.sin(i * 137.5) * 0.5) * 38,
    y: (Math.cos(i * 137.5) * 0.5) * 28,
    z: -18 + (Math.sin(i * 42.1) * 0.5 + 0.5) * 16,
    size: 0.04 + (Math.abs(Math.sin(i * 7.3)) * 0.06),
    color: i % 4 === 0 ? "#ffffff" : i % 3 === 0 ? "#ffe875" : "#ffd700",
    speed: 0.2 + (Math.abs(Math.cos(i * 11.2)) * 0.4),
    opacityMultiplier: 0.4 + (Math.abs(Math.sin(i * 19.8)) * 0.6)
  }));

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

<!-- Camera that drifts smoothly with scroll -->
<T.PerspectiveCamera makeDefault position={[mouseX * 2, camY + mouseY * 2, camZ]} fov={50}>
  <OrbitControls
    enableZoom={false}
    enableDamping
    autoRotate
    autoRotateSpeed={0.3 + scrollProgress * 1.2}
    enablePan={false}
  />
</T.PerspectiveCamera>

<!-- Lighting (Strictly Gold/Silver/White) -->
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
      position={[0, (1 - heroOpacity) * -4, 0]} 
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

<!-- ========== PHASE 1: PROJECTS — Star Dots Field Only ========== -->
{#if projOpacity > 0.01}
  <Float floatIntensity={1.2} rotationIntensity={0.3} speed={0.8}>
    {#each stars as star, i}
      <T.Mesh 
        position={[
          star.x + mouseX * 0.8, 
          star.y + mouseY * 0.8 + Math.sin(time * star.speed + i) * 0.3, 
          star.z
        ]}
      >
        <T.SphereGeometry args={[star.size, 12, 12]} />
        <T.MeshBasicMaterial 
          color={star.color} 
          transparent={true} 
          opacity={projOpacity * star.opacityMultiplier * (0.6 + Math.sin(time * 2 + i) * 0.4)} 
        />
      </T.Mesh>
    {/each}
  </Float>
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
