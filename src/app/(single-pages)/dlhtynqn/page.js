'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './styles.module.css'
import HeroAnimation from './HeroAnimation'
import ImagePopup from './ImagePopup'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Nav from '@/components/Nav'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import listData from '@/firebase/firestore/listData'

gsap.registerPlugin(ScrollToPlugin)

export default function Page() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mandalas, setMandalas] = useState([])
  const router = useRouter()

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768) // Breakpoint for mobile
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    const fetchMandalas = async () => {
      const mandalaItems = await listData('mandalas')
      setMandalas(mandalaItems)
    }
    fetchMandalas()

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const handleScrollToTop = () => {
    gsap.to(window, { duration: 0.5, scrollTo: 0, ease: 'power3.inOut' })
  }

  const handleRandomMandala = () => {
    if (mandalas.length > 0) {
      const randomItem = mandalas[Math.floor(Math.random() * mandalas.length)]
      if (randomItem && randomItem.slug) {
        router.push(`/mandalas/${randomItem.slug}`)
      }
    }
  }

  return (
    <div className={styles.page}>
      <Nav />
      <HeroAnimation />
      <div className={styles.pageContainer}>
        <div className={styles.content}>
          <h2>DLHTYNQN: Donde lo había todo ya no queda nada</h2>
          <h3>ACTO I</h3>
          <p>
            En el crepúsculo perenne del Mundo que hay después del Mundo flotan
            los Lúceros, luciérnagas siderales cuya sola presencia traza las
            rutas cuando, dos meses al año, la oscuridad se vuelve tan densa que
            sólo su fulgor permite avanzar. El viajero no les habla; es inútil
            formularles destino alguno. Ellos intuyen la dirección correcta, pues
            todo al desplazarse en este Mundo después del Mundo se modifica la
            geografía misma: colinas que se alzan donde antes hubo llanuras,
            ríos que se desvanecen tras un paso, bosques que germinan apenas se
            los nombra.
          </p>
          <p>
            Nada en esta tierra obedece a la Biología ni a la Física que
            rigieron el primer mundo; únicamente las Matemáticas mantienen su
            imperio, ordenando distancias y ritmos con silenciosa precisión. No
            hay animales; sólo entes, y ninguno es hostil al hombre. Cada uno
            nació con un oficio inmutable y cumple su cometido sin pausa ni
            piedad.
          </p>
          <p>
            El ser humano, en cambio, ha sido despojado de todo impulso. No
            sufre hambre ni sed; tampoco abriga ambición, miedo o deseo. Cuando
            pretende sentir, su emoción no hiere la carne sino el paisaje: un
            suspiro puede marchitar un jardín entero; una sombra de alegría
            incendiar el horizonte. En un reino así no se crea nada: sólo puede
            recordarse aquello que alguna vez existió y, al recordarlo, traerlo
            de regreso, incompleto, como un eco de lo que fue.
          </p>
          <p>
            Comprender esta regla primera ―que la materia es memoria y la
            memoria, materia― es condición para sobrevivir en el Mundo después
            del Mundo. Porque allí, donde cada paso rehace el mapa y cada
            pensamiento cincela la atmósfera, el viajero se descubre al fin
            cartógrafo de su propio camino.
          </p>
          <p>
            Bajo un árbol yace un cuerpo con varios lúceros a su lado. Descansa
            sin sentir cansancio, tampoco siente el gusto de descansar, solo se
            postra bajo el árbol en una ciénaga que conecta a un río calmado,
            del que solo se puede escuchar el agua que le arrulla y le calma sin
            tenerle que calmar.
          </p>

          <h3>Galería de Imágenes</h3>
          <div className={styles.gallery}>
            {Array.from({ length: 11 }, (_, i) => {
              const src = `/images/dlhtynqn/1/${i + 1}.webp`
              return (
                <div
                  key={i}
                  className={styles.galleryItem}
                  onClick={() => !isMobile && setSelectedImage(src)}
                >
                  <Image
                    src={src}
                    alt={`Galería ${i + 1}`}
                    width={800}
                    height={600}
                  />
                </div>
              )
            })}
          </div>
          <div className={styles.buttonContainer}>
            <button
              onClick={handleScrollToTop}
              className={styles.actionButton}
            >
              Vuelve arriba
            </button>
            <Link
              href="/mandalas"
              className={styles.actionButton}
            >
              Mandalas
            </Link>
            <Link
              href="/mixtapes-de-caracas"
              className={styles.actionButton}
            >
              Mixtapes de Caracas
            </Link>
          </div>
        </div>
      </div>

      {selectedImage && (
        <ImagePopup
          src={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  )
}
