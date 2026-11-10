# alessandrovaru.com

Portafolio de Alessandro Varuzza: arte digital, fotografía y desarrollo desde Caracas.
Secciones: **DLHTYNQN**, **Mandalas**, **Mixtapes de Caracas**, **Fantasías** y la landing de **Gimnasios**.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack) + React 19
- Firebase: Firestore (contenido), Storage (imágenes) y Auth (panel `/admin`)
- Bootstrap / react-bootstrap, Swiper, GSAP + Lenis
- Desplegado en Vercel (Analytics y Speed Insights)

## Desarrollo

Requiere Node.js 22 o superior (ver `.nvmrc`).

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

### Variables de entorno

Crea un `.env.local` (no se sube al repo) o descárgalas con `vercel env pull`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
NEXT_PUBLIC_CLARITY_PROJECT_ID=   # opcional (Microsoft Clarity)
```

## Contenido

- Los Mandalas y Mixtapes son documentos de Firestore (`mandalas`, `mixtapes-de-caracas`)
  con `{ title, content, slug, storage_slug }`. Sus fotos viven en Storage en
  `<colección>/<storage_slug>/`.
- Las páginas se pre-renderizan en el servidor y se regeneran cada 10 minutos
  (`revalidate = 600`): lo creado desde `/admin` aparece sin redeploy.
- El texto se sanea en el servidor (`src/lib/sanitize.js`); solo se permiten
  etiquetas de formato en línea.

## Seguridad

- El panel `/admin` solo se protege en el navegador. La protección real son las
  reglas de Firebase: [`firestore.rules`](firestore.rules) y [`storage.rules`](storage.rules).
  Reemplaza `REEMPLAZAR_CON_TU_UID` por tu UID y publícalas desde la consola de Firebase.
- Las cabeceras de seguridad están en `next.config.js`. La CSP está en modo
  `Report-Only`; cuando no haya avisos en la consola, cámbiala a `Content-Security-Policy`.
