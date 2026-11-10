// URL canónica del sitio (el dominio sin "www" redirige a esta).
export const SITE_URL = 'https://www.alessandrovaru.com'

// Cada cuánto (en segundos) se regeneran las páginas que leen de Firestore.
// Lo nuevo creado desde /admin aparece como máximo en este plazo, sin redeploy.
export const CONTENT_REVALIDATE_SECONDS = 600
