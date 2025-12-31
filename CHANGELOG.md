# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- created new sveltekit with bulma

## [2.0.0] - 2025-12-29

### Added

- Services (src/lib/services/): Purely for data fetching and external API interaction (e.g., github.service.ts).
- Logic (src/lib/logic/): Page-specific TypeScript logic, such as GSAP animation timelines or interaction handlers (e.g., home.animation.ts).
- Styles (src/lib/styles/): Refined SCSS files, separated by responsibility (e.g., brand-theme.scss, home.pages.scss).
- Components (src/lib/components/): Reusable UI building blocks (e.g., ProjectCard.svelte, AnimatedTitle.svelte).
- Route Handlers: +page.server.ts will act as a "thin wrapper" that only calls the services in /lib, keeping the route folder lean.

### Fixed

### Changed

### Removed

## [2.1.0] - 2025-12-30

### Added

- Danish translation (#297).
- Georgian translation from (#337).
- Changelog inconsistency section in Bad Practices.

### Fixed

- Italian translation (#332).
- Indonesian translation (#336).

[unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/v1.1.1...HEAD
[1.1.1]: https://github.com/olivierlacan/keep-a-changelog/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/olivierlacan/keep-a-changelog/compare/v1.0.0...v1.1.0
