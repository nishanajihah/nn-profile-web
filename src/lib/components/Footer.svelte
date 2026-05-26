<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { fade } from 'svelte/transition';
  import '$lib/styles/footer.scss';
  import { setupFooterNodeAnimations } from '$lib/logic/homepage-animations';

  // "home", "code", or "music"
  export let variant: 'home' | 'code' | 'music' = 'home';
  let isSocialOpen = false;

  // Per-variant email address in the social set
  $: emailHref = variant === 'code' ? 'mailto:nishanajihah.dev@gmail.com' : 'mailto:nishanajihah@gmail.com';
  $: emailLabel = variant === 'code' ? 'DEV EMAIL' : 'EMAIL';

  onMount(() => {
    if (browser) {
      // Small delay so the DOM is fully painted before querying icons
      const t = setTimeout(() => setupFooterNodeAnimations(), 300);
      return () => clearTimeout(t);
    }
  });
</script>

<footer class="home-footer has-text-centered">
  <div class="container">
    <div class="footer-single-row">
      <!-- Links Group (LEFT on desktop) -->
      <div class="footer-links-group">
        <!-- Privacy Link -->
        <div class="footer-privacy">
          <a href="/privacy" class="privacy-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span class="is-hidden-mobile">Privacy Policy</span>
            <span class="is-hidden-tablet">Privacy</span>
          </a>
        </div>

        <!-- Social Toggle (ONLY visible on mobile) -->
        <div class="footer-social-mobile-container is-hidden-tablet">
          <button
            class="social-mobile-toggle"
            on:click={() => (isSocialOpen = !isSocialOpen)}
            aria-label="Toggle social links"
          >
            <span class="toggle-text">Social</span>
            <div class="toggle-dots">
              <span></span><span></span><span></span>
            </div>
          </button>
        </div>

        <!-- Terms Link -->
        <div class="footer-terms">
          <a href="/terms-and-conditions" class="terms-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            <span class="is-hidden-mobile">Terms & Conditions</span>
            <span class="is-hidden-tablet">T&C</span>
          </a>
        </div>
      </div>

      <!-- Social Icons (CENTER on desktop) -->
      <div class="footer-social-wrapper is-hidden-mobile">
        <div class="footer-social">
          {#if variant === 'home'}
            <!-- HOMEPAGE SOCIAL SET -->
            <a href="https://github.com/nishanajihah" target="_blank" class="footer-link github-link" title="GitHub">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </span>
              <span class="footer-label">GitHub</span>
            </a>
            <a href="https://www.instagram.com/nisha.najihah" target="_blank" class="footer-link instagram-link" title="Instagram">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </span>
              <span class="footer-label">Instagram</span>
            </a>
            <a href="https://open.spotify.com/artist/2rI5YRwSaBF0IEwiCN7SEa?si=UCYBvh9dRIyUolcoTZPb9w" target="_blank" class="footer-link spotify-link" title="Spotify">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 11.5c4-1 8 0 8 0"></path><path d="M7 14.5c5-1.5 10 0 10 0"></path><path d="M9 8.5c3-1 6 0 6 0"></path></svg>
              </span>
              <span class="footer-label">Spotify</span>
            </a>
            <a href="https://music.apple.com/us/artist/nisha-najihah/1598242580" target="_blank" class="footer-link apple-link" title="Apple Music">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path><path d="M16 8v8a2 2 0 1 1-2-2V6l4-2v4h-2z"></path></svg>
              </span>
              <span class="footer-label">Apple Music</span>
            </a>
            <a href="https://ko-fi.com/nishanajihah" target="_blank" class="footer-link kofi-link" title="Support on Ko-fi">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
              </span>
              <span class="footer-label">Ko-fi</span>
            </a>
            <a href="https://www.linkedin.com/in/nisha-najihah" target="_blank" class="footer-link linkedin-link" title="LinkedIn">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </span>
              <span class="footer-label">LinkedIn</span>
            </a>
            <a href="https://www.youtube.com/@nisha.najihah" target="_blank" class="footer-link youtube-link" title="YouTube">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </span>
              <span class="footer-label">YouTube</span>
            </a>
            <a href="https://github.com/nishanajihah" target="_blank" class="footer-link github-link" title="GitHub">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </span>
              <span class="footer-label">GitHub</span>
            </a>
            <a href="https://www.instagram.com/nisha.najihah" target="_blank" class="footer-link instagram-link" title="Instagram">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </span>
              <span class="footer-label">Instagram</span>
            </a>
            <a href="https://open.spotify.com/artist/2rI5YRwSaBF0IEwiCN7SEa?si=UCYBvh9dRIyUolcoTZPb9w" target="_blank" class="footer-link spotify-link" title="Spotify">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 11.5c4-1 8 0 8 0"></path><path d="M7 14.5c5-1.5 10 0 10 0"></path><path d="M9 8.5c3-1 6 0 6 0"></path></svg>
              </span>
              <span class="footer-label">Spotify</span>
            </a>
            <a href="https://music.apple.com/us/artist/nisha-najihah/1598242580" target="_blank" class="footer-link apple-link" title="Apple Music">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path><path d="M16 8v8a2 2 0 1 1-2-2V6l4-2v4h-2z"></path></svg>
              </span>
              <span class="footer-label">Apple Music</span>
            </a>
            <a href="https://ko-fi.com/nishanajihah" target="_blank" class="footer-link kofi-link" title="Support on Ko-fi">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
              </span>
              <span class="footer-label">Ko-fi</span>
            </a>
            <a href="https://www.linkedin.com/in/nisha-najihah" target="_blank" class="footer-link linkedin-link" title="LinkedIn">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </span>
              <span class="footer-label">LinkedIn</span>
            </a>
            <a href="https://www.youtube.com/@nisha.najihah" target="_blank" class="footer-link youtube-link" title="YouTube">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </span>
              <span class="footer-label">YouTube</span>
            </a>
            <a href="https://www.threads.com/@nisha.najihah" target="_blank" class="footer-link threads-link" title="Threads">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.25 8.5c-.2-2.5-1.8-4.5-4.5-5.5-1.5-.5-3-.5-4.5 0-2.7 1-4.3 3-4.5 5.5-.1 1.5.2 3 1 4.3.8 1.3 2 2.2 3.5 2.7 1.5.5 3 .5 4.5 0 1.5-.5 2.7-1.4 3.5-2.7.8-1.3 1.1-2.8 1-4.3z"></path><path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4"></path><circle cx="18" cy="6" r="1"></circle></svg>
              </span>
              <span class="footer-label">Threads</span>
            </a>
            <a href={emailHref} class="footer-link contact-link" title="Email">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </span>
              <span class="footer-label">{emailLabel}</span>
            </a>
          {:else if variant === 'code'}
            <a href="https://www.youtube.com/@nisha.najihah" target="_blank" class="footer-link youtube-link" title="YouTube">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </span>
              <span class="footer-label">YouTube</span>
            </a>
            <a href="https://ko-fi.com/nishanajihah" target="_blank" class="footer-link kofi-link" title="Support on Ko-fi">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
              </span>
              <span class="footer-label">Ko-fi</span>
            </a>
            <a href="https://github.com/nishanajihah" target="_blank" class="footer-link github-link" title="GitHub">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </span>
              <span class="footer-label">GitHub</span>
            </a>
            <a href="https://www.threads.com/@nisha.najihah" target="_blank" class="footer-link threads-link" title="Threads">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.25 8.5c-.2-2.5-1.8-4.5-4.5-5.5-1.5-.5-3-.5-4.5 0-2.7 1-4.3 3-4.5 5.5-.1 1.5.2 3 1 4.3.8 1.3 2 2.2 3.5 2.7 1.5.5 3 .5 4.5 0 1.5-.5 2.7-1.4 3.5-2.7.8-1.3 1.1-2.8 1-4.3z"></path><path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4"></path><circle cx="18" cy="6" r="1"></circle></svg>
              </span>
              <span class="footer-label">Threads</span>
            </a>
            <a href="https://www.instagram.com/nisha.najihah" target="_blank" class="footer-link instagram-link" title="Instagram">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </span>
              <span class="footer-label">Instagram</span>
            </a>
            <a href="https://www.linkedin.com/in/nisha-najihah" target="_blank" class="footer-link linkedin-link" title="LinkedIn">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </span>
              <span class="footer-label">LinkedIn</span>
            </a>
            <a href={emailHref} class="footer-link contact-link" title="Email">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </span>
              <span class="footer-label">{emailLabel}</span>
            </a>
          {:else if variant === 'music'}
            <a href="https://open.spotify.com/artist/2rI5YRwSaBF0IEwiCN7SEa?si=UCYBvh9dRIyUolcoTZPb9w" target="_blank" class="footer-link spotify-link" title="Spotify">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 11.5c4-1 8 0 8 0"></path><path d="M7 14.5c5-1.5 10 0 10 0"></path><path d="M9 8.5c3-1 6 0 6 0"></path></svg>
              </span>
              <span class="footer-label">Spotify</span>
            </a>
            <a href="https://music.apple.com/us/artist/nisha-najihah/1598242580" target="_blank" class="footer-link apple-link" title="Apple Music">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path><path d="M16 8v8a2 2 0 1 1-2-2V6l4-2v4h-2z"></path></svg>
              </span>
              <span class="footer-label">Apple Music</span>
            </a>
            <a href="https://www.deezer.com/us/artist/153054282" target="_blank" class="footer-link deezer-link" title="Deezer">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
              </span>
              <span class="footer-label">Deezer</span>
            </a>
            <a href="https://audiomack.com/nisha-najihah" target="_blank" class="footer-link audiomack-link" title="Audiomack">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
              </span>
              <span class="footer-label">Audiomack</span>
            </a>
            <a href="https://soundcloud.com/nishanajihah" target="_blank" class="footer-link soundcloud-link" title="SoundCloud">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
              </span>
              <span class="footer-label">SoundCloud</span>
            </a>
            <a href="https://ko-fi.com/nishanajihah" target="_blank" class="footer-link kofi-link" title="Ko-fi">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
              </span>
              <span class="footer-label">Ko-fi</span>
            </a>
            <a href="https://www.youtube.com/@nisha.najihah" target="_blank" class="footer-link youtube-link" title="YouTube">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </span>
              <span class="footer-label">YouTube</span>
            </a>
            <a href={emailHref} class="footer-link contact-link" title="Email">
              <span class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </span>
              <span class="footer-label">{emailLabel}</span>
            </a>
          {/if}
        </div>
      </div>

      <!-- COPYRIGHT (RIGHT on desktop) -->
      <div class="footer-copyright">
        <div class="copyright-link">
          <span class="copyright-line">© {new Date().getFullYear()} Nisha Najihah</span>
          <span class="copyright-credit">&nbsp;|&nbsp;Designed &amp; Built</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Social Popup overlay when clicking "Social" on mobile -->
  {#if isSocialOpen}
    <div
      class="social-popup-overlay"
      transition:fade={{ duration: 200 }}
      on:click|self={() => (isSocialOpen = false)}
      role="button"
      tabindex="0"
      on:keydown={(e) => e.key === 'Escape' && (isSocialOpen = false)}
    >
      <div class="social-popup-content">
        <div class="popup-header">
          <h3>DIGITAL PRESENCE</h3>
          <button class="close-popup" on:click={() => (isSocialOpen = false)} aria-label="Close social links">✕</button>
        </div>
        
        <div class="popup-social-grid">
          {#if variant === 'home'}
            <a href="https://github.com/nishanajihah" target="_blank" class="popup-link github-link" title="GitHub">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></span>
              <span class="link-label">GITHUB</span>
            </a>
            <a href="https://www.instagram.com/nisha.najihah" target="_blank" class="popup-link instagram-link" title="Instagram">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></span>
              <span class="link-label">INSTAGRAM</span>
            </a>
            <a href="https://open.spotify.com/artist/2rI5YRwSaBF0IEwiCN7SEa?si=UCYBvh9dRIyUolcoTZPb9w" target="_blank" class="popup-link spotify-link" title="Spotify">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 11.5c4-1 8 0 8 0"></path><path d="M7 14.5c5-1.5 10 0 10 0"></path><path d="M9 8.5c3-1 6 0 6 0"></path></svg></span>
              <span class="link-label">SPOTIFY</span>
            </a>
            <a href="https://music.apple.com/us/artist/nisha-najihah/1598242580" target="_blank" class="popup-link apple-link" title="Apple Music">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path><path d="M16 8v8a2 2 0 1 1-2-2V6l4-2v4h-2z"></path></svg></span>
              <span class="link-label">APPLE MUSIC</span>
            </a>
            <a href="https://ko-fi.com/nishanajihah" target="_blank" class="popup-link kofi-link" title="Ko-fi">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg></span>
              <span class="link-label">KO-FI</span>
            </a>
            <a href="https://www.linkedin.com/in/nisha-najihah" target="_blank" class="popup-link linkedin-link" title="LinkedIn">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></span>
              <span class="link-label">LINKEDIN</span>
            </a>
            <a href="https://www.youtube.com/@nisha.najihah" target="_blank" class="popup-link youtube-link" title="YouTube">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></span>
              <span class="link-label">YOUTUBE</span>
            </a>
            <a href="https://www.threads.com/@nisha.najihah" target="_blank" class="popup-link threads-link" title="Threads">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.25 8.5c-.2-2.5-1.8-4.5-4.5-5.5-1.5-.5-3-.5-4.5 0-2.7 1-4.3 3-4.5 5.5-.1 1.5.2 3 1 4.3.8 1.3 2 2.2 3.5 2.7 1.5.5 3 .5 4.5 0 1.5-.5 2.7-1.4 3.5-2.7.8-1.3 1.1-2.8 1-4.3z"></path><path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4"></path><circle cx="18" cy="6" r="1"></circle></svg></span>
              <span class="link-label">THREADS</span>
            </a>
            <a href="mailto:nishanajihah88@gmail.com" class="popup-link contact-link" title="Contact">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></span>
              <span class="link-label">CONTACT</span>
            </a>
          {:else if variant === 'code'}
            <!-- CODE VARIANT POPUP -->
            <a href="https://www.youtube.com/@nisha.najihah" target="_blank" class="popup-link youtube-link" title="YouTube">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></span>
              <span class="link-label">YOUTUBE</span>
            </a>
            <a href="https://ko-fi.com/nishanajihah" target="_blank" class="popup-link kofi-link" title="Ko-fi">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg></span>
              <span class="link-label">KO-FI</span>
            </a>
            <a href="https://github.com/nishanajihah" target="_blank" class="popup-link github-link" title="GitHub">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></span>
              <span class="link-label">GITHUB</span>
            </a>
            <a href="https://www.threads.com/@nisha.najihah" target="_blank" class="popup-link threads-link" title="Threads">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.25 8.5c-.2-2.5-1.8-4.5-4.5-5.5-1.5-.5-3-.5-4.5 0-2.7 1-4.3 3-4.5 5.5-.1 1.5.2 3 1 4.3.8 1.3 2 2.2 3.5 2.7 1.5.5 3 .5 4.5 0 1.5-.5 2.7-1.4 3.5-2.7.8-1.3 1.1-2.8 1-4.3z"></path><path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4"></path><circle cx="18" cy="6" r="1"></circle></svg></span>
              <span class="link-label">THREADS</span>
            </a>
            <a href="https://www.instagram.com/nisha.najihah" target="_blank" class="popup-link instagram-link" title="Instagram">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></span>
              <span class="link-label">INSTAGRAM</span>
            </a>
            <a href="https://www.linkedin.com/in/nisha-najihah" target="_blank" class="popup-link linkedin-link" title="LinkedIn">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></span>
              <span class="link-label">LINKEDIN</span>
            </a>
          {:else if variant === 'music'}
            <!-- MUSIC VARIANT POPUP -->
            <a href="https://open.spotify.com/artist/2rI5YRwSaBF0IEwiCN7SEa?si=UCYBvh9dRIyUolcoTZPb9w" target="_blank" class="popup-link spotify-link" title="Spotify">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 11.5c4-1 8 0 8 0"></path><path d="M7 14.5c5-1.5 10 0 10 0"></path><path d="M9 8.5c3-1 6 0 6 0"></path></svg></span>
              <span class="link-label">SPOTIFY</span>
            </a>
            <a href="https://music.apple.com/us/artist/nisha-najihah/1598242580" target="_blank" class="popup-link apple-link" title="Apple Music">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path><path d="M16 8v8a2 2 0 1 1-2-2V6l4-2v4h-2z"></path></svg></span>
              <span class="link-label">APPLE MUSIC</span>
            </a>
            <a href="https://www.deezer.com/us/artist/153054282" target="_blank" class="popup-link deezer-link" title="Deezer">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg></span>
              <span class="link-label">DEEZER</span>
            </a>
            <a href="https://audiomack.com/nisha-najihah" target="_blank" class="popup-link audiomack-link" title="Audiomack">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg></span>
              <span class="link-label">AUDIOMACK</span>
            </a>
            <a href="https://soundcloud.com/nishanajihah" target="_blank" class="popup-link soundcloud-link" title="SoundCloud">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg></span>
              <span class="link-label">SOUNDCLOUD</span>
            </a>
            <a href="https://ko-fi.com/nishanajihah" target="_blank" class="popup-link kofi-link" title="Ko-fi">
              <span class="popup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg></span>
              <span class="link-label">KO-FI</span>
            </a>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</footer>

<style lang="scss">
  // All footer styles live in src/lib/styles/footer.scss
  // This block intentionally left empty — imported via script above.
  .copyright-line, .copyright-credit { display: inline; }
  /* FOOTER STYLES */
  .home-footer {
    width: 100%;
    height: 50px;
    padding-bottom: 12px;
    padding-top: 40px;
    background: transparent !important;
    user-select: none;
    z-index: 100;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden; // Prevent internal elements from pushing out
    
    .container {
      max-width: 100% !important;
      width: 100% !important;
      background: transparent !important;
      padding: 0; // Use row padding instead
    }

    @media (max-width: 1337px) {
      height: auto !important;
      padding-bottom: 5px;
      padding-top: 10px;
      position: absolute;
      bottom: 0;
    }
  }

  .footer-single-row {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 0 40px; // Standard desktop padding

    @media (max-width: 1337px) {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 10px 15px;

      // Ordered Stack for Tablet/Mobile
      .footer-links-group { order: 2; width: 100%; }
      .footer-social-wrapper { order: 1; width: 100%; display: flex; justify-content: center; }
      .footer-copyright { order: 3; width: 100%; }
    }
  }

  .footer-links-group {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-self: start;

    @media (max-width: 1337px) {
      width: 100%;
      justify-content: center;
      gap: 8px;
      
      .footer-privacy, .footer-social-mobile-container, .footer-terms {
        flex: 1;
        display: flex;
        justify-content: center;
      }
    }
  }

  // SHARED BUTTON STYLE (Privacy, Terms, Social Toggle, Copyright Box)
  .privacy-link, .terms-link, .social-mobile-toggle, .copyright-link {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    font-family: 'Roboto Mono', monospace;
    font-size: 0.8rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0 16px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    backdrop-filter: blur(10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
    cursor: pointer;
    height: 35px;
    position: relative;
    z-index: 1000 !important;
    pointer-events: auto !important;

    &:hover, &:active {
      color: #ffde21 !important;
      background: rgba(255, 222, 33, 0.1) !important;
      border-color: rgba(255, 222, 33, 0.5) !important;
      
      // Disable movement for all unless we're on desktop
      @media (max-width: 1337px) {
        transform: none !important;
      }
      @media (min-width: 1338px) {
        transform: translateY(-2px);
      }
    }

    @media (max-width: 1337px) {
      width: 100%;
      font-size: 0.72rem;
      padding: 0 8px;
      height: 32px;
      display: flex;
      box-sizing: border-box;
    }
  }

  .privacy-link, .terms-link {
    svg {
      transition: all 0.3s ease;
      flex-shrink: 0;
      width: 12px;
      height: 12px;
    }
    &:hover, &:active {
      svg { stroke: #ffde21 !important; }
    }
  }

  .social-mobile-toggle {
    .toggle-dots {
      display: flex;
      gap: 3px;
      span {
        width: 3px;
        height: 3px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
      }
    }
    &:hover, &:active {
      .toggle-dots span {
        background: #ffde21 !important;
      }
    }
  }

  .footer-social-wrapper {
    justify-self: center;
    .footer-social {
      display: flex;
      align-items: center;
      gap: 25px;
    }
  }

  .footer-copyright {
    justify-self: end;
    .copyright-link {
      cursor: default;
      
      // Disable any hover flair from shared styles
      &:hover, &:active {
        transform: none !important;
        color: rgba(255, 255, 255, 0.6) !important;
        background: rgba(255, 255, 255, 0.03) !important;
        border-color: rgba(255, 255, 255, 0.08) !important;
        box-shadow: none !important;
      }
    }

    @media (max-width: 1337px) {
      width: 100%;
      display: flex;
      justify-content: center;
      .copyright-link {
        font-size: 0.72rem;
        width: 100% !important;
        height: 32px;
        padding: 0;
      }
    }
  }

  // --- SOCIAL INTERACTION SYSTEM ---

  .footer-link {
    position: relative;
    color: rgba(255, 255, 255, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    .social-icon {
      padding: 8px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      @media (max-width: 999px) {
        width: 12px;
        height: 12px;
      }

      svg {
        transition: all 0.3s ease;
        width: 20px;
        height: 20px;
      }
    }

    // DESKTOP INTERACTION (Hover + Movement + Brand Colors)
    @media (min-width: 1338px) {
      &:hover {
        transform: translateY(-5px);
        .social-icon {
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          border-color: #ffde21;
          background: rgba(255, 222, 33, 0.05);
        }
        .social-icon svg { transform: scale(1.1); }
        .footer-label { opacity: 1; transform: translateX(-50%) translateY(-8px); }

        // Brand Colors (Only on Desktop)
        &.github-link { .footer-label, .social-icon svg { color: #fff; stroke: #fff; } }
        &.instagram-link { .footer-label, .social-icon svg { color: #E1306C; stroke: #E1306C; } }
        &.spotify-link { .footer-label, .social-icon svg { color: #1db954; stroke: #1db954; } }
        &.apple-link { .footer-label, .social-icon svg { color: #FC3C44; stroke: #FC3C44; } }
        &.kofi-link { .footer-label, .social-icon svg { color: #ffde21; stroke: #ffde21; } }
        &.linkedin-link { .footer-label, .social-icon svg { color: #0A66C2; stroke: #0A66C2; } }
        &.youtube-link { .footer-label, .social-icon svg { color: #FF0000; stroke: #FF0000; } }
        &.threads-link { .footer-label, .social-icon svg { color: #fff; stroke: #fff; } }
        &.contact-link { .footer-label, .social-icon svg { color: #ffde21; stroke: #ffde21; } }
        &.deezer-link { .footer-label, .social-icon svg { color: #fff; stroke: #fff; } }
        &.audiomack-link { .footer-label, .social-icon svg { color: #FF9900; stroke: #FF9900; } }
        &.soundcloud-link { .footer-label, .social-icon svg { color: #FF5500; stroke: #FF5500; } }
      }
    }

    // TABLET/MOBILE INTERACTION (No movement, Unified Yellow Highlight)
    @media (max-width: 1337px) {
      transform: none !important; 
      flex-direction: row !important;
      gap: 0;

      &:active, &:hover {
        .social-icon {
          background: rgba(255, 222, 33, 0.1) !important;
          border-color: #ffde21 !important;
          color: #ffde21 !important;
        }
        .footer-label, .social-icon svg {
          color: #ffde21 !important;
          stroke: #ffde21 !important;
          filter: drop-shadow(0 0 5px rgba(255,222,33,0.3));
        }
      }
    }
  }

  .footer-label {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    font-family: 'Roboto Mono', monospace;
    font-size: 0.6rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
    color: #fff; // Default color
    z-index: 10;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);

    // Tablet View: Permanent on the right
    @media (max-width: 1337px) {
      position: static;
      transform: none;
      opacity: 1;
      pointer-events: auto;
      margin-left: 8px;
      font-size: 0.55rem;
      color: rgba(255, 255, 255, 0.6);
    }
  }

  .footer-link {
    @media (max-width: 999px) {
      flex-direction: row !important;
      gap: 0;
      
      &:active {
        .social-icon { border-color: #ffde21; background: rgba(255, 222, 33, 0.1); }
        .footer-label, .social-icon svg { color: #ffde21 !important; stroke: #ffde21 !important; }
      }
    }
  }

  // Brand Hover Labels (Desktop Only handled in centralized section)
  @media (min-width: 1338px) {
    .footer-link:hover .footer-label {
      opacity: 1;
      transform: translateX(-50%) translateY(-8px);
    }
  }

  .social-popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: pointer;
  }

  .social-popup-content {
    box-sizing: border-box;
    background: rgba(15, 15, 15, 0.98);
    border: 1px solid rgba(255, 222, 33, 0.3);
    border-radius: 20px;
    width: min(90%, 360px);
    padding: 30px 25px;
    position: relative;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 222, 33, 0.1);
    cursor: default;

    .popup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      
      h3 { 
        font-family: 'Anta', sans-serif; 
        color: #ffde21; 
        font-size: 1.25rem; 
        margin: 0; 
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
      
      .close-popup { 
        background: none; 
        border: none; 
        color: rgba(255, 255, 255, 0.5); 
        font-size: 2rem; 
        cursor: pointer; 
        line-height: 1;
        padding: 5px;
        &:hover { color: #ffde21; } 
      }
    }

    .popup-social-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      width: 100%;
      
      .popup-link {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 15px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        text-decoration: none;
        transition: all 0.3s ease;
        
        .popup-icon { 
          color: rgba(255, 255, 255, 0.7); 
          display: flex;
          align-items: center;
          
          svg { 
            width: 20px; 
            height: 20px; 
            stroke: currentColor;
          } 
        }
        
        .link-label { 
          color: rgba(255, 255, 255, 0.7); 
          font-family: 'Roboto Mono', monospace; 
          font-size: 0.7rem; 
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        &:active, &:hover {
          background: rgba(255, 222, 33, 0.15);
          border-color: #ffde21;
          .popup-icon, .link-label { color: #ffde21; }
        }
      }
    }
  }
</style>
