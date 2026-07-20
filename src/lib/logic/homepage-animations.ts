// This file handles all the "Smooth Movements" (GSAP Animations) for the Homepage.
// Keeping it separate makes it much easier to find and fix visual issues.

import { gsap } from 'gsap';
import { animate, utils, createTimeline } from 'animejs';

export interface HomepageElements {
    title: HTMLElement | null;
    glow: HTMLElement | null;
}

/**
 * Initializes the main entrance animation sequence for the homepage.
 */
export function runHomepageEntranceAnimation(elements: HomepageElements) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Animate the Title (Simple & Robust)
    if (elements.title) {
        tl.fromTo(elements.title, 
            { 
                y: 50, 
                opacity: 0, 
                scale: 0.9,
                rotateX: -20
            }, 
            { 
                y: 0, 
                opacity: 1, 
                scale: 1,
                rotateX: 0,
                duration: 1.5, 
                ease: 'power3.out' 
            }, 
            0.2
        );
    }


    // 4. Animate Top Cinematic Nav (Text Portals)
    const navPortals = document.querySelectorAll('.nav-portal');
    if (navPortals.length > 0) {
        tl.fromTo(navPortals, 
            { 
                y: -30, 
                opacity: 0, 
                filter: 'blur(5px)'
            }, 
            { 
                y: 0, 
                opacity: 1, 
                filter: 'blur(0px)',
                stagger: 0.2, 
                duration: 1.2, 
                ease: 'power2.out' 
            }, 
            0.8
        );
        
        // Animate Dividers
        const navDividers = document.querySelectorAll('.nav-divider');
        if (navDividers.length > 0) {
            tl.fromTo(navDividers, 
                { scaleY: 0, opacity: 0 }, 
                { scaleY: 1, opacity: 0.5, duration: 1 }, 
                1.0
            );
        }

        // Animate Support Button
        const supportBtn = document.querySelector('.nav-support-btn');
        if (supportBtn) {
            tl.fromTo(supportBtn, 
                { 
                    y: -30, 
                    yPercent: -50,
                    opacity: 0, 
                    filter: 'blur(5px)'
                }, 
                { 
                    y: 0, 
                    yPercent: -50,
                    opacity: 1, 
                    filter: 'blur(0px)',
                    duration: 1.2, 
                    ease: 'power2.out' 
                }, 
                1.4
            );
        }
    }

    // 5. Animate Center Connect Button (Bottom)
    const connectBtn = document.querySelectorAll('.control-btn');
    if (connectBtn.length > 0) {
        tl.fromTo(connectBtn, 
            { scale: 0, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, 
            1.4
        );
    }

    // 5. Animate Center Neon Prism (Bottom)
    const connectPrism = document.querySelector('.connect-prism');
    if (connectPrism) {
        tl.fromTo(connectPrism, 
            { y: 50, opacity: 0, scale: 0.9 }, 
            { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out' }, 
            1.4
        );
    }

    // 6. Animate the Background Glow
    if (elements.glow) {
        tl.fromTo(elements.glow, 
            { opacity: 0, scale: 0.5 }, 
            { opacity: 0.4, scale: 1, duration: 1.2 }, 
            0.5
        );

        // Continuous pulsate effect for the glow
        gsap.to(elements.glow, { 
            opacity: 0.5, 
            scale: 1.2, 
            duration: 4, 
            repeat: -1, 
            yoyo: true, 
            ease: 'sine.inOut' 
        });
    }

    // 7. Trigger the Centerpiece "Life" removed

    // 8. Setup Footer Node Pulsing
    setupFooterNodeAnimations();

    // 9. Initialize Interactive Stardust
    initializeStardust();

    // 10. Start Identity Decoder (Scramble Effect)
    initializeIdentityDecoder();
}

/**
 * Sets up the interaction where hovering the 'About' portal highlights the Title.
 */
export function setupAboutPointerInteraction(titleElement: HTMLElement | null) {
    const aboutPortal = document.querySelector('.nav-portal[href="/about"]');
    if (!aboutPortal || !titleElement) return () => {};

    const handleEnter = () => {
        // "Point" to the title by glowing and scaling it
        gsap.to(titleElement, {
            scale: 1.05,
            textShadow: "0 0 40px rgba(255, 222, 33, 0.6)",
            color: "#ffde21", // Gold tint
            duration: 0.5,
            ease: "power2.out"
        });
    };

    const handleLeave = () => {
        gsap.to(titleElement, {
            scale: 1,
            textShadow: "0 0 0px rgba(255, 222, 33, 0)",
            color: "#ffffff",
            duration: 0.5,
            ease: "power2.out"
        });
    };

    aboutPortal.addEventListener('mouseenter', handleEnter);
    aboutPortal.addEventListener('mouseleave', handleLeave);

    return () => {
        aboutPortal.removeEventListener('mouseenter', handleEnter);
        aboutPortal.removeEventListener('mouseleave', handleLeave);
    };
}

/**
 * Animate the Identity Text ("INDEPENDENT ARTIST & DEVELOPER") with a scramble effect.
 */
function initializeIdentityDecoder() {
    const textElement = document.querySelector('.decoder-text');
    if (!textElement) return;

    const originalText = textElement.textContent || "";
    // Clear initial text to prevent flash
    textElement.textContent = "";

    // Custom Scramble Logic
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
    let iterations = 0;
    
    const scramble = () => {
        textElement.textContent = originalText
            .split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        
        if (iterations < originalText.length) {
            iterations += 1 / 3; // Speed control
            requestAnimationFrame(scramble);
        }
    };

    // Delay start to sync with entrance
    setTimeout(() => {
        scramble();
    }, 1500);
}


/**
 * Animates the footer social nodes to make them feel "alive".
 */
export function setupFooterNodeAnimations() {
    const nodes = document.querySelectorAll('.footer-link .social-icon');
    if (!nodes.length) return;

    nodes.forEach((node, i) => {
        // Floating animation
        animate(node, {
            translateY: [-2, 2],
            duration: 2000 + (i * 200),
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });

        // Hover effect for "Aura"
        node.addEventListener('mouseenter', () => {
            animate(node, {
                scale: 1.1,
                boxShadow: '0 0 20px rgba(255, 222, 33, 0.4)',
                borderColor: '#ffde21',
                duration: 400,
                easing: 'easeOutElastic(1, .6)'
            });
        });

        node.addEventListener('mouseleave', () => {
            animate(node, {
                scale: 1,
                boxShadow: '0 0 0px rgba(255, 222, 33, 0)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                duration: 600,
                easing: 'easeOutSine'
            });
        });
    });
}

/**
 * Interactive Stardust: Tiny magical particles that react to flow.
 */
export function initializeStardust() {
    const container = document.querySelector('.ambient-container');
    if (!container || typeof document === 'undefined') return;

    for (let i = 0; i < 25; i++) {
        const star = document.createElement('div');
        star.className = 'stardust-particle';
        // Varied sizes: 60% small (2px), 40% medium (4px)
        const size = Math.random() < 0.6 ? 2 : 4;
        const isGold = i % 3 === 0;
        Object.assign(star.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            background: isGold ? '#ffde21' : '#ffffff',
            borderRadius: '50%',
            opacity: Math.random() * 0.6 + 0.4,
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            pointerEvents: 'none',
            boxShadow: `0 0 ${size * 2}px ${isGold ? 'rgba(255, 222, 33, 0.8)' : 'rgba(255, 255, 255, 0.6)'}`
        });
        container.appendChild(star);

        animate(star, {
            translateX: () => utils.random(-200, 200),
            translateY: () => utils.random(-200, 200),
            opacity: [0.5, 1.0],
            duration: () => utils.random(4000, 8000),
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });
    }
}

/**
 * Handles the "Glow Follows Cursor" logic.
 */
let mouseMoveTimeout: ReturnType<typeof setTimeout> | null = null;

export function setupHomepageGlowInteraction(elements: { glow: HTMLElement | null, container: HTMLElement | null }) {
    const container = elements.container;
    const glow = elements.glow;
    if (!container || !glow) return () => {};

    const isMobile = () => typeof window !== 'undefined' && (window.innerWidth < 1338 || window.matchMedia('(pointer: coarse)').matches);

    // Initial disable on mobile/tablet or touch devices
    if (isMobile()) {
        glow.style.display = 'none';
    }

    const handleMove = (event: MouseEvent) => {
        if (isMobile()) {
            glow.style.display = 'none';
            return;
        }
        glow.style.display = 'block';

        const containerRect = container.getBoundingClientRect();
        const x = event.clientX - containerRect.left;
        const y = event.clientY - containerRect.top;

        gsap.to(glow, {
            x: x,
            y: y,
            xPercent: -50,
            yPercent: -50,
            opacity: 0.35,
            scale: 1.2,
            duration: 0.3,
            ease: 'power1.out'
        });

        if (mouseMoveTimeout !== null) clearTimeout(mouseMoveTimeout);
        mouseMoveTimeout = setTimeout(() => {
            if (isMobile()) return;
            gsap.to(glow, {
                xPercent: -50,
                yPercent: -50,
                opacity: 0.2,
                scale: 1,
                duration: 1.5,
                ease: 'power2.out'
            });
        }, 300);
    };

    container.addEventListener('mousemove', handleMove);
    return () => container.removeEventListener('mousemove', handleMove);
}

/**
 * Generates and animates ambient particles in a container.
 */
export function generateAmbientParticles(container: HTMLElement | null, count: number = 15) {
    if (!container || typeof document === 'undefined') return;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'ambient-particle';
        const size = Math.random() * 60 + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.filter = `blur(${Math.random() * 8 + 5}px)`;
        container.appendChild(particle);

        gsap.set(particle, { opacity: Math.random() * 0.2 + 0.1 });

        gsap.to(particle, {
            opacity: `+=${Math.random() * 0.2}`,
            duration: Math.random() * 4 + 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 2
        });
    }
}

/**
 * Svelte Action: Animates the Contact Deck entrance with a "Liquid Morph" feel.
 */
export function animateDeckEntrance(node: HTMLElement) {
    if (!node) return;

    // Initial State (mimic the button size/position)
    gsap.set(node, {
        scale: 0.8,
        opacity: 0,
        y: 20,
        filter: 'blur(10px)'
    });

    // Morph/Expand Animation
    gsap.to(node, {
        scale: 1,
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'elastic.out(1, 0.75)', // Organic bounce
        delay: 0.05
    });
    
    // Animate Children (Options)
    const options = node.querySelectorAll('.deck-btn, .deck-prompt, .deck-separator');
    gsap.fromTo(options, 
        { y: 10, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out', delay: 0.2 }
    );

    return {
        destroy() {
            // Optional cleanup if needed
        }
    };
}
