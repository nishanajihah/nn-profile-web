<script lang="ts">
  import { onMount, tick } from "svelte";
  import { fade } from "svelte/transition";
  import { spring } from "svelte/motion";
  import { browser } from "$app/environment";
  import Navigation from "$lib/components/Navigation.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import type { PageData } from "./$types";
  import "$lib/styles/code-page.scss";
  import {
    initCodeInteractions,
    splitText,
  } from "$lib/logic/code-interactions";
  import { Canvas } from "@threlte/core";
  import Scene from "$lib/components/code/Scene.svelte";

  export let data: PageData;
  const { stats, repos, featuredProjects } = data;

  let visible = false;
  // Initialize scrollProgress as a spring store for buttery smooth 3D transitions
  let scrollProgress = spring(0, { stiffness: 0.05, damping: 0.5 });
  let wrapper: HTMLElement;

  let cursorDot: HTMLElement;
  let cursorRing: HTMLElement;

  let observer: IntersectionObserver;

  let innerWidth = 0;

  // ═══ Repo Display State ═══
  let isRepoOverlayOpen = false;

  $: isMobile = innerWidth < 768;
  $: isTablet = innerWidth >= 768 && innerWidth < 1024;
  $: baseMaxRepos = isMobile ? 3 : isTablet ? 6 : 9;
  $: displayedRepos = repos.slice(0, baseMaxRepos);

  // ═══ Carousel State & Drag Logic ═══
  let carouselTrack: HTMLElement;
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  let activeDot = 0;

  const dragStart = (e: MouseEvent | TouchEvent) => {
    isDragging = true;
    if (carouselTrack) {
      carouselTrack.style.scrollSnapType = "none"; // disable snap during drag
      startX = e.type.includes("mouse")
        ? (e as MouseEvent).pageX - carouselTrack.offsetLeft
        : (e as TouchEvent).touches[0].clientX - carouselTrack.offsetLeft;
      scrollLeft = carouselTrack.scrollLeft;
    }
  };

  const dragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !carouselTrack) return;
    e.preventDefault();
    const x = e.type.includes("mouse")
      ? (e as MouseEvent).pageX - carouselTrack.offsetLeft
      : (e as TouchEvent).touches[0].clientX - carouselTrack.offsetLeft;
    const walk = (x - startX) * 2;
    carouselTrack.scrollLeft = scrollLeft - walk;
  };

  const dragEnd = () => {
    isDragging = false;
    if (carouselTrack) {
      carouselTrack.style.scrollSnapType = "x mandatory"; // re-enable snap
    }
  };

  // ═══ Scroll Tracking ═══
  const handleScroll = () => {
    if (wrapper && browser) {
      const maxScroll = wrapper.scrollHeight - wrapper.clientHeight;
      const progress = Math.min(wrapper.scrollTop / Math.max(maxScroll, 1), 1);
      scrollProgress.set(progress);
    }
  };

  // Action to observe dynamic elements
  function reveal(node: HTMLElement) {
    if (browser) {
      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: "0px 0px -50px 0px", root: wrapper },
        );
      }
      observer.observe(node);
    }
    return {
      destroy() {
        if (observer) observer.unobserve(node);
      },
    };
  }

  onMount(() => {
    visible = true;

    tick().then(() => {
      // Smooth scroll to hash section if present in URL
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 300);
        }
      }

      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: "0px 0px -50px 0px", root: wrapper },
        );
      }

      document
        .querySelectorAll(".scroll-reveal:not(.repo-card)")
        .forEach((el) => {
          observer.observe(el);
        });
    });

    let interactionCleanup: () => void;
    tick().then(() => {
      const interactions = initCodeInteractions(cursorDot, cursorRing, wrapper);
      if (interactions?.cleanup) interactionCleanup = interactions.cleanup;
    });

    return () => {
      if (observer) observer.disconnect();
      if (interactionCleanup) interactionCleanup();
    };
  });
</script>

<svelte:head>
  <title>Architecture | Nisha Najihah</title>
  <meta
    name="description"
    content="Technical explorations and open-source architecture by Nisha Najihah."
  />
</svelte:head>

<svelte:window bind:innerWidth />

<!-- Custom Cursor -->
<div class="code-cursor-dot" bind:this={cursorDot}></div>
<div class="code-cursor-ring" bind:this={cursorRing}></div>

<!-- Fixed 3D Background Canvas -->
{#if browser}
  <div class="threlte-background">
    <Canvas>
      <Scene scrollProgress={$scrollProgress} />
    </Canvas>
  </div>
{/if}

<!-- Main Scroll Wrapper -->
<div
  class="code-immersive-wrapper"
  bind:this={wrapper}
  on:scroll={handleScroll}
>
  <Navigation variant="home" />

  <!-- GitHub Telemetry Capsule -->
  <a
    href={stats.profileUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="telemetry-capsule"
  >
    <div class="telemetry-avatar">
      <img src={stats.avatarUrl} alt="GitHub Avatar" />
    </div>
    <div class="telemetry-divider"></div>
    <svg
      class="telemetry-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      ></path>
    </svg>
    <div class="telemetry-divider"></div>
    <div class="telemetry-data">
      <span>REPOS</span>
      <span class="gold-text">{stats.publicRepos || 0}</span>
    </div>
  </a>

  {#if visible}
    <main in:fade={{ duration: 1000 }}>
      <!-- ═══════════ SECTION 01: HERO ═══════════ -->
      <section id="section-01" class="snap-section section-01 hero-space">
        <div class="section-header-anchored">
          <span class="section-tag">01 // THE ARCHITECTURE</span>
        </div>
        <div class="hero-inner">
          <h1 class="giant-hero-title">
            {@html splitText("SYSTEM_CORE")}
          </h1>
          <h2 class="hero-subtitle">NISHA NAJIHAH</h2>
        </div>
        <div class="scroll-indicator">
          <span class="line"></span>
          <span>INITIALIZE</span>
        </div>
      </section>

      <!-- ═══════════ SECTION 02: 3-ITEM FEATURED DEPLOYMENTS ═══════════ -->
      <section
        id="section-02"
        class="snap-section section-02 deployments-section"
      >
        <div class="section-header-anchored">
          <span class="section-tag">02 // ACTIVE SYSTEMS</span>
          <h2 class="section-title">Featured Deployments</h2>
        </div>

        <div class="deployments-carousel-wrapper">
          <div
            class="deployments-carousel no-scrollbar {featuredProjects.length <=
            3
              ? 'centered-carousel'
              : ''}"
            bind:this={carouselTrack}
            on:scroll={() => {
              if (carouselTrack) {
                const maxScroll =
                  carouselTrack.scrollWidth - carouselTrack.clientWidth;
                const numDots = Math.ceil(
                  featuredProjects.length / (isMobile ? 1 : isTablet ? 2 : 3),
                );
                if (maxScroll > 0) {
                  // Proportionally map scroll position to the available dots
                  activeDot = Math.round(
                    (carouselTrack.scrollLeft / maxScroll) * (numDots - 1),
                  );
                } else {
                  activeDot = 0;
                }
              }
            }}
            on:mousedown={dragStart}
            on:mousemove={dragMove}
            on:mouseup={dragEnd}
            on:mouseleave={dragEnd}
            on:touchstart|passive={dragStart}
            on:touchmove|passive={dragMove}
            on:touchend|passive={dragEnd}
            role="presentation"
          >
            {#each featuredProjects as project, i}
              <div class="carousel-slide">
                <div
                  class="deployment-card scroll-reveal"
                  style="transition-delay: {i * 100}ms;"
                >
                  <div class="deployment-art">
                    <div class="geo-sculpture mini">
                      <div class="geo-ring ring-1"></div>
                      <div class="geo-ring ring-2"></div>
                      <div class="geo-core"></div>
                    </div>
                  </div>
                  <div class="deployment-info">
                    <h3 class="deployment-title">{project.name}</h3>
                    <p class="deployment-desc">{project.description}</p>
                    <div class="deployment-tags">
                      {#each project.tags as tag}
                        <span class="tech-pill">{tag}</span>
                      {/each}
                    </div>

                    {#if project.customLandingUrl || project.hasLanding}
                      <a
                        href={project.customLandingUrl ||
                          `/code/project/landing/${project.id}`}
                        target={(project.customLandingUrl || "").startsWith(
                          "http",
                        )
                          ? "_blank"
                          : undefined}
                        rel={(project.customLandingUrl || "").startsWith("http")
                          ? "noopener noreferrer"
                          : undefined}
                        class="deployment-cta"
                      >
                        ENTER SYSTEM →
                      </a>
                    {:else if project.liveUrl || project.docsUrl}
                      <a
                        href={project.liveUrl || project.docsUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="deployment-cta external"
                      >
                        EXTERNAL LINK ↗
                      </a>
                    {/if}
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <!-- Bottom Navigation Arrows & Dots -->
          {#if featuredProjects.length > (isMobile ? 1 : isTablet ? 2 : 3)}
            <div class="carousel-nav">
              <div class="carousel-pagination">
                {#each Array(Math.ceil(featuredProjects.length / (isMobile ? 1 : isTablet ? 2 : 3))) as _, i}
                  <div class="dot {i === activeDot ? 'active' : ''}"></div>
                {/each}
              </div>
              <div class="carousel-arrows">
                <button
                  class="carousel-nav-btn left-btn glowing-arrow"
                  aria-label="Scroll left"
                  on:click={() => {
                    import("$lib/stores/carouselInteraction").then((m) =>
                      m.carouselClickPulse.update((n) => n + 1),
                    );
                    if (carouselTrack) {
                      carouselTrack.scrollBy({
                        left: -carouselTrack.clientWidth,
                        behavior: "smooth",
                      });
                      carouselTrack.classList.add("turn-left");
                      setTimeout(
                        () => carouselTrack.classList.remove("turn-left"),
                        600,
                      );
                    }
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  class="carousel-nav-btn right-btn glowing-arrow"
                  aria-label="Scroll right"
                  on:click={() => {
                    import("$lib/stores/carouselInteraction").then((m) =>
                      m.carouselClickPulse.update((n) => n + 1),
                    );
                    if (carouselTrack) {
                      carouselTrack.scrollBy({
                        left: carouselTrack.clientWidth,
                        behavior: "smooth",
                      });
                      carouselTrack.classList.add("turn-right");
                      setTimeout(
                        () => carouselTrack.classList.remove("turn-right"),
                        600,
                      );
                    }
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          {/if}
        </div>
      </section>

      <!-- ═══════════ SECTION 03: KNOWLEDGE BASE (REPOS) ═══════════ -->
      <section id="section-03" class="snap-section section-03 repo-section">
        <div class="section-header-anchored">
          <span class="section-tag">03 // KNOWLEDGE BASE</span>
          <h2 class="section-title">Open Source Cores</h2>
        </div>

        <div class="repo-grid-wrapper">
          <div class="repo-grid">
            {#each displayedRepos as repo, i}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                class="repo-card scroll-reveal"
                use:reveal
                style="transition-delay: {i * 50}ms;"
              >
                <div class="repo-card-header">
                  <span class="repo-lang">{repo.language || "Code"}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
                <h3 class="repo-name">{repo.name}</h3>
                <p class="repo-desc">{repo.description || "System file."}</p>
                <div class="repo-stats">
                  <span>★ {repo.stargazers_count}</span>
                  <span>⑂ {repo.forks_count}</span>
                </div>
              </a>
            {/each}
          </div>

          <!-- View More Button -->
          {#if repos.length > baseMaxRepos}
            <div class="repo-view-more scroll-reveal">
              <button
                class="view-all-btn"
                on:click={() => (isRepoOverlayOpen = true)}
              >
                <span>VIEW MORE</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          {/if}
        </div>

        <!-- Footer embedded within section 3 so it doesn't create a 4th snap -->
        <div class="integrated-footer">
          <Footer variant="code" />
        </div>
      </section>
    </main>
  {/if}

  <!-- ═══ FULL SCREEN REPO OVERLAY ═══ -->
  {#if isRepoOverlayOpen}
    <div class="repo-overlay" transition:fade={{ duration: 400 }}>
      <div class="overlay-content">
        <div class="overlay-header">
          <h2 class="overlay-title">ALL REPOSITORIES</h2>
          <button
            class="top-close-btn"
            on:click={() => (isRepoOverlayOpen = false)}
            aria-label="Close overlay"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="repo-list">
          {#each repos as repo}
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              class="repo-list-item"
            >
              <span class="repo-name">{repo.name}</span>
              <div class="repo-meta">
                <span class="repo-lang">{repo.language || "System"}</span>
                <span class="repo-stars">
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="currentColor"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    ></polygon>
                  </svg>
                  {repo.stargazers_count}
                </span>
              </div>
            </a>
          {/each}
        </div>

        <div class="overlay-footer">
          <button
            class="close-overlay-btn bottom-close"
            aria-label="Close overlay"
            on:click={() => (isRepoOverlayOpen = false)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span>CLOSE REPOSITORY</span>
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @use "$lib/styles/code-page.scss";
</style>
