'use client'

// El primer tramo de /paginas-web: la entrada (las webs llegan y se ordenan en
// un mandala), el hero y el archivo (el mandala se despliega en un cilindro con
// el scroll). Todo pasa sobre un lienzo fijo dentro de un tramo de 300 vh.

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './paginas-web.module.css'
import fondo from '/public/images/webs/portada-home.webp'

export default function Archivo({ datos, contacto }) {
  const tramo = useRef(null)
  const lienzo = useRef(null)
  const cifra = useRef(null)
  const [fase, setFase] = useState('cargando') // cargando → lista
  const [sin3d, setSin3d] = useState(false)

  useEffect(() => {
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let escena = null
    let vivo = true
    let raf = 0
    let observador = null

    const total = datos.total
    const inicio = performance.now()
    const MINIMO = reducido ? 0 : 1900 // la entrada dura lo que tarda en llegar, con un piso

    function contar(objetivo) {
      // La cifra sigue a la carga real (atlas que llegaron) y nunca va más rápido que el piso.
      const porTiempo = Math.min(1, (performance.now() - inicio) / Math.max(MINIMO, 1))
      const p = Math.min(objetivo, porTiempo)
      if (cifra.current) cifra.current.textContent = String(Math.round(p * total)).padStart(3, '0')
      return p
    }

    async function arrancar() {
      let crearEscena
      try {
        const prueba = document.createElement('canvas')
        if (!(prueba.getContext('webgl2') || prueba.getContext('webgl'))) throw new Error('sin webgl')
        ;({ crearEscena } = await import('./escena'))
      } catch {
        setSin3d(true)
        setFase('lista')
        return
      }
      if (!vivo || !lienzo.current) return
      escena = crearEscena(lienzo.current, {
        webs: datos.webs,
        reducido,
        atlas: { ...datos.atlas, urls: Array.from({ length: datos.atlas.cantidad }, (_, i) => `/images/webs/atlas-${i}.webp`) },
      })

      // Solo se dibuja mientras el tramo está a la vista.
      observador = new IntersectionObserver(([e]) => escena?.visible(e.isIntersecting), { rootMargin: '10% 0px' })
      observador.observe(tramo.current)

      const tope = setTimeout(() => terminar(), 6000) // con datos lentos, no se espera para siempre
      function paso() {
        if (!vivo) return
        const p = contar(escena.progreso())
        if (p >= 1) {
          clearTimeout(tope)
          terminar()
          return
        }
        raf = requestAnimationFrame(paso)
      }
      let terminado = false
      async function terminar() {
        if (terminado || !vivo) return
        terminado = true
        cancelAnimationFrame(raf)
        if (cifra.current) cifra.current.textContent = String(total)
        if (!reducido) {
          const { gsap } = await import('gsap')
          gsap.to(escena.uniforms.uMix1, { value: 1, duration: 1.7, ease: 'power3.inOut' })
          gsap.fromTo(escena.uniforms.uSpin, { value: -1.2 }, { value: 0, duration: 2.2, ease: 'power3.out' })
        }
        setFase('lista')
      }
      paso()
    }
    arrancar()

    // El scroll del tramo (0 → 1) mueve la escena y los textos.
    function alScroll() {
      const el = tramo.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const s = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)))
      el.style.setProperty('--s', s.toFixed(4))
      escena?.ponerScroll(s)
    }
    window.addEventListener('scroll', alScroll, { passive: true })
    alScroll()

    return () => {
      vivo = false
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', alScroll)
      observador?.disconnect()
      escena?.destruir()
    }
  }, [datos])

  const rubros = Object.entries(datos.conteo).filter(([, n]) => n > 0)

  return (
    <section ref={tramo} className={styles.tramo} data-fase={fase} aria-label="Las webs hechas">
      <div className={styles.fijo}>
        {sin3d ? (
          <Image src={fondo} alt="" fill sizes="100vw" className={styles.fondoQuieto} priority placeholder="blur" />
        ) : (
          <canvas ref={lienzo} className={styles.lienzo} aria-hidden="true" />
        )}
        <div className={styles.velo} aria-hidden="true" />

        {/* La entrada: la cifra cuenta las webs que van llegando. */}
        <div className={styles.carga} aria-hidden={fase === 'lista'}>
          <span ref={cifra} className={styles.cifra}>000</span>
          <span className={styles.cargaTexto}>webs hechas</span>
        </div>

        {/* El hero */}
        <div className={styles.hero}>
          <h1 className={styles.titulo}>
            <span className={styles.linea}><span>Tu web</span></span>
            <span className={styles.linea}><span>ya existe</span></span>
          </h1>
          <p className={styles.bajada}>
            Antes de cobrarte, hago la página de tu negocio con lo de tu Instagram y te la enseño terminada. Si te gusta, es tuya.
          </p>
          <div className={styles.botones}>
            <a href={contacto.href} target="_blank" rel="noopener noreferrer" className={styles.botonLleno}>
              {contacto.texto}
            </a>
            <a href="#como" className={styles.botonLinea}>Cómo trabajo</a>
          </div>
        </div>

        {/* El archivo */}
        <div className={styles.archivoTexto}>
          <p className={styles.archivoCifra}>
            {datos.total}
            <span> webs, ninguna igual</span>
          </p>
          <ul className={styles.rubros}>
            {rubros.map(([id, n]) => (
              <li key={id}>
                <span>{datos.rubros[id]}</span>
                <b>{n}</b>
              </li>
            ))}
          </ul>
          <p className={styles.pista}>{sin3d ? 'Cada una con su marca.' : 'Arrastra para girar'}</p>
        </div>
      </div>
    </section>
  )
}
