<script lang="ts">
  import Navigation from "$lib/components/Navigation.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import HalftoneBackground from "$lib/components/about/HalftoneBackground.svelte";
  import { aboutSections, scrollProgress } from "$lib/logic/about/story";
  import { onMount, tick } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Container refs
  let pinWrapper: HTMLElement;

  // Hero Layer
  let heroEyebrow: HTMLElement;
  let heroWord1: HTMLElement;
  let heroWord2: HTMLElement;
  let heroSubtitle: HTMLElement;

  // Robotics Layer
  let roboticsLayer: HTMLElement;
  let roboticsWord1: HTMLElement;
  let roboticsWord2: HTMLElement;
  let roboticsSubtitle: HTMLElement;

  // Music Layer
  let musicLayer: HTMLElement;
  let musicWord1: HTMLElement;
  let musicWord2: HTMLElement;
  let musicSubtitle: HTMLElement;

  // Support Layer
  let supportLayer: HTMLElement;
  let supportWord1: HTMLElement;
  let supportWord2: HTMLElement;
  let supportSubtitle: HTMLElement;
  let supportGrid: HTMLElement;

  onMount(() => {
    let tl: gsap.core.Timeline;

    const initGsap = async () => {
      await tick();

      if (!pinWrapper) return;

      // Master timeline
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapper,
          start: "top top",
          end: "+=4000", // 4000px of scrolling space
          scrub: 1.5, // Smooth scrubbing
          pin: true, // Pin the screen
          onUpdate: (self) => {
            scrollProgress.set(self.progress);
          },
        },
      });

      // ---- TRANSITION 1: HERO LAYER EXITS
      tl.to([heroEyebrow, heroWord1, heroWord2], { 
        opacity: 0, 
        y: -250, 
        rotationX: 45, 
        stagger: 0.1,
        duration: 1.5, 
        ease: "power2.inOut" 
      }, 0)
        .to(heroSubtitle, { opacity: 0, scale: 0.5, duration: 1 }, "<")

        .fromTo(
          roboticsLayer,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.1 },
          "<",
        )
        // Giant words slam in from 3D space
        .from(
          [roboticsWord1, roboticsWord2],
          {
            opacity: 0,
            scale: 4,
            z: 800,
            rotationY: 90,
            stagger: 0.2,
            duration: 2,
            ease: "power3.out",
          },
          "<0.2",
        )
        .from(
          roboticsSubtitle,
          { opacity: 0, y: 100, duration: 1.5, ease: "power2.out" },
          "-=1",
        )

        .to({}, { duration: 0.8 }); // Pause

      // ---- TRANSITION 2: ROBOTICS OUT, MUSIC IN ----
      tl.to([roboticsWord1, roboticsWord2], {
        opacity: 0,
        x: -500,
        rotationY: -45,
        stagger: 0.1,
        duration: 1.5,
        ease: "power2.inOut",
      })
        .to(roboticsSubtitle, { opacity: 0, x: -300, duration: 1 }, "<")

        .fromTo(
          musicLayer,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.1 },
          "<",
        )
        // Music words rise up from below
        .from(
          [musicWord1, musicWord2],
          {
            opacity: 0,
            y: 500,
            rotationX: -90,
            stagger: 0.2,
            duration: 2,
            ease: "power3.out",
          },
          "<0.2",
        )
        .from(
          musicSubtitle,
          { opacity: 0, y: 100, duration: 1.5, ease: "power2.out" },
          "-=1",
        )

        .to({}, { duration: 0.8 }); // Pause

      // ---- TRANSITION 3: MUSIC OUT, SUPPORT IN ----
      tl.to([musicWord1, musicWord2], {
        opacity: 0,
        scale: 0.1,
        rotationZ: 15,
        stagger: 0.1,
        duration: 1.5,
        ease: "power2.inOut",
      })
        .to(musicSubtitle, { opacity: 0, scale: 0.1, duration: 1 }, "<")

        .fromTo(
          supportLayer,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.1 },
          "<",
        )
        .from(
          [supportWord1, supportWord2],
          {
            opacity: 0,
            scale: 2,
            rotationX: 45,
            stagger: 0.2,
            duration: 1.5,
            ease: "power3.out",
          },
          "<0.2",
        )
        .from(supportSubtitle, { opacity: 0, y: 50, duration: 1 }, "-=1")
        .from(
          supportGrid,
          {
            opacity: 0,
            y: 200,
            rotationX: 30,
            duration: 2,
            ease: "power3.out",
          },
          "-=1",
        )

        .to({}, { duration: 1.5 }); // Final pause at the bottom

      // Force GSAP to recalculate bounds after setting up the timeline
      setTimeout(() => ScrollTrigger.refresh(), 500);
    };

    initGsap();

    return () => {
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  });
</script>

<svelte:head>
  <title>About | Nisha Najihah</title>
  <meta
    name="description"
    content="Learn more about Nisha Najihah — software engineer, designer, and music producer."
  />
</svelte:head>

<div class="page-wrapper about-page">
  <Navigation variant="compact" />

  <div class="threlte-background-container">
    <HalftoneBackground />
  </div>

  <div class="story-pin-wrapper" bind:this={pinWrapper}>
    <div class="pinned-content-container">
      <!-- HERO -->
      <section class="story-layer layer-hero">
        <div class="kinetic-container">
          <h3 class="about-eyebrow" bind:this={heroEyebrow}>ABOUT ME</h3>
          <div class="hero-row">
            <h1 class="giant-word" bind:this={heroWord1}>
              {aboutSections[0].giantWord1}
            </h1>
            <h1 class="giant-word outline-text" bind:this={heroWord2}>
              {aboutSections[0].giantWord2}
            </h1>
          </div>
          <p class="kinetic-subtitle" bind:this={heroSubtitle}>
            {aboutSections[0].subtitle}
          </p>
        </div>
      </section>

      <!-- ROBOTICS -->
      <section
        class="story-layer layer-robotics"
        style="visibility: hidden;"
        bind:this={roboticsLayer}
      >
        <div class="kinetic-container">
          <h1 class="giant-word" bind:this={roboticsWord1}>
            {aboutSections[1].giantWord1}
          </h1>
          <h1 class="giant-word outline-text" bind:this={roboticsWord2}>
            {aboutSections[1].giantWord2}
          </h1>
          <p class="kinetic-subtitle" bind:this={roboticsSubtitle}>
            {aboutSections[1].subtitle}
          </p>
        </div>
      </section>

      <!-- MUSIC -->
      <section
        class="story-layer layer-music"
        style="visibility: hidden;"
        bind:this={musicLayer}
      >
        <div class="kinetic-container">
          <h1 class="giant-word" bind:this={musicWord1}>
            {aboutSections[2].giantWord1}
          </h1>
          <h1 class="giant-word outline-text" bind:this={musicWord2}>
            {aboutSections[2].giantWord2}
          </h1>
          <p class="kinetic-subtitle" bind:this={musicSubtitle}>
            {aboutSections[2].subtitle}
          </p>
        </div>
      </section>

      <!-- SUPPORT -->
      <section
        class="story-layer layer-support"
        style="visibility: hidden;"
        bind:this={supportLayer}
      >
        <div class="kinetic-container">
          <h1 class="giant-word" bind:this={supportWord1}>
            {aboutSections[3].giantWord1}
          </h1>
          <h1 class="giant-word outline-text" bind:this={supportWord2}>
            {aboutSections[3].giantWord2}
          </h1>
          <p class="kinetic-subtitle" bind:this={supportSubtitle}>
            {aboutSections[3].subtitle}
          </p>

          <div class="convergence-grid" bind:this={supportGrid}>
            <div class="kofi-premium-container">
              <a
                href="https://ko-fi.com/Q5Q71FN62M"
                target="_blank"
                rel="noopener noreferrer"
                class="kofi-button-custom"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.061-4.3-.037-.046-.045-.086-.045-.086-.154-.486-.052-.882.045-1.11.038-.051.053-.08.053-.08.21-.51 1.005-1.144 2.571-1.144 1.705 0 2.744.816 3.2 1.11.456-.294 1.495-1.11 3.2-1.11 1.566 0 2.361.634 2.572 1.144.02.029.034.058.052.08.098.228.199.624.045 1.11.01.011.002.051-.045.086-.693 1.251-3.618 3.859-4.061 4.3-.01.01-.042.043-.108.09zM20.758 11.83c-1.708 0-2.361-.836-2.361-.836L18.06 7.63s2.008-.403 3.327.359c1.474.851 1.134 3.093 1.134 3.093s-.292 2.748-1.763 2.748z"
                    fill="#fcbf47"
                  />
                </svg>
                Support me on Ko-fi
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <Footer variant="about" />
</div>

<style lang="scss">
  @use "$lib/styles/pages/about.scss";
</style>
