<script lang="ts">
  import "../app.scss";
  import faviconIco from "$lib/assets/favicon-nn/favicon.ico";
  import faviconPng from "$lib/assets/favicon-nn/favicon-96x96.png";
  import appleTouchIcon from "$lib/assets/favicon-nn/apple-touch-icon.png";

  let { children } = $props();
</script>

<svelte:head>
  <!-- Legacy fallback -->
  <link rel="icon" href={faviconIco} sizes="any" />

  <!-- High-res PNG favicon (96x96) -->
  <link rel="icon" href={faviconPng} type="image/png" sizes="96x96" />

  <!-- iOS App Icon -->
  <link rel="apple-touch-icon" href={appleTouchIcon} />
</svelte:head>

{@render children()}
