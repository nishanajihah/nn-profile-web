import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#3B82F6',
					50: '#EBF2FE',
					100: '#D7E6FD',
					200: '#B0CDFB',
					300: '#88B4F9',
					400: '#619BF7',
					500: '#3B82F6',
					600: '#0B61EF',
					700: '#084BBC',
					800: '#06368A',
					900: '#042057'
				},
				secondary: {
					DEFAULT: '#10B981',
					50: '#E6FCF5',
					100: '#D0F9EB',
					200: '#A0F3D6',
					300: '#70EDC1',
					400: '#40E7AC',
					500: '#10B981',
					600: '#0D9268',
					700: '#096E4F',
					800: '#064A35',
					900: '#03251C'
				},
				dark: {
					DEFAULT: '#111827',
					50: '#F9FAFB',
					100: '#F3F4F6',
					200: '#E5E7EB',
					300: '#D1D5DB',
					400: '#9CA3AF',
					500: '#6B7280',
					600: '#4B5563',
					700: '#374151',
					800: '#1F2937',
					900: '#111827'
				}
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				mono: ['Fira Code', 'ui-monospace', 'monospace']
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.5s ease-out',
				'bounce-slow': 'bounce 3s infinite'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				}
			}
		}
	},
	plugins: [forms, typography],
};
