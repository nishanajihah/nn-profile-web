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
<div class="mixed-skills-section">
	<!-- All Individual Skills Mixed - No Categories -->
	<div class="all-skills-container">
		<div class="skills-mixed-row">
			{#each randomizedSkills as skill, skillIndex}
				<div
					class="skill-bubble"
					class:skill-highlighted={hoveredCategory === skill.category}
					class:skill-dimmed={hoveredCategory && hoveredCategory !== skill.category}
					style="
						 --random-offset: {((skillIndex % 6) - 3) * 8}px;
						 --random-rotation: {((skillIndex % 5) - 2) * 1.5}deg;
						 --random-vertical: {((skillIndex % 4) - 2) * 5}px;
					 "
				>
					<div class="bubble-content">
						<div class="skill-logo">
							<img src={skill.logo} alt={skill.name} />
						</div>
						<div class="skill-info">
							<div class="skill-name">{skill.name}</div>
							<div class="skill-level">
								<span class="skill-percentage">{skill.level}%</span>
								<span class="skill-label">{getSkillLevel(skill.level)}</span>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Category Dashboard - 4 in a Row -->
	<div class="category-dashboard">
		{#each Object.entries(skillCategories) as [category, categorySkills], categoryIndex}
			<div
				class="category-panel"
				class:highlight-skills={hoveredCategory === category}
				data-category={category}
				role="button"
				tabindex="0"
				on:mouseenter={() => handleCategoryHover(category)}
				on:mouseleave={handleCategoryLeave}
			>
				<div class="panel-header">
					<div class="category-badge">
						<div class="badge-title">
							<span class="category-name">{category}</span>
							<span class="skill-count">{categorySkills.length} skills</span>
						</div>
					</div>
				</div>
				<div class="category-skills">
					{#each categorySkills as skill}
						<div class="mini-skill-item">
							<img src={skill.logo} alt={skill.name} class="mini-skill-logo" />
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	@import '../../../css/code/skillsSection.css';
</style>
