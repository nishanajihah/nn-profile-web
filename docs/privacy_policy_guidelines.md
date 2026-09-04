# Privacy Policy Writing Guidelines

This document serves as an overview and checklist for writing a comprehensive, compliant Privacy Policy for future websites, landing pages, or applications.

> [!IMPORTANT]
> A privacy policy must accurately reflect the _actual_ data collection practices of your application. Never copy-paste a template without customizing it to your specific use cases (e.g., removing clauses about advertising if you don't run ads).

## Core Requirements Checklist

When drafting a new privacy policy, ensure you cover the following essential sections:

- [ ] **Introduction & Scope:** Who owns the site, who the policy applies to, and the effective date.
- [ ] **Information Collected:** Clearly categorize data into types:
  - _Technical/Usage Data:_ IP addresses, device types, browser info (often collected automatically by hosts like Vercel/Netlify).
  - _Personal/Contact Data:_ Names, emails, phone numbers (if collected via forms).
  - _Account Data:_ Passwords, usernames (if you have authentication).
- [ ] **How Information is Used:** Explain _why_ you collect the data (e.g., to provide services, to respond to inquiries, for analytics).
- [ ] **Cookies & Trackers:** Disclose the use of cookies, local storage, or third-party trackers (like Google Analytics).
- [ ] **Third-Party Integrations:** List any external APIs or services that might process user data (e.g., Spotify API, GitHub API, Payment Gateways like Stripe). Link to their respective privacy policies.
- [ ] **User Rights:** Explain how users can request access, correction, or deletion of their data.
- [ ] **Contact Information:** Provide a clear way (usually an email address) for users to contact you regarding privacy concerns.

## Key Compliance Frameworks

Depending on your audience, your policy should explicitly address these major frameworks:

### 1. PDPA (Malaysia)

- **Focus:** Notice & Choice, Disclosure, Security, and Retention.
- **Requirement:** Users must be notified of data collection purposes and data cannot be shared with third parties without consent.

### 2. GDPR (European Union / EEA)

- **Focus:** Lawful basis for processing, data minimization, and extensive user rights.
- **Requirement:** You must state the "Lawful Basis" for processing (e.g., Consent, Legitimate Interest) and explicitly mention the Right to Access, Right to Rectify, Right to Erasure ("Right to be Forgotten"), and Right to Portability.

### 3. CCPA / CPRA & CalOPPA (California / USA)

- **Focus:** Transparency, Right to Delete, and Right to Opt-Out of sale.
- **Requirement:** Must include a conspicuous link to the policy, state that you do not "sell or share" personal information for cross-context behavioral advertising (if applicable), and ensure non-discrimination for exercising rights.

### 4. COPPA (Children's Privacy - USA/Global)

- **Focus:** Protecting children under 13.
- **Requirement:** Must explicitly state whether the service is directed at children. If not, state clearly that you do not knowingly collect data from children under 13 (or 16 in the EU), and provide instructions for parents to request deletion if data was accidentally collected.

## Formatting Best Practices

> [!TIP]
> Make the policy easy to read. Users appreciate transparency over heavy legal jargon.

1. **Use Clear Headings:** Break the document into logical sections (e.g., 1. Intro, 2. Data Collected, etc.).
2. **Use Bullet Points:** Instead of dense paragraphs, use bullet points to list out data types or user rights for easy scanning.
3. **Be Specific but Future-Proof:** Say "hosting providers" instead of hardcoding "Vercel" if you plan to switch hosts, but be specific about what those providers do (e.g., "processing IP addresses for security").
4. **Update Regularly:** Always include a "Last Updated" date at the top of the policy and review it whenever you add new features (like a new API or analytics tool).
