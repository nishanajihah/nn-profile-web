# Landing & Legal Page Header Color Customization Guide

This guide explains how to customize the top **`SYSTEM BACK`** header colors across **Main Landing Pages** and **Legal Pages (Privacy / Terms)** for any project landing page in this repository.

---

## 1. Quick Cheat Sheet

| Page Type | File Location | How to Change Colors |
| :--- | :--- | :--- |
| **Legal Pages** (Privacy / Terms) | `src/routes/code/project/landing/[app-slug]/privacy/+page.svelte` | Pass props into `<LegalPageLayout />` |
| **Main Landing Page** | `src/routes/code/project/landing/[app-slug]/+page.svelte` | Add `style:--header-bg="..."` to the root `<div>` or in the landing SCSS file |

---

## 2. Legal Pages Customization (`<LegalPageLayout />`)

When creating or editing a legal document page (Privacy Policy or Terms & Conditions), pass color props into `<LegalPageLayout />`:

```svelte
<!-- Example: src/routes/code/project/landing/future-app/privacy/+page.svelte -->
<script lang="ts">
  import LegalPageLayout from "$lib/components/code/landing/LegalPageLayout.svelte";
</script>

<LegalPageLayout
  appName="Future App"
  appSlug="future-app"
  docType="Privacy Policy"
  lastUpdated="July 30, 2026"
  
  /* 1. Document Page Styling */
  gradientBackground="linear-gradient(180deg, #ff7d00 0%, #ff5500 100%)"
  accentColor="#e65c00"
  cardBgColor="#ffffff"
  textColor="#2b231d"

  /* 2. Top Header Bar Colors */
  headerBgColor="#ffffff"
  headerBorderColor="rgba(230, 92, 0, 0.2)"

  /* 3. Desktop Web Pill Text Colors */
  headerWebBtnBgColor="#0a0a0a"
  headerWebBrandColor="rgba(255, 255, 255, 0.65)"
  headerWebDividerColor="#ff9d00"
  headerWebActionColor="rgba(255, 255, 255, 0.95)"

  /* 4. Mobile Header Text Colors */
  headerMobileBrandColor="#555555"
  headerMobileDividerColor="#ff7d00"
  headerMobileActionColor="#111111"

  /* 5. Desktop Web Hover Glow Effects */
  headerHoverAccentColor="#ff9d00"
  headerHoverBorderColor="rgba(255, 157, 0, 0.6)"
  headerHoverBgColor="#140d07"
  headerHoverGlowColor="rgba(255, 157, 0, 0.25)"

  /* 6. Developer Contact Signature Box Customization */
  contactBoxBgColor="rgba(255, 125, 0, 0.04)"
  contactBoxHoverBgColor="rgba(255, 125, 0, 0.09)"
  contactBoxBorderColor="rgba(255, 125, 0, 0.08)"
>
  <section class="rk-section">
    <h2>1. Introduction</h2>
    <p>Policy text here...</p>
  </section>
</LegalPageLayout>
```

> **Note**: If you omit any of the header or contact box props, `<LegalPageLayout />` will automatically fall back to default orange theme colors (`#ff7d00` / `#ff9d00`).

---

## 3. Main Landing Page Customization

On main landing pages, you can set custom header colors using CSS Variables on the main landing root container:

### Option A: Directly in `+page.svelte` (Recommended)

```svelte
<!-- Example: src/routes/code/project/landing/future-app/+page.svelte -->
<div 
  class="future-app-landing"
  style:--header-bg="rgba(15, 23, 42, 0.9)"
  style:--header-border="rgba(59, 130, 246, 0.3)"
  style:--header-mobile-brand="#94a3b8"
  style:--header-mobile-divider="#3b82f6"
  style:--header-mobile-action="#ffffff"
>
  <!-- Landing Page Content -->
</div>
```

### Option B: In the Landing Page SCSS file

```scss
// Example: src/routes/code/project/landing/future-app/future-app-landing.scss
.future-app-landing {
  --header-bg: rgba(15, 23, 42, 0.9);
  --header-border: rgba(59, 130, 246, 0.3);
  --header-mobile-brand: #94a3b8;
  --header-mobile-divider: #3b82f6;
  --header-mobile-action: #ffffff;
}
```

---

## 4. CSS Variable Reference Table

| Variable Name | Purpose | Default Value |
| :--- | :--- | :--- |
| `--header-bg` | Header background bar color | `rgba(10, 10, 10, 0.85)` / `#ffffff` |
| `--header-border` | Header bottom border color | `rgba(255, 255, 255, 0.08)` / `rgba(230, 92, 0, 0.2)` |
| `--header-web-btn-bg` | Desktop floating pill background | `#0a0a0a` |
| `--header-web-brand` | Desktop `NISHA NAJIHAH` brand color | `rgba(255, 255, 255, 0.65)` |
| `--header-web-divider` | Desktop `//` divider color | `#ff9d00` |
| `--header-web-action` | Desktop `SYSTEM BACK` text color | `rgba(255, 255, 255, 0.95)` |
| `--header-mobile-brand` | Mobile `NISHA NAJIHAH` brand color | `#555555` / `rgba(255,255,255,0.65)` |
| `--header-mobile-divider` | Mobile `//` divider & back icon color | `#ff7d00` |
| `--header-mobile-action` | Mobile `SYSTEM BACK` text color | `#111111` / `rgba(255,255,255,0.95)` |
| `--header-hover-accent` | Hover `//` divider, icon, & text color | `#ff9d00` |
| `--header-hover-border` | Hover pill border glow color | `rgba(255, 157, 0, 0.6)` |
| `--header-hover-bg` | Hover pill background tint | `#140d07` |
| `--contact-box-bg` | Developer contact box default background | `rgba(255, 125, 0, 0.04)` |
| `--contact-box-hover-bg` | Developer contact box hover background | `rgba(255, 125, 0, 0.09)` |
| `--contact-box-border` | Developer contact box border tint | `rgba(255, 125, 0, 0.08)` |
