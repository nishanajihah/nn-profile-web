<script lang="ts">
  import LegalPageLayout from "$lib/components/code/landing/LegalPageLayout.svelte";
</script>

<LegalPageLayout
  appName="Random Kit+ Idle"
  appSlug="random-kit-idle"
  docType="Privacy Policy"
  badgeText="Compliance: International & Malaysia"
  lastUpdated="August 5, 2026"
  gradientBackground="linear-gradient(180deg, #ff7d00 0%, #ff5500 35%, #e64a00 100%)"
  accentColor="#e65c00"
>
  <section class="rk-section">
    <h2>1. Introduction</h2>
    <p>
      This Privacy Policy applies to the mobile application <strong>Random Kit+ Idle</strong>, developed by <strong>Nisha Najihah</strong> ("Developer", "I", "me", or "my"). I respect your privacy and am committed to protecting it. This document explains how data is handled when you download, install, or use Random Kit+ Idle in compliance with international privacy standards including PDPA, GDPR, US State Privacy Laws (CalOPPA, CCPA/CPRA), and COPPA.
    </p>
  </section>

  <section class="rk-section">
    <h2>2. Information Collection & Local Storage</h2>
    <p>
      <strong>Random Kit+ Idle</strong> is built with a privacy-first, client-side architecture:
    </p>
    <div class="rk-info-grid">
      <div class="rk-info-box">
        <h3>Local Device Data</h3>
        <p>
          All your game progress, high scores, color mixer configurations, decision history, and settings are stored strictly on your local device (via Android SharedPreferences). No external developer servers are used to collect or track your personal gameplay data.
        </p>
      </div>
      <div class="rk-info-box">
        <h3>No Account Required</h3>
        <p>
          You do not need to create an account, register an email address, or sign in to play Random Kit+ Idle.
        </p>
      </div>
      <div class="rk-info-box">
        <h3>Direct Support Inquiries</h3>
        <p>
          If you contact developer support directly via email (e.g., to report a bug), your email address and message content will be used solely to respond to your inquiry.
        </p>
      </div>
    </div>
  </section>

  <section class="rk-section">
    <h2>3. Third-Party Services & Advertising (Google AdMob)</h2>
    <p>
      Random Kit+ Idle uses third-party Software Development Kits (SDKs) provided by Google to support app distribution, performance monitoring, and banner/interstitial advertisements:
    </p>
    <ul class="rk-list">
      <li>
        <strong>Google Mobile Ads (AdMob):</strong> AdMob may process device identifiers (such as the Android Advertising ID / AAID), IP addresses, coarsened location data, and app performance metrics to serve non-personalized or personalized advertisements.
      </li>
      <li>
        <strong>Google Play Services:</strong> Enables app distribution, framework operations, and device compatibility.
      </li>
    </ul>
    <p>
      For complete details on how Google handles third-party advertising data, please review the
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        class="rk-link">Google Privacy & Terms Policy</a
      >.
    </p>
  </section>

  <section class="rk-section">
    <h2>4. Children's Privacy (COPPA Compliance)</h2>
    <p>
      Random Kit+ Idle is designed as a general audience casual game and is <strong>not directed to children under the age of 13</strong> in the United States (or under 16 in the European Union / United Kingdom).
    </p>
    <p>
      I do not knowingly collect, solicit, or maintain personal information from children. Google AdMob integration in Random Kit+ Idle is configured in accordance with Google Play's Families policy and child privacy guidelines. If a parent or legal guardian believes their child under 13 has provided personal data or device information, please contact me at <a href="mailto:nishanajihah.dev@gmail.com" class="rk-link">nishanajihah.dev@gmail.com</a>, and I will take immediate action to remove such data.
    </p>
  </section>

  <section class="rk-section">
    <h2>5. US State & California Privacy Rights (CalOPPA, CCPA / CPRA)</h2>
    <p>
      If you reside in California or the United States:
    </p>
    <ul class="rk-list">
      <li>
        <strong>Right to Know & Delete:</strong> You have the right to request information regarding device data processed by integrated SDKs and request deletion.
      </li>
      <li>
        <strong>No Sale or Sharing of Personal Data:</strong> I do not sell, rent, or trade any personal data collected from app users to third parties.
      </li>
      <li>
        <strong>Device Identifier Opt-Out:</strong> You can reset or disable your Android Advertising ID (AAID) at any time through your Android device settings (Settings > Google > Ads).
      </li>
    </ul>
  </section>

  <section class="rk-section">
    <h2>6. Data Retention & Clearing Data</h2>
    <p>
      Because your game progress is stored locally on your device, clearing Random Kit+ Idle application storage or uninstalling the app via your Android system settings will permanently remove all local scores, unlocked items, and saved preferences.
    </p>
  </section>

  <section class="rk-section">
    <h2>7. Changes to This Privacy Policy</h2>
    <p>
      I may update this Privacy Policy periodically. Any revisions will be posted directly on this page with an updated "Last Updated" date.
    </p>
  </section>

  <section class="rk-section">
    <h2>8. Developer Contact</h2>
    <p>
      If you have questions, feedback, or privacy requests regarding Random Kit+ Idle, please contact:
    </p>
    <div class="rk-contact-signature">
      <span class="name">Nisha Najihah (Solo Developer)</span>
      <a href="mailto:nishanajihah.dev@gmail.com" class="email-link"
        >nishanajihah.dev@gmail.com</a
      >
    </div>
  </section>
</LegalPageLayout>
