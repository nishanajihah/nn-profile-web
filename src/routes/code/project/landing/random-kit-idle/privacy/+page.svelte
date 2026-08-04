<script lang="ts">
  import LegalPageLayout from "$lib/components/code/landing/LegalPageLayout.svelte";
</script>

<LegalPageLayout
  appName="Random Kit+ Idle"
  appSlug="random-kit-idle"
  docType="Privacy Policy"
  lastUpdated="July 26, 2026"
  gradientBackground="linear-gradient(180deg, #ff7d00 0%, #ff5500 35%, #e64a00 100%)"
  accentColor="#e65c00"
>
  <section class="rk-section">
    <h2>1. Introduction</h2>
    <p>
      This Privacy Policy applies to the mobile application <strong
        >Random Kit+ Idle</strong
      >, developed by <strong>Nisha Najihah</strong> ("Developer", "I", "me", or
      "my"). I respect your privacy and am committed to protecting it. This document
      explains how data is handled when you download, install, or use Random Kit+
      Idle.
    </p>
  </section>

  <section class="rk-section">
    <h2>2. Information Collection & Local Storage</h2>
    <p>
      <strong>Random Kit+ Idle</strong> is designed with a privacy-first approach:
    </p>
    <div class="rk-info-grid">
      <div class="rk-info-box">
        <h3>Local Device Data</h3>
        <p>
          All your game progress, high scores, color mixer configurations,
          decision history, and settings are stored strictly on your local
          device (via Android SharedPreferences). No external game servers are
          used to collect or track your personal gameplay data.
        </p>
      </div>
      <div class="rk-info-box">
        <h3>No Account Required</h3>
        <p>
          You do not need to create an account, register an email address, or
          sign in to use Random Kit+ Idle.
        </p>
      </div>
      <div class="rk-info-box">
        <h3>Direct Support Inquiries</h3>
        <p>
          If you contact support directly via email (e.g., to report a bug),
          your email address and message content will be used solely to respond
          to your request.
        </p>
      </div>
    </div>
  </section>

  <section class="rk-section">
    <h2>3. Third-Party Services & Advertising (Google AdMob)</h2>
    <p>
      Random Kit+ Idle uses third-party Software Development Kits (SDKs)
      provided by Google to support app distribution, performance monitoring,
      and banner/interstitial advertisements.
    </p>
    <ul class="rk-list">
      <li>
        <strong>Google Mobile Ads (AdMob):</strong> AdMob may collect and process
        device identifiers (such as the Android Advertising ID / AAID), IP addresses,
        coarsened location data, and app performance metrics to serve personalized
        or non-personalized advertisements.
      </li>
      <li>
        <strong>Google Play Services:</strong> Used for app distribution, device
        compatibility, and framework operations.
      </li>
    </ul>
    <p>
      For details on how Google processes data, please review the
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        class="rk-link">Google Privacy & Terms Policy</a
      >.
    </p>
  </section>

  <section class="rk-section">
    <h2>4. Children's Privacy</h2>
    <p>
      Random Kit+ Idle does not knowingly collect or solicit personal
      information from children under the age of 13. If you believe a child has
      provided personal information through third-party ad services, please
      contact me so appropriate measures can be taken.
    </p>
  </section>

  <section class="rk-section">
    <h2>5. Data Security & Retention</h2>
    <p>
      Since your gameplay data remains stored locally on your device, clearing
      data for Random Kit+ Idle through your Android settings will permanently
      remove all local scores and preferences.
    </p>
  </section>

  <section class="rk-section">
    <h2>6. Changes to This Privacy Policy</h2>
    <p>
      I may update this Privacy Policy from time to time. Any updates will be
      published on this page with a revised "Last Updated" date.
    </p>
  </section>

  <section class="rk-section">
    <h2>7. Developer Contact</h2>
    <p>
      If you have any questions regarding this Privacy Policy, please contact:
    </p>
    <div class="rk-contact-signature">
      <span class="name">Nisha Najihah (Solo Developer)</span>
      <a href="mailto:nishanajihah.dev@gmail.com" class="email-link"
        >nishanajihah.dev@gmail.com</a
      >
    </div>
  </section>
</LegalPageLayout>
