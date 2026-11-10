import listData from "@/firebase/firestore/listData"
import { SITE_URL } from "@/lib/site"

export const revalidate = 3600

const STATIC_ROUTES = [
  { path: '', priority: 1 },
  { path: '/dlhtynqn', priority: 0.8 },
  { path: '/mandalas', priority: 0.8 },
  { path: '/mixtapes-de-caracas', priority: 0.8 },
  { path: '/fantasias', priority: 0.7 },
  { path: '/gimnasios', priority: 0.6 },
]

export default async function sitemap() {
  const [mixtapes, mandalas] = await Promise.all([
    listData('mixtapes-de-caracas'),
    listData('mandalas'),
  ]);

  const postEntries = (items, basePath) =>
    items
      .filter((item) => item.slug)
      .map((item) => ({ url: `${SITE_URL}${basePath}/${item.slug}`, priority: 0.6 }));

  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({ url: `${SITE_URL}${path}`, priority })),
    ...postEntries(mixtapes, '/mixtapes-de-caracas'),
    ...postEntries(mandalas, '/mandalas'),
  ];
}
