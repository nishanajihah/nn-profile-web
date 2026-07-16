# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.4.0] - 2026-07-17

### Added
- **Unified Favicon Package**: Integrated a full suite of generated site favicons (16x16, 32x32, apple-touch, and android-chrome variants) via `site.webmanifest` inside `+layout.svelte`, excluding the raw vector SVG.
- **Header Navigation Variant `compact`**: Introduced a new `'compact'` layout variant to separate **About** and **Code** pages from the Music page. It renders a completely transparent, boxless header with squeezed padding and gap spacing.
- **Heart-Only Support Button**: Programmed the Support Me button on all subpages to automatically hide its text label and scale down to a touch-optimized heart-only button when entering tablet screens (`<= 1200px`) and smaller.
- **Symmetrical Mobile Positioning**: Synchronized all page navigation bars (Home, About, Code, and Music) to use the exact same absolute positioning (`position: absolute !important` at `top: 5vh !important`) on mobile viewports.
- **Main Link Highlights**: Cleaned up the header structure by hiding the secondary subtitle lines (`.nav-sub`) on all pages. Replaced vertical shift animations with subtle scaling hover actions (`scale(1.05)`) and added a yellow glow shadow to the active page labels.
- **Mobile Overlap Collision Prevention**: Added custom right-side padding (`padding-right: 32px`) to the mobile navigation containers, creating an invisible safety buffer that allows the Support Me button to overlap the navbar edge without clipping the rightmost text link (`VISUAL`).
- **Gmail Contact Integration**: Shifted email redirection coordinates to direct to Gmail (`nishanajihah.dev@gmail.com`) instead of Outlook, optimizing communications flow.

### Changed
- **Spotify Web API Restructuring**: Upgraded the Spotify API integration with robust error handling and fallbacks to handle Spotify's restriction requiring active premium accounts for player queries.
- **Shared Footer Component Refactor**: Replaced the legacy hardcoded footer on the homepage with the shared Svelte `<Footer />` component to align layout code.
- **Pure Black Cinematic Backdrop**: Updated the homepage background canvas color to pure black (`#000000`) instead of dark grey for a premium, high-contrast look.
- **3D About Page Refinements**: Retuned Threlte coordinate offsets and GSAP timelines on the About page for smoother 3D parallax scroll translations.

## [2.3.0] - 2026-06-05

### Added
- **Pinned Storytelling Architecture**: Transformed the About page into a fixed-screen GSAP presentation. The screen pins in place, and the user's scroll wheel scrubs through a master animation timeline, seamlessly transitioning sections in and out of the same viewport without vertical scrolling.
- **2D/3D Bio Card Animations**: Bio cards now fly into the fixed screen with dynamic 3D rotations (`rotateX`, `rotateY`) and fade out elegantly, creating a highly polished, immersive reading experience.
- **Infinite 3D Horizon Background**: Massively expanded the Threlte 3D halftone grid to cover any ultra-wide screen and tilted the perspective to create an infinite, endless 3D floor that reacts to cursor movements and ambient time loops.
- **Scroll-Synced 3D Camera**: Hooked the GSAP scroll progress directly into the Threlte 3D canvas. The 3D camera now dynamically pans up and zooms in as the user progresses through the pinned story timeline.
- **Premium Ko-fi Redesign**: Refactored the Ko-fi section into a glowing, glassmorphic container that invites user interaction and beautifully matches the site's sleek aesthetic.
- **Code Separation**: Decoupled About page logic (`logic/about.ts`) and styling (`styles/about.scss`) from the main view layer to improve scalability and maintainability.

### In Progress
- Global navigation transition animations.

## [2.2.0] - 2026-05-31

### Added
- **About Page Full Digital Presence**: Integrated all 12 social links (GitHub, Instagram, Spotify, Apple Music, Deezer, Audiomack, SoundCloud, Ko-fi, LinkedIn, YouTube, Threads, and Email) into the about page footer (`variant="about"`), ensuring complete coverage across both desktop layout and mobile full-screen overlay popup grid.

### Cleaned Up
- **Style Duplication Clean-up**: Removed duplicated SCSS blocks from `<style>` inside `Footer.svelte` to ensure all styles are loaded purely from `footer.scss` as intended, preventing style replication in the build assets.

## [2.1.0] - 2026-05-27

### Added
- **Static Landing Route Support**: Refactored landing page showcase routing from dynamic if-else rendering (`[project]`) to cleaner, decoupled static routes. Established first static showcase route for "Random Kit +Idle" at `/code/project/landing/random-kit-idle`.
- **Global Trademark Layout**: Created a shared `+layout.svelte` for `/landing` routes to auto-inject the **NISHA NAJIHAH // SYSTEM BACK** return bar across all landing pages.
- **Premium Glassmorphic Back Navigation**: Designed the return header as a floating glass capsule with smooth hover micro-animations, custom arrow translation, and glowing golden (`#ffde21`) hover state.
- **Anchor-Scroll Section Support**: Added `id="section-02"` to the Featured Deployments wrapper and programmed `onMount` anchor scroll tracking to smoothly scroll the custom viewport directly to the deployments section.
- **Synchronized View More Button Stagger**: Integrated the 'View More' repository button into Section 03's Anime.js stagger sequence, ensuring it fades and glides into position smoothly right after the last repository card.
- **Context-Aware Error Routing**: Upgraded the global SvelteKit `+error.svelte` page. Errors under the `/landing/` paths now dynamically render a specialized **"Return to Code"** CTA pointing directly to `/code#section-02` instead of the root homepage.

### Removed / Cleaned Up
- **Unused Music Components**: Deleted obsolete `TrackCard.svelte` and `VinylRecord.svelte` components, and cleaned up corresponding unused imports in the `/music` route.
- **Workspace Compilation Hygiene**: Backed up old dynamic landing components to `reference_backup` and appended a `.bak` extension to their filenames, resolving all `svelte-check` compilation errors and warnings.

## [2.0.0] - 2026-04-18

### Added
- **Cinematic Homepage 2.0**: Completely redesigned interface with massive 3D typography and identity decoder.
- **Tiered Responsive Engine**: 
  - **Desktop (1338px+)**: Full hover-interactive brand color mode.
  - **Tablet (1000px - 1337px)**: Centered 3-row footer with permanent social labels and unified yellow highlight.
  - **Mobile (< 999px)**: Space-optimized toggle logic with premium social popup overlay.
- **Social Interaction System**: Standardized interaction model with brand-specific hover labels on desktop and unified touch highlights on handheld devices.
- **Premium Backdrop Filter**: Implemented high-end blur and frosted glass effects across popups and containers.
- **Project Foundation**: robust separation of services, logic, styles, and reusable Svelte components.

### Fixed
- Footer overlap issues on short-viewport devices via flexible flexbox container logic.
- Responsive break-point synchronization across `app.scss` and `homepage-design.scss`.
- Static copyright styling to prevent accidental interaction highlights.

## [1.0.0] - Earlier
- Initial SvelteKit + Bulma setup.
- Basic route structure and GitHub service integration.
