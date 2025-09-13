<script lang="ts">
	import { skills, randomizedSkills, skillCategories, getSkillLevel } from '../../../ts/code/skillsSection';
	import type { Skill } from '../../../ts/code/skillsSection';

	// Component state
	let hoveredCategory: string | null = null;

	// Component methods
	function handleCategoryHover(category: string) {
		hoveredCategory = category;
	}

	function handleCategoryLeave() {
		hoveredCategory = null;
	}
</script>

<!-- Skills Section - All Skills Mixed Together -->
<div class="relative py-12 overflow-hidden">
	<!-- All Individual Skills Mixed - No Categories -->
	<div class="mb-16 px-8">
		<div class="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-6 justify-items-center items-start min-h-[200px] max-w-[1200px] mx-auto p-4">
			{#each randomizedSkills as skill, skillIndex}
				<div
					class="opacity-100 justify-self-center relative max-w-[180px] w-full transition-all duration-300 ease-in-out"
					class:scale-[1.02]={hoveredCategory === skill.category}
					class:translate-y-[-2px]={hoveredCategory === skill.category}
					class:z-10={hoveredCategory === skill.category}
					class:opacity-30={hoveredCategory && hoveredCategory !== skill.category}
					class:scale-95={hoveredCategory && hoveredCategory !== skill.category}
					class:grayscale-[0.8]={hoveredCategory && hoveredCategory !== skill.category}
					style="
						 --random-offset: {((skillIndex % 6) - 3) * 8}px;
						 --random-rotation: {((skillIndex % 5) - 2) * 1.5}deg;
						 margin-top: {((skillIndex % 4) - 2) * 5}px;
						 transform: translateX({((skillIndex % 6) - 3) * 8}px) rotate({((skillIndex % 5) - 2) * 1.5}deg);
						 animation: gentleFloat 4s ease-in-out infinite;
					 "
				>
					<div
						class="bg-gradient-to-br from-yellow-400/15 via-yellow-400/10 to-yellow-400/5 border-2 border-yellow-400/30 rounded-2xl p-2 sm:p-3 min-w-[120px] sm:min-w-[140px] max-w-[150px] sm:max-w-[180px] backdrop-blur-[15px] relative overflow-hidden flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:translate-y-[-1px] hover:scale-[1.01] hover:bg-yellow-400/20 hover:border-yellow-400/50 {hoveredCategory === skill.category ? 'bg-yellow-400/20 border-yellow-400/50' : ''}"
						style="box-shadow: 0 4px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,193,7,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,193,7,0.2);"
					>
						<div class="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center bg-yellow-400/20 rounded-lg p-1">
							<img src={skill.logo} alt={skill.name} class="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
						</div>
						<div class="flex-1 flex flex-col gap-1">
							<div class="text-white text-[0.8rem] sm:text-[0.85rem] font-semibold text-shadow-[0_1px_3px_rgba(0,0,0,0.3)] leading-tight">{skill.name}</div>
							<div class="text-yellow-400 text-[0.7rem] sm:text-[0.8rem] font-bold font-mono text-shadow-[0_0_8px_rgba(255,222,33,0.5)] flex items-center justify-center gap-1.5">
								<span class="text-[0.7rem] sm:text-[0.8rem]">{skill.level}%</span>
								<span class="text-[0.6rem] sm:text-[0.65rem] text-white/80 font-medium uppercase tracking-wider">{getSkillLevel(skill.level)}</span>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Category Dashboard - 4 in a Row -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 px-4 max-w-[1000px] sm:max-w-[600px] lg:max-w-[1000px] mx-auto">
		{#each Object.entries(skillCategories) as [category, categorySkills], categoryIndex}
			<div
				class="bg-gradient-to-br from-yellow-400/15 via-yellow-400/10 to-yellow-400/5 border-2 border-yellow-400/30 rounded-3xl p-3 sm:p-4 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,193,7,0.4),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(255,193,7,0.2)] relative overflow-hidden flex flex-col min-h-[180px] sm:min-h-[200px] lg:min-h-[220px] max-h-[220px] sm:max-h-[250px] lg:max-h-[280px] cursor-pointer transition-all duration-[400ms] cubic-bezier(0.34,1.56,0.64,1) hover:translate-y-[-5px] hover:scale-[1.02] hover:shadow-[0_15px_30px_rgba(255,193,7,0.2),0_0_25px_rgba(255,193,7,0.15),inset_0_2px_0_rgba(255,255,255,0.15),inset_0_-2px_0_rgba(255,193,7,0.15)] hover:bg-gradient-to-br hover:from-yellow-400/20 hover:via-yellow-400/15 hover:to-yellow-400/10 hover:border-yellow-400/50 {hoveredCategory === category ? 'translate-y-[-5px] scale-[1.02] bg-gradient-to-br from-yellow-400/20 via-yellow-400/15 to-yellow-400/10 border-yellow-400/50' : ''}"
				style="box-shadow: {hoveredCategory === category ? '0 15px 30px rgba(255,193,7,0.2), 0 0 25px rgba(255,193,7,0.15), inset 0 2px 0 rgba(255,255,255,0.15), inset 0 -2px 0 rgba(255,193,7,0.15)' : '0 8px 25px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,193,7,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,193,7,0.2)'};"
				data-category={category}
				role="button"
				tabindex="0"
				on:mouseenter={() => handleCategoryHover(category)}
				on:mouseleave={handleCategoryLeave}
			>
				<div class="flex flex-col items-center gap-2 mb-4 flex-shrink-0">
					<div class="flex flex-col items-center gap-1">
						<div class="text-white text-[0.9rem] font-bold text-shadow-[0_2px_4px_rgba(0,0,0,0.3)] leading-tight tracking-wide flex flex-col items-center gap-0.5">
							<span class="text-[1.1rem]">{category}</span>
							<span class="text-[0.8rem] text-white/70 font-medium lowercase tracking-normal">{categorySkills.length} skills</span>
						</div>
					</div>
				</div>
				<div class="flex-1 grid grid-cols-5 gap-1 overflow-y-auto max-h-[120px] p-1 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
					{#each categorySkills as skill}
						<div class="flex items-center justify-center bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-1 aspect-square min-h-auto relative overflow-hidden transition-all duration-300 hover:bg-yellow-400/20 hover:border-yellow-400/50 hover:scale-110 hover:shadow-[0_4px_12px_rgba(255,193,7,0.3)] before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-gradient-to-b before:from-yellow-400/80 before:to-yellow-400/50 before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100">
							<img src={skill.logo} alt={skill.name} class="w-4 h-4 sm:w-5 sm:h-5 object-contain flex-shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]" />
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	/* Only animations and complex effects that can't be done with Tailwind */
	@keyframes gentleFloat {
		0%, 100% {
			transform: translateY(0) translateX(var(--random-offset)) rotate(var(--random-rotation));
		}
		50% {
			transform: translateY(-6px) translateX(var(--random-offset)) rotate(calc(var(--random-rotation) + 1deg));
		}
	}
</style>
