<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import "$lib/styles/legal-pages.scss";

  let visible = $state(false);

  onMount(() => {
    visible = true;
    if (browser) {
      window.scrollTo(0, 0);
      document.documentElement.classList.add("legal-page-active");
      document.body.classList.add("legal-page-active");
    }

    return () => {
      if (browser) {
        document.documentElement.classList.remove("legal-page-active");
        document.body.classList.remove("legal-page-active");
      }
    };
  });
</script>

<svelte:head>
  <title>Terms & Conditions | Nisha Najihah</title>
  <meta
    name="description"
    content="Terms & Conditions for Nisha Najihah's portfolio. Governing law: Malaysia, with international applicability."
  />
</svelte:head>

<div class="legal-page-wrapper legal-page-active">
  <div class="background-accents terms-accents">
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
  </div>

  {#if visible}
    <div class="container" in:fade={{ duration: 800 }}>
      <header
        class="legal-header"
        in:fly={{ y: -20, duration: 800, delay: 200 }}
      >
        <a href="/" class="back-arrow-link" title="Return to Homepage">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="back-arrow"
            ><line x1="19" y1="12" x2="5" y2="12"></line><polyline
              points="12 19 5 12 12 5"
            ></polyline></svg
          >
        </a>
        <h1 class="title">Terms & Conditions</h1>
        <div class="policy-meta">
          <span class="badge">Region: Malaysia & International</span>
          <span class="last-updated">Last Updated: May 19, 2026</span>
        </div>
      </header>

      <main class="legal-content-card">
        <div class="glass-container">
          <section class="policy-section">
            <h2 class="section-title">1. Agreement to Terms</h2>
            <p>
              By accessing the website at <a
                href="https://nishanajihah.com"
                class="inline-link">nishanajihah.com</a
              >, you are agreeing to be bound by these Terms & Conditions, all
              applicable laws and regulations, and agree that you are
              responsible for compliance with any applicable local laws in
              <strong>Malaysia</strong> and your own jurisdiction.
            </p>
          </section>

          <section class="policy-section inset-shadow">
            <h2 class="section-title">2. Intellectual Property Rights</h2>
            <p>
              All original content published and made available on this site is
              the property of <strong>Nisha Najihah</strong>. This includes:
            </p>
            <div class="info-grid">
              <div class="info-item">
                <h3>Musical Works</h3>
                <p>
                  Original compositions, recordings, and auditory production
                  files.
                </p>
              </div>
              <div class="info-item">
                <h3>Visual & Code</h3>
                <p>Source code, UI designs, graphics, and artistic assets.</p>
              </div>
            </div>
            <p class="mt-4">
              <strong>Third-Party Attribution:</strong> Music player services,
              playback streaming, and track metadata are powered by the
              <strong>Spotify Web API</strong>. All associated audio content,
              album artwork, and Spotify trademarks are the exclusive property
              of Spotify AB and their respective music rightsholders.
            </p>
            <p class="mt-4">
              Any unauthorized commercial reproduction, redistribution, or
              modification of these materials without explicit written consent
              is strictly prohibited.
            </p>
          </section>

          <section class="policy-section">
            <h2 class="section-title">3. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the
              materials (information or software) on Nisha Najihah's website for
              personal, non-commercial transitory viewing only.
            </p>
            <ul class="styled-list restriction-list">
              <li>Modify or copy the materials for commercial purposes.</li>
              <li>
                Attempt to decompile or reverse engineer any software contained
                on the website.
              </li>
              <li>
                Remove any copyright or other proprietary notations from the
                materials.
              </li>
            </ul>
          </section>

          <section class="policy-section inset-shadow">
            <h2 class="section-title">4. Disclaimer</h2>
            <p>
              The materials on this website are provided on an 'as is' basis.
              Nisha Najihah makes no warranties, expressed or implied, and
              hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property.
            </p>
          </section>

          <section class="policy-section">
            <h2 class="section-title">5. Limitations of Liability</h2>
            <p>
              In no event shall Nisha Najihah or her suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on the website, even if notified
              orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section class="policy-section inset-shadow">
            <h2 class="section-title">6. Governing Law</h2>
            <p>
              These Terms & Conditions are governed by and construed in
              accordance with the laws of <strong>Malaysia</strong>. You
              irrevocably submit to the exclusive jurisdiction of the courts in
              Malaysia for any dispute arising out of or relating to these
              terms.
            </p>
          </section>

          <section class="policy-section">
            <h2 class="section-title">7. Modifications</h2>
            <p>
              I may revise these Terms & Conditions for my website at any time
              without notice. By using this website you are agreeing to be bound
              by the then current version of these Terms & Conditions.
            </p>
          </section>

          <section class="policy-section inset-shadow">
            <h2 class="section-title">8. Contact Information</h2>
            <p>For any clarifications regarding these terms, please contact:</p>
            <div class="contact-signature">
              <span class="name">Nisha Najihah</span>
              <a href="mailto:nishanajihah.dev@gmail.com" class="email-link"
                >nishanajihah.dev@gmail.com</a
              >
            </div>
          </section>
        </div>

        <div class="action-footer">
          <a href="/" class="btn-neumorphic">
            <span>Return to Homepage</span>
          </a>
        </div>
      </main>
    </div>
  {/if}
</div>


