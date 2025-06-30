"use client";
import { ReactLenis, useLenis } from 'lenis/react'

function SmoothScrolling({ children }) {
    const lenis = useLenis((lenis) => {
        // called every scroll
        console.log(lenis)
      })
  return (
    <ReactLenis root options={{ lerp: 0.2, duration: 1.2, smoothTouch: true }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling; 