import { writable } from 'svelte/store';

// Global scroll progress store (0.0 to 1.0)
export const scrollProgress = writable(0);

export const aboutSections = [
  {
    id: 'hero',
    giantWord1: "NISHA",
    giantWord2: "NAJIHAH",
    subtitle: "Engineer of Logic. Composer of Music. Based in Kuala Lumpur, Malaysia."
  },
  {
    id: 'robotics',
    giantWord1: "ENGINEERING",
    giantWord2: "THE FUTURE",
    subtitle: "Engineering robots, IoT, AI logic, and web & apps from the ground up."
  },
  {
    id: 'music',
    giantWord1: "COMPOSING",
    giantWord2: "MUSIC",
    subtitle: "Independent singer-songwriter. Creating and producing from the soul."
  },
  {
    id: 'convergence',
    giantWord1: "FUEL",
    giantWord2: "THE JOURNEY",
    subtitle: "Fuel the servers for the next app. Fuel the studio for the next song."
  }
];

/**
 * Calculates the scale of a grid item based on its distance from the pointer and ambient time.
 * Used to create the 3D Halftone ambient wave effect.
 */
export function calculateGridScale(
  x: number, 
  y: number, 
  targetX: number, 
  targetY: number, 
  radius: number,
  time: number
): number {
  const dx = x - targetX;
  const dy = y - targetY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Normalize distance: 0 at center, 1 at radius
  const normalizedDistance = Math.min(distance / radius, 1.0);
  
  // Smooth easing for the mouse halftone gradient
  const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const mouseEffect = 1.0 - easeInOutQuad(normalizedDistance);
  
  // Ambient wave based on position and time
  const ambientWave = (Math.sin(x * 0.3 + time * 2) + Math.cos(y * 0.3 + time * 2)) * 0.5;

  // Mix mouse effect and ambient wave.
  // Ambient wave creates a slight ripple (0 to 0.3).
  // Mouse effect forces a huge expansion (up to 1.0).
  return mouseEffect + (ambientWave * 0.15);
}
