<script lang="ts">
  // Cyberpunk Curtain Transition Overlay Component
  // Targeted by GSAP animations in +layout.svelte
</script>

<div class="transition-container" aria-hidden="true">
  <!-- Top Panel -->
  <div class="curtain-panel panel-top">
    <div class="panel-grid"></div>
  </div>
  
  <!-- Bottom Panel -->
  <div class="curtain-panel panel-bottom">
    <div class="panel-grid"></div>
  </div>
  
  <!-- Central Flare Line -->
  <div class="transition-flare"></div>
  
  <!-- Central Connecting Ring Ripple -->
  <div class="transition-ring"></div>
  
  <!-- Telemetry Content -->
  <div class="transition-telemetry">
    <div class="telemetry-box">
      <div class="telemetry-header">
        <span class="telemetry-status">SYS_SYNC</span>
        <span class="telemetry-code">PAGE_LOAD_0xNN</span>
      </div>
      <div class="telemetry-divider"></div>
      <div class="telemetry-body">
        <span class="telemetry-label">ESTABLISHING PATHWAY...</span>
        <div class="telemetry-loader">
          <div class="loader-progress"></div>
        </div>
      </div>
    </div>
  </div>
</div>
