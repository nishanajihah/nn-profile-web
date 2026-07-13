<script lang="ts">
  import { page } from "$app/stores";
  import { onMount, onDestroy } from "svelte";

  // State for animated elements
  let mounted = $state(false);
  let ripple1 = $state<HTMLElement | null>(null);
  let ripple2 = $state<HTMLElement | null>(null);
  let ripple3 = $state<HTMLElement | null>(null);

  onMount(() => {
    mounted = true;
  });

  onDestroy(() => {
    // Cleanup if needed
  });

  const errorData = $derived.by(() => {
    const status = $page.status;
    const message = $page.error?.message;

    if (status === 503 && message === "BUILDING_MODE") {
      return {
        title: "Page in Building",
        message:
          "This portal is currently being calibrated. We are building something extraordinary for you. Access will be restored soon.",
        code: "BUILDING",
        isMaintenance: true,
      };
    }

    switch (status) {
      case 404:
        return {
          title: "Portal Not Found",
          message:
            "The identity you're looking for has glitched out of this dimension. It might have been moved or never existed.",
          code: "404",
        };
      case 403:
        return {
          title: "Access Restricted",
          message:
            "Your system does not have the required permissions to decrypt this section.",
          code: "403",
        };
      case 500:
        return {
          title: "System Crash",
          message:
            "The core processor encountered a critical failure. Our engineers are currently debugging the simulation.",
          code: "500",
        };
      case 503:
        return {
          title: "Service Unavailable",
          message:
            message || "The server is temporarily unable to service your request due to maintenance downtime or capacity problems.",
          code: "503",
        };
      default:
        return {
          title: "Unknown Glitch",
          message:
            message || "An unexpected fragment error has occurred. Please return to the main hub.",
          code: status.toString(),
        };
    }
  });

  const returnUrl = $derived.by(() => {
    if ($page.url.pathname.includes('/code/project/landing/')) {
      return '/code#section-02';
    }
    return '/';
  });

  const returnLabel = $derived.by(() => {
    if ($page.url.pathname.includes('/code/project/landing/')) {
      return 'Return to Code';
    }
    return 'Return to Home';
  });
</script>

<svelte:head>
  <title>
    {errorData.isMaintenance
      ? "Nisha Najihah | Page in Building"
      : `Nisha Najihah | Error ${errorData.code}`}
  </title>
</svelte:head>

<div class="error-page-wrapper">
  <!-- Identity Header -->
  <header class="error-header">
    <a href="/" class="brand-identity">NISHA NAJIHAH</a>
  </header>

  <!-- Background Ripples -->
  <div class="ripple-container">
    <div bind:this={ripple1} class="ripple"></div>
    <div bind:this={ripple2} class="ripple"></div>
    <div bind:this={ripple3} class="ripple"></div>
  </div>

  <div class="error-container" class:is-mounted={mounted}>
    {#if errorData.isMaintenance}
      <div class="maintenance-layout">
        <div class="flanking-icons">
          <div class="side-icon left">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><path
                d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
              /></svg
            >
          </div>
          <h1 class="status-code">{errorData.code}</h1>
          <div class="side-icon right">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
              /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line
                x1="12"
                y1="22.08"
                x2="12"
                y2="12"
              /></svg
            >
          </div>
        </div>
        <h2 class="error-title">{errorData.title}</h2>
      </div>
    {:else}
      <h1 class="status-code">{errorData.code}</h1>
      <h2 class="error-title">{errorData.title}</h2>
    {/if}

    <p class="error-message">{errorData.message}</p>

    <a href={returnUrl} class="action-btn">
      <span>{returnLabel}</span>
    </a>
  </div>
</div>
