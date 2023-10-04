'use client'
import { Navigation, Pagination,} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import './styles.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import mandalaBackground from "/public/images/p10.jpg";
import mixtapeBackground from "/public/images/p7.jpg";
import fantasiasBackground from "/public/images/p8.jpg";

import logoMixtapes from "/public/images/logos/mixtape.png";
import logoMandalas from "/public/images/logos/mandalawhite.png";
import logoFantasias from "/public/images/logos/fantasias.png";
import Link from 'next/link';

const index = () => {
  const slides = [
    {
      title: 'Mandalas',
      description: 'Poemas y mandalas digitales creados a partir de fotografías digitales de la ciudad de Caracas  ',
      image:  mandalaBackground.src,
      alt: 'Mandalas',
      logo: logoMandalas.src,
      logo_alt: 'Logo de Mandalas',
      logo_class: 'logoMandalas',
      url:'mandalas'
    }, 
    {
      title : 'Mixtapes de Caracas',
      description: 'Historias de ficción ambientadas en la ciudad de Caracas a partir de fotografías convertidas en diseños digitales. ',
      image:  mixtapeBackground.src,
      alt: 'Mixtapes de Caracas',
      logo: logoMixtapes.src,
      logo_alt: 'Logo de Mixtapes de Caracas',
      logo_class: 'logoMixtapes',
      url:'mixtapes-de-caracas'
    },
    {
      title: 'Fantasías',
      description: 'Documental experimental no narrativo ambientado en la ciudad de Caracas, Venezuela.',
      image:  fantasiasBackground.src,
      alt: 'Fantasías',
      logo: logoFantasias.src,
      logo_alt: 'Logo de Fantasías',
      logo_class: 'logoFantasias',
      url:'fantasias'
    }


  ];
    
  return (
    <div className='container'>
      <Swiper
        className='homeSlider'
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        style={{
          "--swiper-pagination-color": "#46875a",
          "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "16px",
          "--swiper-pagination-bullet-horizontal-gap": "6px"
        }} sin poder dejar de 
      > 
        {slides.map((slide, index) => (
          <SwiperSlide key={index} >
            <div className="homeSlide">
              <div className="home-slider-image" style={{ backgroundImage: `url(${slide.image})`}}>
                <div className="home-slider-text">
                  <img className={'mb-3 img-fluid logoSlider' + ' ' + slide.logo_class} src={slide.logo} alt={slide.logo_alt} />
                  <h1 className='mb-3'>{slide.title}</h1>
                  <p className='mb-3'>{slide.description}</p>
                  {/* Create a transparent button that change on hover */}
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

export default index;