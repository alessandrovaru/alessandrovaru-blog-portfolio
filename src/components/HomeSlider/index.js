'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Keyboard, A11y } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

import mandalaBackground from "/public/images/p10.jpg";
import mixtapeBackground from "/public/images/p7.jpg";
import fantasiasBackground from "/public/images/p8.jpg";
import dlhtynqnBackground from "/public/images/dlhtynqn/1/7.webp";
import logoMixtapes from "/public/images/logos/mixtape.png";
import logoMandalas from "/public/images/logos/mandalawhite.png";
import logoFantasias from "/public/images/logos/fantasias.png";
import logoDLHTYNQN from "/public/images/logos/dlhtynqn.png";

const slides = [
  {
    title: 'DLHTYNQN :(',
    description: 'DLHTYNQN es un proyecto de arte digital que explora el todo y la nada a partir de edificios de la ciudad de Caracas.',
    image: dlhtynqnBackground,
    alt: 'Edificio de Caracas intervenido digitalmente para DLHTYNQN',
    logo: logoDLHTYNQN,
    logo_alt: 'Logo de DLHTYNQN',
    logo_class: 'logoDLHTYNQN',
    url: '/dlhtynqn',
  },
  {
    title: 'Mandalas',
    description: 'Poemas y mandalas digitales creados a partir de fotografías digitales de la ciudad de Caracas.',
    image: mandalaBackground,
    alt: 'Fotografía de Caracas usada en la serie Mandalas',
    logo: logoMandalas,
    logo_alt: 'Logo de Mandalas',
    logo_class: 'logoMandalas',
    url: '/mandalas',
  },
  {
    title: 'Mixtapes de Caracas',
    description: 'Historias de ficción ambientadas en la ciudad de Caracas a partir de fotografías convertidas en diseños digitales.',
    image: mixtapeBackground,
    alt: 'Fotografía de Caracas usada en Mixtapes de Caracas',
    logo: logoMixtapes,
    logo_alt: 'Logo de Mixtapes de Caracas',
    logo_class: 'logoMixtapes',
    url: '/mixtapes-de-caracas',
  },
  {
    title: 'Fantasías',
    description: 'Documental experimental no narrativo ambientado en la ciudad de Caracas, Venezuela.',
    image: fantasiasBackground,
    alt: 'Fotograma de Fantasías',
    logo: logoFantasias,
    logo_alt: 'Logo de Fantasías',
    logo_class: 'logoFantasias',
    url: '/fantasias',
  },
];

const HomeSlider = () => {
  return (
    <div>
      <Swiper
        className="homeSlider"
        modules={[Pagination, Keyboard, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        style={{
          "--swiper-pagination-color": "#46875a",
          "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "16px",
          "--swiper-pagination-bullet-horizontal-gap": "6px"
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.url}>
            <div className="homeSlide">
              <div className="home-slider-image">
                <Image
                  className="home-slider-bg"
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  placeholder="blur"
                  priority={index === 0}
                />
                <div className="home-slider-text">
                  <Image className={`mb-3 img-fluid logoSlider ${slide.logo_class}`} src={slide.logo} alt={slide.logo_alt} />
                  <h2 className="mb-3 home-slider-title">{slide.title}</h2>
                  <p className="mb-3">{slide.description}</p>
                  <Link href={slide.url} className="btn home-slider-button">Ver más</Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
