<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import "$lib/styles/pages/legal.scss";

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
  <title>Privacy Policy | Nisha Najihah</title>
  <meta
    name="description"
    content="Privacy Policy for Nisha Najihah's portfolio, compliant with Malaysia's PDPA and international GDPR standards."
  />
</svelte:head>

<div class="legal-page-wrapper legal-page-active">
  <div class="background-accents privacy-accents">
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
        <h1 class="title">Privacy Policy</h1>
        <div class="policy-meta">
          <span class="badge">Compliance: PDPA & GDPR</span>
          <span class="last-updated">Last Updated: May 19, 2026</span>
        </div>
      </header>

      <main class="legal-content-card">
        <div class="glass-container">
          <section class="policy-section">
            <h2 class="section-title">1. Introduction</h2>
            <p>
              Welcome to Nisha Najihah's official portfolio. I am committed to
              protecting your personal data and respecting your privacy. This
              policy outlines how I handle information in compliance with the <strong
                >Malaysian Personal Data Protection Act 2010 (PDPA)</strong
              >
              and the
              <strong>General Data Protection Regulation (GDPR)</strong>.
            </p>
          </section>

          <section class="policy-section inset-shadow">
            <h2 class="section-title">2. Information I Collect</h2>
            <div class="info-grid">
              <div class="info-item">
                <h3>Technical Data</h3>
                <p>
                  IP address, browser type, device information, and operating
                  system via basic server logs.
                </p>
              </div>
              <div class="info-item">
                <h3>Usage Data</h3>
                <p>
                  Information about how you use the website, pages visited, and
                  time spent.
                </p>
              </div>
              <div class="info-item">
                <h3>Contact Data</h3>
                <p>
                  If you email me directly, I receive your email address and any
                  information provided in the message.
                </p>
              </div>
            </div>
          </section>

          <section class="policy-section">
            <h2 class="section-title">3. PDPA Compliance (Malaysia)</h2>
            <p>
              In accordance with the PDPA 2010, I adhere to the following
              principles:
            </p>
            <ul class="styled-list">
              <li>
                <strong>Notice & Choice:</strong> You are notified of data collection
                and can choose whether to provide personal data.
              </li>
              <li>
                <strong>Disclosure:</strong> Data is not disclosed to third parties
                without consent, unless required by law.
              </li>
              <li>
                <strong>Security:</strong> I implement practical security measures
                to protect data from loss or unauthorized access.
              </li>
              <li>
                <strong>Retention:</strong> Personal data is kept only as long as
                necessary for the fulfillment of the purpose.
              </li>
            </ul>
          </section>

          <section class="policy-section inset-shadow">
            <h2 class="section-title">4. GDPR Compliance (International)</h2>
            <p>
              For visitors from the European Economic Area (EEA), your rights
              include:
            </p>
            <ul class="styled-list">
              <li>
                <strong>Right of Access:</strong> Request a copy of your personal
                data.
              </li>
              <li>
                <strong>Right to Erasure:</strong> Request that your data be deleted
                ("Right to be Forgotten").
              </li>
              <li>
                <strong>Right to Portability:</strong> Receive your data in a structured,
                commonly used format.
              </li>
              <li>
                <strong>Lawful Basis:</strong> I process data based on "Legitimate
                Interests" (improving website UX) or "Consent" (if you email me).
              </li>
            </ul>
          </section>

          <section class="policy-section">
            <h2 class="section-title">5. Cookies & Tracking</h2>
            <p>
              This site uses minimal cookies for performance and analytics. You
              can manage cookie preferences through your browser settings. We do
              not use intrusive cross-site tracking or behavioral advertising.
            </p>
          </section>

          <section class="policy-section inset-shadow">
            <h2 class="section-title">6. Third-Party Integrations (Spotify)</h2>
            <p>
              I use the <strong>Spotify Web API</strong> and
              <strong>Spotify Embedded Players</strong>
              to stream music clips and display album art. When you interact
              with these elements, Spotify may process your usage statistics, IP
              address, and browser cookies in accordance with the
              <a
                href="https://www.spotify.com/us/legal/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-link">Spotify Privacy Policy</a
              >. I do not store or collect any Spotify credentials or personal
              account information on my servers.
            </p>
          </section>

          <section class="policy-section">
            <h2 class="section-title">7. Data Security</h2>
            <p>
              While no method of transmission over the internet is 100% secure,
              I use industry-standard encryption and security protocols to
              safeguard your information.
            </p>
          </section>

          <section class="policy-section inset-shadow">
            <h2 class="section-title">8. Contact & Data Access</h2>
            <p>
              If you wish to access, correct, or delete your personal data, or
              if you have questions regarding this policy, please contact:
            </p>
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


