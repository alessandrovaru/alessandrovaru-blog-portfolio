"use client"

import { useEffect, useState } from 'react';
// Import Swiper React components
import Swiper from 'swiper';

// Import Swiper styles
import 'swiper/css';



const index = (props) => {

  

  useEffect(() => {
      document.getElementsByClassName('notion-column_list')[0].classList.add('swiper-wrapper');
      let images = document.getElementsByClassName('notion-column').length
      for (let i = 0; i < images; i++) {
        document.getElementsByClassName('notion-column')[i].classList.add('swiper-slide');
      }
      const swiper = new Swiper('.mySwiper', {
        speed: 400,
        spaceBetween: 100,
      });
      swiper.init();
  }, []);
  

  return (
    <>
      <div className="swiper mySwiper"dangerouslySetInnerHTML={{ __html: props.images }} />
    </>
  )
}

export default index