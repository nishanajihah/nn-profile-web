<script lang="ts">
	export let href: string | null = null;
	export let variant: 'primary' | 'secondary' | 'outline' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let fullWidth = false;
	export let onClick: (() => void) | null = null;
	export let type: 'button' | 'reset' | 'submit' = 'button';
	export let disabled = false;
	export let target = '_self';
	export let rel = '';
</script>

{#if href}
	<a
		{href}
		class="btn btn-{variant} {size === 'sm'
			? 'px-3 py-2 text-sm'
			: size === 'lg'
				? 'px-7 py-3.5 text-lg'
				: 'px-5 py-2.5'} 
            {fullWidth ? 'w-full' : ''}"
		{target}
		{rel}
		on:click={onClick}
		class:opacity-60={disabled}
		class:cursor-not-allowed={disabled}
		class:pointer-events-none={disabled}
	>
		<slot />
	</a>
{:else}
	<button
		{type}
		class="btn btn-{variant} {size === 'sm'
			? 'px-3 py-2 text-sm'
			: size === 'lg'
				? 'px-7 py-3.5 text-lg'
				: 'px-5 py-2.5'} 
            {fullWidth ? 'w-full' : ''}"
		on:click={onClick}
		{disabled}
	>
		<slot />
	</button>
{/if}
