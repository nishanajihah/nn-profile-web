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
			description: 'Access denied. Please check your credentials.',
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

	const currentYear = new Date().getFullYear();

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

<div
	class="relative flex min-h-screen flex-col items-center justify-center bg-black px-4 py-16 font-sans text-white"
>
	<!-- Brand Name at Top -->
	<header class="absolute top-0 right-0 left-0 p-8 text-center sm:text-left">
		<a href="/" class="group inline-flex flex-col items-center gap-2 sm:items-start">
			<div class="text-2xl font-black tracking-widest uppercase md:text-3xl">
				<span class="text-white transition-all duration-300">Nisha</span>
				<span class="text-[#ffde21] transition-all duration-300">Najihah</span>
			</div>
			<div class="h-0.5 w-12 bg-[#ffde21]/40 transition-all duration-300 group-hover:w-16"></div>
		</a>
	</header>

	<div class="z-10 w-full max-w-4xl text-center">
		<!-- Error Header Row (Icon + Code + Icon) -->
		<div class="mb-8 flex flex-row items-center justify-center gap-6 md:gap-12">
			<!-- Left Icon -->
			<div class="relative hidden sm:block">
				<div class="absolute inset-0 rounded-full bg-[#ffde21]/10 blur-xl"></div>
				<div class="relative animate-bounce opacity-40">
					<span class="text-5xl drop-shadow-[0_0_15px_rgba(255,222,33,0.3)] md:text-7xl"
						>{errorInfo.emoji}</span
					>
				</div>
			</div>

			<!-- Main Status Code -->
			<div class="relative">
				<div class="absolute inset-x-0 -bottom-4 h-1 bg-[#ffde21]/20 blur-sm"></div>
				<h1 class="animate-pulse text-8xl font-black tracking-tighter text-[#ffde21] md:text-9xl">
					{status}
				</h1>
			</div>

			<!-- Right Icon -->
			<div class="relative hidden sm:block">
				<div class="absolute inset-0 rounded-full bg-[#ffde21]/10 blur-xl"></div>
				<div class="relative animate-bounce opacity-40">
					<span class="text-5xl drop-shadow-[0_0_15px_rgba(255,222,33,0.3)] md:text-7xl"
						>{errorInfo.emoji}</span
					>
				</div>
			</div>
		</div>

		<!-- Mobile Icon (Visible only on small screens) -->
		<div class="mb-6 block flex animate-bounce justify-center text-6xl sm:hidden">
			{errorInfo.emoji}
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
				class="group relative flex min-w-[200px] items-center justify-center gap-3 overflow-hidden rounded-full bg-[#ffde21] px-8 py-5 font-black tracking-wider text-black uppercase transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_0_40px_rgba(255,222,33,0.4)]"
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
				class="group relative flex min-w-[200px] items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-white/20 bg-transparent px-8 py-5 font-black tracking-wider text-white uppercase transition-all duration-300 hover:scale-105 hover:border-[#ffde21] hover:text-[#ffde21] hover:shadow-[0_0_30_rgba(255,255,255,0.1)]"
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
	</div>

	<!-- Branded Footer (Full Width, Right-Aligned Layout) -->
	<footer class="absolute right-0 bottom-0 left-0 p-8 pb-10">
		<div class="flex w-full flex-col items-center gap-6 sm:items-end">
			<!-- Logo + Socials Row -->
			<div class="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-end">
				<!-- Social Links -->
				<div class="flex items-center gap-3">
					<a
						href="https://github.com/nishanajihah"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Visit GitHub Profile"
						class="group flex h-10 w-10 items-center justify-center rounded-xl border border-[#ffde21]/10 bg-white/5 transition-all duration-300 hover:border-[#ffde21] hover:bg-[#ffde21] hover:text-black"
					>
						<svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
							<path
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
							/>
						</svg>
					</a>
					<a
						href="https://ko-fi.com/nishanajihah"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Support on Ko-fi"
						class="group flex h-10 w-10 items-center justify-center rounded-xl border border-[#ffde21]/10 bg-white/5 transition-all duration-300 hover:border-[#ffde21] hover:bg-[#ffde21] hover:text-black"
					>
						<svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
							<path
								d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311z"
							/>
						</svg>
					</a>
					<span
						class="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-xl border border-white/5 bg-white/5 opacity-30"
						title="Spotify (Coming Soon)"
						aria-label="Spotify (Coming Soon)"
					>
						<svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
							<path
								d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 12C22 6.47715 17.5228 2 12 2ZM16.5917 16.5917C16.2931 16.8903 15.8162 16.8903 15.5176 16.5917C14.3999 15.4739 12.7616 14.8 11 14.8C9.23842 14.8 7.60014 15.4739 6.48239 16.5917C6.18375 16.8903 5.7069 16.8903 5.40825 16.5917C5.10959 16.2931 5.10959 15.8162 5.40825 15.5176C6.80075 14.125 8.82715 13.3 11 13.3C13.1729 13.3 15.1992 14.125 16.5917 15.5176C16.8904 15.8162 16.8904 16.2931 16.5917 15.5176Z"
							/>
						</svg>
					</span>
				</div>

				<!-- Branding -->
				<div
					class="text-xl font-black tracking-widest uppercase transition-all duration-300 md:text-2xl"
				>
					<span class="text-white">Nisha</span>
					<span class="text-[#ffde21]">Najihah</span>
				</div>
			</div>

			<!-- Credits & Copyright -->
			<div class="space-y-1 text-center sm:text-right">
				<div class="text-xs font-black tracking-[0.2em] text-[#ffde21] uppercase">
					Developed & Created by <span class="text-white transition-all duration-300"
						>Nisha Najihah</span
					>
				</div>
				<div class="text-xs font-medium tracking-widest text-gray-500 uppercase">
					© {currentYear} All rights reserved.
				</div>
			</div>
		</div>
	</footer>

	<!-- Background Overlay Grid -->
	<div class="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-10">
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
