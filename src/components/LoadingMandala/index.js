import Image from 'next/image'
import React from 'react'

import logoMandala from '/public/images/logos/mandalawhite.png'

import './styles.css'

const LoadingMandala = () => {
  return (
    <div className='loading-container'>
      <Image src={logoMandala} alt='logo mandala' className='img-fluid loading-mandala' />
      <p className='mt-3'>Cargando...</p>
    </div>
  )
}

export default LoadingMandala