# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### In Progress
- Development of internal pages: `/about`, `/code`, and `/music`.
- Global navigation transition animations.

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
