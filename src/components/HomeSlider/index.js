'use client'
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import './styles.css';
import 'swiper/css';
import 'swiper/css/free-mode';

import mandalaBackground from "/public/images/p2.jpg";
import mixtapeBackground from "/public/images/p3.jpg";
import fantasiasBackground from "/public/images/p6.jpg";


const index = () => {
  const slides = [
    {
      title: 'Mandalas',
      description: 'Poemas y mandalas digitales creados a partir de fotografías digitales de la ciudad de Caracas  ',
      image:  mandalaBackground.src,
      alt: 'Mandalas',
    }, 
    {
      title : 'Mixtapes de Caracas',
      description: 'Historias de ficción ambientadas en la ciudad de Caracas a partir de fotografías convertidas en diseños digitales. ',
      image:  mixtapeBackground.src,
      alt: 'Mixtapes de Caracas',
    },
    {
      title: 'Fantasías',
      description: 'Documental experimental no narrativo ambientado en la ciudad de Caracas, Venezuela.',
      image:  fantasiasBackground.src,
      alt: 'Fantasías',
    }


  ];
    
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div style={{ backgroundImage: `url(${slide.image})`}} className="homeSlide">
            <div className="container">
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default index;