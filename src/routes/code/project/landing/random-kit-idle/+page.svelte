<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";

  // App Logo & Screenshot Assets
  import appLogo from "$lib/assets/projects/random-kit-idle/random-kit-logo.png";
  import screenshotDashboard from "$lib/assets/projects/random-kit-idle/screenshot-dashboard.png";
  import screenshotColorMixer from "$lib/assets/projects/random-kit-idle/screenshot-color-mixer.png";
  import screenshotColorMemory from "$lib/assets/projects/random-kit-idle/screenshot-color-memory.png";
  import screenshotDiceRoller from "$lib/assets/projects/random-kit-idle/screenshot-dice-roller.png";
  import screenshotNumberGenerator from "$lib/assets/projects/random-kit-idle/screenshot-number-generator.png";
  import screenshotCoinFlipper from "$lib/assets/projects/random-kit-idle/screenshot-coin-flipper.png";
  import screenshotWheelSpinner from "$lib/assets/projects/random-kit-idle/screenshot-wheel-spinner.png";
  import screenshotTicTacToe from "$lib/assets/projects/random-kit-idle/screenshot-tic-tac-toe.png";
  import googlePlayBadge from "$lib/assets/projects/google-play-badge.png";
  import "./random-kit-landing.scss";

  let activeScreenshot = $state<string>(screenshotDashboard);
  let activeTitle = $state<string>("App Hub & Dashboard");
  let activeModuleIndex = $state<number>(0);
  let mobileMenuOpen = $state<boolean>(false);

  function selectPreview(src: string, title: string) {
    activeScreenshot = src;
    activeTitle = title;
  }

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
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
      <a href="/code#section-02" class="app-brand-link" title="Return to Active Systems">
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
      </a>
      <div class="nav-actions" class:mobile-open={mobileMenuOpen}>
        <a
          href="#features"
          class="nav-link"
          onclick={() => (mobileMenuOpen = false)}>Features</a
        >
        <a
          href="#gallery"
          class="nav-link"
          onclick={() => (mobileMenuOpen = false)}>App Showcase</a
        >
        <a
          href="#legal"
          class="nav-link"
          onclick={() => (mobileMenuOpen = false)}>Developer & Legal</a
        >
        <a
          href="#legal"
          class="get-app-nav-btn"
          onclick={() => (mobileMenuOpen = false)}>GET APP</a
        >
      </div>

      <button
        class="mobile-menu-toggle"
        onclick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen}
      >
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>
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
          aria-label="Preview App Hub and Dashboard interface"
        >
          <span class="thumb-num" aria-hidden="true">01</span>
          <span class="thumb-label">App Hub & Dashboard</span>
        </button>
        <button
          class="thumb-item"
          class:active={activeScreenshot === screenshotCoinFlipper}
          onclick={() => selectPreview(screenshotCoinFlipper, "Coin Flipper")}
          aria-label="Preview Coin Flipper interface"
        >
          <span class="thumb-num" aria-hidden="true">02</span>
          <span class="thumb-label">Coin Flipper</span>
        </button>
        <button
          class="thumb-item"
          class:active={activeScreenshot === screenshotWheelSpinner}
          onclick={() => selectPreview(screenshotWheelSpinner, "Wheel Spinner")}
          aria-label="Preview Wheel Spinner interface"
        >
          <span class="thumb-num" aria-hidden="true">03</span>
          <span class="thumb-label">Wheel Spinner</span>
        </button>
        <button
          class="thumb-item"
          class:active={activeScreenshot === screenshotDiceRoller}
          onclick={() => selectPreview(screenshotDiceRoller, "Dice Roller")}
          aria-label="Preview Dice Roller interface"
        >
          <span class="thumb-num" aria-hidden="true">04</span>
          <span class="thumb-label">Dice Roller</span>
        </button>
        <button
          class="thumb-item"
          class:active={activeScreenshot === screenshotNumberGenerator}
          onclick={() =>
            selectPreview(screenshotNumberGenerator, "Number Generator")}
          aria-label="Preview Number Generator interface"
        >
          <span class="thumb-num" aria-hidden="true">05</span>
          <span class="thumb-label">Number Generator</span>
        </button>
        <button
          class="thumb-item"
          class:active={activeScreenshot === screenshotColorMixer}
          onclick={() => selectPreview(screenshotColorMixer, "Color Mixer")}
          aria-label="Preview Color Mixer interface"
        >
          <span class="thumb-num" aria-hidden="true">06</span>
          <span class="thumb-label">Color Mixer</span>
        </button>
        <button
          class="thumb-item"
          class:active={activeScreenshot === screenshotTicTacToe}
          onclick={() =>
            selectPreview(screenshotTicTacToe, "Tic Tac Toe Minigame")}
          aria-label="Preview Tic Tac Toe Minigame interface"
        >
          <span class="thumb-num" aria-hidden="true">07</span>
          <span class="thumb-label">Tic Tac Toe Minigame</span>
        </button>
        <button
          class="thumb-item"
          class:active={activeScreenshot === screenshotColorMemory}
          onclick={() =>
            selectPreview(screenshotColorMemory, "Color Memory Minigame")}
          aria-label="Preview Color Memory Minigame interface"
        >
          <span class="thumb-num" aria-hidden="true">08</span>
          <span class="thumb-label">Color Memory Minigame</span>
        </button>
      </div>
    </div>

    <div class="gallery-display">
      <div class="display-img-wrapper">
        <img
          src={screenshotDashboard}
          alt="App Hub & Dashboard"
          class="display-img"
          class:visible={activeScreenshot === screenshotDashboard}
        />
        <img
          src={screenshotCoinFlipper}
          alt="Coin Flipper"
          class="display-img"
          class:visible={activeScreenshot === screenshotCoinFlipper}
        />
        <img
          src={screenshotWheelSpinner}
          alt="Wheel Spinner"
          class="display-img"
          class:visible={activeScreenshot === screenshotWheelSpinner}
        />
        <img
          src={screenshotDiceRoller}
          alt="Dice Roller"
          class="display-img"
          class:visible={activeScreenshot === screenshotDiceRoller}
        />
        <img
          src={screenshotNumberGenerator}
          alt="Number Generator"
          class="display-img"
          class:visible={activeScreenshot === screenshotNumberGenerator}
        />
        <img
          src={screenshotColorMixer}
          alt="Color Mixer"
          class="display-img"
          class:visible={activeScreenshot === screenshotColorMixer}
        />
        <img
          src={screenshotTicTacToe}
          alt="Tic Tac Toe Minigame"
          class="display-img"
          class:visible={activeScreenshot === screenshotTicTacToe}
        />
        <img
          src={screenshotColorMemory}
          alt="Color Memory Minigame"
          class="display-img"
          class:visible={activeScreenshot === screenshotColorMemory}
        />
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
        <h3 class="legal-column-heading">App Compliance & Policies</h3>
        <div class="legal-vertical-buttons">
          <a
            href="/code/project/landing/random-kit-idle/privacy"
            class="legal-stack-btn"
            aria-label="Read our Privacy Policy"
          >
            <span>Privacy Policy</span>
            <span class="btn-arrow" aria-hidden="true">→</span>
          </a>
          <a
            href="/code/project/landing/random-kit-idle/terms"
            class="legal-stack-btn"
            aria-label="Read our Terms of Service"
          >
            <span>Terms of Service</span>
            <span class="btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>

    <div class="legal-copyright-bar">
      <span>
        © {currentYear} Random Kit+ Idle. Developed by
        <a href="/code#section-02" class="copyright-dev-link">Nisha Najihah</a>. All Rights
        Reserved.
      </span>
    </div>
  </section>
</div>
