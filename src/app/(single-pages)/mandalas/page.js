import MandalaButton from "@/components/MandalaButton"

import { notFound } from "next/navigation";

import './styles.css'

import listData from "@/firebase/firestore/listData";

const pageContent = {
  title: 'Mandalas',
  subtitle: 'El Mandala es el centro este proyecto, símbolo de totalidad y orden interior. Los diseños y los poemas son producciones inconscientes en las que permito hablar a las imágenes a partir de mis fotos y los más profundo de mi ser.',
  link: {
    url: '/mandalas',
    text: 'Ver más'
  }
}
const pagesFb = await listData('mandalas');


const pagesListFb = pagesFb.map((page) => {
  return {
    title: page.title,
    url: `/mandalas/${page.slug}`
  }
})


const Page = () => {
  return (
    <div className="mandala-page-container">
      <MandalaButton content={pageContent} pagesList={pagesListFb} />
    </div>
  )
}

export default Page