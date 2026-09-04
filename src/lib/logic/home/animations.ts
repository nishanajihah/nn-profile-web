// This file handles all the "Smooth Movements" (GSAP Animations) for the Homepage.
// Keeping it separate makes it much easier to find and fix visual issues.

import { gsap } from 'gsap';
import { animate, utils } from 'animejs';

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
                duration: 1.2, 
                stagger: 0.15,
                ease: 'power3.out' 
            }, 
            0.8
        );
    }
}

/**
 * Adds an interactive, subtle tilt effect to the homepage title based on mouse movement.
 */
export function setupTitleMouseTilt(titleElement: HTMLElement | null) {
    if (!titleElement) return () => {};

    const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;

        gsap.to(titleElement, {
            rotateY: x * 8,
            rotateX: -y * 8,
            duration: 0.8,
            ease: 'power2.out'
        });
    };

    const handleMouseLeave = () => {
        gsap.to(titleElement, {
            rotateY: 0,
            rotateX: 0,
            duration: 1,
            ease: 'power2.out'
        });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
    };
}

/**
 * High-performance mouse particle trail effect using Anime.js
 */
export function setupMouseParticleTrail(container: HTMLElement | null) {
    if (!container || typeof document === 'undefined') return () => {};

    let activeParticles = 0;
    const MAX_PARTICLES = 15;

    const createParticle = (x: number, y: number) => {
        if (activeParticles >= MAX_PARTICLES) return;
        activeParticles++;

        const particle = document.createElement('div');
        particle.className = 'homepage-cursor-particle';
        
        const size = utils.random(4, 10);
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(255, 222, 33, 0.9) 0%, rgba(255, 170, 51, 0.4) 70%, transparent 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 ${size * 2}px rgba(255, 222, 33, 0.8);
        `;

        container.appendChild(particle);

        const destinationX = x + utils.random(-40, 40);
        const destinationY = y + utils.random(-40, 40);

        animate(particle, {
            translateX: [0, destinationX - x],
            translateY: [0, destinationY - y],
            scale: [1, 0],
            opacity: [1, 0],
            duration: utils.random(600, 1000),
            ease: 'easeOutExpo',
            complete: () => {
                particle.remove();
                activeParticles--;
            }
        });
    };

    let lastX = 0;
    let lastY = 0;
    let throttleTimeout = false;

    const handleMouseMove = (e: MouseEvent) => {
        const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        if (dist > 15 && !throttleTimeout) {
            createParticle(e.clientX, e.clientY);
            lastX = e.clientX;
            lastY = e.clientY;
            
            throttleTimeout = true;
            setTimeout(() => { throttleTimeout = false; }, 30);
        }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
    };
}

export function setupHomepageGlowInteraction(target: { glow?: HTMLElement | null; container?: HTMLElement | null } | HTMLElement | null) {
    const glowElement = target && 'glow' in target ? target.glow : target;
    if (!glowElement) return () => {};
    const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 100;
        const y = (e.clientY / window.innerHeight - 0.5) * 100;
        gsap.to(glowElement, {
            x: x * 0.5,
            y: y * 0.5,
            duration: 1.2,
            ease: 'power2.out'
        });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
}

/**
 * Sets up the interaction where hovering the 'About' portal in navigation highlights the Title.
 */
export function setupAboutPointerInteraction(titleElement: HTMLElement | null) {
    if (!titleElement || typeof document === 'undefined') return () => {};

    const aboutPortal = document.getElementById('about-portal') || document.querySelector('.top-cinematic-nav a[href="/about"]');
    if (!aboutPortal) return () => {};

    const handleEnter = () => {
        titleElement.classList.add("about-hovered");
        gsap.to(titleElement, {
            scale: 1.04,
            y: -6,
            duration: 0.4,
            ease: 'power2.out'
        });
    };

    const handleLeave = () => {
        titleElement.classList.remove("about-hovered");
        gsap.to(titleElement, {
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
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
 * Interactive Stardust: Tiny magical star dots that float and glow.
 */
export function initializeStardust(container: HTMLElement | null) {
    const targetContainer = container || (document.querySelector('.ambient-container') as HTMLElement);
    if (!targetContainer || typeof document === 'undefined') return;

    for (let i = 0; i < 35; i++) {
        const star = document.createElement('div');
        star.className = 'stardust-particle';
        const size = Math.random() < 0.6 ? 2.5 : 4.5;
        const isGold = i % 3 === 0;
        Object.assign(star.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            background: isGold ? '#ffde21' : '#ffffff',
            borderRadius: '50%',
            opacity: String(Math.random() * 0.6 + 0.4),
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            pointerEvents: 'none',
            boxShadow: `0 0 ${size * 2}px ${isGold ? 'rgba(255, 222, 33, 0.9)' : 'rgba(255, 255, 255, 0.7)'}`
        });
        targetContainer.appendChild(star);

        animate(star, {
            translateX: () => utils.random(-200, 200),
            translateY: () => utils.random(-200, 200),
            opacity: [0.3, 1.0],
            duration: () => utils.random(4000, 8000),
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });
    }
}

/**
 * Generates and animates ambient particles & floating star dots in a container.
 */
export function generateAmbientParticles(container: HTMLElement | null, count: number = 20) {
    const targetContainer = container || (document.querySelector('.ambient-container') as HTMLElement);
    if (!targetContainer || typeof document === 'undefined') return;

    // Create both ambient blurred particles and magical star dots
    initializeStardust(targetContainer);

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'ambient-particle';
        const size = Math.random() * 60 + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.filter = `blur(${Math.random() * 8 + 5}px)`;
        targetContainer.appendChild(particle);

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

export function animateDeckEntrance(node?: HTMLElement) {
    if (node) {
        gsap.fromTo(node, 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        );
    }
}

/**
 * Neural-Tech Network Line Node Canvas overlay for homepage & footer
 */
export function setupFooterNodeAnimations(canvas?: HTMLCanvasElement | null, container?: HTMLElement | null) {
    const targetCanvas = canvas || (document.querySelector('.footer-node-canvas') as HTMLCanvasElement);
    const targetContainer = container || (document.querySelector('.home-footer') as HTMLElement);

    if (!targetCanvas || !targetContainer || typeof document === 'undefined') return () => {};

    const ctx = targetCanvas.getContext('2d');
    if (!ctx) return () => {};

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    interface Node {
        x: number;
        y: number;
        vx: number;
        vy: number;
        radius: number;
        baseAlpha: number;
    }

    const nodes: Node[] = [];
    const isMobile = () => typeof window !== 'undefined' && (window.innerWidth < 1338 || window.matchMedia('(pointer: coarse)').matches);
    const nodeCount = isMobile() ? 12 : 32;

    const resize = () => {
        const rect = targetContainer.getBoundingClientRect();
        width = rect.width;
        height = rect.height;

        const dpr = window.devicePixelRatio || 1;
        targetCanvas.width = width * dpr;
        targetCanvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        targetCanvas.style.width = `${width}px`;
        targetCanvas.style.height = `${height}px`;
    };

    const initNodes = () => {
        nodes.length = 0;
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * (isMobile() ? 0.2 : 0.4),
                vy: (Math.random() - 0.5) * (isMobile() ? 0.2 : 0.4),
                radius: Math.random() * 1.8 + 1,
                baseAlpha: Math.random() * 0.5 + 0.3
            });
        }
    };

    resize();
    initNodes();

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
        const rect = targetCanvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
        mouseX = -1000;
        mouseY = -1000;
    };

    window.addEventListener('resize', () => {
        resize();
        initNodes();
    });

    if (!isMobile()) {
        targetContainer.addEventListener('mousemove', handleMouseMove);
        targetContainer.addEventListener('mouseleave', handleMouseLeave);
    }

    const render = () => {
        ctx.clearRect(0, 0, width, height);

        nodes.forEach((node, i) => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 222, 33, ${node.baseAlpha})`;
            ctx.fill();

            for (let j = i + 1; j < nodes.length; j++) {
                const other = nodes[j];
                const dx = other.x - node.x;
                const dy = other.y - node.y;
                const dist = Math.hypot(dx, dy);

                const maxDist = isMobile() ? 90 : 130;
                if (dist < maxDist) {
                    const lineAlpha = (1 - dist / maxDist) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.strokeStyle = `rgba(255, 222, 33, ${lineAlpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }

            if (!isMobile()) {
                const mouseDist = Math.hypot(mouseX - node.x, mouseY - node.y);
                const mouseRadius = 140;
                if (mouseDist < mouseRadius) {
                    const lineAlpha = (1 - mouseDist / mouseRadius) * 0.6;
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.strokeStyle = `rgba(255, 222, 33, ${lineAlpha})`;
                    ctx.lineWidth = 1.2;
                    ctx.stroke();
                }
            }
        });

        animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', resize);
        if (!isMobile()) {
            targetContainer.removeEventListener('mousemove', handleMouseMove);
            targetContainer.removeEventListener('mouseleave', handleMouseLeave);
        }
    };
}
