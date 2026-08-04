<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import * as THREE from "three";
  import { scrollProgress } from "$lib/logic/about/story";
  import { onMount } from "svelte";

  // Responsive state
  let isMobile = $state(false);

  onMount(() => {
    const handleResize = () => {
      isMobile = window.innerWidth < 768;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  // Opacities and transforms
  let heroOpacity = $state(1);
  let heroRotY = $state(0);
  let heroRotX = $state(0);
  let heroScale = $state(1);

  let roboticsOpacity = $state(0);
  let roboticsRotY = $state(0);
  let roboticsRotZ = $state(0);

  let musicOpacity = $state(0);
  let musicRotX = $state(0);
  let musicWave = $state(0);

  useTask((delta) => {
    const progress = $scrollProgress;

    // --- Hero Shape (Icosahedron / The System) ---
    if (progress < 0.15) heroOpacity = 1;
    else if (progress < 0.25) heroOpacity = 1 - (progress - 0.15) * 10;
    else heroOpacity = 0;

    heroRotY += 0.5 * delta;
    heroRotX += 0.2 * delta;
    heroScale = 1 + progress * 2;

    // --- Robotics Shape (Interlocking Gears/Toruses) ---
    if (progress < 0.2) roboticsOpacity = 0;
    else if (progress < 0.3) roboticsOpacity = (progress - 0.2) * 10;
    else if (progress < 0.4) roboticsOpacity = 1;
    else if (progress < 0.5) roboticsOpacity = 1 - (progress - 0.4) * 10;
    else roboticsOpacity = 0;

    roboticsRotY += 1.5 * delta;
    roboticsRotZ -= 0.8 * delta;

    // --- Music Shape (Audio Ring) ---
    if (progress < 0.45) musicOpacity = 0;
    else if (progress < 0.55) musicOpacity = (progress - 0.45) * 10;
    else if (progress < 0.65) musicOpacity = 1;
    else if (progress < 0.75) musicOpacity = 1 - (progress - 0.65) * 10;
    else musicOpacity = 0;

    musicRotX += 1.0 * delta;
    musicWave += 5.0 * delta; // For bouncing/scaling effect on the ring
  });
</script>

<!-- HERO: Distributed Tech Constellation (Spread Out) -->
<T.Group visible={heroOpacity > 0}>
  <T.Mesh
    position={[isMobile ? -6 : -18, isMobile ? 10 : 12, isMobile ? -25 : -30]}
    rotation={[heroRotX, heroRotY, 0]}
    scale={[heroScale, heroScale, heroScale]}
  >
    <T.IcosahedronGeometry args={[4, 0]} />
    <T.MeshStandardMaterial
      color="#ffffff"
      wireframe={true}
      emissive="#fcbf47"
      emissiveIntensity={heroOpacity * 0.8}
      transparent
      opacity={heroOpacity * 0.5}
    />
  </T.Mesh>
  <T.Mesh
    position={[isMobile ? 7 : 20, isMobile ? -6 : -8, isMobile ? -22 : -25]}
    rotation={[-heroRotX, heroRotY * 1.5, 0]}
    scale={[heroScale * 1.5, heroScale * 1.5, heroScale * 1.5]}
  >
    <T.IcosahedronGeometry args={[3, 1]} />
    <T.MeshStandardMaterial
      color="#ffffff"
      metalness={0.8}
      roughness={0.2}
      transparent
      opacity={heroOpacity * 0.3}
    />
  </T.Mesh>
  <T.Mesh
    position={[isMobile ? -8 : -25, isMobile ? -12 : -12, isMobile ? -30 : -40]}
    rotation={[heroRotY, -heroRotX, 0]}
    scale={[heroScale * 2, heroScale * 2, heroScale * 2]}
  >
    <T.BoxGeometry args={[5, 5, 5]} />
    <T.MeshStandardMaterial
      color="#fcbf47"
      wireframe={true}
      transparent
      opacity={heroOpacity * 0.4}
    />
  </T.Mesh>
  <T.Mesh
    position={[isMobile ? 8 : 22, isMobile ? 12 : 15, isMobile ? -28 : -35]}
    rotation={[heroRotX * 2, heroRotY, 0]}
    scale={[heroScale * 0.8, heroScale * 0.8, heroScale * 0.8]}
  >
    <T.IcosahedronGeometry args={[5, 0]} />
    <T.MeshStandardMaterial
      color="#ffffff"
      wireframe={true}
      emissive="#fcbf47"
      emissiveIntensity={heroOpacity * 0.5}
      transparent
      opacity={heroOpacity * 0.3}
    />
  </T.Mesh>
  <!-- Giant ambient center piece placed super far back -->
  <T.Mesh
    position={[0, 0, -60]}
    rotation={[heroRotX * 0.2, heroRotY * 0.2, 0]}
    scale={[heroScale * 4, heroScale * 4, heroScale * 4]}
  >
    <T.IcosahedronGeometry args={[10, 1]} />
    <T.MeshStandardMaterial
      color="#222222"
      wireframe={true}
      transparent
      opacity={heroOpacity * 0.15}
    />
  </T.Mesh>
</T.Group>

<!-- ROBOTICS: Hardware Gears & Cute Waving Robot -->
<T.Group position={[0, 0, -20]} visible={roboticsOpacity > 0}>
  <!-- Orbiting Gear 1 -->
  <T.Mesh rotation={[0.5, roboticsRotY, roboticsRotZ]}>
    <T.TorusGeometry args={[14, 0.5, 16, 64]} />
    <T.MeshStandardMaterial
      color="#8ab4f8"
      metalness={0.9}
      roughness={0.1}
      transparent={true}
      opacity={roboticsOpacity * 0.6}
    />
  </T.Mesh>
  <!-- Orbiting Gear 2 -->
  <T.Mesh rotation={[1.5, roboticsRotY * -0.5, roboticsRotZ * 1.5]}>
    <T.TorusGeometry args={[10, 0.3, 16, 64]} />
    <T.MeshStandardMaterial
      color="#ffffff"
      metalness={1}
      roughness={0.3}
      transparent={true}
      opacity={roboticsOpacity * 0.8}
    />
  </T.Mesh>

  <!-- Cute floating and waving Robot on the Left (Flanking) -->
  <T.Group
    position={[isMobile ? -9 : -36, isMobile ? 6 : -3, isMobile ? -15 : 12]}
    rotation={[0.2, 0.4 + Math.sin(roboticsRotY * 0.2) * 0.15, 0]}
    scale={isMobile ? [1.5, 1.5, 1.5] : [2.2, 2.2, 2.2]}
  >
    <!-- Robot Body (Chassis) -->
    <T.Mesh position={[0, 0, 0]}>
      <T.BoxGeometry args={[2.8, 2.4, 2]} />
      <T.MeshStandardMaterial
        color="#e8e8e8"
        metalness={0.4}
        roughness={0.3}
        transparent
        opacity={roboticsOpacity}
      />
    </T.Mesh>
    <!-- Breastplate Gold Accent -->
    <T.Mesh position={[0, 0, 1.05]}>
      <T.BoxGeometry args={[1.4, 1.0, 0.1]} />
      <T.MeshStandardMaterial
        color="#fcbf47"
        metalness={0.7}
        roughness={0.2}
        transparent
        opacity={roboticsOpacity}
      />
    </T.Mesh>

    <!-- Neck -->
    <T.Mesh position={[0, 1.3, 0]}>
      <T.CylinderGeometry args={[0.4, 0.4, 0.4, 16]} />
      <T.MeshStandardMaterial
        color="#333333"
        metalness={0.8}
        transparent
        opacity={roboticsOpacity}
      />
    </T.Mesh>

    <!-- Robot Head -->
    <T.Mesh position={[0, 2.2, 0]}>
      <T.BoxGeometry args={[2.2, 1.6, 2.0]} />
      <T.MeshStandardMaterial
        color="#e8e8e8"
        metalness={0.4}
        roughness={0.3}
        transparent
        opacity={roboticsOpacity}
      />
    </T.Mesh>
    <!-- Head Screen -->
    <T.Mesh position={[0, 2.2, 1.01]}>
      <T.BoxGeometry args={[1.8, 1.2, 0.1]} />
      <T.MeshStandardMaterial
        color="#1a1a1a"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={roboticsOpacity}
      />
    </T.Mesh>
    <!-- Glowing Cyan Left Eye -->
    <T.Mesh position={[-0.45, 2.2, 1.07]}>
      <T.CylinderGeometry
        args={[0.2, 0.2, 0.1, 16]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <T.MeshStandardMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={1.5}
        transparent
        opacity={roboticsOpacity}
      />
    </T.Mesh>
    <!-- Glowing Cyan Right Eye -->
    <T.Mesh position={[0.45, 2.2, 1.07]}>
      <T.CylinderGeometry
        args={[0.2, 0.2, 0.1, 16]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <T.MeshStandardMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={1.5}
        transparent
        opacity={roboticsOpacity}
      />
    </T.Mesh>

    <!-- Antenna -->
    <T.Mesh position={[0, 3.2, 0]}>
      <T.CylinderGeometry args={[0.06, 0.06, 0.8, 8]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        transparent
        opacity={roboticsOpacity}
      />
    </T.Mesh>
    <T.Mesh position={[0, 3.65, 0]}>
      <T.SphereGeometry args={[0.2, 16, 16]} />
      <T.MeshStandardMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={1.2}
        transparent
        opacity={roboticsOpacity}
      />
    </T.Mesh>

    <!-- Left Arm (Angled Downwards) -->
    <T.Mesh position={[-1.7, 0.4, 0]} rotation={[0, 0, 0.5]}>
      <T.CylinderGeometry args={[0.15, 0.15, 1.4, 16]} />
      <T.MeshStandardMaterial
        color="#ffffff"
        metalness={0.5}
        transparent
        opacity={roboticsOpacity}
      />
    </T.Mesh>
    <!-- Left Hand Claw -->
    <T.Mesh position={[-2.1, -0.1, 0]}>
      <T.BoxGeometry args={[0.3, 0.3, 0.3]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        transparent
        opacity={roboticsOpacity}
      />
    </T.Mesh>

    <!-- Right Arm (Waving dynamically!) -->
    <T.Group
      position={[1.4, 0.4, 0]}
      rotation={[0, 0, Math.sin(roboticsRotY * 2.5) * 0.4]}
    >
      <!-- Arm Segment -->
      <T.Mesh position={[0.4, 0.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <T.CylinderGeometry args={[0.15, 0.15, 1.4, 16]} />
        <T.MeshStandardMaterial
          color="#ffffff"
          metalness={0.5}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
      <!-- Right Hand Claw -->
      <T.Mesh position={[0.9, 0.9, 0]}>
        <T.BoxGeometry args={[0.3, 0.3, 0.3]} />
        <T.MeshStandardMaterial
          color="#d4af37"
          metalness={0.8}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
    </T.Group>

    <!-- Wheel Treads Axle -->
    <T.Mesh position={[0, -1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
      <T.CylinderGeometry args={[0.2, 0.2, 2.4, 16]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        transparent
        opacity={roboticsOpacity}
      />
    </T.Mesh>
    <!-- Left Wheel/Tread -->
    <T.Mesh position={[-1.2, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <T.CylinderGeometry args={[0.7, 0.7, 0.6, 32]} />
      <T.MeshStandardMaterial
        color="#333333"
        roughness={0.9}
        transparent
        opacity={roboticsOpacity}
      />
    </T.Mesh>
  </T.Group>

  <!-- Right Robot: Redesigned Floating Companion Android Drone (Flanking) -->
  <T.Group
    position={[isMobile ? 9 : 36, isMobile ? -6 : -3, isMobile ? -15 : 12]}
    rotation={[0.2, -0.45 + Math.sin(roboticsRotY * 0.25) * 0.1, 0]}
    scale={isMobile ? [1.5, 1.5, 1.5] : [2.2, 2.2, 2.2]}
  >
    <!-- Dark Graphite Metallic Core Sphere -->
    <T.Mesh position={[0, 0, 0]}>
      <T.SphereGeometry args={[1.1, 32, 32]} />
      <T.MeshStandardMaterial
        color="#222222"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={roboticsOpacity}
      />
    </T.Mesh>

    <!-- Outer Armor Plates (Matte White hemispheres/segments) -->
    <!-- Top Shell -->
    <T.Mesh position={[0, 0.2, 0]} scale={[1.05, 1.05, 1.05]}>
      <T.SphereGeometry
        args={[1.1, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2.5]}
      />
      <T.MeshStandardMaterial
        color="#f0f0f0"
        roughness={0.3}
        transparent
        opacity={roboticsOpacity}
      />
    </T.Mesh>
    <!-- Bottom Shell -->
    <T.Mesh position={[0, -0.2, 0]} scale={[1.05, 1.05, 1.05]}>
      <T.SphereGeometry
        args={[
          1.1,
          16,
          16,
          0,
          Math.PI * 2,
          Math.PI - Math.PI / 2.5,
          Math.PI / 2.5,
        ]}
      />
      <T.MeshStandardMaterial
        color="#f0f0f0"
        roughness={0.3}
        transparent
        opacity={roboticsOpacity}
      />
    </T.Mesh>

    <!-- Rotating Gold Outer Orbit Ring 1 -->
    <T.Mesh rotation={[0.4, roboticsRotY * 1.5, 0.2]}>
      <T.TorusGeometry args={[1.6, 0.05, 8, 48]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        transparent
        opacity={roboticsOpacity * 0.7}
      />
    </T.Mesh>
    <!-- Rotating Gold Outer Orbit Ring 2 -->
    <T.Mesh rotation={[-0.4, roboticsRotY * -1.2, 0.5]}>
      <T.TorusGeometry args={[1.8, 0.04, 8, 48]} />
      <T.MeshStandardMaterial
        color="#ffffff"
        metalness={0.9}
        transparent
        opacity={roboticsOpacity * 0.5}
      />
    </T.Mesh>

    <!-- Signature Monocle Camera Visor (Gold housing + glowing cyan lens) -->
    <T.Group position={[0, 0.2, 0.8]} rotation={[0.1, 0, 0]}>
      <!-- Visor Housing -->
      <T.Mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <T.CylinderGeometry args={[0.65, 0.65, 0.4, 32]} />
        <T.MeshStandardMaterial
          color="#d4af37"
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
      <!-- Black Visor Glass -->
      <T.Mesh position={[0, 0, 0.21]} rotation={[Math.PI / 2, 0, 0]}>
        <T.CylinderGeometry args={[0.55, 0.55, 0.02, 32]} />
        <T.MeshStandardMaterial
          color="#050505"
          roughness={0.1}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
      <!-- Central Camera Shutter Ring (Gold) -->
      <T.Mesh position={[0, 0, 0.23]} rotation={[Math.PI / 2, 0, 0]}>
        <T.TorusGeometry args={[0.3, 0.05, 8, 16]} />
        <T.MeshStandardMaterial
          color="#fcbf47"
          metalness={0.9}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
      <!-- Glowing Cyan Camera Eye (Lens) -->
      <T.Mesh position={[0, 0, 0.22]}>
        <T.SphereGeometry args={[0.2, 16, 16]} />
        <T.MeshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={2.5}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
      <!-- Glowing Cyan Target Pointer (Torus indicator) -->
      <T.Mesh position={[0, 0, 0.24]} rotation={[0, 0, musicRotX]}>
        <T.TorusGeometry args={[0.42, 0.02, 4, 16, Math.PI / 3]} />
        <T.MeshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={1.5}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
    </T.Group>

    <!-- Bottom Double Gold Jet Boosters -->
    <T.Group position={[0, -1.0, 0]}>
      <!-- Left Nozzle -->
      <T.Mesh position={[-0.35, 0, 0]} rotation={[Math.PI, 0.1, 0]}>
        <T.CylinderGeometry args={[0.22, 0.12, 0.45, 16]} />
        <T.MeshStandardMaterial
          color="#d4af37"
          metalness={0.85}
          roughness={0.3}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
      <!-- Right Nozzle -->
      <T.Mesh position={[0.35, 0, 0]} rotation={[Math.PI, -0.1, 0]}>
        <T.CylinderGeometry args={[0.22, 0.12, 0.45, 16]} />
        <T.MeshStandardMaterial
          color="#d4af37"
          metalness={0.85}
          roughness={0.3}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
      <!-- Copper Exhaust Wires/Pipes -->
      <T.Mesh position={[0, 0.15, -0.2]} rotation={[0, 0, Math.PI / 2]}>
        <T.TorusGeometry args={[0.35, 0.04, 8, 16, Math.PI]} />
        <T.MeshStandardMaterial
          color="#fcbf47"
          metalness={0.9}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
      <!-- Dual exhaust flame (Cone) -->
      <T.Mesh position={[-0.35, -0.4, 0]}>
        <T.ConeGeometry args={[0.15, 0.5, 16]} />
        <T.MeshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={1.5}
          transparent
          opacity={roboticsOpacity * (0.6 + Math.sin(roboticsRotY * 5) * 0.25)}
        />
      </T.Mesh>
      <T.Mesh position={[0.35, -0.4, 0]}>
        <T.ConeGeometry args={[0.15, 0.5, 16]} />
        <T.MeshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={1.5}
          transparent
          opacity={roboticsOpacity * (0.6 + Math.cos(roboticsRotY * 5) * 0.25)}
        />
      </T.Mesh>
    </T.Group>

    <!-- Dangling Coiled Data Wire (Hanging underneath) -->
    <T.Group position={[0, -1.2, -0.3]} scale={[0.4, 0.4, 0.4]}>
      {#each Array(4) as _, i}
        <T.Mesh
          position={[Math.sin(roboticsRotY * 0.5 + i) * 0.2, -i * 0.8, 0]}
          rotation={[0.4 * i, 0.2 * i, 0]}
        >
          <T.TorusGeometry args={[0.35, 0.08, 8, 16]} />
          <T.MeshStandardMaterial
            color="#1a1a1a"
            roughness={0.9}
            transparent
            opacity={roboticsOpacity}
          />
        </T.Mesh>
      {/each}
    </T.Group>

    <!-- Left Triple-Jointed Mechanical Arm -->
    <T.Group position={[-1.2, -0.1, 0]}>
      <!-- Shoulder Joint -->
      <T.Mesh>
        <T.SphereGeometry args={[0.16, 16, 16]} />
        <T.MeshStandardMaterial
          color="#d4af37"
          metalness={0.8}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
      <!-- Upper Arm segment -->
      <T.Mesh position={[-0.35, -0.3, 0]} rotation={[0, 0, 0.8]}>
        <T.CylinderGeometry args={[0.07, 0.07, 0.7, 8]} />
        <T.MeshStandardMaterial
          color="#f0f0f0"
          roughness={0.4}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
      <!-- Elbow Joint -->
      <T.Mesh position={[-0.6, -0.52, 0]}>
        <T.SphereGeometry args={[0.12, 16, 16]} />
        <T.MeshStandardMaterial
          color="#fcbf47"
          metalness={0.8}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
      <!-- Forearm segment -->
      <T.Mesh position={[-0.95, -0.35, 0]} rotation={[0, 0, -0.6]}>
        <T.CylinderGeometry args={[0.06, 0.06, 0.7, 8]} />
        <T.MeshStandardMaterial
          color="#f0f0f0"
          roughness={0.4}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
      <!-- Wrist & Claw -->
      <T.Group position={[-1.15, -0.15, 0]} rotation={[0, 0, -0.6]}>
        <T.Mesh>
          <T.SphereGeometry args={[0.08, 8, 8]} />
          <T.MeshStandardMaterial
            color="#d4af37"
            metalness={0.9}
            transparent
            opacity={roboticsOpacity}
          />
        </T.Mesh>
        <!-- Two fingers -->
        <T.Mesh position={[-0.1, 0.12, 0]} rotation={[0, 0, 0.4]}>
          <T.BoxGeometry args={[0.05, 0.22, 0.1]} />
          <T.MeshStandardMaterial
            color="#d4af37"
            metalness={0.9}
            transparent
            opacity={roboticsOpacity}
          />
        </T.Mesh>
        <T.Mesh position={[-0.1, -0.12, 0]} rotation={[0, 0, -0.4]}>
          <T.BoxGeometry args={[0.05, 0.22, 0.1]} />
          <T.MeshStandardMaterial
            color="#d4af37"
            metalness={0.9}
            transparent
            opacity={roboticsOpacity}
          />
        </T.Mesh>
      </T.Group>
    </T.Group>

    <!-- Right Triple-Jointed Mechanical Arm (Waving!) -->
    <T.Group
      position={[1.2, -0.1, 0]}
      rotation={[0, 0, Math.sin(roboticsRotY * 1.8) * 0.35]}
    >
      <!-- Shoulder Joint -->
      <T.Mesh>
        <T.SphereGeometry args={[0.16, 16, 16]} />
        <T.MeshStandardMaterial
          color="#d4af37"
          metalness={0.8}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
      <!-- Upper Arm segment -->
      <T.Mesh position={[0.35, 0.3, 0]} rotation={[0, 0, -0.8]}>
        <T.CylinderGeometry args={[0.07, 0.07, 0.7, 8]} />
        <T.MeshStandardMaterial
          color="#f0f0f0"
          roughness={0.4}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
      <!-- Elbow Joint -->
      <T.Mesh position={[0.6, 0.52, 0]}>
        <T.SphereGeometry args={[0.12, 16, 16]} />
        <T.MeshStandardMaterial
          color="#fcbf47"
          metalness={0.8}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
      <!-- Forearm segment -->
      <T.Mesh position={[0.95, 0.35, 0]} rotation={[0, 0, 0.6]}>
        <T.CylinderGeometry args={[0.06, 0.06, 0.7, 8]} />
        <T.MeshStandardMaterial
          color="#f0f0f0"
          roughness={0.4}
          transparent
          opacity={roboticsOpacity}
        />
      </T.Mesh>
      <!-- Wrist & Claw -->
      <T.Group position={[1.15, 0.15, 0]} rotation={[0, 0, 0.6]}>
        <T.Mesh>
          <T.SphereGeometry args={[0.08, 8, 8]} />
          <T.MeshStandardMaterial
            color="#d4af37"
            metalness={0.9}
            transparent
            opacity={roboticsOpacity}
          />
        </T.Mesh>
        <!-- Two fingers -->
        <T.Mesh position={[0.1, 0.12, 0]} rotation={[0, 0, -0.4]}>
          <T.BoxGeometry args={[0.05, 0.22, 0.1]} />
          <T.MeshStandardMaterial
            color="#d4af37"
            metalness={0.9}
            transparent
            opacity={roboticsOpacity}
          />
        </T.Mesh>
        <T.Mesh position={[0.1, -0.12, 0]} rotation={[0, 0, 0.4]}>
          <T.BoxGeometry args={[0.05, 0.22, 0.1]} />
          <T.MeshStandardMaterial
            color="#d4af37"
            metalness={0.9}
            transparent
            opacity={roboticsOpacity}
          />
        </T.Mesh>
      </T.Group>
    </T.Group>
  </T.Group>
</T.Group>

<!-- MUSIC: 3D Music Studio (Subtle Zig-Zag Horizontal Layout) -->
<T.Group visible={musicOpacity > 0}>
  <!-- 3D High-End Cabinet Studio Monitor (Far Left - LOW) -->
  <T.Group
    position={[isMobile ? -9 : -46, isMobile ? 12 : -5, isMobile ? -25 : -32]}
    rotation={[-0.2, 0.5, 0.1]}
    scale={isMobile ? [1.8, 1.8, 1.8] : [2.5, 2.5, 2.5]}
  >
    <!-- Decoupling Acoustic Foam Pad -->
    <T.Mesh position={[0, -4.0, 0]}>
      <T.BoxGeometry args={[5.2, 0.2, 4.2]} />
      <T.MeshStandardMaterial
        color="#111111"
        roughness={0.9}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Matte Charcoal Speaker Cabinet -->
    <T.Mesh position={[0, 0, 0]}>
      <T.BoxGeometry args={[4.7, 7.8, 4.0]} />
      <T.MeshStandardMaterial
        color="#1e1e1e"
        metalness={0.2}
        roughness={0.7}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Premium Walnut Wood Side Panels -->
    <T.Mesh position={[-2.42, 0, 0]}>
      <T.BoxGeometry args={[0.15, 7.8, 4.05]} />
      <T.MeshStandardMaterial
        color="#5c4033"
        metalness={0.1}
        roughness={0.7}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <T.Mesh position={[2.42, 0, 0]}>
      <T.BoxGeometry args={[0.15, 7.8, 4.05]} />
      <T.MeshStandardMaterial
        color="#5c4033"
        metalness={0.1}
        roughness={0.7}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>

    <!-- Deep Anodized Front Baffle Faceplate -->
    <T.Mesh position={[0, 0, 2.02]}>
      <T.BoxGeometry args={[4.4, 7.4, 0.1]} />
      <T.MeshStandardMaterial
        color="#111111"
        metalness={0.4}
        roughness={0.5}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Grille Socket Pins (4 corners of baffle) -->
    {#each Array(4) as _, i}
      <T.Mesh
        position={[-1.8 + (i % 2) * 3.6, 3.2 - Math.floor(i / 2) * 6.4, 2.08]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <T.CylinderGeometry args={[0.08, 0.08, 0.1, 8]} />
        <T.MeshStandardMaterial
          color="#222222"
          roughness={0.8}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
    {/each}

    <!-- Tweeter Waveguide Bezel (Gold) -->
    <T.Mesh position={[0, 1.8, 2.08]} rotation={[Math.PI / 2, 0, 0]}>
      <T.CylinderGeometry args={[0.7, 0.9, 0.1, 32]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Tweeter Protective Silk Dome (Gold) -->
    <T.Mesh position={[0, 1.8, 2.14]}>
      <T.SphereGeometry args={[0.35, 16, 16]} />
      <T.MeshStandardMaterial
        color="#fcbf47"
        metalness={0.7}
        roughness={0.3}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>

    <!-- Woofer Metal Mounting Ring (Dark Grey) -->
    <T.Mesh position={[0, -1.2, 2.08]} rotation={[Math.PI / 2, 0, 0]}>
      <T.CylinderGeometry args={[1.7, 1.7, 0.05, 32]} />
      <T.MeshStandardMaterial
        color="#2d2d2d"
        metalness={0.8}
        roughness={0.3}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Woofer Industrial Hex Screws (6 gold screws around ring) -->
    {#each Array(6) as _, i}
      <T.Mesh
        position={[
          Math.cos((i * Math.PI) / 3) * 1.55,
          -1.2 + Math.sin((i * Math.PI) / 3) * 1.55,
          2.12,
        ]}
        rotation={[Math.PI / 2, 0, (i * Math.PI) / 3]}
      >
        <T.CylinderGeometry args={[0.04, 0.04, 0.06, 6]} />
        <T.MeshStandardMaterial
          color="#d4af37"
          metalness={0.9}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
    {/each}

    <!-- Woofer Rubber Surround Ring (Chunky 3D Torus) -->
    <T.Mesh position={[0, -1.2, 2.12]} rotation={[0, 0, 0]}>
      <T.TorusGeometry args={[1.4, 0.12, 8, 32]} />
      <T.MeshStandardMaterial
        color="#111111"
        roughness={0.9}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Woofer Recessed Cone (Gold) -->
    <T.Mesh position={[0, -1.2, 1.95]} rotation={[-Math.PI / 2, 0, 0]}>
      <T.ConeGeometry args={[1.3, 0.5, 32]} />
      <T.MeshStandardMaterial
        color="#fcbf47"
        metalness={0.6}
        roughness={0.4}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Woofer Central Dust Cap (Gold Center Dome) -->
    <T.Mesh position={[0, -1.2, 2.14]}>
      <T.SphereGeometry args={[0.38, 16, 16]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        roughness={0.1}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>

    <!-- Bass Reflex Port Slot (Lower horizontal port cavity) -->
    <T.Mesh position={[0, -3.0, 2.05]}>
      <T.BoxGeometry args={[3.2, 0.35, 0.15]} />
      <T.MeshStandardMaterial
        color="#050505"
        metalness={0.1}
        roughness={0.9}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Power LED Indicator (Glowing Green/Cyan) -->
    <T.Mesh position={[1.8, -3.0, 2.08]} rotation={[Math.PI / 2, 0, 0]}>
      <T.CylinderGeometry args={[0.06, 0.06, 0.05, 8]} />
      <T.MeshStandardMaterial
        color="#00ffcc"
        emissive="#00ffcc"
        emissiveIntensity={1.5}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
  </T.Group>

  <!-- Vinyl Record Turntable Deck (Mid-Left - HIGH) -->
  <T.Group
    position={[isMobile ? 9 : -24, isMobile ? 6 : 3, isMobile ? -25 : -32]}
    rotation={[0.4, musicRotX * 0.4, 0.1]}
    scale={isMobile ? [0.85, 0.85, 0.85] : [1.2, 1.2, 1.2]}
  >
    <!-- Wooden/Metal Deck Base -->
    <T.Mesh position={[0, -0.5, 0]}>
      <T.BoxGeometry args={[11, 1.2, 11]} />
      <T.MeshStandardMaterial
        color="#2d1e18"
        metalness={0.2}
        roughness={0.6}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Deck Top Metal Plate -->
    <T.Mesh position={[0, 0.15, 0]}>
      <T.BoxGeometry args={[10.6, 0.1, 10.6]} />
      <T.MeshStandardMaterial
        color="#333333"
        metalness={0.8}
        roughness={0.3}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Platter (Silver Metal) -->
    <T.Mesh position={[-0.8, 0.25, 0.8]}>
      <T.CylinderGeometry args={[4.2, 4.2, 0.2, 32]} />
      <T.MeshStandardMaterial
        color="#cccccc"
        metalness={0.9}
        roughness={0.2}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Vinyl Record (Black grooves) -->
    <T.Mesh position={[-0.8, 0.4, 0.8]} rotation={[0, musicRotX * 2, 0]}>
      <T.CylinderGeometry args={[4.0, 4.0, 0.1, 64]} />
      <T.MeshStandardMaterial
        color="#151515"
        metalness={0.5}
        roughness={0.5}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Vinyl Label (Rich Gold) -->
    <T.Mesh position={[-0.8, 0.46, 0.8]} rotation={[0, musicRotX * 2, 0]}>
      <T.CylinderGeometry args={[1.5, 1.5, 0.05, 32]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.7}
        roughness={0.3}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Center Spindle -->
    <T.Mesh position={[-0.8, 0.55, 0.8]}>
      <T.CylinderGeometry args={[0.12, 0.12, 0.6, 16]} />
      <T.MeshStandardMaterial
        color="#ffffff"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Tone-Arm Base (Pivot) -->
    <T.Mesh position={[3.8, 0.35, -3.8]}>
      <T.CylinderGeometry args={[0.6, 0.6, 0.4, 16]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Tone-Arm Pole (Silver bent arm) -->
    <T.Mesh
      position={[2.2, 0.9, -1.8]}
      rotation={[0, Math.PI / 4, 0.1]}
      scale={[1, 1, 1]}
    >
      <T.CylinderGeometry args={[0.08, 0.08, 5, 8]} />
      <T.MeshStandardMaterial
        color="#ffffff"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Tone-Arm Cartridge/Headshell (Gold) -->
    <T.Mesh position={[0.4, 0.9, 0.4]} rotation={[0.1, 0.3, 0]}>
      <T.BoxGeometry args={[0.4, 0.3, 0.8]} />
      <T.MeshStandardMaterial
        color="#fcbf47"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Control Knobs -->
    <T.Mesh position={[4.0, 0.3, 4.0]}>
      <T.CylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
      <T.MeshStandardMaterial
        color="#fcbf47"
        metalness={0.9}
        roughness={0.2}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <T.Mesh position={[2.8, 0.3, 4.2]}>
      <T.CylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
      <T.MeshStandardMaterial
        color="#cccccc"
        metalness={0.9}
        roughness={0.2}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
  </T.Group>

  <!-- 3D Neumann U87 Desktop Studio Microphone (Center-Left - LOW & CLOSE) -->
  <T.Group
    position={[isMobile ? -8 : -2, isMobile ? 0 : -6, -18]}
    rotation={[0.15, 0.35, -0.05]}
    scale={isMobile ? [1.3, 1.3, 1.3] : [1.8, 1.8, 1.8]}
  >
    <!-- Weighted Studio Desk Base (Double ring base) -->
    <T.Mesh position={[0, -2, 0]}>
      <T.CylinderGeometry args={[1.3, 1.4, 0.25, 32]} />
      <T.MeshStandardMaterial
        color="#222222"
        metalness={0.7}
        roughness={0.3}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <T.Mesh position={[0, -1.8, 0]}>
      <T.CylinderGeometry args={[0.9, 1.1, 0.15, 32]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>

    <!-- Thick Support Pole (Brushed Gold) -->
    <T.Mesh position={[0, 0.5, 0]}>
      <T.CylinderGeometry args={[0.15, 0.15, 4.4, 16]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.9}
        roughness={0.2}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>

    <!-- Premium Boom Joint Bracket -->
    <T.Mesh position={[0, 2.7, 0]}>
      <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
      <T.MeshStandardMaterial
        color="#333333"
        metalness={0.7}
        roughness={0.3}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Gold Winged Adjustment Knob -->
    <T.Mesh position={[0, 2.7, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
      <T.CylinderGeometry args={[0.25, 0.25, 0.2, 8]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.9}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>

    <!-- Shockmount Suspension Cradle (Gold Ring) -->
    <T.Mesh position={[0, 3.8, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
      <T.TorusGeometry args={[1.1, 0.08, 8, 32]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Shockmount Crossed Elastic Cables -->
    {#each Array(4) as _, i}
      <T.Mesh
        position={[
          Math.cos((i * Math.PI) / 2) * 0.6,
          3.8,
          Math.sin((i * Math.PI) / 2) * 0.6 + 0.2,
        ]}
        rotation={[0, (i * Math.PI) / 2, 0]}
      >
        <T.CylinderGeometry args={[0.02, 0.02, 1.0, 8]} />
        <T.MeshStandardMaterial
          color="#111111"
          roughness={0.9}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
      <T.Mesh
        position={[
          Math.cos((i * Math.PI) / 2 + 0.4) * 0.5,
          3.8,
          Math.sin((i * Math.PI) / 2 + 0.4) * 0.5 + 0.2,
        ]}
        rotation={[0.2, (i * Math.PI) / 2, 0.2]}
      >
        <T.CylinderGeometry args={[0.015, 0.015, 0.9, 8]} />
        <T.MeshStandardMaterial
          color="#111111"
          roughness={0.9}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
    {/each}

    <!-- XLR Base Connector -->
    <T.Mesh position={[0, 2.9, 0.2]}>
      <T.CylinderGeometry args={[0.25, 0.25, 0.4, 16]} />
      <T.MeshStandardMaterial
        color="#555555"
        metalness={0.8}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- XLR Cable Curving Downwards -->
    <T.Group position={[0, 2.6, 0.2]}>
      {#each Array(4) as _, i}
        <T.Mesh
          position={[0.1 * i, -i * 0.4, -0.05 * i]}
          rotation={[0.15 * i, 0, 0.1 * i]}
        >
          <T.CylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
          <T.MeshStandardMaterial
            color="#1a1a1a"
            roughness={0.9}
            transparent
            opacity={musicOpacity}
          />
        </T.Mesh>
      {/each}
    </T.Group>

    <!-- Tapered Microphone Body -->
    <T.Mesh position={[0, 3.8, 0.2]}>
      <T.CylinderGeometry args={[0.48, 0.36, 1.5, 32]} />
      <T.MeshStandardMaterial
        color="#fcbf47"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Switches -->
    <T.Mesh position={[0, 4.0, 0.62]}>
      <T.BoxGeometry args={[0.06, 0.15, 0.06]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.9}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Divider Ring -->
    <T.Mesh position={[0, 4.6, 0.2]}>
      <T.CylinderGeometry args={[0.46, 0.46, 0.08, 32]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.9}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>

    <!-- Head Grill (Tapered Wedge Grill Mesh) -->
    <T.Mesh position={[0, 5.1, 0.2]}>
      <T.CylinderGeometry args={[0.34, 0.44, 0.9, 32]} />
      <T.MeshStandardMaterial
        color="#111111"
        wireframe={true}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>

    <!-- GOLDEN GRILL FRAME RAILS -->
    <T.Mesh position={[-0.38, 5.1, 0.35]} rotation={[0, 0, 0.1]}>
      <T.BoxGeometry args={[0.06, 0.92, 0.06]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <T.Mesh position={[0.38, 5.1, 0.35]} rotation={[0, 0, -0.1]}>
      <T.BoxGeometry args={[0.06, 0.92, 0.06]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <T.Mesh position={[-0.38, 5.1, 0.05]} rotation={[0, 0, 0.1]}>
      <T.BoxGeometry args={[0.06, 0.92, 0.06]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <T.Mesh position={[0.38, 5.1, 0.05]} rotation={[0, 0, -0.1]}>
      <T.BoxGeometry args={[0.06, 0.92, 0.06]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Top dome ring -->
    <T.Mesh position={[0, 5.56, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
      <T.TorusGeometry args={[0.34, 0.04, 8, 32]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Dome cap -->
    <T.Mesh position={[0, 5.56, 0.2]}>
      <T.SphereGeometry args={[0.33, 32, 16]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>

    <!-- Pop Filter clamped in front of mic -->
    <T.Group position={[0, 3.8, 0.2]}>
      <!-- Gooseneck clamp arm -->
      <T.Mesh position={[0.4, 0.2, 0.8]} rotation={[-0.3, 0, -0.3]}>
        <T.CylinderGeometry args={[0.04, 0.04, 1.4, 8]} />
        <T.MeshStandardMaterial
          color="#1a1a1a"
          metalness={0.5}
          roughness={0.5}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
      <!-- Pop Filter Frame Ring -->
      <T.Mesh position={[0, 1.2, 1.1]} rotation={[-0.05, 0, 0]}>
        <T.TorusGeometry args={[0.8, 0.05, 8, 32]} />
        <T.MeshStandardMaterial
          color="#111111"
          metalness={0.2}
          roughness={0.8}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
      <!-- Pop Filter Mesh Screen (Gold Translucent Mesh) -->
      <T.Mesh position={[0, 1.2, 1.1]} rotation={[Math.PI / 2 - 0.05, 0, 0]}>
        <T.CylinderGeometry args={[0.75, 0.75, 0.02, 16]} />
        <T.MeshStandardMaterial
          color="#d4af37"
          wireframe={true}
          metalness={0.7}
          transparent
          opacity={musicOpacity * 0.6}
        />
      </T.Mesh>
    </T.Group>
  </T.Group>

  <!-- Premium DJ Headphones (Mid-Right - HIGH) -->
  <T.Group
    position={[
      isMobile ? 9 : 18,
      isMobile ? -6 + Math.sin(musicWave) * 1.0 : 3 + Math.sin(musicWave) * 1.5,
      isMobile ? -25 : -30,
    ]}
    rotation={[0.4, -musicRotX, 0.2]}
    scale={isMobile ? [1.3, 1.3, 1.3] : [1.8, 1.8, 1.8]}
  >
    <T.Mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <T.TorusGeometry args={[3, 0.45, 12, 32, Math.PI]} />
      <T.MeshStandardMaterial
        color="#1f1f1f"
        metalness={0.2}
        roughness={0.8}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Headband Gold Outer Plate -->
    <T.Mesh position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
      <T.TorusGeometry args={[3.1, 0.1, 8, 32, Math.PI]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>

    <!-- Headband Left Collar (Gold Connection Joint) -->
    <T.Mesh position={[-3.0, 0.05, 0]} rotation={[0, 0, 0.1]}>
      <T.BoxGeometry args={[0.5, 0.5, 0.7]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        roughness={0.3}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <!-- Headband Right Collar (Gold Connection Joint) -->
    <T.Mesh position={[3.0, 0.05, 0]} rotation={[0, 0, -0.1]}>
      <T.BoxGeometry args={[0.5, 0.5, 0.7]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        roughness={0.3}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>

    <!-- Metal Extender Slider Rails (Silver) -->
    <T.Mesh position={[-3.0, -0.6, 0]} rotation={[0, 0, 0.05]}>
      <T.CylinderGeometry args={[0.06, 0.06, 1.4, 8]} />
      <T.MeshStandardMaterial
        color="#ffffff"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <T.Mesh position={[3.0, -0.6, 0]} rotation={[0, 0, -0.05]}>
      <T.CylinderGeometry args={[0.06, 0.06, 1.4, 8]} />
      <T.MeshStandardMaterial
        color="#ffffff"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>

    <!-- LEFT EAR CUP YOKE (Gold fork hinge) -->
    <T.Group position={[-3.05, -1.2, 0]}>
      <!-- Yoke Crossbar -->
      <T.Mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <T.BoxGeometry args={[1.5, 0.15, 0.3]} />
        <T.MeshStandardMaterial
          color="#111111"
          metalness={0.5}
          roughness={0.5}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
      <!-- Yoke Left Arm -->
      <T.Mesh position={[0, -0.4, -0.7]} rotation={[0.4, 0, 0]}>
        <T.CylinderGeometry args={[0.05, 0.05, 0.9, 8]} />
        <T.MeshStandardMaterial
          color="#d4af37"
          metalness={0.8}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
      <!-- Yoke Right Arm -->
      <T.Mesh position={[0, -0.4, 0.7]} rotation={[-0.4, 0, 0]}>
        <T.CylinderGeometry args={[0.05, 0.05, 0.9, 8]} />
        <T.MeshStandardMaterial
          color="#d4af37"
          metalness={0.8}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
    </T.Group>

    <!-- RIGHT EAR CUP YOKE (Gold fork hinge) -->
    <T.Group position={[3.05, -1.2, 0]}>
      <!-- Yoke Crossbar -->
      <T.Mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <T.BoxGeometry args={[1.5, 0.15, 0.3]} />
        <T.MeshStandardMaterial
          color="#111111"
          metalness={0.5}
          roughness={0.5}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
      <!-- Yoke Left Arm -->
      <T.Mesh position={[0, -0.4, -0.7]} rotation={[0.4, 0, 0]}>
        <T.CylinderGeometry args={[0.05, 0.05, 0.9, 8]} />
        <T.MeshStandardMaterial
          color="#d4af37"
          metalness={0.8}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
      <!-- Yoke Right Arm -->
      <T.Mesh position={[0, -0.4, 0.7]} rotation={[-0.4, 0, 0]}>
        <T.CylinderGeometry args={[0.05, 0.05, 0.9, 8]} />
        <T.MeshStandardMaterial
          color="#d4af37"
          metalness={0.8}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
    </T.Group>

    <!-- LEFT EAR CUP (Facing Inward/Right) -->
    <T.Group position={[-3.05, -1.8, 0]} rotation={[0, 0, 0.15]}>
      <!-- Cushion Pad (Soft Black Leather, facing right) -->
      <T.Mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <T.CylinderGeometry args={[1.5, 1.5, 0.6, 32]} />
        <T.MeshStandardMaterial
          color="#111111"
          metalness={0.1}
          roughness={0.9}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
      <!-- Cup Shell (Gold Outer Backing, facing left) -->
      <T.Mesh position={[-0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <T.CylinderGeometry args={[1.4, 1.4, 0.4, 32]} />
        <T.MeshStandardMaterial
          color="#fcbf47"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
      <!-- Open-Back Mesh Grill (Black wireframe mesh) -->
      <T.Mesh position={[-0.32, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <T.CylinderGeometry args={[0.95, 0.95, 0.05, 16]} />
        <T.MeshStandardMaterial
          color="#111111"
          wireframe={true}
          metalness={0.8}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
      <!-- Cup Center Accent Logo Plate (Gold) -->
      <T.Mesh position={[-0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <T.CylinderGeometry args={[0.45, 0.45, 0.05, 16]} />
        <T.MeshStandardMaterial
          color="#d4af37"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
      <!-- Cable Entry Jack -->
      <T.Mesh position={[0, -1.3, -0.6]} rotation={[Math.PI / 6, 0, 0]}>
        <T.CylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
        <T.MeshStandardMaterial
          color="#d4af37"
          metalness={0.9}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
    </T.Group>

    <!-- RIGHT EAR CUP (Facing Inward/Left) -->
    <T.Group position={[3.05, -1.8, 0]} rotation={[0, 0, -0.15]}>
      <!-- Cushion Pad (Soft Black Leather, facing left) -->
      <T.Mesh position={[-0.3, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <T.CylinderGeometry args={[1.5, 1.5, 0.6, 32]} />
        <T.MeshStandardMaterial
          color="#111111"
          metalness={0.1}
          roughness={0.9}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
      <!-- Cup Shell (Gold Outer Backing, facing right) -->
      <T.Mesh position={[0.1, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <T.CylinderGeometry args={[1.4, 1.4, 0.4, 32]} />
        <T.MeshStandardMaterial
          color="#fcbf47"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
      <!-- Open-Back Mesh Grill (Black wireframe mesh) -->
      <T.Mesh position={[0.32, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <T.CylinderGeometry args={[0.95, 0.95, 0.05, 16]} />
        <T.MeshStandardMaterial
          color="#111111"
          wireframe={true}
          metalness={0.8}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
      <!-- Cup Center Accent Logo Plate (Gold) -->
      <T.Mesh position={[0.35, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <T.CylinderGeometry args={[0.45, 0.45, 0.05, 16]} />
        <T.MeshStandardMaterial
          color="#d4af37"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
    </T.Group>

    <!-- Dangling Coiled Cable (Hanging from Left Cup) -->
    <T.Group position={[-3.1, -3.2, 0]} scale={[0.5, 0.5, 0.5]}>
      {#each Array(4) as _, i}
        <T.Mesh position={[0, -i * 0.8, 0]} rotation={[0.5 * i, 0.3 * i, 0]}>
          <T.TorusGeometry args={[0.4, 0.1, 8, 16]} />
          <T.MeshStandardMaterial
            color="#222222"
            roughness={0.9}
            transparent
            opacity={musicOpacity}
          />
        </T.Mesh>
      {/each}
    </T.Group>
  </T.Group>

  <!-- 3D MIDI Piano Keyboard Controller (Far Right - LOW) -->
  <T.Group
    position={[isMobile ? -8 : 38, isMobile ? -12 : -6, isMobile ? -24 : -26]}
    rotation={[0.7, 4.3, -0.3]}
    scale={isMobile ? [1.35, 1.35, 1.35] : [1.9, 1.9, 1.9]}
  >
    <!-- MIDI Chassis Bed -->
    <T.Mesh position={[0, 0, 0]}>
      <T.BoxGeometry args={[11.2, 0.6, 3.2]} />
      <T.MeshStandardMaterial
        color="#1a1a1a"
        metalness={0.5}
        roughness={0.6}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>

    <!-- Left Gold Cheek / End Plate -->
    <T.Mesh position={[-5.65, 0.05, 0]}>
      <T.BoxGeometry args={[0.2, 0.8, 3.3]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>

    <!-- Right Gold Cheek / End Plate -->
    <T.Mesh position={[5.65, 0.05, 0]}>
      <T.BoxGeometry args={[0.2, 0.8, 3.3]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>

    <!-- CONTROL SECTION (Left side of the MIDI controller) -->
    <!-- Control Plate Backdrop -->
    <T.Mesh position={[-4.0, 0.31, 0]}>
      <T.BoxGeometry args={[2.6, 0.05, 2.8]} />
      <T.MeshStandardMaterial
        color="#111111"
        metalness={0.3}
        roughness={0.9}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>

    <!-- Pitch Bend & Modulation Wheels (Gold Cylinders) -->
    <T.Mesh position={[-4.8, 0.45, 0.7]} rotation={[0, 0, Math.PI / 2]}>
      <T.CylinderGeometry args={[0.3, 0.3, 0.12, 16]} />
      <T.MeshStandardMaterial
        color="#fcbf47"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>
    <T.Mesh position={[-4.4, 0.45, 0.7]} rotation={[0, 0, Math.PI / 2]}>
      <T.CylinderGeometry args={[0.3, 0.3, 0.12, 16]} />
      <T.MeshStandardMaterial
        color="#d4af37"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={musicOpacity}
      />
    </T.Mesh>

    <!-- 4 Glowing Square Drum Pads (Yellow/Gold Glow) -->
    {#each Array(4) as _, i}
      <T.Mesh
        position={[
          -4.7 + (i % 2) * 0.65,
          0.35,
          -0.6 + Math.floor(i / 2) * 0.65,
        ]}
      >
        <T.BoxGeometry args={[0.45, 0.08, 0.45]} />
        <T.MeshStandardMaterial
          color="#fcbf47"
          emissive="#fcbf47"
          emissiveIntensity={1.2}
          roughness={0.5}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
    {/each}

    <!-- 4 Rotary Knobs (Gold Caps) -->
    {#each Array(4) as _, i}
      <T.Mesh
        position={[-3.3 + (i % 2) * 0.6, 0.45, -0.5 + Math.floor(i / 2) * 0.8]}
      >
        <T.CylinderGeometry args={[0.18, 0.18, 0.3, 16]} />
        <T.MeshStandardMaterial
          color="#d4af37"
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={musicOpacity}
        />
      </T.Mesh>
    {/each}

    <!-- KEY BED SECTION (Right side of the MIDI controller) -->
    {#each Array(10) as _, i}
      <!-- White Keys (aligned straight along X) -->
      <T.Mesh position={[-2.4 + i * 0.76, 0.35, 0.4]}>
        <T.BoxGeometry args={[0.62, 0.18, 2.0]} />
        <T.MeshStandardMaterial
          color={i % 3 === 0 ? "#fcbf47" : "#ffffff"}
          metalness={i % 3 === 0 ? 0.6 : 0.2}
          roughness={0.1}
          transparent
          opacity={musicOpacity * 0.9}
        />
      </T.Mesh>

      <!-- Black Keys (aligned straight along X with piano spacing) -->
      {#if i % 7 !== 2 && i % 7 !== 6 && i < 9}
        <T.Mesh position={[-2.02 + i * 0.76, 0.45, -0.1]}>
          <T.BoxGeometry args={[0.32, 0.25, 1.2]} />
          <T.MeshStandardMaterial
            color="#111111"
            metalness={0.8}
            roughness={0.1}
            transparent
            opacity={musicOpacity}
          />
        </T.Mesh>
      {/if}
    {/each}
  </T.Group>
</T.Group>
