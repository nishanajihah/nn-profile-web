/**
 * Contact form service
 * Handles form submissions using Mailgun or a direct email endpoint
 */

// Define TypeScript interfaces for our data structures
export interface ContactFormData {
	name: string;
	email: string;
	message: string;
	subject?: string;
}

export interface ContactResponse {
	success: boolean;
	response: Record<string, unknown>;
}

// Determine which email service to use based on environment variables
const emailService = import.meta.env.PUBLIC_EMAIL_SERVICE || 'mailgun';

/**
 * Submit a contact form
 *
 * @param formData - Form data to submit
 * @returns Promise with the service response
 */
export async function submitContactForm(formData: ContactFormData): Promise<ContactResponse> {
	switch (emailService) {
		case 'mailgun':
			return submitWithMailgun(formData);
		default:
			return submitWithDirectEmail(formData);
	}
}

/**
 * Submit form using Mailgun API
 *
 * @param formData - Form data to submit
 * @returns Promise with Mailgun response
 */
async function submitWithMailgun(formData: ContactFormData): Promise<ContactResponse> {
	// Mailgun endpoint (usually via proxy to protect API key)
	const endpoint = import.meta.env.PUBLIC_MAILGUN_ENDPOINT || '/api/mailgun';

	try {
		// Using our proxy endpoint (secure method - API key remains on server)
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: formData.name,
				email: formData.email,
				message: formData.message,
				subject: formData.subject || 'Contact Form: New Message'
			})
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || 'Failed to send email');
		}

		const result = await response.json();

		return {
			success: true,
			response: result
		};
	} catch (error) {
		console.error('Mailgun error:', error);
		throw error instanceof Error ? error : new Error('Unknown error occurred');
	}
}

/**
 * Submit form using a direct email endpoint
 *
 * @param formData - Form data to submit
 * @returns Promise with endpoint response
 */
async function submitWithDirectEmail(formData: ContactFormData): Promise<ContactResponse> {
	// Direct email endpoint
	const endpoint = '/api/email';

	try {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});

		const json = await response.json();

		if (!response.ok) {
			throw new Error(json.message || 'Failed to send message');
		}

		return {
			success: true,
			response: json
		};
	} catch (error) {
		console.error('Direct email error:', error);
		throw error instanceof Error ? error : new Error('Unknown error occurred');
	}
}
