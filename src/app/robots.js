
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/mandalas', '/mixtapes-de-caracas', '/fantasias' ],
      disallow: '/private/',
    },
    sitemap: 'https://www.alessandrovaru.com/sitemap.xml',
  }
}