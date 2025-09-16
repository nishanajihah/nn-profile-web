<script lang="ts">
	// ===== IMPORTS =====
	import { 
		skills, 
		randomizedSkills, 
		skillCategories, 
		getSkillLevel 
	} from '../../../ts/code/skillsSection';
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
						class="bg-gradient-to-br from-yellow-400/25 to-yellow-500/20 rounded-2xl p-3 sm:p-4 min-w-[120px] sm:min-w-[140px] max-w-[150px] sm:max-w-[180px] backdrop-blur-sm relative overflow-hidden flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:translate-y-[-3px] hover:scale-[1.02] hover:from-yellow-400/35 hover:to-yellow-500/25 hover:shadow-[0_12px_30px_rgba(255,193,7,0.3)] {hoveredCategory === skill.category ? 'from-yellow-400/30 to-yellow-500/25 shadow-[0_8px_25px_rgba(255,193,7,0.25)]' : ''}"
						style="box-shadow: 0 8px 25px rgba(0,0,0,0.15), 0 4px 12px rgba(255,193,7,0.1);"
					>
						<div class="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center bg-white/15 rounded-xl p-1.5 shadow-sm backdrop-blur-sm">
							<img src={skill.logo} alt={skill.name} class="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
						</div>
						<div class="flex-1 flex flex-col gap-1 min-w-0">
							<div class="text-white text-[0.75rem] sm:text-[0.8rem] lg:text-[0.85rem] font-semibold leading-tight truncate">{skill.name}</div>
							<div class="text-yellow-300 text-[0.65rem] sm:text-[0.7rem] lg:text-[0.75rem] font-bold font-mono flex items-center gap-1">
								<span class="truncate">{skill.level}%</span>
								<span class="text-[0.55rem] sm:text-[0.6rem] lg:text-[0.65rem] text-white/70 font-medium uppercase tracking-wide truncate">{getSkillLevel(skill.level)}</span>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Category Dashboard - 4 in a Row -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 px-4 max-w-[1000px] sm:max-w-[600px] lg:max-w-[1000px] mx-auto">
		{#each Object.entries(skillCategories) as [category, categorySkills], categoryIndex}
			<div
				class="bg-gradient-to-br from-yellow-400/25 to-yellow-500/20 rounded-3xl p-4 sm:p-5 backdrop-blur-sm shadow-[0_15px_40px_rgba(0,0,0,0.2),0_8px_20px_rgba(255,193,7,0.15)] relative overflow-hidden flex flex-col min-h-[160px] sm:min-h-[170px] lg:min-h-[180px] max-h-[180px] sm:max-h-[190px] lg:max-h-[200px] cursor-pointer transition-all duration-[400ms] cubic-bezier(0.34,1.56,0.64,1) hover:translate-y-[-8px] hover:scale-[1.02] hover:shadow-[0_25px_50px_rgba(255,193,7,0.25),0_15px_30px_rgba(0,0,0,0.15)] hover:from-yellow-400/35 hover:to-yellow-500/25 {hoveredCategory === category ? 'translate-y-[-8px] scale-[1.02] from-yellow-400/30 to-yellow-500/25' : ''}"
				style="box-shadow: {hoveredCategory === category ? '0 20px 45px rgba(255,193,7,0.2), 0 10px 25px rgba(0,0,0,0.12)' : '0 15px 40px rgba(0,0,0,0.2), 0 8px 20px rgba(255,193,7,0.15)'};"
				data-category={category}
				role="button"
				tabindex="0"
				on:mouseenter={() => handleCategoryHover(category)}
				on:mouseleave={handleCategoryLeave}
			>
				<div class="flex flex-col items-center gap-2 mb-3 flex-shrink-0">
					<div class="flex flex-col items-center gap-1">
						<div class="text-white text-[0.85rem] sm:text-[0.9rem] font-bold leading-tight tracking-wide flex flex-col items-center gap-0.5 text-center">
							<span class="text-[1rem] sm:text-[1.1rem] truncate max-w-full">{category}</span>
							<span class="text-[0.75rem] sm:text-[0.8rem] text-white/70 font-medium lowercase tracking-normal truncate">{categorySkills.length} skills</span>
						</div>
					</div>
				</div>
				<div class="flex-1 grid grid-cols-5 gap-1 overflow-y-auto max-h-[100px] p-1 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
					{#each categorySkills as skill}
						<div class="flex items-center justify-center bg-white/10 rounded-lg p-1 aspect-square min-h-auto relative overflow-hidden transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-[0_4px_15px_rgba(255,193,7,0.3)] backdrop-blur-sm">
							<img src={skill.logo} alt={skill.name} class="w-3 h-3 sm:w-4 sm:h-4 object-contain flex-shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]" />
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
