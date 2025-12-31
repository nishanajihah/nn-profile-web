<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// Get error details from page store
	$: status = $page.status;
	$: message = $page.error?.message || 'An unexpected error occurred';

	// Error messages for different status codes
	const errorMessages: Record<number, { title: string; description: string; emoji: string }> = {
		400: {
			title: 'Bad Request',
			description: 'The request could not be understood by the server.',
			emoji: '⚠️'
		},
		401: {
			title: 'Unauthorized',
			description: 'You need to be authenticated to access this resource.',
			emoji: '🔒'
		},
		403: {
			title: 'Forbidden',
			description: "You don't have permission to access this resource.",
			emoji: '🚫'
		},
		404: {
			title: 'Page Not Found',
			description: "The page you're looking for doesn't exist.",
			emoji: '🔍'
		},
		500: {
			title: 'Server Error',
			description: 'Something went wrong on our end. Please try again later.',
			emoji: '🔧'
		},
		502: {
			title: 'Bad Gateway',
			description: 'The server received an invalid response. Please try again later.',
			emoji: '🌐'
		},
		503: {
			title: 'Service Unavailable',
			description: 'The service is temporarily unavailable. Please try again later.',
			emoji: '⏸️'
		}
	};

	$: errorInfo = errorMessages[status] || {
		title: 'Error',
		description: message,
		emoji: '❌'
	};

	function goBack() {
		if (window.history.length > 1) {
			window.history.back();
		} else {
			goto('/');
		}
	}

	function goHome() {
		goto('/');
	}
</script>

<svelte:head>
	<title>{status} - {errorInfo.title} | Nisha Najihah</title>
</svelte:head>

<div class="relative flex min-h-screen flex-col items-center justify-center bg-black px-4 py-16">
	<!-- Brand Name at Top -->
	<header class="absolute top-0 right-0 left-0 p-8 text-center sm:text-left">
		<a href="/" class="group flex items-center justify-center space-x-2 sm:justify-start">
			<span class="text-2xl font-black tracking-widest uppercase">
				<span class="text-white transition-colors duration-300 group-hover:text-yellow-400"
					>Nisha</span
				>
				<span class="text-yellow-400 transition-colors duration-300 group-hover:text-white"
					>Najihah</span
				>
			</span>
			<div class="h-1 w-12 bg-yellow-400 transition-all duration-300 group-hover:w-16"></div>
		</a>
	</header>

	<div class="z-10 w-full max-w-3xl text-center">
		<!-- Error Header Row (Emoji + Code) -->
		<div class="mb-8 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
			<div class="relative inline-block">
				<div class="absolute inset-0 rounded-full bg-yellow-400/20 blur-2xl"></div>
				<div class="relative animate-bounce">
					<span class="text-7xl drop-shadow-[0_0_20px_rgba(250,204,21,0.5)] md:text-9xl"
						>{errorInfo.emoji}</span
					>
				</div>
			</div>

			<h1 class="animate-pulse text-8xl font-black tracking-tighter text-yellow-400 md:text-9xl">
				{status}
			</h1>
		</div>

		<!-- Error Title -->
		<h2 class="mb-4 text-3xl font-black tracking-tight text-white uppercase md:text-5xl">
			{errorInfo.title}
		</h2>

		<!-- Error Description -->
		<p class="mx-auto mb-12 max-w-md text-lg font-medium text-gray-400 md:text-xl">
			{errorInfo.description}
		</p>

		<!-- Action Buttons -->
		<div class="flex flex-col items-center justify-center gap-6 sm:flex-row">
			<button
				on:click={goBack}
				class="group relative flex min-w-[200px] items-center justify-center gap-3 overflow-hidden rounded-full bg-yellow-400 px-8 py-5 font-black tracking-wider text-black uppercase transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_0_40px_rgba(250,204,21,0.4)]"
			>
				<svg
					class="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="3"
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/>
				</svg>
				Go Back
			</button>

			<button
				on:click={goHome}
				class="group relative flex min-w-[200px] items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-white/20 bg-transparent px-8 py-5 font-black tracking-wider text-white uppercase transition-all duration-300 hover:scale-105 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="3"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
				Go Home
			</button>
		</div>

		<!-- Status Indicators -->
		<div class="mt-20 flex justify-center space-x-3">
			<div class="h-1.5 w-8 animate-pulse rounded-full bg-yellow-400/30"></div>
			<div
				class="h-1.5 w-12 animate-pulse rounded-full bg-yellow-400"
				style="animation-delay: 0.2s"
			></div>
			<div
				class="h-1.5 w-8 animate-pulse rounded-full bg-yellow-400/30"
				style="animation-delay: 0.4s"
			></div>
		</div>
	</div>

	<!-- Background Overlay Grid -->
	<div class="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-20">
		<div
			class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"
		></div>
	</div>
</div>

<style>
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
	}
</style>
