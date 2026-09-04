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
    content="Privacy Policy for Nisha Najihah's developer portfolio. Compliant with international and Malaysia standards (PDPA, GDPR, CCPA, COPPA)."
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
          <span class="badge">Compliance: International & Malaysia</span>
          <span class="last-updated">Last Updated: September 5, 2026</span>
        </div>
      </header>

      <main class="legal-content-card">
        <div class="glass-container">
          <section class="policy-section">
            <h2 class="section-title">1. Introduction</h2>
            <p>
              Welcome to Nisha Najihah's official portfolio. This Privacy Policy (“Policy”) outlines the personal data that Nisha Najihah (“I”, “me”, or “my”) gathers, how I use and protect that personal information, and your rights and options to access, correct, or delete such personal data across global standards, including the <strong
                >Malaysian Personal Data Protection Act 2010 (PDPA)</strong
              >, the
              <strong>General Data Protection Regulation (GDPR)</strong>, US State Privacy Laws (<strong>CalOPPA, CCPA/CPRA</strong>), and the <strong>Children's Online Privacy Protection Act (COPPA)</strong>.
            </p>
          </section>

          <section class="policy-section inset-shadow">
            <h2 class="section-title">2. Information Collection & Usage</h2>
            <p>As a portfolio, this website collects minimal information to function properly:</p>
            <div class="info-grid">
              <div class="info-item">
                <h3>Technical & Usage Data</h3>
                <p>
                  Basic server logs (IP address, browser type, device information) may be temporarily processed by the hosting provider to ensure security and analyze traffic.
                </p>
              </div>
              <div class="info-item">
                <h3>Contact Data</h3>
                <p>
                  If you choose to email me directly, I will receive your email address and message contents solely to respond to your inquiry.
                </p>
              </div>
              <div class="info-item">
                <h3>Third-Party APIs</h3>
                <p>
                  My profile fetches live data from GitHub and Spotify to display my coding activity and current listening status.
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
                <strong>Security:</strong> Practical security measures are implemented
                to protect data from loss or unauthorized access.
              </li>
              <li>
                <strong>Retention:</strong> Personal data is kept only as long as
                necessary for the fulfillment of the purpose.
              </li>
            </ul>
          </section>

          <section class="policy-section inset-shadow">
            <h2 class="section-title">4. GDPR Compliance (International / EEA)</h2>
            <p>
              For visitors from the European Economic Area (EEA) and United Kingdom:
            </p>
            <ul class="styled-list">
              <li>
                <strong>Right of Access:</strong> Request a copy of your personal data.
              </li>
              <li>
                <strong>Right to Erasure:</strong> Request that your data be deleted ("Right to be Forgotten").
              </li>
              <li>
                <strong>Right to Portability:</strong> Receive your data in a structured, commonly used format.
              </li>
              <li>
                <strong>Lawful Basis:</strong> Data is processed based on "Legitimate Interests" (improving website performance & UX) or "Consent" (when contacting via email).
              </li>
            </ul>
          </section>

          <section class="policy-section">
            <h2 class="section-title">5. US & California Privacy Rights (CalOPPA, CCPA / CPRA)</h2>
            <p>
              For visitors residing in California and the United States:
            </p>
            <ul class="styled-list">
              <li>
                <strong>CalOPPA Statement:</strong> This website maintains a conspicuous privacy policy link across all main footers and pages, detailing collected data categories and third-party interactions.
              </li>
              <li>
                <strong>Right to Know & Delete:</strong> You have the right to request disclosure of personal data collected and request deletion of your information.
              </li>
              <li>
                <strong>No Sale or Sharing of Personal Information:</strong> I do not sell, rent, trade, or share your personal data with third parties for monetary or cross-context behavioral advertising.
              </li>
              <li>
                <strong>Non-Discrimination:</strong> Exercising your privacy rights will never result in denied service or altered website functionality.
              </li>
            </ul>
          </section>

          <section class="policy-section inset-shadow">
            <h2 class="section-title">6. Children's Privacy (COPPA Compliance)</h2>
            <p>
              This website is a general audience professional portfolio and is <strong>not directed to children under the age of 13</strong> (or under 16 in certain European jurisdictions). I do not knowingly collect, request, or solicit personal information from children.
            </p>
            <p>
              If you are a parent or legal guardian and believe your child under 13 has provided personal data to me, please contact me immediately at <a href="mailto:nishanajihah.dev@gmail.com" class="inline-link">nishanajihah.dev@gmail.com</a>, and I will promptly delete such information from my records.
            </p>
          </section>

          <section class="policy-section">
            <h2 class="section-title">7. Cookies & Tracking</h2>
            <p>
              This site uses minimal cookies strictly for performance, essential navigation, and basic analytics. You can manage cookie preferences through your browser settings. We do not use intrusive cross-site tracking or behavioral advertising.
            </p>
          </section>

          <section class="policy-section inset-shadow">
            <h2 class="section-title">8. Third-Party Integrations & Cloud Infrastructure</h2>
            <p>
              This web profile integrates with external services and cloud providers to deliver reliable, secure functionality:
            </p>
            <ul class="styled-list">
              <li>
                <strong>Cloudflare:</strong> This website is hosted and deployed on the <strong>Cloudflare Workers</strong> edge runtime platform. Cloudflare provides content delivery network (CDN) caching, SSL/TLS encryption, and distributed denial-of-service (DDoS) mitigation. Transient network traffic and security logs may be processed through Cloudflare's global edge network.
                (<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" class="inline-link">Cloudflare Privacy Policy</a>)
              </li>
              <li>
                <strong>Spotify API:</strong> Used to display my recent or current music listening activity. When you visit this site, requests are made server-side to fetch this data. 
                (<a href="https://www.spotify.com/us/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" class="inline-link">Spotify Privacy Policy</a>)
              </li>
              <li>
                <strong>GitHub API:</strong> Used to display my coding statistics and open-source contributions. 
                (<a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer" class="inline-link">GitHub Privacy Statement</a>)
              </li>
            </ul>
            <p>I do not collect, process, or store your personal credentials or accounts for any of these services.</p>
          </section>

          <section class="policy-section">
            <h2 class="section-title">9. External Projects & Demos (Code Page Section 02)</h2>
            <p>
              My portfolio showcases various projects, landing pages, and applications (e.g., in the Code Page "02 // ACTIVE SYSTEMS" section). Please note that:
            </p>
            <ul class="styled-list">
              <li>
                These individual projects may operate independently and have their own specific <strong>Privacy Policies and Terms & Conditions</strong>.
              </li>
              <li>
                When interacting with a specific project or demo, its respective legal documents govern the data collection for that specific application, which may differ from this portfolio's general policy.
              </li>
            </ul>
          </section>

          <section class="policy-section inset-shadow">
            <h2 class="section-title">10. Contact & Data Access Requests</h2>
            <p>
              If you wish to access, correct, or delete your personal data, or if you have questions regarding this policy, please contact:
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
