'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './hero.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function HeroAnimation() {
  const canvasRef = useRef(null)
  const textRef = useRef(null)
  const heroSectionRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    canvas.width = 1440
    canvas.height = 810

    const frameCount = 766
    const currentFrame = (index) =>
      `https://lpdtapi.s3.us-east-1.amazonaws.com/cc/FRAME${(index + 1)
        .toString()
        .padStart(3, '0')}.jpg`

    const images = []
    const airpods = {
      frame: 0,
    }

    for (let i = 0; i < frameCount; i++) {
      const img = new Image()
      img.src = currentFrame(i)
      images.push(img)
    }

    images[0].onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[0], 0, 0)
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: 'top top',
        end: '+=1500', // Adjust this value to control scroll length
        scrub: 1,
        pin: true,
      },
    })

    timeline.to(airpods, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: () => render(airpods.frame),
    })
    
    timeline.to(textRef.current, {
        autoAlpha: 0,
        y: -100,
    }, 0)

    function render(frame) {
      const frameIndex = Math.round(frame)
      if (images[frameIndex]) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(images[frameIndex], 0, 0)
      }
    }

    return () => {
        // Kill ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }

  }, [])

  return (
    <div ref={heroSectionRef} className={styles.heroSection}>
      <h1 ref={textRef}>DLHYTYNQN</h1>
      <canvas ref={canvasRef} className={styles.heroCanvas}></canvas>
    </div>
  )
} 