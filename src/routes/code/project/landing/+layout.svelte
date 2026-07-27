<script lang="ts">
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let { children } = $props();
  
  let isLightLegalPage = $derived($page.url.pathname.includes('/privacy') || $page.url.pathname.includes('/terms'));
</script>

<!-- Global Trademark Header for all Landing Pages -->
<header class="global-landing-header" class:white-legal-header={isLightLegalPage} in:fade={{ duration: 600 }}>
  <div class="header-container">
    <button class="back-nav-btn" onclick={() => goto('/code#section-02')}>
      {#if !isLightLegalPage}
        <svg class="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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

    &.white-legal-header {
      background: #ffffff;
      border-bottom: 1px solid rgba(230, 92, 0, 0.2);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
  }

  .header-container {
    display: flex;
    align-items: center;
    pointer-events: auto;
    width: max-content;
  }

  .back-nav-btn {
    background: #0a0a0a;
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    display: flex;
    align-items: center;
    gap: 14px;
    cursor: pointer;
    color: #e5e5e5;
    padding: 10px 24px;
    border-radius: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

    .back-icon {
      width: 18px;
      height: 18px;
      stroke: rgba(255, 255, 255, 0.85);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .trademark-text {
      font-family: 'Space Mono', monospace;
      font-size: 0.85rem;
      letter-spacing: 0.12em;
      font-weight: 500;
      display: flex;
      align-items: center;
      
      .brand-part {
        color: rgba(255, 255, 255, 0.55);
        transition: color 0.4s ease;
      }
      
      .divider {
        color: #ff9d00; // Warm Orange Theme Accent
        margin: 0 10px;
        opacity: 0.85;
        font-weight: 700;
        transition: transform 0.4s ease;
      }

      .action-part {
        color: rgba(255, 255, 255, 0.9);
        font-weight: 600;
        transition: color 0.4s ease;
      }
    }

    &:hover {
      border-color: rgba(255, 157, 0, 0.6);
      background: #140d07;
      box-shadow: 0 8px 32px rgba(255, 157, 0, 0.25), 0 0 20px rgba(255, 157, 0, 0.15);

      .back-icon {
        stroke: #ff9d00;
        transform: translateX(-4px);
      }

      .trademark-text {
        .brand-part {
          color: rgba(255, 255, 255, 0.95);
        }
        .action-part {
          color: #ff9d00;
        }
        .divider {
          transform: rotate(180deg);
        }
      }
    }
  }

  .landing-page-content {
    min-height: 100vh;
    background: transparent;
    color: #e5e5e5;
    padding-top: 100px;
  }
</style>
