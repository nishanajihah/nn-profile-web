# Mailgun Integration Guide for Your Portfolio

This guide explains how to set up Mailgun for your contact form.

## Setting Up Mailgun

1. **Create a Mailgun Account**
   - Go to [Mailgun.com](https://www.mailgun.com/) and sign up for an account
   - Mailgun offers a free tier with 1,000 emails per month after the initial 3-month trial period

2. **Configure a Domain**
   - You can use Mailgun's sandbox domain for testing
   - For production, add and verify your own domain following Mailgun's instructions

3. **Get Your API Keys**
   - From the Mailgun dashboard, navigate to API Keys
   - Copy your Private API Key

## Configuration in Your Portfolio

### 1. Environment Variables

Create a `.env.local` file at the root of your project (same level as `.env.example`) with these values:

```
PUBLIC_EMAIL_SERVICE=mailgun
PUBLIC_MAILGUN_ENDPOINT=/api/mailgun
PUBLIC_CONTACT_EMAIL=your-actual-email@example.com

# Server-side only variables
MAILGUN_API_KEY=your-mailgun-key-here
MAILGUN_DOMAIN=your-mailgun-domain-here
```

### 2. API Route

This project already includes a SvelteKit API route at `/api/mailgun` that securely handles the Mailgun API calls.

## How It Works

1. When a visitor submits your contact form, the form data is sent to your SvelteKit API route
2. The server-side code communicates with Mailgun's API using your private API key
3. This keeps your API key secure as it's never exposed to the browser
4. An email is sent to your specified email address with the visitor's message

## Security Considerations

- Never expose your Mailgun API key in client-side code
- The API endpoint handles all validation and error handling
- In production, ensure proper CORS and rate limiting to prevent abuse

## Testing

To test your contact form:

1. Fill in the form with test data
2. Submit the form
3. Check your receiving email to ensure it works
4. You can also monitor sent messages in the Mailgun dashboard

## Troubleshooting

If emails aren't being received:
- Verify your API key and domain are correct
- Check Mailgun logs for any delivery issues
- Ensure your receiving email isn't filtering the messages as spam
- Confirm the server can make outbound HTTPS connections to api.mailgun.net
