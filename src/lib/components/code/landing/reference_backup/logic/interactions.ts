export function initLandingInteractions() {
  // Add isolated logic specifically for landing pages
  // e.g., custom GSAP or Anime.js sequences that don't affect the main site
  document.documentElement.classList.add('landing-page-active');

  return {
    cleanup() {
      document.documentElement.classList.remove('landing-page-active');
    }
  };
}
