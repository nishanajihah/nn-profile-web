<script lang="ts">
  // You can import unique styles or components specific to this project here!
</script>

<svelte:head>
  <title>Random Kit +Idle | Showcase</title>
</svelte:head>

<!-- Notice that we don't need the NISHA NAJIHAH header here, it's injected automatically! -->
<div class="project-landing-container">
  <div class="hero-section">
    <h1 class="project-title">Random Kit <span class="highlight">+Idle</span></h1>
    <p class="project-tagline">A custom idle game experience built with SvelteKit.</p>
    
    <div class="project-details">
      <h2>Project Details</h2>
      <p>This page is currently under construction. You can freely design your unique Random Kit +Idle experience right here without affecting any other project templates!</p>
    </div>
  </div>
</div>

<style lang="scss">
  .project-landing-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  .hero-section {
    text-align: center;
    margin-top: 60px;
  }

  .project-title {
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 700;
    margin-bottom: 20px;
    color: #fff;
    
    .highlight {
      color: #ffd700;
    }
  }

  .project-tagline {
    font-size: 1.5rem;
    color: #a0a0a0;
    margin-bottom: 60px;
  }

  .project-details {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 215, 0, 0.2);
    border-radius: 12px;
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
    
    h2 {
      color: #ffd700;
      margin-bottom: 20px;
      font-size: 2rem;
    }
    
    p {
      color: #d0d0d0;
      line-height: 1.6;
      font-size: 1.1rem;
    }
  }
</style>
