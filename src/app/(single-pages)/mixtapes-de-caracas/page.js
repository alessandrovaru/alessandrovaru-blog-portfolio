import MixtapesLanding from "@/components/MixtapesLanding"
import listData from "@/firebase/firestore/listData";
import background from "/public/images/p3.jpg";

export const revalidate = 600

export const metadata = {
  title: 'Mixtapes de Caracas',
  description: 'Historias de ficción ambientadas en Caracas a partir de fotografías convertidas en diseños digitales.',
  alternates: { canonical: '/mixtapes-de-caracas' },
  openGraph: { url: '/mixtapes-de-caracas' },
}

// Orden natural por volumen: Vol. I, II, ... XV (los slugs son vol-i, vol-ii, ...).
const ROMAN = { i: 1, v: 5, x: 10, l: 50 }
const romanToNumber = (roman = '') =>
  [...roman.toLowerCase()].reduce((total, char, i, chars) => {
    const value = ROMAN[char] ?? 0
    const next = ROMAN[chars[i + 1]] ?? 0
    return total + (value < next ? -value : value)
  }, 0)
const volumeOf = (slug = '') => romanToNumber(slug.replace(/^vol-/, ''))

export default async function Page() {
  const mixtapes = await listData('mixtapes-de-caracas')
  const pagesList = mixtapes
    .filter((page) => page.slug)
    .sort((a, b) => volumeOf(a.slug) - volumeOf(b.slug))
    .map((page) => ({ title: page.title, url: `/mixtapes-de-caracas/${page.slug}` }))

  return <MixtapesLanding pagesList={pagesList} background={background} />
}
