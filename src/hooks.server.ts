import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  // Set HTTP Security Headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), display-capture=()'
  );

  // Content Security Policy (CSP) tailored for the portfolio's assets and integrations
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval needed for Vite dev & dynamic GSAP calculations
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https://avatars.githubusercontent.com https://images.unsplash.com https://i.scdn.co https://*.scdn.co https://ko-fi.com",
    "media-src 'self' https://p.scdn.co https://*.scdn.co data: blob:",
    "frame-src 'self' https://open.spotify.com https://ko-fi.com",
    "connect-src 'self' https://api.github.com https://api.spotify.com https://accounts.spotify.com ws: wss:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ];

  response.headers.set('Content-Security-Policy', cspDirectives.join('; '));

  return response;
};
