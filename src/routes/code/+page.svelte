<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Mock projects data (will be replaced with GitHub API)
  const projects = [
    {
      name: 'Project One',
      description: 'A description of what this project does and the tech stack used.',
      technologies: ['JavaScript', 'Node.js', 'Express'],
      stars: 25,
      forks: 10,
      link: 'https://github.com',
      liveSite: 'https://example.com'
    },
    {
      name: 'Project Two',
      description: 'Another cool project with a longer description explaining the concept and implementation details.',
      technologies: ['React', 'TypeScript', 'Firebase'],
      stars: 42,
      forks: 15,
      link: 'https://github.com',
      liveSite: null
    },
    {
      name: 'Project Three',
      description: 'A third amazing project showcasing different skills and accomplishments.',
      technologies: ['Svelte', 'TailwindCSS', 'Supabase'],
      stars: 18,
      forks: 5,
      link: 'https://github.com',
      liveSite: 'https://example.com'
    },
    {
      name: 'Project Four',
      description: 'A fourth project demonstrating your expertise in different areas.',
      technologies: ['Python', 'Flask', 'PostgreSQL'],
      stars: 31,
      forks: 12,
      link: 'https://github.com',
      liveSite: 'https://example.com'
    }
  ];

  // State to track which project card is flipped
  let flippedCard = -1;

  // Function to flip a card
  function flipCard(index) {
    flippedCard = flippedCard === index ? -1 : index;
  }

  onMount(() => {
    // Animate project cards on scroll
    gsap.from('.project-card', {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top bottom',
        end: 'center center',
        scrub: 1
      }
    });

    // Animate skills bars
    gsap.from('.skill-progress', {
      width: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top 80%',
      }
    });
  });
</script>

<svelte:head>
  <title>Code | Nisha Najihah</title>
  <meta name="description" content="Coding portfolio of Nisha Najihah - developer and programmer" />
</svelte:head>

<section class="code-container">
  <h1 class="code-title">My Code Projects</h1>
  
  <div class="projects-grid">
    {#each projects as project, i}
      <div class="project-card {flippedCard === i ? 'flipped' : ''}" on:click={() => flipCard(i)}>
        <div class="card-inner">
          <div class="card-front">
            <h3>{project.name}</h3>
            <p class="project-description">{project.description}</p>
            <div class="tech-stack">
              {#each project.technologies as tech}
                <span class="tech-badge">{tech}</span>
              {/each}
            </div>
            <div class="github-stats">
              <span>⭐ {project.stars}</span>
              <span>🍴 {project.forks}</span>
            </div>
          </div>
          <div class="card-back">
            <h3>{project.name} Details</h3>
            <p>{project.description}</p>
            <div class="project-links">
              <a href={project.link} target="_blank" rel="noopener noreferrer">GitHub Repo</a>
              {#if project.liveSite}
                <a href={project.liveSite} target="_blank" rel="noopener noreferrer">Live Site</a>
              {/if}
            </div>
            <div class="tech-stack">
              {#each project.technologies as tech}
                <span class="tech-badge">{tech}</span>
              {/each}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <div class="skills-section">
    <h2>Technical Skills</h2>
    <div class="skills-container">
      <div class="skill">
        <div class="skill-name">JavaScript</div>
        <div class="skill-bar">
          <div class="skill-progress" style="width: 90%;"></div>
        </div>
      </div>
      <div class="skill">
        <div class="skill-name">React</div>
        <div class="skill-bar">
          <div class="skill-progress" style="width: 85%;"></div>
        </div>
      </div>
      <div class="skill">
        <div class="skill-name">Node.js</div>
        <div class="skill-bar">
          <div class="skill-progress" style="width: 80%;"></div>
        </div>
      </div>
      <div class="skill">
        <div class="skill-name">Svelte</div>
        <div class="skill-bar">
          <div class="skill-progress" style="width: 75%;"></div>
        </div>
      </div>
      <div class="skill">
        <div class="skill-name">CSS/SASS</div>
        <div class="skill-bar">
          <div class="skill-progress" style="width: 85%;"></div>
        </div>
      </div>
      <div class="skill">
        <div class="skill-name">Python</div>
        <div class="skill-bar">
          <div class="skill-progress" style="width: 70%;"></div>
        </div>
      </div>
      <div class="skill">
        <div class="skill-name">TypeScript</div>
        <div class="skill-bar">
          <div class="skill-progress" style="width: 75%;"></div>
        </div>
      </div>
      <div class="skill">
        <div class="skill-name">Git</div>
        <div class="skill-bar">
          <div class="skill-progress" style="width: 85%;"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="github-activity">
    <h2>GitHub Activity</h2>
    <div class="activity-placeholder">
      <!-- GitHub contribution graph will be added here -->
      <div class="placeholder-grid">
        {#each Array(52) as _, week}
          <div class="placeholder-week">
            {#each Array(7) as _, day}
              <div class="placeholder-day" style="opacity: {Math.random() * 0.8 + 0.1};"></div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="code-support">
    <h3>Support My Open Source Work</h3>
    <a href="https://github.com/sponsors" target="_blank" rel="noopener noreferrer" class="sponsor-button">
      Sponsor on GitHub
    </a>
  </div>
</section>

<style>
  .code-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .code-title {
    font-size: 3rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .project-card {
    perspective: 1000px;
    height: 300px;
    cursor: pointer;
  }

  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .project-card.flipped .card-inner {
    transform: rotateY(180deg);
  }

  .card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .card-front {
    background: white;
  }

  .card-back {
    background: white;
    transform: rotateY(180deg);
  }

  .project-description {
    margin: 1rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .tech-badge {
    background: #eee;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    color: #333;
  }

  .github-stats {
    display: flex;
    gap: 1rem;
    color: #666;
    font-size: 0.9rem;
  }

  .project-links {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
  }

  .project-links a {
    padding: 0.5rem 1rem;
    background: #000;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.9rem;
    transition: background 0.3s ease;
  }

  .project-links a:hover {
    background: #333;
  }

  .skills-section {
    margin-bottom: 4rem;
  }

  .skills-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .skill {
    margin-bottom: 1rem;
  }

  .skill-name {
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .skill-bar {
    height: 10px;
    background: #eee;
    border-radius: 5px;
    overflow: hidden;
  }

  .skill-progress {
    height: 100%;
    background: #000;
    border-radius: 5px;
  }

  .github-activity {
    margin-bottom: 4rem;
  }

  .activity-placeholder {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
  }

  .placeholder-grid {
    display: flex;
    gap: 1px;
    min-width: 700px;
  }

  .placeholder-week {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .placeholder-day {
    width: 12px;
    height: 12px;
    background-color: #196127;
    border-radius: 2px;
  }

  .code-support {
    text-align: center;
    margin-bottom: 2rem;
  }

  .sponsor-button {
    display: inline-block;
    background: #ea4aaa;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    transition: background 0.3s ease;
  }

  .sponsor-button:hover {
    background: #d03592;
  }

  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
</style>
