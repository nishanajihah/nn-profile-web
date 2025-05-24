<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { Application } from '@splinetool/runtime';
  
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  let canvas;

  onMount(() => {
    // Initialize Spline scene
    if (canvas) {
      const spline = new Application(canvas);
      // Replace this URL with your actual Spline scene URL when you have created one
      spline.load('https://prod.spline.design/example-scene-url');
    }

    // Hero section animations
    gsap.from('.hero-title', {
      opacity: 0,
      y: 30,
      duration: 1.2,
      delay: 0.5
    });

    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.8
    });

    gsap.from('.cta-buttons', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 1.2
    });

    // Section animations
    gsap.from('.preview-section', {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: '.preview-section',
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1
      }
    });

    // Preview items animations
    gsap.from('.preview-item', {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.preview-grid',
        start: 'top 70%',
        end: 'bottom 50%',
        scrub: 1
      }
    });
  });

  // Handle mouse movement for parallax effect
  let mouseX = 0;
  let mouseY = 0;

  function handleMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
    
    if (canvas) {
      canvas.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
    }
  }
</script>

<svelte:head>
  <title>Nisha Najihah | Developer & Musician</title>
  <meta name="description" content="Portfolio of Nisha Najihah - Developer, musician, and creative" />
</svelte:head>

<section class="hero" on:mousemove={handleMouseMove}>
  <div class="spline-container">
    <canvas bind:this={canvas}></canvas>
  </div>
  
  <div class="hero-content">
    <h1 class="hero-title">Nisha Najihah</h1>
    <p class="hero-subtitle">Developer by day, Musician by night</p>
    
    <div class="cta-buttons">
      <a href="/music" class="cta-button music">Explore My Music</a>
      <a href="/code" class="cta-button code">View My Projects</a>
    </div>
  </div>
</section>

<section class="preview-section">
  <h2>Featured Work</h2>
  
  <div class="preview-grid">
    <div class="preview-item music-preview">
      <h3>Latest Music</h3>
      <div class="preview-content">
        <div class="music-artwork">
          <!-- Latest album artwork placeholder -->
          <div class="artwork-placeholder"></div>
        </div>
        <div class="music-preview-info">
          <h4>Album Title</h4>
          <p>Released: May 2025</p>
          <p>Explore my latest musical creation, featuring a unique blend of electronic and acoustic elements.</p>
          <a href="/music" class="preview-link">Listen Now</a>
        </div>
      </div>
    </div>
    
    <div class="preview-item code-preview">
      <h3>Featured Project</h3>
      <div class="preview-content">
        <div class="project-image">
          <!-- Project image placeholder -->
          <div class="project-placeholder"></div>
        </div>
        <div class="project-preview-info">
          <h4>Project Name</h4>
          <p>A full-stack application built with modern web technologies.</p>
          <div class="tech-tags">
            <span class="tech-tag">JavaScript</span>
            <span class="tech-tag">Svelte</span>
            <span class="tech-tag">Node.js</span>
          </div>
          <a href="/code" class="preview-link">View Project</a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spline-container {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    transition: transform 0.1s ease-out;
  }

  canvas {
    width: 100% !important;
    height: 100% !important;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    backdrop-filter: blur(5px);
    max-width: 600px;
  }

  .hero-title {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }

  .hero-subtitle {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #333;
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .cta-button {
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: bold;
    text-decoration: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .cta-button.music {
    background: #1DB954;
    color: white;
  }

  .cta-button.code {
    background: #333;
    color: white;
  }

  .preview-section {
    max-width: 1200px;
    margin: 4rem auto;
    padding: 0 2rem;
  }

  .preview-section h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
  }

  .preview-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  .preview-item {
    border-radius: 8px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background: white;
    transition: transform 0.3s ease;
  }

  .preview-item:hover {
    transform: translateY(-5px);
  }

  .preview-item h3 {
    padding: 1.5rem;
    margin: 0;
    background: #f8f8f8;
    border-bottom: 1px solid #eee;
  }

  .preview-content {
    padding: 1.5rem;
  }

  .artwork-placeholder, .project-placeholder {
    width: 100%;
    height: 200px;
    background: linear-gradient(45deg, #e3e3e3, #f5f5f5);
    margin-bottom: 1.5rem;
    border-radius: 4px;
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .tech-tag {
    background: #eee;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
  }

  .preview-link {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #000;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background 0.3s ease;
  }

  .preview-link:hover {
    background: #333;
  }

  @media (max-width: 900px) {
    .preview-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .hero-title {
      font-size: 2.5rem;
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
    }

    .cta-buttons {
      flex-direction: column;
    }
  }
</style>
