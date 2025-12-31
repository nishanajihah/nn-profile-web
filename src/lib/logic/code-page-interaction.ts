// This file handles all the page interactions and animations for the Code page.
// It connects the data from the service to the visual movements on the screen.

import { gsap } from 'gsap';

/**
 * Entrance animation for project cards and headers on the Code page.
 */
export function animateCodePageEntrance() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.code-title', {
        y: 40,
        opacity: 0,
        duration: 0.8
    })
    .from('.code-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.6
    }, '-=0.4')
    .from('.stat-box', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
    }, '-=0.3')
    .from('.project-card', {
        scale: 0.9,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6
    }, '-=0.2');
}

/**
 * Filter projects based on a search term.
 * (This is a logical function separate from the UI components)
 */
export function filterProjects(projects: any[], term: string) {
    if (!term) return projects;
    const lowerTerm = term.toLowerCase();
    return projects.filter(p => 
        p.name.toLowerCase().includes(lowerTerm) || 
        (p.description && p.description.toLowerCase().includes(lowerTerm)) ||
        (p.language && p.language.toLowerCase().includes(lowerTerm))
    );
}
