"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "/public/images/logo-mixtapes.png";



import "./styles.css";

const MixtapesLanding = (props) => {

  
  // Tilt function
  // function Tilt(props) {
  //   const { options, ...rest } = props;
  //   const tilt = useRef(null);
  //   useEffect(() => {
  //     if (!navigator.userAgent.match(/iPhone/i)) {
  //       VanillaTilt.init(tilt.current, options);
  //     }
  //   }, [options]);

  //   return <div ref={tilt} {...rest} />;
  // }

  // Tilt Options
  // const options = {
  //   speed: 1000,
  //   max: 30
  // };


  const html = `
    ${props.pagesList.map((page, index) => {
      return `
        <span key=${index}>
          <a href="${page.url}">${page.title}</a>
        </span>
      `
    }).join('')}
`

  return (
    <section
      className="mixtapes-container"
      style={{
        backgroundImage: `url(${props.background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="logo-image col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <Image 
              title="Click me" 
              src={logo.src} 
              className="img-fluid" 
              alt="logo"
              width={250}
              height={250}
            />
          </div>
          <div className="menu col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
           <div>
            {/* add a small text before the h1 saying "serie fotografica" */}
            <p className="small-title">Serie Fotográfica</p>
            <h1>MIXTAPES DE CARACAS</h1>
              <div dangerouslySetInnerHTML={{ __html: html }} />
              <p className="instructions">Mixtapes de Caracas es un proyecto en el que fotografía, diseño, video y textos expresan mi visión de la belleza en el caos de mi ciudad amada.</p>
              <p className="instructions">En los primeros volúmenes, las historias son cortas o inexistentes y es debido a que este es un proyecto en constante evolución y en un principio no tenía pensando escribir una historia para cada volumen, se trataba unicamente de los captions de estos posts en Instagram.</p>
              {/* Create a smaller fontsize p */}
              <p className="instructions">Lamentablemente, los Mixtapes hasta el volumen 12 se perdieron en un disco duro que se dañó, pero logré recuperarlas de mis redes sociales.</p>
              <p className="instructions">Para ver las fotos, haz click en el título de cada Mixtape.</p>
           </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MixtapesLanding;




