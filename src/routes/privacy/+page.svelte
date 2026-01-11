<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  onMount(() => {
    if (browser) {
      window.scrollTo(0, 0);
    }
  });
</script>

<svelte:head>
  <title>Privacy Policy - Nisha Najihah</title>
</svelte:head>

<div class="privacy-page">
  <div class="container">
    <div class="content">
      <h1 class="title is-1">Privacy Policy</h1>
      <p class="subtitle">Last updated: January 6, 2026</p>

      <section>
        <h2 class="title is-3">Introduction</h2>
        <p>
          Welcome to Nisha Najihah's portfolio website. Your privacy is
          important to me. This Privacy Policy explains how I collect, use, and
          protect your information when you visit this website.
        </p>
      </section>

      <section>
        <h2 class="title is-3">Information I Collect</h2>
        <p>
          This website is a static portfolio site and does not actively collect
          personal information. However, basic analytics may be collected
          through:
        </p>
        <ul>
          <li>Browser type and version</li>
          <li>Device information</li>
          <li>Pages visited and time spent on pages</li>
          <li>Referring website addresses</li>
        </ul>
      </section>

      <section>
        <h2 class="title is-3">Use of Information</h2>
        <p>Any information collected is used solely to:</p>
        <ul>
          <li>Improve website functionality and user experience</li>
          <li>Analyze website traffic and visitor behavior</li>
          <li>Maintain website security</li>
        </ul>
      </section>

      <section>
        <h2 class="title is-3">Cookies</h2>
        <p>
          This website may use cookies to enhance your browsing experience. You
          can choose to disable cookies through your browser settings, though
          this may affect website functionality.
        </p>
      </section>

      <section>
        <h2 class="title is-3">Third-Party Links</h2>
        <p>
          This website contains links to external sites (social media, music
          platforms, etc.). I am not responsible for the privacy practices of
          these third-party sites. Please review their privacy policies before
          providing any personal information.
        </p>
      </section>

      <section>
        <h2 class="title is-3">Contact</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact me at:
          <br />
          <a href="mailto:nishanajihah@gmail.com">nishanajihah@gmail.com</a>
        </p>
      </section>

      <section>
        <h2 class="title is-3">Changes to This Policy</h2>
        <p>
          I may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated "Last updated" date.
        </p>
      </section>

      <div class="mt-6">
        <a href="/" class="button is-primary">Return to Home</a>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .privacy-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #050505 0%, #0a0a0a 100%);
    padding: 80px 20px;
    color: #f5f5f5;

    .container {
      max-width: 800px;
      margin: 0 auto;
    }

    .content {
      background: rgba(20, 20, 20, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 60px;
      backdrop-filter: blur(20px);

      @media (max-width: 768px) {
        padding: 30px 20px;
      }
    }

    h1 {
      color: #ffde21;
      font-family: "Anta", sans-serif;
      margin-bottom: 10px;
    }

    .subtitle {
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 40px;
    }

    h2 {
      color: #ffffff;
      font-family: "Anta", sans-serif;
      margin-top: 40px;
      margin-bottom: 20px;
    }

    section {
      margin-bottom: 30px;

      p {
        line-height: 1.8;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 15px;
      }

      ul {
        margin-left: 20px;
        margin-bottom: 15px;

        li {
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 10px;
        }
      }

      a {
        color: #ffde21;
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .button {
      background: #ffde21;
      color: #0a0a0a;
      border: none;
      padding: 12px 30px;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(255, 222, 33, 0.3);
      }
    }
  }
</style>
