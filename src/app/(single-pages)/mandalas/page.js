import MandalaButton from "@/components/MandalaButton"
import listData from "@/firebase/firestore/listData";

import './styles.css'

export const revalidate = 600

export const metadata = {
  title: 'Mandalas',
  description: 'Serie fotográfica de poemas y mandalas digitales creados a partir de fotografías de la ciudad de Caracas.',
  alternates: { canonical: '/mandalas' },
  openGraph: { url: '/mandalas' },
}

export default async function Page() {
  const mandalas = await listData('mandalas')
  const pagesList = mandalas
    .filter((page) => page.slug)
    .map((page) => ({ title: page.title, url: `/mandalas/${page.slug}` }))

  return (
    <div className="mandala-page-container">
      <MandalaButton pagesList={pagesList} />
    </div>
  )
}
