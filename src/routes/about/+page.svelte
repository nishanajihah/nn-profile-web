<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    // Timeline animation
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1
      }
    });
    
    // Animate each timeline item
    timeline.from('.timeline-item', {
      opacity: 0,
      y: 50,
      stagger: 0.3,
      duration: 0.8
    });

    // Bio section animation
    gsap.from('.bio-content', {
      opacity: 0,
      y: 30,
      duration: 1,
      scrollTrigger: {
        trigger: '.bio-section',
        start: 'top 70%'
      }
    });

    // Contact form animation
    gsap.from('.contact-form', {
      opacity: 0,
      x: -30,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 70%'
      }
    });

    gsap.from('.social-links', {
      opacity: 0,
      x: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 70%'
      }
    });
  });
</script>

<svelte:head>
  <title>About | Nisha Najihah</title>
  <meta name="description" content="About Nisha Najihah - musician, developer, and creative" />
</svelte:head>

<section class="about-container">
  <h1 class="about-title">About Me</h1>
  
  <div class="bio-section">
    <div class="profile-image">
      <!-- Profile image will go here -->
      <div class="image-placeholder"></div>
    </div>
    
    <div class="bio-content">
      <h2>Nisha Najihah</h2>
      <p class="tagline">Developer | Musician | Creative</p>
      
      <p>Welcome to my portfolio! I'm a passionate developer and musician who loves creating digital experiences and meaningful music. I blend technical expertise with creative expression to build innovative solutions and emotional connections.</p>
      
      <p>As a developer, I focus on creating intuitive, performant web applications that solve real problems. As a musician, I craft songs that tell stories and evoke feelings. I believe that both code and music are forms of creative expression, just using different languages.</p>
      
      <p>I'm constantly exploring the intersection of technology and art, finding new ways to bring these worlds together in my work. Whether I'm writing code or composing music, I'm driven by curiosity and a commitment to quality.</p>
    </div>
  </div>
  
  <div class="timeline-section">
    <h2>My Journey</h2>
    
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-date">2020</div>
        <div class="timeline-content">
          <h3>Started Learning Web Development</h3>
          <p>Began my journey in the world of programming with HTML, CSS, and JavaScript.</p>
        </div>
      </div>
      
      <div class="timeline-item">
        <div class="timeline-date">2021</div>
        <div class="timeline-content">
          <h3>Released First Music Single</h3>
          <p>Launched my music career with my debut single on streaming platforms.</p>
        </div>
      </div>
      
      <div class="timeline-item">
        <div class="timeline-date">2022</div>
        <div class="timeline-content">
          <h3>Completed Full Stack Bootcamp</h3>
          <p>Expanded my skills in frontend and backend development through intensive training.</p>
        </div>
      </div>
      
      <div class="timeline-item">
        <div class="timeline-date">2023</div>
        <div class="timeline-content">
          <h3>Released EP Album</h3>
          <p>Created and released a collection of original songs as part of my first EP.</p>
        </div>
      </div>
      
      <div class="timeline-item">
        <div class="timeline-date">2024</div>
        <div class="timeline-content">
          <h3>Launched First Major Web Application</h3>
          <p>Developed and deployed a full-featured web application used by hundreds of users.</p>
        </div>
      </div>
      
      <div class="timeline-item">
        <div class="timeline-date">2025</div>
        <div class="timeline-content">
          <h3>Current Projects</h3>
          <p>Working on new music releases and building innovative web experiences.</p>
        </div>
      </div>
    </div>
  </div>
  
  <div class="contact-section">
    <h2>Get In Touch</h2>
    
    <div class="contact-container">
      <div class="contact-form">
        <form>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          
          <button type="submit" class="submit-button">Send Message</button>
        </form>
      </div>
      
      <div class="social-links">
        <h3>Connect With Me</h3>
        
        <div class="links-grid">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="social-link github">
            GitHub
          </a>
          
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-link linkedin">
            LinkedIn
          </a>
          
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link instagram">
            Instagram (Personal)
          </a>
          
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link instagram-music">
            Instagram (Music)
          </a>
          
          <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" class="social-link spotify">
            Spotify
          </a>
          
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-link youtube">
            YouTube
          </a>
        </div>
        
        <div class="support-section">
          <h3>Support My Work</h3>
          <a href="https://ko-fi.com" target="_blank" rel="noopener noreferrer" class="support-button kofi">
            Buy Me a Coffee
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .about-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .about-title {
    font-size: 3rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .bio-section {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .image-placeholder {
    width: 100%;
    aspect-ratio: 1 / 1;
    background: linear-gradient(45deg, #e3e3e3, #f5f5f5);
    border-radius: 50%;
  }

  .tagline {
    font-style: italic;
    color: #666;
    margin-bottom: 1.5rem;
  }

  .timeline-section {
    margin-bottom: 4rem;
  }

  .timeline {
    position: relative;
    max-width: 1000px;
    margin: 2rem auto;
  }

  .timeline::after {
    content: '';
    position: absolute;
    width: 4px;
    background-color: #ccc;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -2px;
  }

  .timeline-item {
    position: relative;
    margin-bottom: 3rem;
    width: 50%;
  }

  .timeline-item:nth-child(odd) {
    left: 0;
    padding-right: 2.5rem;
  }

  .timeline-item:nth-child(even) {
    left: 50%;
    padding-left: 2.5rem;
  }

  .timeline-item::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: #000;
    border-radius: 50%;
    top: 0;
    z-index: 1;
  }

  .timeline-item:nth-child(odd)::after {
    right: -10px;
  }

  .timeline-item:nth-child(even)::after {
    left: -10px;
  }

  .timeline-content {
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .timeline-date {
    position: absolute;
    top: 0;
    font-weight: bold;
  }

  .timeline-item:nth-child(odd) .timeline-date {
    right: -70px;
  }

  .timeline-item:nth-child(even) .timeline-date {
    left: -70px;
  }

  .contact-section {
    margin-bottom: 4rem;
  }

  .contact-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .form-group input, .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .submit-button {
    padding: 0.75rem 1.5rem;
    background: #000;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .submit-button:hover {
    background: #333;
  }

  .social-links {
    padding: 1.5rem;
    background: #f8f8f8;
    border-radius: 8px;
  }

  .links-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .social-link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    text-decoration: none;
    color: white;
    border-radius: 4px;
    font-weight: 500;
    transition: opacity 0.3s ease;
  }

  .social-link:hover {
    opacity: 0.9;
  }

  .github {
    background: #333;
  }

  .linkedin {
    background: #0077b5;
  }

  .instagram, .instagram-music {
    background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  }

  .spotify {
    background: #1DB954;
  }

  .youtube {
    background: #FF0000;
  }

  .support-section {
    margin-top: 1.5rem;
    text-align: center;
  }

  .support-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
    transition: opacity 0.3s ease;
  }

  .kofi {
    background: #FF5E5B;
    color: white;
  }

  .kofi:hover {
    opacity: 0.9;
  }

  @media (max-width: 900px) {
    .timeline::after {
      left: 31px;
    }

    .timeline-item {
      width: 100%;
      padding-left: 70px;
      padding-right: 25px;
    }

    .timeline-item:nth-child(odd),
    .timeline-item:nth-child(even) {
      left: 0;
      padding-left: 70px;
      padding-right: 25px;
    }

    .timeline-item:nth-child(odd)::after,
    .timeline-item:nth-child(even)::after {
      left: 21px;
    }

    .timeline-item:nth-child(odd) .timeline-date,
    .timeline-item:nth-child(even) .timeline-date {
      left: 0;
    }
  }

  @media (max-width: 768px) {
    .bio-section {
      grid-template-columns: 1fr;
    }

    .contact-container {
      grid-template-columns: 1fr;
    }

    .image-placeholder {
      max-width: 250px;
      margin: 0 auto;
    }
  }
</style>
