import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination,} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const index = (props) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      style={{
        "--swiper-pagination-color": "#07140f",
        "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "16px",
        "--swiper-pagination-bullet-horizontal-gap": "6px"
      }}
    >
      {props.storageResult.map((item) => (
        <SwiperSlide key={item.value} >
          <div className="homeSlide">
          <img loading="lazy" src={`https://firebasestorage.googleapis.com/v0/b/alessandrovaru-nextjs.appspot.com/o/mandalas%2F${props.result[0].storage_slug}%2F${item.value}?alt=media&token=d93542a5-875c-47cd-94d4-2998417d8300&_gl=1*101z3oy*_ga*MzYyNDUzOTU4LjE2OTU5OTIxNDI.*_ga_CW55HF8NVT*MTY5NjI4OTY3MS4xNC4xLjE2OTYyODk3MDEuMzAuMC4w`} className='img-fluid' />
          </div>
        </SwiperSlide>
      ))
      }
    </Swiper>
  )
}

export default index