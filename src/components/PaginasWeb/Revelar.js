'use client'

// Entra una vez, al asomarse: sube un poco y se destapa. Con movimiento
// reducido (o sin JS) se ve quieto y entero.
import { useEffect, useRef, useState } from 'react'
import styles from './paginas-web.module.css'

export default function Revelar({ as: Etiqueta = 'div', retraso = 0, className = '', children, ...resto }) {
  const ref = useRef(null)
  const [visto, setVisto] = useState(false)
  const [listo, setListo] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    setListo(true)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisto(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Etiqueta
      ref={ref}
      className={`${styles.revelar} ${className}`}
      data-listo={listo ? '' : undefined}
      data-visto={visto ? '' : undefined}
      style={{ '--retraso': `${retraso}ms` }}
      {...resto}
    >
      {children}
    </Etiqueta>
  )
}
