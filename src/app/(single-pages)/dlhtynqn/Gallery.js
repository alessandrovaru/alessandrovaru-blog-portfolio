'use client'

import { useState } from 'react'
import Image from 'next/image'
import ImagePopup from './ImagePopup'
import styles from './styles.module.css'

const IMAGES = Array.from({ length: 11 }, (_, i) => ({
  src: `/images/dlhtynqn/1/${i + 1}.webp`,
  alt: `DLHTYNQN — imagen ${i + 1} de 11`,
}))

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className={styles.gallery}>
        {IMAGES.map((image) => (
          <button
            key={image.src}
            type="button"
            className={styles.galleryItem}
            onClick={() => setSelected(image)}
            aria-label={`Ampliar ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={800}
              height={600}
              sizes="(min-width: 992px) 25vw, 100vw"
            />
          </button>
        ))}
      </div>

      {selected && (
        <ImagePopup src={selected.src} alt={selected.alt} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
