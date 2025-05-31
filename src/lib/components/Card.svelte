<script>
	// Props for the card component
	export let glowEffect = false;
	export let gradient = null;
	export let accent = null;
	export let hoverable = true;
</script>

<div
	class="glassmorphic-card relative overflow-hidden transition-all duration-300 {hoverable
		? 'hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] hover:shadow-md'
		: ''}"
	style={gradient
		? `background: ${gradient};`
		: accent
			? `background: radial-gradient(circle at bottom right, ${accent}, transparent 70%);`
			: ''}
>
	<!-- Card content -->
	{#if glowEffect}
		<div
			class="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-gradient-to-bl from-[var(--overlay-light)] to-transparent"
		></div>
		<div
			class="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-[var(--overlay-light)] opacity-0 transition-opacity group-hover:opacity-100"
		></div>
	{/if}

	<!-- Slot for card content -->
	<div class="relative z-10">
		<slot></slot>
	</div>
</div>
