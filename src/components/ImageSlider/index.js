"use client";
import { useEffect, useState } from 'react';
// Import Swiper React components
import Swiper from 'swiper';
import { FreeMode } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

const ImageSlider = (props) => {

  const [isLoaded, setIsLoaded] = useState(false);


  
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

export default ImageSlider