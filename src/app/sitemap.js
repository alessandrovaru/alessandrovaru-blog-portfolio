import listData from "@/firebase/firestore/listData"

export default async function sitemap() {
  const baseUrl = 'https://www.alessandrovaru.com';
  const mixtapes = await listData('mixtapes-de-caracas');
  const mandalas = await listData('mandalas');
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/mixtapes-de-caracas`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/mandalas`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/fantasias`,
      lastModified: new Date(),
    },
    // MIXTAPES
    ...mixtapes.map((mixtape) => {
      return {
        url: `${baseUrl}/mixtapes-de-caracas/${mixtape.slug}`,
        lastModified: new Date(),
      }
    }),
    // MANDALAS
    ...mandalas.map((mandala) => {
      return {
        url: `${baseUrl}/mandalas/${mandala.slug}`,
        lastModified: new Date(),
      }
    }),
  ];
}