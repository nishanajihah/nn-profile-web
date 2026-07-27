<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";

  // App Logo & Screenshot Assets
  import appLogo from "$lib/assets/projects/random-kit-idle/random-kit-logo.svg";
  import screenshotDashboard from "$lib/assets/projects/random-kit-idle/screenshot-dashboard.png";
  import screenshotColorMixer from "$lib/assets/projects/random-kit-idle/screenshot-color-mixer.png";
  import screenshotColorMemory from "$lib/assets/projects/random-kit-idle/screenshot-color-memory.png";
  import screenshotDiceRoller from "$lib/assets/projects/random-kit-idle/screenshot-dice-roller.png";
  import screenshotCoinFlipper from "$lib/assets/projects/random-kit-idle/screenshot-coin-flipper.png";
  import screenshotWheelSpinner from "$lib/assets/projects/random-kit-idle/screenshot-wheel-spinner.png";
  import screenshotTicTacToe from "$lib/assets/projects/random-kit-idle/screenshot-tic-tac-toe.png";
  import googlePlayBadge from "$lib/assets/projects/random-kit-idle/google-play-badge.png";

  let activeScreenshot = $state<string>(screenshotDashboard);
  let activeTitle = $state<string>("App Hub & Dashboard");
  let activeModuleIndex = $state<number>(0);

  function selectPreview(src: string, title: string) {
    activeScreenshot = src;
    activeTitle = title;
  }

  onMount(() => {
    // Auto-cycle highlighted feature card every 3 seconds
    const interval = setInterval(() => {
      activeModuleIndex = (activeModuleIndex + 1) % 6;
    }, 3000);

    return () => clearInterval(interval);
  });

  const currentYear = new Date().getFullYear();
</script>

<svelte:head>
  <title>Random Kit+ Idle | Official App</title>
  <meta
    name="description"
    content="Random Kit+ Idle - All-in-One Utility & Arcade Minigame Mobile Application developed by Nisha Najihah."
  />
</svelte:head>

<div class="standalone-app-landing">
  <!-- Dynamic Bright Ambient Lights -->
  <div class="ambient-light light-top-orange"></div>
  <div class="ambient-light light-center-amber"></div>

  <!-- Top App Bar Navigation -->
  <header class="app-nav">
    <div class="nav-container">
      <div class="app-brand">
        <div class="brand-logo-bg">
          <img
            src={appLogo}
            alt="Random Kit+ Idle Logo"
            class="brand-logo-img"
          />
        </div>
        <div class="brand-text">
          <span class="app-name">Random Kit+ Idle</span>
          <span class="app-sub">BY NISHA NAJIHAH</span>
        </div>
      </div>
      <div class="nav-actions">
        <a href="#features" class="nav-link">Features</a>
        <a href="#gallery" class="nav-link">App Showcase</a>
        <a href="#legal" class="nav-link">Developer & Legal</a>
        <a href="#legal" class="get-app-nav-btn">GET APP</a>
      </div>
    </div>
  </header>

  <!-- Commercial Hero Showcase (Side-by-Side Split Grid) -->
  <section class="app-hero">
    <div class="hero-container-split">
      <!-- Left Column: Hero Text Content -->
      <div class="hero-content-left">
        <div class="hero-badge" in:fly={{ y: -10, duration: 600 }}>
          <span class="badge-dot"></span>
          <span class="badge-text">OFFICIAL APP</span>
        </div>

        <h1 class="hero-main-title" in:fade={{ duration: 700 }}>
          Make Decisions.<br />
          Play Arcade Games.<br />
          <span class="hero-title-gradient">All in One App.</span>
        </h1>

        <p class="hero-tagline" in:fade={{ duration: 700, delay: 200 }}>
          <strong>Random Kit+ Idle</strong> brings essential utilities, custom spinners,
          and brain-boosting arcade minigames into one vibrant mobile experience.
        </p>

        <div class="hero-action-buttons">
          <a href="#legal" class="google-play-badge-link">
            <img
              src={googlePlayBadge}
              alt="Get it on Google Play"
              class="google-play-badge-img"
            />
          </a>
        </div>
      </div>

      <!-- Right Column: Floating Hero Screenshot Visual -->
      <div
        class="hero-visual-right"
        in:fly={{ x: 30, duration: 900, delay: 300 }}
      >
        <div class="phone-mockup-3d">
          <div class="hero-img-wrapper">
            <img
              src={screenshotDashboard}
              alt="Random Kit+ Idle App Interface"
              class="phone-img"
            />
          </div>

          <!-- Floating App Logo Badge -->
          <div class="float-logo-badge">
            <img
              src={appLogo}
              alt="Random Kit+ App Icon"
              class="badge-icon-img"
            />
            <div class="badge-info">
              <strong>Random Kit+ Idle</strong>
              <small>All-in-One Utility App</small>
            </div>
          </div>

          <!-- Floating Feature Cards -->
          <div class="float-card card-top">
            <span class="card-icon">🧠</span>
            <div class="card-text">
              <strong>Color Memory</strong>
              <small>Level 1 Arcade</small>
            </div>
          </div>

          <div class="float-card card-bottom">
            <span class="card-icon">🎡</span>
            <div class="card-text">
              <strong>Wheel Spinner</strong>
              <small>Custom Options</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- App Feature Highlights Section -->
  <section id="features" class="modules-section">
    <div class="section-header">
      <span class="section-subtitle">FEATURES</span>
      <h2 class="section-title">Built For Speed & Everyday Fun</h2>
      <p class="section-desc">
        Discover the core utility kits and arcade minigames packaged inside
        Random Kit+ Idle.
      </p>
    </div>

    <div class="modules-grid">
      <!-- Card 1: Wheel Spinner -->
      <div class="module-card" class:card-highlight={activeModuleIndex === 0}>
        <div class="card-badge">POPULAR</div>
        <div class="card-icon-big">🎡</div>
        <h3>Wheel Spinner</h3>
        <p>
          Customizable decision wheel with color-coded slices. Add options and
          spin instantly to solve dilemmas.
        </p>
        <div class="card-footer-tags">
          <span>Custom Options</span>
          <span>Haptics & Audio</span>
        </div>
      </div>

      <!-- Card 2: Color Memory -->
      <div class="module-card" class:card-highlight={activeModuleIndex === 1}>
        <div class="card-badge">ARCADE</div>
        <div class="card-icon-big">🧠</div>
        <h3>Color Memory</h3>
        <p>
          Sequence-repeat brain training game. Test pattern recall across
          progressive speed levels.
        </p>
        <div class="card-footer-tags">
          <span>Brain Training</span>
          <span>High Score</span>
        </div>
      </div>

      <!-- Card 3: Tic Tac Toe -->
      <div class="module-card" class:card-highlight={activeModuleIndex === 2}>
        <div class="card-badge">ARCADE</div>
        <div class="card-icon-big">❌</div>
        <h3>Tic Tac Toe</h3>
        <p>
          Classic 3x3 strategy game. Play against an intelligent AI bot or
          challenge a friend in local 2-Player mode.
        </p>
        <div class="card-footer-tags">
          <span>VS Bot AI</span>
          <span>Local 2-Player</span>
        </div>
      </div>

      <!-- Card 4: Color Mixer -->
      <div class="module-card" class:card-highlight={activeModuleIndex === 3}>
        <div class="card-badge">UTILITY</div>
        <div class="card-icon-big">🎨</div>
        <h3>Color Mixer</h3>
        <p>
          Instant color generator for creators. Generate HEX color codes and
          inspect exact RGB values on the fly.
        </p>
        <div class="card-footer-tags">
          <span>HEX Codes</span>
          <span>RGB Inspector</span>
        </div>
      </div>

      <!-- Card 5: Dice Roller -->
      <div class="module-card" class:card-highlight={activeModuleIndex === 4}>
        <div class="card-badge">UTILITY</div>
        <div class="card-icon-big">🎲</div>
        <h3>Dice Roller</h3>
        <p>
          Instant single-tap d6 dice roll for tabletop games, decision making,
          or quick tiebreakers.
        </p>
        <div class="card-footer-tags">
          <span>Instant Roll</span>
          <span>Clean Haptics</span>
        </div>
      </div>

      <!-- Card 6: Coin Flipper -->
      <div class="module-card" class:card-highlight={activeModuleIndex === 5}>
        <div class="card-badge">UTILITY</div>
        <div class="card-icon-big">🪙</div>
        <h3>Coin Flipper</h3>
        <p>Classic Heads or Tails toss for instant 50/50 decision making.</p>
        <div class="card-footer-tags">
          <span>50/50 Toss</span>
          <span>Fast Toss</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Interactive App Showcase Gallery -->
  <section id="gallery" class="gallery-section">
    <div class="gallery-info">
      <span class="gallery-tag">APP SHOWCASE</span>
      <h2 class="gallery-title">Explore App Interfaces</h2>
      <p class="gallery-desc">
        Tap any module name below to preview its interface view.
      </p>

      <div class="thumb-list">
        <button
          class="thumb-item"
          class:active={activeScreenshot === screenshotDashboard}
          onclick={() =>
            selectPreview(screenshotDashboard, "App Hub & Dashboard")}
        >
          <span class="thumb-num">01</span>
          <span class="thumb-label">App Hub & Dashboard</span>
        </button>
        <button
          class="thumb-item"
          class:active={activeScreenshot === screenshotColorMemory}
          onclick={() =>
            selectPreview(screenshotColorMemory, "Color Memory Minigame")}
        >
          <span class="thumb-num">02</span>
          <span class="thumb-label">Color Memory Minigame</span>
        </button>
        <button
          class="thumb-item"
          class:active={activeScreenshot === screenshotWheelSpinner}
          onclick={() => selectPreview(screenshotWheelSpinner, "Wheel Spinner")}
        >
          <span class="thumb-num">03</span>
          <span class="thumb-label">Wheel Spinner</span>
        </button>
        <button
          class="thumb-item"
          class:active={activeScreenshot === screenshotTicTacToe}
          onclick={() => selectPreview(screenshotTicTacToe, "Tic Tac Toe")}
        >
          <span class="thumb-num">04</span>
          <span class="thumb-label">Tic Tac Toe</span>
        </button>
        <button
          class="thumb-item"
          class:active={activeScreenshot === screenshotColorMixer}
          onclick={() => selectPreview(screenshotColorMixer, "Color Mixer")}
        >
          <span class="thumb-num">05</span>
          <span class="thumb-label">Color Mixer</span>
        </button>
      </div>
    </div>

    <div class="gallery-display">
      <div class="display-img-wrapper">
        {#key activeScreenshot}
          <img
            src={activeScreenshot}
            alt={activeTitle}
            class="display-img"
            in:fade={{ duration: 250 }}
          />
        {/key}
      </div>
      <div class="display-caption">
        <span class="caption-badge">{activeTitle}</span>
      </div>
    </div>
  </section>

  <!-- Integrated Developer & Legal Section (Left Developer / Right Vertical Legal Buttons) -->
  <section id="legal" class="legal-section">
    <div class="combined-dev-legal-card">
      <!-- Left Column: Solo Developer Profile -->
      <div class="dev-left-column">
        <div class="dev-avatar-box">
          <img src={appLogo} alt="Random Kit+ Idle Logo" class="dev-app-logo" />
        </div>
        <div class="dev-profile-info">
          <div class="dev-tag-row">
            <span class="solo-dev-tag">SOLO DEVELOPER</span>
            <span class="app-subtle-tag">• Random Kit+ Idle</span>
          </div>
          <h3 class="dev-name-title">Nisha Najihah</h3>
          <p class="dev-bio-text">
            Developer of Random Kit+ Idle. Building purpose-driven software, web
            platforms, and robotics that continuously evolve.
          </p>
          <a href="mailto:nishanajihah.dev@gmail.com" class="dev-email-link">
            nishanajihah.dev@gmail.com
          </a>
        </div>
      </div>

      <!-- Right Column: Vertical Legal Action Buttons -->
      <div class="legal-right-column">
        <h4 class="legal-column-heading">App Compliance & Policies</h4>
        <div class="legal-vertical-buttons">
          <a
            href="/code/project/landing/random-kit-idle/privacy"
            class="legal-stack-btn"
          >
            <span>Privacy Policy</span>
            <span class="btn-arrow">→</span>
          </a>
          <a
            href="/code/project/landing/random-kit-idle/terms"
            class="legal-stack-btn"
          >
            <span>Terms & Conditions</span>
            <span class="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </div>

    <div class="legal-copyright-bar">
      <span
        >© {currentYear} Random Kit+ Idle. Developed by Nisha Najihah. All Rights
        Reserved.</span
      >
    </div>
  </section>
</div>

<style lang="scss">
  // Bright Vibrant Orange App Theme Tokens
  $orange-primary: #ff7d00;
  $orange-bright: #ffa000;
  $warm-bg-top: #ff7300;
  $text-dark: #1e150a;
  $text-muted: #d6cdc4;

  .standalone-app-landing {
    position: relative;
    min-height: 100vh;
    background: linear-gradient(180deg, #3d1c02 0%, #1e1104 35%, #0f0a03 100%);
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      sans-serif;
    overflow-x: hidden;
    padding-bottom: 60px;
  }

  // Dynamic Background Lights
  .ambient-light {
    position: absolute;
    border-radius: 50%;
    filter: blur(140px);
    pointer-events: none;

    &.light-top-orange {
      top: -100px;
      left: 50%;
      transform: translateX(-50%);
      width: 700px;
      height: 450px;
      background: radial-gradient(
        circle,
        rgba(255, 125, 0, 0.45) 0%,
        rgba(255, 160, 0, 0) 70%
      );
    }

    &.light-center-amber {
      top: 40%;
      right: -100px;
      width: 550px;
      height: 550px;
      background: radial-gradient(
        circle,
        rgba(255, 150, 0, 0.2) 0%,
        rgba(0, 0, 0, 0) 70%
      );
    }
  }

  // Top App Bar
  .app-nav {
    width: 100%;
    margin: 0;
    padding: 16px 0;
    background: rgba(20, 11, 3, 0.85);
    border-bottom: 1px solid rgba(255, 160, 0, 0.25);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;

      .app-brand {
        display: flex;
        align-items: center;
        gap: 14px;

        .brand-logo-bg {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ff7d00, #ff4400);
          padding: 3px;
          box-shadow: 0 4px 15px rgba(255, 125, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;

          .brand-logo-img {
            width: 100%;
            height: 100%;
            border-radius: 9px;
            object-fit: cover;
          }
        }

        .brand-text {
          display: flex;
          flex-direction: column;

          .app-name {
            font-size: 1.15rem;
            font-weight: 800;
            color: #ffffff;
          }

          .app-sub {
            font-size: 0.65rem;
            letter-spacing: 0.15em;
            color: #ffaa33;
            font-weight: 700;
          }
        }
      }

      .nav-actions {
        display: flex;
        align-items: center;
        gap: 20px;

        @media (max-width: 768px) {
          display: none;
        }

        .nav-link {
          color: #d6cdc4;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.88rem;
          transition: color 0.3s ease;

          &:hover {
            color: #ffaa33;
          }
        }

        .get-app-nav-btn {
          background: linear-gradient(135deg, #ff7d00, #ff5500);
          color: #ffffff;
          padding: 10px 22px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 0.88rem;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(255, 125, 0, 0.35);
          transition: transform 0.3s ease;

          &:hover {
            transform: translateY(-2px);
          }
        }
      }
    }
  }

  // Hero Section (Side-by-Side Grid)
  .app-hero {
    max-width: 1200px;
    margin: 40px auto 100px;
    padding: 0 24px;

    .hero-container-split {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 60px;
      align-items: center;

      @media (max-width: 960px) {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 40px;
      }
    }

    .hero-content-left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;

      @media (max-width: 960px) {
        align-items: center;
        text-align: center;
      }
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 160, 0, 0.15);
      border: 1px solid rgba(255, 160, 0, 0.4);
      padding: 6px 18px;
      border-radius: 20px;
      margin-bottom: 24px;

      .badge-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ffaa33;
        box-shadow: 0 0 10px #ffaa33;
      }

      .badge-text {
        font-size: 0.75rem;
        letter-spacing: 0.15em;
        font-weight: 800;
        color: #ffc266;
      }
    }

    .hero-main-title {
      font-size: clamp(2.5rem, 5vw, 4.4rem);
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: -0.02em;
      margin-bottom: 20px;

      .hero-title-gradient {
        background: linear-gradient(135deg, #ffaa33 0%, #ff5500 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .hero-tagline {
      font-size: clamp(1rem, 1.8vw, 1.2rem);
      color: $text-muted;
      max-width: 580px;
      margin: 0 0 36px;
      line-height: 1.6;

      strong {
        color: #ffffff;
      }
    }

    .hero-action-buttons {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;

      @media (max-width: 960px) {
        justify-content: center;
      }

      .google-play-badge-link {
        display: inline-block;
        transition:
          transform 0.2s ease,
          opacity 0.2s ease;
        line-height: 0;

        .google-play-badge-img {
          height: 60px;
          width: auto;
          display: block;
          border: none;
          outline: none;
        }

        &:hover {
          transform: scale(1.02);
          opacity: 0.95;
        }
      }
    }

    // 3D Visual Phone & Floating Cards Right Column
    .hero-visual-right {
      position: relative;
      display: flex;
      justify-content: center;
    }

    .phone-mockup-3d {
      position: relative;
      width: 300px;

      .hero-img-wrapper {
        position: relative;
        width: 290px;
        border-radius: 28px;
        box-shadow:
          0 25px 70px rgba(0, 0, 0, 0.8),
          0 0 50px rgba(255, 125, 0, 0.3);
        overflow: hidden;

        .phone-img {
          width: 100%;
          height: auto;
          display: block;
        }
      }

      // Floating App Logo Badge
      .float-logo-badge {
        position: absolute;
        top: 30px;
        left: -80px;
        display: flex;
        align-items: center;
        gap: 12px;
        background: rgba(26, 15, 6, 0.95);
        border: 1.5px solid rgba(255, 150, 0, 0.5);
        padding: 10px 18px;
        border-radius: 20px;
        backdrop-filter: blur(20px);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
        z-index: 30;
        animation: floatSlow 5s ease-in-out infinite;

        @media (max-width: 768px) {
          left: -10px;
          top: -20px;
        }

        .badge-icon-img {
          width: 38px;
          height: 38px;
          border-radius: 10px;
        }

        .badge-info {
          display: flex;
          flex-direction: column;
          text-align: left;

          strong {
            font-size: 0.9rem;
            color: #ffffff;
          }

          small {
            font-size: 0.72rem;
            color: #ffaa33;
            font-weight: 600;
          }
        }
      }

      // Floating Feature Cards
      .float-card {
        position: absolute;
        display: flex;
        align-items: center;
        gap: 12px;
        background: rgba(26, 15, 6, 0.95);
        border: 1.5px solid rgba(255, 150, 0, 0.4);
        padding: 12px 18px;
        border-radius: 18px;
        backdrop-filter: blur(20px);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
        z-index: 30;

        .card-icon {
          font-size: 1.4rem;
        }

        .card-text {
          display: flex;
          flex-direction: column;
          text-align: left;

          strong {
            font-size: 0.88rem;
            color: #ffffff;
          }

          small {
            font-size: 0.72rem;
            color: #ffbb55;
          }
        }

        &.card-top {
          top: 180px;
          right: -75px;
          animation: floatSlow 6s ease-in-out infinite 1s;

          @media (max-width: 768px) {
            right: -10px;
          }
        }

        &.card-bottom {
          bottom: 60px;
          left: -70px;
          animation: floatSlow 5.5s ease-in-out infinite 0.5s;

          @media (max-width: 768px) {
            left: -10px;
          }
        }
      }
    }
  }

  // App Modules Section
  .modules-section {
    max-width: 1200px;
    margin: 0 auto 100px;
    padding: 0 24px;

    .section-header {
      text-align: center;
      margin-bottom: 50px;

      .section-subtitle {
        font-size: 0.75rem;
        letter-spacing: 0.2em;
        color: #ffaa33;
        font-weight: 800;
      }

      .section-title {
        font-size: clamp(2rem, 4vw, 2.8rem);
        font-weight: 900;
        margin: 8px 0 12px;
      }

      .section-desc {
        color: $text-muted;
        max-width: 600px;
        margin: 0 auto;
        font-size: 1rem;
      }
    }

    .modules-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
    }

    .module-card {
      position: relative;
      background: rgba(30, 18, 6, 0.6);
      border: 1px solid rgba(255, 160, 0, 0.2);
      border-radius: 24px;
      padding: 32px;
      backdrop-filter: blur(15px);
      transition: all 0.3s ease;

      .card-badge {
        position: absolute;
        top: 24px;
        right: 24px;
        font-size: 0.65rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        color: #ffaa33;
        background: rgba(255, 160, 0, 0.15);
        padding: 4px 10px;
        border-radius: 8px;
      }

      .card-icon-big {
        font-size: 2.5rem;
        margin-bottom: 16px;
      }

      h3 {
        font-size: 1.35rem;
        font-weight: 800;
        margin-bottom: 10px;
        color: #ffffff;
      }

      p {
        color: $text-muted;
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 20px;
      }

      .card-footer-tags {
        display: flex;
        gap: 8px;

        span {
          font-size: 0.75rem;
          color: #ffbb66;
          background: rgba(255, 125, 0, 0.15);
          padding: 4px 10px;
          border-radius: 8px;
          font-weight: 600;
        }
      }

      &:hover,
      &.card-highlight {
        background: rgba(45, 25, 8, 0.85);
        border-color: rgba(255, 160, 0, 0.6);
        transform: translateY(-4px);
        box-shadow: 0 15px 40px rgba(255, 125, 0, 0.2);
      }
    }
  }

  // Interactive Screenshot Gallery
  .gallery-section {
    max-width: 1200px;
    margin: 0 auto 100px;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 60px;
    align-items: center;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .gallery-info {
      .gallery-tag {
        font-size: 0.75rem;
        letter-spacing: 0.2em;
        color: #ffaa33;
        font-weight: 800;
      }

      .gallery-title {
        font-size: 2.2rem;
        font-weight: 900;
        margin: 6px 0 10px;
      }

      .gallery-desc {
        color: $text-muted;
        margin-bottom: 28px;
      }

      .thumb-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .thumb-item {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px 20px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: #ffffff;
        cursor: pointer;
        text-align: left;
        transition: all 0.3s ease;

        .thumb-num {
          font-size: 0.8rem;
          font-weight: 800;
          color: #ffaa33;
        }

        .thumb-label {
          font-weight: 700;
          font-size: 0.95rem;
        }

        &:hover,
        &.active {
          background: rgba(255, 125, 0, 0.2);
          border-color: rgba(255, 160, 0, 0.5);
          transform: translateX(4px);
        }
      }
    }

    .gallery-display {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .display-img-wrapper {
        position: relative;
        max-width: 320px;
        width: 100%;
        border-radius: 24px;
        box-shadow:
          0 20px 60px rgba(0, 0, 0, 0.7),
          0 0 30px rgba(255, 125, 0, 0.2);
        overflow: hidden;

        .display-img {
          width: 100%;
          height: auto;
          display: block;
        }
      }

      .display-caption {
        margin-top: 14px;
        text-align: center;

        .caption-badge {
          font-size: 0.82rem;
          font-weight: 600;
          color: #d6cdc4;
          letter-spacing: 0.03em;
        }
      }
    }
  }

  // Integrated Combined Developer & Legal Section
  .legal-section {
    padding: 60px 24px 80px;
    max-width: 1200px;
    margin: 0 auto;

    .combined-dev-legal-card {
      background: linear-gradient(
        145deg,
        rgba(45, 24, 8, 0.95),
        rgba(20, 11, 3, 0.98)
      );
      border: 1.5px solid rgba(255, 150, 0, 0.45);
      border-radius: 32px;
      padding: 44px;
      backdrop-filter: blur(25px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 40px;
      align-items: center;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 32px;
        padding: 32px 24px;
      }
    }

    .dev-left-column {
      display: flex;
      align-items: center;
      gap: 24px;

      @media (max-width: 600px) {
        flex-direction: column;
        text-align: center;
      }

      .dev-avatar-box {
        width: 96px;
        height: 96px;
        border-radius: 26px;
        background: linear-gradient(135deg, #ff7d00, #ff4400);
        padding: 4px;
        box-shadow: 0 10px 30px rgba(255, 125, 0, 0.45);
        flex-shrink: 0;

        .dev-app-logo {
          width: 100%;
          height: 100%;
          border-radius: 22px;
          object-fit: cover;
        }
      }

      .dev-profile-info {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .dev-tag-row {
          display: flex;
          align-items: center;
          gap: 10px;

          @media (max-width: 600px) {
            justify-content: center;
          }

          .solo-dev-tag {
            font-size: 0.7rem;
            letter-spacing: 0.15em;
            color: #ffaa33;
            font-weight: 800;
            background: rgba(255, 150, 0, 0.15);
            padding: 4px 12px;
            border-radius: 10px;
            border: 1px solid rgba(255, 150, 0, 0.3);
          }

          .app-subtle-tag {
            font-size: 0.85rem;
            color: #ffaa33;
            font-weight: 700;
            letter-spacing: 0.03em;
          }
        }

        .dev-name-title {
          font-size: 1.85rem;
          font-weight: 900;
          color: #ffffff;
          margin: 0;
        }

        .dev-bio-text {
          color: #d6cdc4;
          font-size: 0.92rem;
          line-height: 1.5;
          margin: 0;
        }

        .dev-email-link {
          display: inline-flex;
          align-items: center;
          color: #ffffff;
          background: rgba(255, 125, 0, 0.2);
          border: 1px solid rgba(255, 150, 0, 0.4);
          padding: 8px 18px;
          border-radius: 18px;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.88rem;
          width: fit-content;
          margin-top: 4px;
          transition: all 0.3s ease;

          @media (max-width: 600px) {
            margin: 4px auto 0;
          }

          &:hover {
            background: rgba(255, 125, 0, 0.35);
            border-color: #ffaa33;
            transform: translateY(-2px);
          }
        }
      }
    }

    .legal-right-column {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-left: 32px;
      border-left: 1px solid rgba(255, 150, 0, 0.25);

      @media (max-width: 900px) {
        padding-left: 0;
        padding-top: 24px;
        border-left: none;
        border-top: 1px solid rgba(255, 150, 0, 0.25);
      }

      .legal-column-heading {
        font-size: 1.1rem;
        font-weight: 800;
        color: #ffffff;
        margin: 0 0 4px;
      }

      .legal-vertical-buttons {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }

      .legal-stack-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 22px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.04);
        border: 1.5px solid rgba(255, 150, 0, 0.35);
        color: #ffffff;
        font-weight: 800;
        font-size: 0.95rem;
        text-decoration: none;
        transition: all 0.3s ease;

        .btn-arrow {
          font-size: 1.2rem;
          color: #ffaa33;
          transition: transform 0.3s ease;
        }

        &:hover {
          background: rgba(255, 125, 0, 0.25);
          border-color: #ffaa33;
          transform: translateX(4px);

          .btn-arrow {
            transform: translateX(4px);
          }
        }
      }
    }

    .legal-copyright-bar {
      margin-top: 48px;
      text-align: center;
      font-size: 1.05rem;
      font-weight: 600;
      color: #e6dcd3;
      letter-spacing: 0.02em;
    }
  }

  @keyframes floatSlow {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
</style>
