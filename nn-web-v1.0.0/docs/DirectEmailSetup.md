# Direct Email Integration Guide

This guide explains how to set up direct email sending for your contact form as an alternative to using Mailgun.

## Understanding Direct Email

Direct email sending from your server requires:

1. A server environment that can send emails
2. An appropriate email library (e.g., Nodemailer for Node.js)
3. Proper configuration to avoid emails being marked as spam

## Implementation Options

### 1. Using Nodemailer

[Nodemailer](https://nodemailer.com/) is a popular module for sending emails from Node.js applications.

To implement this:

1. Install Nodemailer:
   ```bash
   npm install nodemailer
   ```

2. Update the `/src/routes/api/email/+server.js` file with your SMTP configuration:

```javascript
import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';
import { EMAIL_PASSWORD, EMAIL_USER } from '$env/static/private';
import { PUBLIC_CONTACT_EMAIL } from '$env/static/public';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  try {
    const body = await request.json();
    const { name, email, message, subject } = body;

    // Validation
    if (!name || !email || !message) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }

    const toEmail = PUBLIC_CONTACT_EMAIL || 'your-email@example.com';
    
    // Create reusable transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
      }
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${EMAIL_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: subject || `Contact Form: New Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message:
${message}
      `,
      html: `
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    console.log('Message sent: %s', info.messageId);
    return json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Server error:', error);
    return json({ error: 'Server error' }, { status: 500 });
  }
}
```

### 2. Environment Variables

Add these to your `.env.local` file:

```
# Direct Email configuration
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-email-password
```

## Considerations

1. **Security**: Never expose your email password in client-side code
2. **Reliability**: Direct email sending may be less reliable than dedicated email services
3. **Rate Limiting**: Check your email provider's sending limits
4. **Spam Filtering**: Emails sent directly may be more likely to get caught in spam filters

## Testing

Test your direct email setup by:

1. Setting `PUBLIC_EMAIL_SERVICE=direct` in your `.env.local` file
2. Filling in the contact form with test data
3. Submitting the form
4. Checking that the email was received

## Troubleshooting

If emails aren't being delivered:

- Check your server logs for error messages
- Verify your SMTP settings
- Ensure your server environment allows outbound SMTP connections
- Check spam folders for the test emails
