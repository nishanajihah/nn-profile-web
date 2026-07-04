<script lang="ts">
  import { Canvas } from '@threlte/core';
  import Scene from './Scene.svelte';
</script>

<div class="threlte-wrapper" aria-hidden="true">
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style>
  .threlte-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
