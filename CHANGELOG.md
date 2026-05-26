# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### In Progress
- Global navigation transition animations.

## [2.1.0] - 2026-05-27

### Added
- **Static Landing Route Support**: Refactored landing page showcase routing from dynamic if-else rendering (`[project]`) to cleaner, decoupled static routes. Established first static showcase route for "Random Kit +Idle" at `/code/project/landing/random-kit-idle`.
- **Global Trademark Layout**: Created a shared `+layout.svelte` for `/landing` routes to auto-inject the **NISHA NAJIHAH // SYSTEM BACK** return bar across all landing pages.
- **Premium Glassmorphic Back Navigation**: Designed the return header as a floating glass capsule with smooth hover micro-animations, custom arrow translation, and glowing golden (`#ffde21`) hover state.
- **Anchor-Scroll Section Support**: Added `id="section-02"` to the Featured Deployments wrapper and programmed `onMount` anchor scroll tracking to smoothly scroll the custom viewport directly to the deployments section.
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
