'use client'

import Image from 'next/image'
import styles from './ImagePopup.module.css'

export default function ImagePopup({ src, onClose }) {
  if (!src) return null

  const handleDownload = (e) => {
    e.stopPropagation() // Prevent closing the popup
    const link = document.createElement('a')
    link.href = src
    // Extract filename from URL
    const filename = src.split('/').pop()
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    // The overlay will close the popup when clicked
    <div className={styles.overlay} onClick={onClose}>
      {/* stopPropagation prevents clicks inside the popup from closing it */}
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.imageContainer}>
          <Image src={src} alt="Popup Image" layout="fill" objectFit="contain" />
        </div>
        <button className={styles.downloadButton} onClick={handleDownload}>
          Descargar
        </button>
      </div>
    </div>
  )
} 