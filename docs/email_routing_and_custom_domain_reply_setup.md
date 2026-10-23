# Email Routing & Custom Domain Reply Setup Guide

This guide documents the current email architecture for **`nishanajihah.com`** and provides step-by-step instructions for future implementation of outgoing replies via **Resend** (or Brevo), so your Gmail automatically sends and replies from your custom domain addresses.

---

## 1. Current Architecture (Inbound Routing)

Currently, the website uses **Cloudflare Email Routing (100% Free)** for inbound forwarding:

| Public Address | Used For | Forwards Inbound To (Gmail) |
|---|---|---|
| **`hello@nishanajihah.com`** | General inquiries & Homepage footer | `nishanajihah.info@gmail.com` |
| **`code@nishanajihah.com`** | Visual / Code development & Homepage deck | `nishanajihah.dev@gmail.com` |
| **`music@nishanajihah.com`** | Auditory / Music production & Homepage deck | `nishanajihah.music@gmail.com` |
| **`nishanajihah.dev@gmail.com`** | Direct solo developer contact for Random Kit+ Idle & Legal Policies | `nishanajihah.dev@gmail.com` |

### Central Notification Hub Setup:
To have `nishanajihah.info@gmail.com` receive a copy of every message:
1. In `nishanajihah.dev@gmail.com` and `nishanajihah.music@gmail.com`:
2. Go to **Gmail Settings ⚙️ → See all settings → Forwarding and POP/IMAP**.
3. Add `nishanajihah.info@gmail.com` as a forwarding address with:
   *"Forward a copy of incoming mail to nishanajihah.info@gmail.com and keep Gmail's copy in the Inbox"*.

---

## 2. Future Implementation: Outgoing Replies via Resend SMTP

When you are ready to have Gmail automatically reply as `@nishanajihah.com` without exposing your `@gmail.com` address, follow these steps using **Resend (Free tier: 3,000 emails/month)**.

### Target Reply Behavior:
* Email sent to `nishanajihah.dev@gmail.com` ➔ Replies from `nishanajihah.dev@gmail.com`
* Email sent to `code@nishanajihah.com` ➔ Replies from `code@nishanajihah.com`
* Email sent to `music@nishanajihah.com` ➔ Replies from `music@nishanajihah.com`
* Email sent to `hello@nishanajihah.com` ➔ Replies from `hello@nishanajihah.com`

---

### Step-by-Step Resend + Gmail Integration

#### Step 1: Create a Free Account on Resend
1. Sign up at [https://resend.com](https://resend.com).
2. Go to **Domains** → click **Add Domain** → enter `nishanajihah.com`.
3. Resend will display 3 DNS records (DKIM and SPF TXT records).
4. Go to **Cloudflare Dashboard → DNS → Records** and add those 3 records.
5. In Resend, click **Verify Domain** (status will turn to **Verified**).

#### Step 2: Generate an API Key / SMTP Password
1. In Resend, go to **API Keys** → click **Create API Key**.
2. Name it `Gmail SMTP Relay` with full sending access.
3. Copy the generated key (it looks like `re_123456789...`).

#### Step 3: Add the Custom Address in Gmail ("Send mail as")
Repeat this step inside the respective Gmail account (e.g. inside `nishanajihah.dev@gmail.com` for `code@nishanajihah.com`):

1. In Gmail, go to **Settings ⚙️ → See all settings → Accounts and Import**.
2. In the **"Send mail as:"** section, click **Add another email address**.
3. In the yellow pop-up window:
   * **Name:** `Nisha Najihah`
   * **Email address:** `code@nishanajihah.com` (or `hello@` / `music@`)
   * Check: **Treat as an alias** ✅
   * Click **Next Step >>**
4. Configure the SMTP server:
   * **SMTP Server:** `smtp.resend.com`
   * **Port:** `587`
   * **Username:** `resend`
   * **Password:** *(Paste your Resend API key: `re_...`)*
   * **Secured connection using TLS** ✅
   * Click **Add Account**.
5. Google will send a confirmation code to `code@nishanajihah.com`.
6. Because Cloudflare forwards that to your Gmail, check your inbox, copy the code, and click **Verify**.

#### Step 4: Configure Automatic "Reply As It Is" in Gmail
Now that Gmail has both email addresses, activate the automatic reply switcher:

1. In Gmail, go to **Settings ⚙️ → See all settings → Accounts and Import**.
2. Look under **"Send mail as:"** right below your email list.
3. Select:
   👉 **● Reply from the same address the message was sent to**

**Done!** Gmail will now detect which address the sender used and automatically choose the matching address in the `From:` line whenever you click Reply.

---

## 3. Future Implementation: Interactive On-Site Contact Form

If you eventually want an on-site contact form on your portfolio with an inquiry dropdown:

### SvelteKit Endpoint Example (`src/routes/api/contact/+server.ts`):
```typescript
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
  const { name, email, message, inquiryType } = await request.json();

  // Route recipient based on dropdown selection
  let recipient = 'nishanajihah.info@gmail.com';
  if (inquiryType === 'code') recipient = 'nishanajihah.dev@gmail.com';
  if (inquiryType === 'music') recipient = 'nishanajihah.music@gmail.com';

  const resendApiKey = platform?.env?.RESEND_API_KEY;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: `Portfolio Contact <hello@nishanajihah.com>`,
      to: [recipient],
      bcc: ['nishanajihah.info@gmail.com'], // Always notify central hub
      reply_to: email,
      subject: `New [${inquiryType.toUpperCase()}] Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    })
  });

  return json({ success: res.ok });
};
```
