<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";

  interface Props {
    appName?: string;
    appSlug?: string;
    lastUpdated?: string;
    docType?: "Privacy Policy" | "Terms & Conditions";
    gradientBackground?: string;
    accentColor?: string;
    cardBgColor?: string;
    textColor?: string;
    headerBgColor?: string;
    headerBorderColor?: string;
    headerWebBtnBgColor?: string;
    headerWebBrandColor?: string;
    headerWebDividerColor?: string;
    headerWebActionColor?: string;
    headerMobileBrandColor?: string;
    headerMobileDividerColor?: string;
    headerMobileActionColor?: string;
    headerHoverAccentColor?: string;
    headerHoverBorderColor?: string;
    headerHoverBgColor?: string;
    headerHoverGlowColor?: string;
    contactBoxBgColor?: string;
    contactBoxHoverBgColor?: string;
    contactBoxBorderColor?: string;
    children?: import("svelte").Snippet;
  }

  let {
    appName = "Random Kit+ Idle",
    appSlug = "random-kit-idle",
    lastUpdated = "July 26, 2026",
    docType = "Privacy Policy",
    gradientBackground = "linear-gradient(180deg, #ff7d00 0%, #ff5500 35%, #e64a00 100%)",
    accentColor = "#e65c00",
    cardBgColor = "#ffffff",
    textColor = "#2b231d",
    headerBgColor = "#ffffff",
    headerBorderColor = "rgba(230, 92, 0, 0.2)",
    headerWebBtnBgColor = "#0a0a0a",
    headerWebBrandColor = "rgba(255, 255, 255, 0.65)",
    headerWebDividerColor = "#ff9d00",
    headerWebActionColor = "rgba(255, 255, 255, 0.95)",
    headerMobileBrandColor = "#555555",
    headerMobileDividerColor = "#ff7d00",
    headerMobileActionColor = "#111111",
    headerHoverAccentColor = "#ff9d00",
    headerHoverBorderColor = "rgba(255, 157, 0, 0.6)",
    headerHoverBgColor = "#140d07",
    headerHoverGlowColor = "rgba(255, 157, 0, 0.25)",
    contactBoxBgColor = "rgba(255, 125, 0, 0.05)",
    contactBoxHoverBgColor = "rgba(255, 125, 0, 0.10)",
    contactBoxBorderColor = "rgba(255, 125, 0, 0.12)",
    children,
  }: Props = $props();

  let visible = $state(false);
  const currentYear = new Date().getFullYear();

  onMount(() => {
    visible = true;
    if (browser) {
      window.scrollTo(0, 0);
      document.documentElement.classList.add("legal-page-active");
      document.body.classList.add("legal-page-active");
    }

    return () => {
      if (browser) {
        document.documentElement.classList.remove("legal-page-active");
        document.body.classList.remove("legal-page-active");
      }
    };
  });
</script>

<svelte:head>
  <title>{docType} | {appName}</title>
  <meta
    name="description"
    content="{docType} for {appName} mobile app, developed by Nisha Najihah."
  />
</svelte:head>

<div
  class="rk-legal-wrapper"
  style:--legal-gradient={gradientBackground}
  style:--legal-accent={accentColor}
  style:--legal-card-bg={cardBgColor}
  style:--legal-text={textColor}
  style:--header-bg={headerBgColor}
  style:--header-border={headerBorderColor}
  style:--header-web-btn-bg={headerWebBtnBgColor}
  style:--header-web-brand={headerWebBrandColor}
  style:--header-web-divider={headerWebDividerColor}
  style:--header-web-action={headerWebActionColor}
  style:--header-mobile-brand={headerMobileBrandColor}
  style:--header-mobile-divider={headerMobileDividerColor}
  style:--header-mobile-action={headerMobileActionColor}
  style:--header-hover-accent={headerHoverAccentColor}
  style:--header-hover-border={headerHoverBorderColor}
  style:--header-hover-bg={headerHoverBgColor}
  style:--header-hover-glow={headerHoverGlowColor}
  style:--contact-box-bg={contactBoxBgColor}
  style:--contact-box-hover-bg={contactBoxHoverBgColor}
  style:--contact-box-border={contactBoxBorderColor}
>
  {#if visible}
    <div class="rk-legal-container" in:fade={{ duration: 600 }}>
      <header class="rk-legal-header" in:fly={{ y: -20, duration: 600 }}>
        <a
          href="/code/project/landing/{appSlug}"
          class="rk-back-btn"
          title="Return to App Page"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to {appName} Page</span>
        </a>

        <div class="rk-header-meta">
          <span class="rk-app-badge">{appName}</span>
          <h1 class="rk-page-title">{docType}</h1>
          <span class="rk-date">Last Updated: {lastUpdated}</span>
        </div>
      </header>

      <main class="rk-legal-card">
        {#if children}
          {@render children()}
        {/if}

        <div class="rk-action-footer">
          <a href="/code/project/landing/{appSlug}" class="rk-return-btn">
            <span>Return to {appName} Page</span>
          </a>
        </div>
      </main>

      <footer class="rk-legal-footer">
        <p>
          © {currentYear}
          {appName}. Developed by
          <a href="/" class="copyright-dev-link">Nisha Najihah</a>. All Rights
          Reserved.
        </p>
      </footer>
    </div>
  {/if}
</div>

<style lang="scss">
  .rk-legal-wrapper {
    min-height: 100vh;
    background: var(--legal-gradient);
    color: var(--legal-text);
    padding: 40px 20px 80px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      sans-serif;

    .rk-legal-container {
      max-width: 1300px;
      margin: 0 auto;
    }

    .rk-legal-header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 35px;
      min-height: 60px;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
        margin-bottom: 24px;
      }

      .rk-back-btn {
        position: absolute;
        left: 0;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        border-radius: 30px;
        background: #ffffff;
        border: 1.5px solid rgba(230, 92, 0, 0.3);
        color: var(--legal-accent);
        text-decoration: none;
        font-weight: 800;
        font-size: 0.9rem;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;

        &:hover {
          background: #fff8f2;
          border-color: var(--legal-accent);
          transform: translateX(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);

          svg {
            transform: translateX(-3px);
          }
        }

        @media (max-width: 768px) {
          position: relative;
          left: auto;
          margin-bottom: 0;
          padding: 8px 16px;
          font-size: 0.85rem;
        }
      }

      .rk-header-meta {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;

        .rk-app-badge {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.35);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 6px 18px;
          border-radius: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }

        .rk-page-title {
          font-size: clamp(2.2rem, 5vw, 3.2rem);
          font-weight: 900;
          color: #ffffff;
          margin: 4px 0;
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .rk-date {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }
      }
    }

    .rk-legal-card {
      background: var(--legal-card-bg);
      border-radius: 36px;
      padding: 56px 60px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);

      @media (max-width: 768px) {
        padding: 36px 24px;
        border-radius: 24px;
      }
    }

    .rk-action-footer {
      margin-top: 50px;
      padding-top: 30px;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      display: flex;
      justify-content: center;

      .rk-return-btn {
        background: var(--legal-gradient);
        color: #ffffff;
        padding: 14px 32px;
        border-radius: 30px;
        font-weight: 800;
        font-size: 0.95rem;
        text-decoration: none;
        box-shadow: 0 6px 20px rgba(230, 92, 0, 0.35);
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-2px);
        }
      }
    }

    .rk-legal-footer {
      margin-top: 40px;
      text-align: center;
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.95rem;
      font-weight: 600;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

      .copyright-dev-link {
        color: #ffffff;
        font-weight: 700;
        text-decoration: none;
        transition:
          color 0.3s ease,
          opacity 0.3s ease;

        &:hover {
          color: #ffffff;
          opacity: 0.8;
        }
      }
    }
  }

  // Global styles for slotted content inside .rk-legal-wrapper
  :global(.rk-legal-wrapper) {
    :global(.rk-section) {
      margin-bottom: 40px;
    }

    :global(.rk-section h2) {
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--legal-text);
      margin-bottom: 14px;
      padding-bottom: 8px;
      border-bottom: 2px solid rgba(0, 0, 0, 0.08);
    }

    :global(.rk-section p) {
      font-size: 1rem;
      line-height: 1.75;
      color: rgba(43, 35, 29, 0.9);
      margin-bottom: 16px;
    }

    :global(.rk-info-grid) {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }

    :global(.rk-info-box) {
      background: #fff8f2;
      border: 1px solid rgba(230, 92, 0, 0.2);
      border-radius: 20px;
      padding: 24px;
    }

    :global(.rk-info-box h3) {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--legal-accent);
      margin-bottom: 8px;
    }

    :global(.rk-info-box p) {
      font-size: 0.92rem;
      margin-bottom: 0;
      line-height: 1.6;
    }

    :global(.rk-list) {
      margin: 16px 0 20px 24px;
      line-height: 1.75;
    }

    :global(.rk-list li) {
      margin-bottom: 10px;
    }

    :global(.rk-link) {
      color: var(--legal-accent);
      font-weight: 700;
      text-decoration: underline;

      &:hover {
        color: #b34700;
      }
    }

    :global(.rk-contact-signature) {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: var(--contact-box-bg, rgba(255, 125, 0, 0.04));
      border-left: 4px solid var(--legal-accent, #ff7d00);
      border-top: 1px solid var(--contact-box-border, rgba(255, 125, 0, 0.08));
      border-right: 1px solid var(--contact-box-border, rgba(255, 125, 0, 0.08));
      border-bottom: 1px solid
        var(--contact-box-border, rgba(255, 125, 0, 0.08));
      padding: 18px 22px;
      border-radius: 0 16px 16px 0;
      margin-top: 16px;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        background: var(--contact-box-hover-bg, rgba(255, 125, 0, 0.09));
        border-top-color: rgba(255, 125, 0, 0.18);
        border-right-color: rgba(255, 125, 0, 0.18);
        border-bottom-color: rgba(255, 125, 0, 0.18);
        box-shadow: 0 6px 20px rgba(255, 125, 0, 0.06);
      }
    }

    :global(.rk-contact-signature .name) {
      font-weight: 800;
      font-size: 1.05rem;
      color: var(--legal-text, #1a1005);
    }

    :global(.rk-contact-signature .email-link) {
      color: var(--legal-accent, #e65c00);
      font-weight: 800;
      font-size: 0.98rem;
      text-decoration: none;
      transition: all 0.3s ease;
      width: fit-content;

      &:hover {
        color: var(--legal-accent, #e65c00);
        text-shadow: 0 0 10px rgba(255, 125, 0, 0.4);
        text-decoration: underline;
      }
    }
  }
</style>
