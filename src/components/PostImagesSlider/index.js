'use client'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Keyboard, A11y } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import './styles.css'

const PostImagesSlider = ({ images = [], title }) => {
  // Índice de la imagen abierta en el modal, o null si está cerrado.
  const [openIndex, setOpenIndex] = useState(null)

  if (images.length === 0) {
    return (
      <div className="mySwiper postImagesEmpty">
        <p>Las imágenes no están disponibles en este momento.</p>
      </div>
    )
  }

  const selected = openIndex !== null ? images[openIndex] : null

  return (
    <>
      <Swiper
        className="mySwiper"
        modules={[Pagination, Keyboard, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        style={{
          '--swiper-pagination-color': '#07140f',
          '--swiper-pagination-bullet-inactive-color': '#FFFFFF',
          '--swiper-pagination-bullet-inactive-opacity': '1',
          '--swiper-pagination-bullet-size': '16px',
          '--swiper-pagination-bullet-horizontal-gap': '6px',
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide className="mySwiperSlide" key={image.name}>
            <button
              type="button"
              className="postImageButton"
              onClick={() => setOpenIndex(index)}
              aria-label={`Ampliar imagen ${index + 1} de ${title}`}
            >
              {/* Imágenes servidas desde Firebase Storage; se usa <img> para no
                  consumir la cuota de optimización de imágenes de Vercel. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={`${title} — imagen ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <Modal show={selected !== null} onHide={() => setOpenIndex(null)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={selected.src}
              alt={`${title} — imagen ${openIndex + 1}`}
              className="img-fluid"
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default PostImagesSlider
