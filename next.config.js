/** @type {import('next').NextConfig} */

// Política de seguridad de contenido. Se publica en modo "Report-Only":
// el navegador NO bloquea nada, solo reporta violaciones en la consola.
// Cuando confirmes que no aparecen avisos en producción, cambia la cabecera
// a "Content-Security-Policy" para que pase a aplicarse.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.clarity.ms https://*.clarity.ms https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://firebasestorage.googleapis.com https://lpdtapi.s3.us-east-1.amazonaws.com https://*.clarity.ms https://c.bing.com https://i.ytimg.com",
  "media-src 'self' https://firebasestorage.googleapis.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.googleapis.com https://*.clarity.ms https://c.bing.com https://lpdtapi.s3.us-east-1.amazonaws.com https://va.vercel-scripts.com",
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://tally.so",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ')

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'Content-Security-Policy-Report-Only', value: csp },
]

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

module.exports = nextConfig
