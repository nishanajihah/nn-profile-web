// SvelteKit API endpoint for direct email sending
import { json } from '@sveltejs/kit';
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
		const body = (await request.json()) as ContactRequest;
		const { name, email, message, subject } = body;

		// Validation
		if (!name || !email || !message) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		const toEmail = PUBLIC_CONTACT_EMAIL || 'your-email@example.com';

		// This is a placeholder for actual email sending logic
		// You would integrate your preferred email sending method here
		// For example, using NodeMailer if available in your environment

		console.log('Direct email request received:');
		console.log({
			to: toEmail,
			from: `${name} <${email}>`,
			subject: subject || 'Contact Form: New Message',
			message
		});

		// Example implementation placeholder
		// In production, replace with actual email sending code
		/*
		const transporter = nodemailer.createTransport({...});
		await transporter.sendMail({
			from: `${name} <${email}>`,
			to: toEmail,
			subject: subject || 'Contact Form: New Message',
			text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
		});
		*/

		// For now, just return success for the placeholder
		// In production, you would check the email sending result
		return json({
			success: true,
			message: 'Email request processed (direct email implementation needed)'
		});
	} catch (error) {
		console.error('Server error:', error);
		return json({ error: 'Server error' }, { status: 500 });
	}
};
