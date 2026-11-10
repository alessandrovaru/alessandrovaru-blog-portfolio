'use client'
import { useLenis } from 'lenis/react'

export default function ScrollTopButton({ className }) {
  const lenis = useLenis()

  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button type="button" onClick={scrollToTop} className={className}>
      Vuelve arriba
    </button>
  )
}
