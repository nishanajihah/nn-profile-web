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
  <title>Terms & Conditions - Nisha Najihah</title>
</svelte:head>

<div class="privacy-page">
  <div class="container">
    <div class="content">
      <h1 class="title is-1">Terms & Conditions</h1>
      <p class="subtitle">Last updated: April 16, 2026</p>

      <section>
        <h2 class="title is-3">1. Agreement to Terms</h2>
        <p>
          By accessing this website, you agree to be bound by these Terms &
          Conditions. If you do not agree with any of these terms, you are
          prohibited from using or accessing this site.
        </p>
      </section>

      <section>
        <h2 class="title is-3">2. Intellectual Property</h2>
        <p>
          All content on this website, including but not limited to music,
          artistic works, code, text, graphics, and logos, is the intellectual
          property of Nisha Najihah unless otherwise stated. You may not
          reproduce, distribute, or use any content without explicit written
          permission.
        </p>
      </section>

      <section>
        <h2 class="title is-3">3. Use License</h2>
        <p>
          Permission is granted to temporarily view the materials on Nisha
          Najihah's website for personal, non-commercial transitory viewing
          only. This is the grant of a license, not a transfer of title.
        </p>
      </section>

      <section>
        <h2 class="title is-3">4. Disclaimer</h2>
        <p>
          The materials on this website are provided on an 'as is' basis. Nisha
          Najihah makes no warranties, expressed or implied, and hereby
          disclaims all other warranties including, without limitation, implied
          warranties or conditions of merchantability, fitness for a particular
          purpose, or non-infringement of intellectual property.
        </p>
      </section>

      <section>
        <h2 class="title is-3">5. Limitations</h2>
        <p>
          In no event shall Nisha Najihah be liable for any damages (including,
          without limitation, damages for loss of data or profit, or due to
          business interruption) arising out of the use or inability to use the
          materials on the website.
        </p>
      </section>

      <section>
        <h2 class="title is-3">6. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of your jurisdiction and you irrevocably submit to the
          exclusive jurisdiction of the courts in that State or location.
        </p>
      </section>

      <section>
        <h2 class="title is-3">7. Contact</h2>
        <p>
          If you have any questions or concerns about these Terms & Conditions,
          please contact me at:
          <br />
          <a href="mailto:nishanajihah@gmail.com">nishanajihah@gmail.com</a>
        </p>
      </section>

      <div class="mt-6">
        <a href="/" class="button is-primary">Return to Home</a>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  // Reusing the same privacy page styles for consistency
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

  // Force scrollability for this specific route
  :global(html),
  :global(body) {
    overflow-y: auto !important;
    overflow-x: hidden !important;
    height: auto !important;
  }
</style>
