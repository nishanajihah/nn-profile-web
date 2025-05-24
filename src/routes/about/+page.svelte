<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { getGitHubUser, getContributionData } from '$lib/utils/github-api.js';
  
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // GitHub profile data
  let profile = null;
  let contributions = null;
  let isLoading = true;

  // Career timeline data
  const timelineData = [
    {
      year: '2025',
      title: 'Senior Developer',
      company: 'Tech Innovations Inc.',
      description: 'Leading development of cutting-edge web applications with a focus on audio processing and visualization.'
    },
    {
      year: '2023-2024',
      title: 'Full Stack Developer',
      company: 'Creative Solutions Agency',
      description: 'Developed interactive websites and applications for clients in the music and entertainment industry.'
    },
    {
      year: '2022-2023',
      title: 'Frontend Developer',
      company: 'Digital Media Productions',
      description: 'Created dynamic user interfaces for web applications with a focus on audiovisual experiences.'
    },
    {
      year: '2020-2022',
      title: 'Junior Developer',
      company: 'Web Studios',
      description: 'Started my journey in web development working on various client projects.'
    },
    {
      year: '2018-2020',
      title: 'Music Producer',
      company: 'Independent',
      description: 'Produced original music and worked with local artists on recording projects.'
    }
  ];

  // Skills data
  const skills = {
    technical: [
      { name: 'JavaScript/TypeScript', level: 95 },
      { name: 'React & Svelte', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'CSS & UI Design', level: 88 },
      { name: 'Audio Programming', level: 92 },
      { name: '3D/WebGL', level: 78 },
      { name: 'Database Design', level: 75 },
      { name: 'DevOps & Deployment', level: 70 }
    ],
    music: [
      { name: 'Music Production', level: 92 },
      { name: 'Piano/Keys', level: 88 },
      { name: 'Guitar', level: 82 },
      { name: 'Composition', level: 90 },
      { name: 'Audio Engineering', level: 85 },
      { name: 'Music Theory', level: 80 }
    ]
  };

  async function loadProfileData() {
    try {
      // Get GitHub profile data
      const githubProfile = await getGitHubUser();
      if (githubProfile && !githubProfile.message) {
        profile = githubProfile;
      }
      
      // Get contribution data
      const contributionData = await getContributionData();
      if (contributionData) {
        contributions = contributionData;
      }
    } catch (err) {
      console.error('Error loading profile data:', err);
    } finally {
      isLoading = false;
    }
  }

  onMount(async () => {
    // Load profile data
    await loadProfileData();
    
    // Timeline animation
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1
      }
    });
    
    // Animate each timeline item
    timeline.from('.timeline-item', {
      opacity: 0,
      y: 50,
      stagger: 0.3,
      duration: 0.8
    });

    // Bio section animation
    gsap.from('.bio-content', {
      opacity: 0,
      y: 30,
      duration: 1,
      scrollTrigger: {
        trigger: '.bio-section',
        start: 'top 70%'
      }
    });

    // Skills animation
    gsap.from('.skill-bar-fill', {
      width: 0,
      duration: 1.5,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top 70%'
      }
    });
  });
</script>

<svelte:head>
  <title>About | Nisha Najihah</title>
  <meta name="description" content="Learn about Nisha Najihah - Developer, musician, and creative based in Kuala Lumpur" />
</svelte:head>

<main class="about-page">
  <section class="hero-section">
    <h1>About Me</h1>
    <p class="tagline">Developer by day, musician by night</p>
  </section>
  
  <section class="bio-section">
    <div class="bio-container">
      <div class="bio-image">
        <img src={profile?.avatar_url || "/static/images/profile-placeholder.jpg"} alt="Nisha Najihah" />
        
        {#if profile}
          <div class="github-stats">
            <div class="stat">
              <span class="stat-number">{profile.public_repos}</span>
              <span class="stat-label">Repositories</span>
            </div>
            <div class="stat">
              <span class="stat-number">{profile.followers}</span>
              <span class="stat-label">Followers</span>
            </div>
            {#if contributions}
              <div class="stat">
                <span class="stat-number">{contributions.totalContributions}</span>
                <span class="stat-label">Contributions</span>
              </div>
            {/if}
          </div>
        {/if}
      </div>
      
      <div class="bio-content">
        <h2>Developer & Musician</h2>
        
        <p>
          Hi, I'm Nisha! I'm a software developer with a passion for music and audio technology. 
          My unique background in both programming and music production allows me to create innovative 
          digital experiences that bridge the gap between technology and art.
        </p>
        
        <p>
          With expertise in full-stack development, especially in JavaScript and interactive web applications, 
          I build solutions that are both functionally robust and aesthetically engaging. I'm particularly 
          interested in the intersection of code and music, creating tools and applications for musicians 
          and audio professionals.
        </p>
        
        <p>
          When I'm not coding, you'll find me in the studio producing music, playing piano, or exploring 
          the latest advancements in audio technology. This dual passion gives me a unique perspective in 
          creating digital experiences that resonate emotionally with users.
        </p>
        
        <div class="bio-links">
          <a href="/code" class="bio-link">View My Projects</a>
          <a href="/music" class="bio-link">Listen to My Music</a>
        </div>
      </div>
    </div>
  </section>
  
  <section class="timeline-section">
    <h2>Career Journey</h2>
    
    <div class="timeline">
      {#each timelineData as item}
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-year">{item.year}</div>
          <div class="timeline-content">
            <h3>{item.title}</h3>
            <h4>{item.company}</h4>
            <p>{item.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>
  
  <section class="skills-section">
    <h2>Skills</h2>
    
    <div class="skills-container">
      <div class="skills-column">
        <h3>Technical Skills</h3>
        
        {#each skills.technical as skill}
          <div class="skill">
            <div class="skill-header">
              <span class="skill-name">{skill.name}</span>
              <span class="skill-level">{skill.level}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-bar-fill" style="width: {skill.level}%"></div>
            </div>
          </div>
        {/each}
      </div>
      
      <div class="skills-column">
        <h3>Music Skills</h3>
        
        {#each skills.music as skill}
          <div class="skill">
            <div class="skill-header">
              <span class="skill-name">{skill.name}</span>
              <span class="skill-level">{skill.level}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-bar-fill" style="width: {skill.level}%"></div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <section class="contact-section">
    <h2>Get In Touch</h2>
    
    <div class="contact-container">
      <div class="contact-info">
        <p>I'm always interested in hearing about new projects and opportunities. Whether you want to discuss a potential collaboration, ask about my work, or just say hello, feel free to reach out!</p>
        
        <div class="contact-methods">
          <a href="mailto:hello@nishanajihah.com" class="contact-method email">
            <span class="icon">📧</span>
            <span>hello@nishanajihah.com</span>
          </a>
          
          <a href="https://github.com/nishanajihah" target="_blank" class="contact-method github">
            <span class="icon">🐙</span>
            <span>github.com/nishanajihah</span>
          </a>
          
          <a href="https://open.spotify.com/artist/{profile?.login || 'nishanajihah'}" target="_blank" class="contact-method spotify">
            <span class="icon">🎵</span>
            <span>Spotify</span>
          </a>
        </div>
      </div>
      
      <form class="contact-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        
        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" id="subject" name="subject" required />
        </div>
        
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        
        <button type="submit" class="submit-button">Send Message</button>
      </form>
    </div>
  </section>
</main>

<style>
  .about-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .hero-section {
    text-align: center;
    padding: 4rem 0;
  }
  
  .hero-section h1 {
    font-size: 3.5rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .tagline {
    font-size: 1.2rem;
    opacity: 0.8;
  }
  
  .bio-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3rem;
    margin: 3rem 0;
  }
  
  .bio-image {
    position: relative;
  }
  
  .bio-image img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
  
  .github-stats {
    display: flex;
    justify-content: space-between;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin-top: 1.5rem;
  }
  
  .stat {
    text-align: center;
  }
  
  .stat-number {
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
    color: #6a11cb;
  }
  
  .stat-label {
    font-size: 0.8rem;
    opacity: 0.7;
  }
  
  .bio-content h2 {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  .bio-content p {
    margin-bottom: 1.2rem;
    line-height: 1.7;
    color: #555;
  }
  
  .bio-links {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .bio-link {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    color: white;
    text-decoration: none;
    border-radius: 30px;
    font-weight: 500;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .bio-link:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(106, 17, 203, 0.3);
  }
  
  .timeline-section {
    margin: 6rem 0;
    position: relative;
  }
  
  .timeline-section h2 {
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .timeline {
    position: relative;
    margin-left: 2rem;
  }
  
  .timeline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 2px;
    background: linear-gradient(to bottom, #6a11cb, #2575fc);
  }
  
  .timeline-item {
    position: relative;
    margin-bottom: 3rem;
    padding-left: 2.5rem;
  }
  
  .timeline-dot {
    position: absolute;
    left: -5px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #6a11cb;
    transform: translateX(-50%);
  }
  
  .timeline-year {
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(-110%);
    font-weight: bold;
    color: #6a11cb;
  }
  
  .timeline-content {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  }
  
  .timeline-content h3 {
    margin: 0;
    font-size: 1.3rem;
    color: #333;
  }
  
  .timeline-content h4 {
    margin: 0.5rem 0;
    font-weight: normal;
    color: #6a11cb;
  }
  
  .skills-section {
    margin: 6rem 0;
  }
  
  .skills-section h2 {
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .skills-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
  
  .skills-column h3 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-align: center;
    color: #333;
  }
  
  .skill {
    margin-bottom: 1.5rem;
  }
  
  .skill-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  
  .skill-name {
    font-weight: 500;
  }
  
  .skill-level {
    opacity: 0.7;
  }
  
  .skill-bar {
    height: 8px;
    background: #eee;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .skill-bar-fill {
    height: 100%;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    border-radius: 4px;
  }
  
  .contact-section {
    margin: 6rem 0;
  }
  
  .contact-section h2 {
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .contact-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
  
  .contact-info p {
    line-height: 1.7;
    margin-bottom: 2rem;
  }
  
  .contact-methods {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .contact-method {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 8px;
    background: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    text-decoration: none;
    color: inherit;
    transition: transform 0.3s;
  }
  
  .contact-method:hover {
    transform: translateX(5px);
  }
  
  .contact-method .icon {
    font-size: 1.5rem;
  }
  
  .contact-form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #6a11cb;
    box-shadow: 0 0 0 2px rgba(106, 17, 203, 0.2);
  }
  
  .submit-button {
    background: linear-gradient(to right, #6a11cb, #2575fc);
    color: white;
    border: none;
    border-radius: 30px;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .submit-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(106, 17, 203, 0.3);
  }
  
  /* Responsive styles */
  @media (max-width: 900px) {
    .bio-container,
    .contact-container,
    .skills-container {
      grid-template-columns: 1fr;
    }
    
    .timeline-year {
      position: relative;
      transform: none;
      margin-bottom: 0.5rem;
    }
  }
</style>
