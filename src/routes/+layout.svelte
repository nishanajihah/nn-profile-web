<script lang="ts">
  import "../app.scss";
  import "$lib/styles/components/page-transitions.scss";
  import PageTransitionCurtain from "$lib/components/PageTransitionCurtain.svelte";

  import { beforeNavigate, afterNavigate, goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { gsap } from "gsap";

  let { children } = $props();

  let forceNavigate = false;

  beforeNavigate((navigation) => {
    // Only intercept standard page changes
    if (
      forceNavigate ||
      !navigation.to ||
      navigation.to.url.pathname === navigation.from?.url.pathname
    ) {
      forceNavigate = false;
      return;
    }

    // Check if we are navigating away from an error page (status >= 400 or has error store)
    const isFromError = $page.status >= 400 || $page.error !== null;

    // Cancel initial instant route swap
    navigation.cancel();

    const targetUrl =
      navigation.to.url.pathname +
      (navigation.to.url.search || "") +
      (navigation.to.url.hash || "");

    const container = document.querySelector(".transition-container");
    const panelTop = document.querySelector(".panel-top");
    const panelBottom = document.querySelector(".panel-bottom");
    const flare = document.querySelector(".transition-flare");
    const ring = document.querySelector(".transition-ring");
    const telemetry = document.querySelector(".transition-telemetry");

    const statusEl = document.querySelector(".telemetry-status");
    const codeEl = document.querySelector(".telemetry-code");
    const labelEl = document.querySelector(".telemetry-label");

    if (container && panelTop && panelBottom && flare && ring && telemetry) {
      container.classList.add("is-animating");

      // Dynamic text and class injection for emergency reboot state
      if (isFromError && statusEl && codeEl && labelEl) {
        statusEl.textContent = "SYS_REBOOT";
        codeEl.textContent = "RESTORE_CORE_0x00";
        labelEl.textContent = "RE-ESTABLISHING CORES...";
        container.classList.add("reboot-mode");
      } else if (statusEl && codeEl && labelEl) {
        statusEl.textContent = "SYS_SYNC";
        codeEl.textContent = "PAGE_LOAD_0xNN";
        labelEl.textContent = "ESTABLISHING PATHWAY...";
        container.classList.remove("reboot-mode");
      }

      const tl = gsap.timeline({
        onComplete: () => {
          forceNavigate = true;
          goto(targetUrl);
        },
      });

      // Curtain closing sequence (snappy & high-tech)
      tl.to([panelTop, panelBottom], {
        translateY: "0%",
        duration: isFromError ? 0.35 : 0.45, // Quicker slam on emergency reboot
        ease: "power4.inOut",
      })
        .to(
          flare,
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.25,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .fromTo(
          ring,
          {
            scale: 0,
            opacity: 1,
          },
          {
            scale: 2.5,
            opacity: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.2",
        );

      // Play emergency glitch flickering for reboot effect
      if (isFromError) {
        tl.to(
          [panelTop, panelBottom, telemetry, flare],
          {
            opacity: 0.25,
            duration: 0.05,
            repeat: 3,
            yoyo: true,
            ease: "rough",
          },
          "-=0.1",
        ).to([panelTop, panelBottom, telemetry, flare], {
          opacity: 1,
          duration: 0.05,
        });
      }

      tl.to(
        telemetry,
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.5)",
        },
        isFromError ? "-=0.05" : "-=0.25",
      );
    } else {
      goto(targetUrl);
    }
  });

  afterNavigate(() => {
    const container = document.querySelector(".transition-container");
    const panelTop = document.querySelector(".panel-top");
    const panelBottom = document.querySelector(".panel-bottom");
    const flare = document.querySelector(".transition-flare");
    const telemetry = document.querySelector(".transition-telemetry");

    if (container && panelTop && panelBottom && flare && telemetry) {
      const tl = gsap.timeline({
        onComplete: () => {
          container.classList.remove("is-animating");
          container.classList.remove("reboot-mode"); // Reset reboot mode class
        },
      });

      // Curtain opening sequence (rapid expo.out split)
      tl.to(telemetry, {
        opacity: 0,
        scale: 0.95,
        duration: 0.25,
        ease: "power2.in",
      })
        .to(
          flare,
          {
            scaleX: 0,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          },
          "-=0.15",
        )
        .to(panelTop, {
          translateY: "-100%",
          duration: 0.55,
          ease: "expo.out",
        })
        .to(
          panelBottom,
          {
            translateY: "100%",
            duration: 0.55,
            ease: "expo.out",
          },
          "-=0.55",
        );
    }
  });
</script>

<svelte:head>
  <!-- Global SEO & Crawlers -->
  <meta name="robots" content="index, follow" />
  <meta name="author" content="Nisha Najihah" />

  <!-- Social & Open Graph Defaults -->
  <meta property="og:site_name" content="Nisha Najihah" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://nishanajihah.com/apple-touch-icon.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://nishanajihah.com/apple-touch-icon.png" />

  <!-- Permanent Favicons (Google Search & Browsers) -->
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />

  <!-- Google Structured Data (Logo & Brand Identity) -->
  {@html `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nisha Najihah",
    "url": "https://nishanajihah.com",
    "image": "https://nishanajihah.com/apple-touch-icon.png",
    "jobTitle": "Developer & Music Producer",
    "description": "Official website of Nisha Najihah. Explore interactive web apps, open-source coding projects, and original music streaming on all available music platform.",
    "sameAs": [
      "https://github.com/nishanajihah",
      "https://open.spotify.com/artist/2rI5YRwSaBF0IEwiCN7SEa",
      "https://ko-fi.com/Q5Q71FN62M"
    ]
  }
  </script>`}
</svelte:head>

<PageTransitionCurtain />

{@render children()}
