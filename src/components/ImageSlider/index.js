"use client";
import { useEffect, useState } from 'react';
// Import Swiper React components
import Swiper from 'swiper';
import { FreeMode } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

const index = (props) => {

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
      document.getElementsByClassName('notion-column_list')[0].classList.add('swiper-wrapper');
      document.getElementsByClassName('notion-column_list')[0].classList.add('swiper-wrapper');
      let images = document.getElementsByClassName('notion-column').length
      for (let i = 0; i < images; i++) {
        document.getElementsByClassName('notion-column')[i].classList.add('swiper-slide');
      }
      const swiperElement = document.querySelector('.mySwiper');
      let swiper = new Swiper(swiperElement, {
        modules: [FreeMode],
        slidesPerView: "auto",
        grabCursor: true,
        freeMode: true,
        spaceBetween: 30,
      }); 
      swiper.init();
  }, []);


  
  return (
    <>
      <div className="swiper mySwiper" dangerouslySetInnerHTML={{ __html: props.images }}/>
      {isLoaded ? (
        <>Cargado</>
      ) : (
        <>Loadingg</>
      )
      }
    </>
  )
}

export default index