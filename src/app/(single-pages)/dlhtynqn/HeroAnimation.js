'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from 'lenis/react'
import styles from './hero.module.css'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 766
const CANVAS_WIDTH = 1440
const CANVAS_HEIGHT = 810
const CONCURRENT_DOWNLOADS = 6

const frameUrl = (index) =>
  `https://lpdtapi.s3.us-east-1.amazonaws.com/cc/FRAME${String(index + 1).padStart(3, '0')}.jpg`

// Cuántos frames saltar según el dispositivo: menos frames = menos datos.
// Con 766 frames en ~1500px de scroll, usar 1 de cada 2 no se nota.
function getFrameStep() {
  const connection = navigator.connection
  if (connection?.saveData || /2g/.test(connection?.effectiveType ?? '')) return 8
  if (window.matchMedia('(max-width: 767px)').matches) return 6
  return 2
}

// Orden de descarga: primero una pasada gruesa (1 de cada 32 frames) para que
// la animación funcione pronto, después se va rellenando con más detalle.
function buildLoadOrder(frames) {
  const order = []
  const seen = new Set()
  for (const stride of [32, 8, 1]) {
    for (let i = 0; i < frames.length; i += stride) {
      if (!seen.has(frames[i])) {
        seen.add(frames[i])
        order.push(frames[i])
      }
    }
  }
  return order
}

export default function HeroAnimation() {
  const canvasRef = useRef(null)
  const textRef = useRef(null)
  const heroSectionRef = useRef(null)

  // Mantiene ScrollTrigger sincronizado con el scroll suave de Lenis.
  useLenis(ScrollTrigger.update)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const step = getFrameStep()

    // Índices de los frames que se van a usar (incluye siempre el último).
    const frames = []
    for (let i = 0; i < TOTAL_FRAMES; i += step) frames.push(i)
    if (frames[frames.length - 1] !== TOTAL_FRAMES - 1) frames.push(TOTAL_FRAMES - 1)

    const loaded = new Map() // índice de frame -> HTMLImageElement listo
    const inFlight = new Set()
    let cancelled = false
    let lastDrawn = -1
    let targetFrame = 0

    const draw = (frameIndex) => {
      const img = loaded.get(frameIndex)
      if (!img || frameIndex === lastDrawn) return
      context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      context.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      lastDrawn = frameIndex
    }

    // Dibuja el frame cargado más cercano (hacia atrás) al frame pedido.
    const render = (frame) => {
      targetFrame = Math.round(frame)
      let position = frames.findIndex((f) => f >= targetFrame)
      if (position === -1) position = frames.length - 1
      for (let i = position; i >= 0; i--) {
        if (loaded.has(frames[i])) {
          draw(frames[i])
          return
        }
      }
    }

    const loadFrame = (frameIndex) =>
      new Promise((resolve) => {
        const img = new Image()
        img.decoding = 'async'
        inFlight.add(img)
        img.onload = () => {
          inFlight.delete(img)
          if (!cancelled) {
            loaded.set(frameIndex, img)
            // Si llega un frame más cercano al que se está mostrando, se redibuja.
            if (frameIndex <= targetFrame && frameIndex > lastDrawn) render(targetFrame)
          }
          resolve()
        }
        img.onerror = () => {
          inFlight.delete(img)
          resolve()
        }
        img.src = frameUrl(frameIndex)
      })

    // Cola de descargas con concurrencia limitada.
    const queue = []
    let active = 0
    const pump = () => {
      while (!cancelled && active < CONCURRENT_DOWNLOADS && queue.length > 0) {
        const frameIndex = queue.shift()
        active++
        loadFrame(frameIndex).then(() => {
          active--
          pump()
        })
      }
    }
    const enqueue = (list) => {
      for (const frameIndex of list) {
        if (!loaded.has(frameIndex) && !queue.includes(frameIndex)) queue.push(frameIndex)
      }
      pump()
    }

    // 1) Primer frame de inmediato.
    loadFrame(frames[0]).then(() => render(0))

    if (reduceMotion) {
      // Sin animación: solo se muestra el primer frame, sin fijar la sección.
      return () => {
        cancelled = true
        inFlight.forEach((img) => { img.src = '' })
      }
    }

    // 2) Una pasada gruesa para que el scroll muestre algo enseguida.
    const loadOrder = buildLoadOrder(frames)
    const coarseCount = Math.ceil(frames.length / 32)
    enqueue(loadOrder.slice(1, coarseCount))

    // 3) El resto solo se descarga cuando la persona empieza a hacer scroll.
    let restRequested = false
    const requestRest = () => {
      if (restRequested) return
      restRequested = true
      enqueue(loadOrder.slice(coarseCount))
    }

    const animation = { frame: 0 }
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: '+=1500',
          scrub: 1,
          pin: true,
          // ScrollTrigger también llama a onUpdate al inicializarse; solo
          // cuenta como "empezó a hacer scroll" si el progreso es real.
          onUpdate: (self) => {
            if (self.progress > 0.001) requestRest()
          },
        },
      })

      timeline.to(animation, {
        frame: TOTAL_FRAMES - 1,
        ease: 'none',
        onUpdate: () => render(animation.frame),
      })

      timeline.to(textRef.current, { autoAlpha: 0, y: -100 }, 0)
    }, heroSectionRef)

    return () => {
      cancelled = true
      queue.length = 0
      inFlight.forEach((img) => { img.src = '' })
      // Revierte solo las animaciones y ScrollTriggers creados aquí.
      ctx.revert()
    }
  }, [])

  return (
    <div ref={heroSectionRef} className={styles.heroSection}>
      <h1 ref={textRef}>DLHTYNQN</h1>
      <canvas ref={canvasRef} className={styles.heroCanvas} aria-hidden="true"></canvas>
    </div>
  )
}
