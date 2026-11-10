"use client";
import { ReactLenis } from 'lenis/react'

// Scroll suave global. Los contenedores con scroll propio deben llevar
// el atributo `data-lenis-prevent` para que Lenis no intercepte su rueda.
function SmoothScrolling({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.2 }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
