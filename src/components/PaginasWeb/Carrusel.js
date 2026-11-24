'use client'

// El carrusel de webs: teléfonos que se arrastran, uno por estilo.
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Keyboard, A11y, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import styles from './paginas-web.module.css'

export default function Carrusel({ destacadas, rubros }) {
  return (
    <div className={styles.carrusel}>
      <Swiper
        className={styles.swiper}
        modules={[EffectCoverflow, Keyboard, A11y, FreeMode]}
        effect="coverflow"
        coverflowEffect={{ rotate: 18, stretch: -10, depth: 180, modifier: 1, slideShadows: false }}
        centeredSlides
        slidesPerView="auto"
        initialSlide={2}
        freeMode={{ enabled: true, sticky: true, momentumRatio: 0.6 }}
        keyboard={{ enabled: true }}
        grabCursor
        a11y={{ prevSlideMessage: 'Web anterior', nextSlideMessage: 'Web siguiente' }}
      >
        {destacadas.map((d, i) => (
          <SwiperSlide key={d.src} className={styles.slide}>
            <figure className={styles.telefono}>
              <div className={styles.pantalla}>
                <Image src={d.src} alt={`Una web de ${rubros[d.rubro].toLowerCase()}`} fill sizes="(max-width: 600px) 62vw, 300px" loading={i < 4 ? 'eager' : 'lazy'} />
              </div>
              <figcaption>{rubros[d.rubro]}</figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
      <p className={styles.pista}>Desliza</p>
    </div>
  )
}
