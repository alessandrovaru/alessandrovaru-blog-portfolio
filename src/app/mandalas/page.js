
import backgroundImage from '/public/images/p1.jpg'

import HeroContainer from "@/components/HeroContainer"

import MandalaButton from "@/components/MandalaButton"

const content = {
  title: 'Mandalas',
  subtitle: 'El Mandala es el centro este proyecto, símbolo de totalidad y orden interior. Los diseños y los poemas son producciones inconscientes en las que permito hablar a las imágenes a partir de mis fotos y los más profundo de mi ser.',
  link: {
    url: '/mandalas',
    text: 'Ver más'
  }
}

const page = () => {
  return (
    <>
      <MandalaButton content={content} />
      {/* <HeroContainer 
        content={content} 
        backgroundImage={backgroundImage}
      /> */}
    </>
  )
}

export default page