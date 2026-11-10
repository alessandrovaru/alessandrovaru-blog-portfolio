'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './ImagePopup.module.css'

export default function ImagePopup({ src, alt, onClose }) {
  const closeButtonRef = useRef(null)

  // Cerrar con Escape y llevar el foco al botón de cerrar al abrir.
  useEffect(() => {
    closeButtonRef.current?.focus()
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  if (!src) return null

  const filename = src.split('/').pop()

  return (
    <div className={styles.overlay} onClick={onClose} data-lenis-prevent>
      <div
        className={styles.popup}
        role="dialog"
        aria-modal="true"
        aria-label={alt}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeButtonRef} type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
          &times;
        </button>
        <div className={styles.imageContainer}>
          <Image src={src} alt={alt} fill sizes="90vw" style={{ objectFit: 'contain' }} />
        </div>
        <a className={styles.downloadButton} href={src} download={`dlhtynqn-${filename}`}>
          Descargar
        </a>
      </div>
    </div>
  )
}
