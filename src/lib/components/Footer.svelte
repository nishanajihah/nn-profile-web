<script>
  import { page } from '$app/stores';
  
  // Determine which type of footer to show based on the current page
  $: currentPage = $page.url.pathname;
  $: isMusic = currentPage.startsWith('/music');
  $: isCode = currentPage.startsWith('/code');
</script>

<footer class="footer">
  <div class="footer-container">
    <div class="footer-section">
      <div class="footer-logo">Nisha Najihah</div>
      <p class="footer-tagline">Developer • Musician • Creative</p>
    </div>
    
    <div class="footer-section">
      {#if isMusic}
        <h3>Music Platforms</h3>
        <div class="footer-links">
          <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" class="footer-link">Spotify</a>
          <a href="https://music.apple.com" target="_blank" rel="noopener noreferrer" class="footer-link">Apple Music</a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="footer-link">YouTube</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="footer-link">Music Instagram</a>
        </div>
        <a href="https://ko-fi.com" target="_blank" rel="noopener noreferrer" class="donation-link music-donation">Support My Music</a>
      
      {:else if isCode}
        <h3>Developer Links</h3>
        <div class="footer-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="footer-link">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="footer-link">LinkedIn</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="footer-link">Dev Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="footer-link">Twitter</a>
        </div>
        <a href="https://github.com/sponsors" target="_blank" rel="noopener noreferrer" class="donation-link code-donation">GitHub Sponsors</a>
      
      {:else}
        <h3>Connect with Me</h3>
        <div class="footer-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="footer-link">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="footer-link">LinkedIn</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="footer-link">Personal Instagram</a>
          <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" class="footer-link">Spotify</a>
        </div>
        <a href="https://ko-fi.com" target="_blank" rel="noopener noreferrer" class="donation-link general-donation">Buy Me a Coffee</a>
      {/if}
    </div>
    
    <div class="footer-section">
      <h3>Navigation</h3>
      <ul class="footer-nav">
        <li><a href="/">Home</a></li>
        <li><a href="/music">Music</a></li>
        <li><a href="/code">Code</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </div>
  </div>
  
  <div class="footer-bottom">
    <p>&copy; {new Date().getFullYear()} Nisha Najihah. All rights reserved.</p>
  </div>
</footer>

<style>
  .footer {
    background: #f8f8f8;
    border-top: 1px solid #eee;
    padding: 3rem 2rem 1rem;
    margin-top: 4rem;
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .footer-logo {
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .footer-tagline {
    color: #666;
    margin-bottom: 1.5rem;
  }

  .footer-section h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .footer-link {
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-link:hover {
    color: #000;
    text-decoration: underline;
  }

  .footer-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-nav a {
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-nav a:hover {
    color: #000;
    text-decoration: underline;
  }

  .donation-link {
    display: inline-block;
    padding: 0.6rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.3s ease;
  }

  .donation-link:hover {
    opacity: 0.9;
  }

  .music-donation {
    background: #1DB954;
    color: white;
  }

  .code-donation {
    background: #ea4aaa;
    color: white;
  }

  .general-donation {
    background: #FF5E5B;
    color: white;
  }

  .footer-bottom {
    max-width: 1200px;
    margin: 2rem auto 0;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
    text-align: center;
    color: #666;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .footer-container {
      grid-template-columns: 1fr;
    }
  }
</style>
