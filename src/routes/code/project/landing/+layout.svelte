<script lang="ts">
  import { fade } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  let { children } = $props();

  let isLightLegalPage = $derived(
    $page.url.pathname.includes("/privacy") ||
      $page.url.pathname.includes("/terms"),
  );
</script>

<!-- Global Trademark Header for all Landing Pages -->
<header
  class="global-landing-header"
  class:white-legal-header={isLightLegalPage}
  in:fade={{ duration: 600 }}
>
  <div class="header-container">
    <button class="back-nav-btn" onclick={() => goto("/code#section-02")}>
      {#if !isLightLegalPage}
        <svg
          class="back-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      {/if}
      <span class="trademark-text">
        <span class="brand-part">NISHA NAJIHAH</span>
        <span class="divider">//</span>
        <span class="action-part">SYSTEM BACK</span>
      </span>
    </button>
  </div>
</header>

<main class="landing-page-content" in:fade={{ duration: 800, delay: 200 }}>
  {@render children()}
</main>

<style lang="scss">
  .global-landing-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    pointer-events: none;
    padding: 16px 24px;
    transition: all 0.3s ease;
    display: flex;
    justify-content: flex-start;

    @media (max-width: 768px) {
      padding: 10px 16px;
      justify-content: flex-start;
      background: var(--header-bg, rgba(10, 10, 10, 0.85));
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--header-border, rgba(255, 255, 255, 0.08));
    }

    &.white-legal-header {
      background: var(--header-bg, #ffffff);
      border-bottom: 1px solid var(--header-border, rgba(230, 92, 0, 0.2));
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

      .back-nav-btn {
        background: var(--header-web-btn-bg, #0a0a0a);
        border: 1px solid rgba(255, 255, 255, 0.15);

        // Web view text colors
        .back-icon {
          stroke: var(--header-web-divider, rgba(255, 255, 255, 0.85));

          @media (max-width: 768px) {
            stroke: var(--header-mobile-divider, #ff7d00);
          }
        }

        .trademark-text {
          .brand-part {
            color: var(--header-web-brand, rgba(255, 255, 255, 0.65));

            @media (max-width: 768px) {
              color: var(--header-mobile-brand, #555555);
            }
          }

          .divider {
            color: var(--header-web-divider, #ff9d00);

            @media (max-width: 768px) {
              color: var(--header-mobile-divider, #ff7d00);
            }
          }

          .action-part {
            color: var(--header-web-action, rgba(255, 255, 255, 0.95));

            @media (max-width: 768px) {
              color: var(--header-mobile-action, #111111);
            }
          }
        }

        @media (max-width: 768px) {
          background: transparent;
          border: none;
        }
      }
    }
  }

  .header-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    pointer-events: auto;
    width: max-content;

    @media (max-width: 768px) {
      width: auto;
    }
  }

  .back-nav-btn {
    background: var(--header-web-btn-bg, #0a0a0a);
    border: 1px solid var(--header-btn-border, rgba(255, 255, 255, 0.15));
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    cursor: pointer;
    color: #e5e5e5;
    padding: 10px 22px;
    border-radius: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

    @media (max-width: 768px) {
      background: transparent;
      border: none;
      box-shadow: none;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      padding: 4px 0;
      gap: 8px;
    }

    .back-icon {
      width: 18px;
      height: 18px;
      stroke: var(--header-web-divider, rgba(255, 255, 255, 0.85));
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

      @media (max-width: 768px) {
        width: 16px;
        height: 16px;
        stroke: var(--header-mobile-divider, #ff7d00);
      }
    }

    .trademark-text {
      font-family: "Space Mono", monospace;
      font-size: 0.85rem;
      letter-spacing: 0.12em;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (max-width: 768px) {
        font-size: 0.82rem;
        letter-spacing: 0.08em;
      }

      @media (max-width: 480px) {
        font-size: 0.78rem;
        letter-spacing: 0.05em;
      }

      .brand-part {
        color: var(--header-web-brand, rgba(255, 255, 255, 0.65));
        transition: color 0.4s ease;

        @media (max-width: 768px) {
          color: var(--header-mobile-brand, rgba(255, 255, 255, 0.65));
        }
      }

      .divider {
        color: var(--header-web-divider, #ff9d00); // Warm Orange Theme Accent
        margin: 0 8px;
        opacity: 0.85;
        font-weight: 700;
        transition: transform 0.4s ease;

        @media (max-width: 768px) {
          color: var(--header-mobile-divider, #ff9d00);
        }

        @media (max-width: 480px) {
          margin: 0 6px;
        }
      }

      .action-part {
        color: var(--header-web-action, rgba(255, 255, 255, 0.95));
        font-weight: 700;
        transition: color 0.4s ease;

        @media (max-width: 768px) {
          color: var(--header-mobile-action, rgba(255, 255, 255, 0.95));
        }
      }
    }

    &:hover {
      border-color: var(--header-hover-border, rgba(255, 157, 0, 0.6));
      background: var(--header-hover-bg, #140d07);
      box-shadow:
        0 8px 32px var(--header-hover-glow, rgba(255, 157, 0, 0.25)),
        0 0 20px var(--header-hover-glow, rgba(255, 157, 0, 0.15));

      @media (max-width: 768px) {
        background: transparent;
        box-shadow: none;
        border-color: transparent;
      }

      .back-icon {
        stroke: var(--header-hover-accent, #ff9d00);
        transform: translateX(-4px);
      }

      .trademark-text {
        .brand-part {
          color: rgba(255, 255, 255, 0.95);
        }
        .action-part {
          color: var(--header-hover-accent, #ff9d00);
        }
        .divider {
          color: var(--header-hover-accent, #ff9d00);
          transform: rotate(180deg);
        }
      }
    }
  }

  .landing-page-content {
    min-height: 100vh;
    background: transparent;
    color: #e5e5e5;
    padding-top: 80px;

    @media (max-width: 768px) {
      padding-top: 44px; // Seamless transition right below header bar
    }
  }
</style>
