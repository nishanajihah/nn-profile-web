// SvelteKit API endpoint for Mailgun proxy
import { json } from '@sveltejs/kit';
import { MAILGUN_API_KEY, MAILGUN_DOMAIN } from '$env/static/private';
import { PUBLIC_CONTACT_EMAIL } from '$env/static/public';
import type { RequestHandler } from './$types';

// Define types for the request body
interface ContactRequest {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json() as ContactRequest;
		const { name, email, message, subject } = body;

		// Validation
		if (!name || !email || !message) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		// Get environment variables
		const apiKey = MAILGUN_API_KEY;
		const domain = MAILGUN_DOMAIN;
		const toEmail = PUBLIC_CONTACT_EMAIL || 'your-email@example.com';

		if (!apiKey || !domain) {
			console.error('Missing Mailgun configuration');
			return json({ error: 'Server configuration error' }, { status: 500 });
		}

		// Mailgun API URL
		const url = `https://api.mailgun.net/v3/${domain}/messages`;

		// Create form data for sending
		const formData = new FormData();
		formData.append('from', `${name} <${email}>`);
		formData.append('to', toEmail);
		formData.append('subject', subject || 'Contact Form: New Message');
		formData.append(
			'text',
			`
Name: ${name}
Email: ${email}
Message:
${message}
    `
		);

		// Send request to Mailgun
		const authHeader = Buffer.from(`api:${apiKey}`).toString('base64');

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${authHeader}`
			},
			body: formData
		});

		const result = await response.json();

		if (!response.ok) {
			console.error('Mailgun error:', result);
			return json({ error: 'Failed to send email' }, { status: 500 });
		}

		return json({ success: true, message: 'Email sent successfully' });
	} catch (error) {
		console.error('Server error:', error);
		return json({ error: 'Server error' }, { status: 500 });
	}
}
