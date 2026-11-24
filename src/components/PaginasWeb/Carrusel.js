'use client'

// El carrusel de webs: teléfonos que se arrastran, con un filtro por rubro.
import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Keyboard, A11y, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import styles from './paginas-web.module.css'

export default function Carrusel({ destacadas, rubros }) {
  const [rubro, setRubro] = useState('todas')
  const presentes = useMemo(() => [...new Set(destacadas.map((d) => d.rubro))], [destacadas])
  const lista = rubro === 'todas' ? destacadas : destacadas.filter((d) => d.rubro === rubro)

  return (
    <div className={styles.carrusel}>
      <div className={styles.filtros} role="group" aria-label="Filtrar por rubro">
        {['todas', ...presentes].map((id) => (
          <button key={id} type="button" aria-pressed={rubro === id} onClick={() => setRubro(id)} className={styles.filtro}>
            {id === 'todas' ? 'Todas' : rubros[id]}
          </button>
        ))}
      </div>
      <Swiper
        key={rubro}
        className={styles.swiper}
        modules={[EffectCoverflow, Keyboard, A11y, FreeMode]}
        effect="coverflow"
        coverflowEffect={{ rotate: 18, stretch: -10, depth: 180, modifier: 1, slideShadows: false }}
        centeredSlides
        slidesPerView="auto"
        initialSlide={Math.min(2, lista.length - 1)}
        freeMode={{ enabled: true, sticky: true, momentumRatio: 0.6 }}
        keyboard={{ enabled: true }}
        grabCursor
        a11y={{ prevSlideMessage: 'Web anterior', nextSlideMessage: 'Web siguiente' }}
      >
        {lista.map((d, i) => (
          <SwiperSlide key={d.src} className={styles.slide}>
            <figure className={styles.telefono}>
              <div className={styles.pantalla}>
                <Image src={d.src} alt={`Una de las webs hechas: ${rubros[d.rubro].toLowerCase()}`} fill sizes="(max-width: 600px) 62vw, 300px" loading={i < 4 ? 'eager' : 'lazy'} />
              </div>
              <figcaption>{rubros[d.rubro]}</figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
