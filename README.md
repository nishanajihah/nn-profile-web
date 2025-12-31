# Nisha Najihah - Profile v2.0.0

A modern, high-performance portfolio website built with **SvelteKit**, **TypeScript**, and **Bulma CSS**.

## 🚀 Features

- **Architecture:** Robust separation of concerns via `services/`, `logic/`, `styles/`, and `types/`.
- **Animations:** High-impact GSAP timelines and interactive cursor effects.
- **Data:** Dynamic GitHub repository fetching via Octokit.
- **Design:** Customized Bulma pillars with a premium dark aesthetic and brand-yellow accents.

## 🏗️ Project Structure

- `src/lib/services/`: External API interaction (GitHub, etc).
- `src/lib/logic/`: Page-specific TypeScript functions and GSAP interactions.
- `src/lib/styles/`: Decoupled SCSS files for layout and design tokens.
- `src/lib/types/`: Centralized TypeScript interfaces for data consistency.
- `src/routes/`: SvelteKit's route-based layout system.

## 🛠️ Tech Stack

- **Framework:** [SvelteKit](https://kit.svelte.dev/)
- **Styling:** [Bulma CSS](https://bulma.io/) & [Sass](https://sass-lang.com/)
- **Animations:** [GSAP](https://gsap.com/)
- **Languages:** [TypeScript](https://www.typescriptlang.org/)

## 💻 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 📦 Building

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```
