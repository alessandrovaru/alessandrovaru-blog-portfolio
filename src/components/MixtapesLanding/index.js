"use client";

import { useEffect, useState } from "react";
import logo from "/public/images/logo-mixtapes.png";

import background from "/public/images/p6.jpg";

import "./styles.css";

const index = (props) => {

  
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
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="logo-image col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <img 
              title="Click me" 
              src={logo.src} 
              className="img-fluid" 
              alt="logo"
            />
          </div>
          <div className="menu col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
           <div>
            {/* add a small text before the h1 saying "serie fotografica" */}
            <p className="small-title">Serie Fotográfica</p>
            <h1>MIXTAPES DE CARACAS</h1>
              <div dangerouslySetInnerHTML={{ __html: html }} />
              <p className="instructions">Puedes hacer click en el mandala y serás redirigido a un link aleatorio relacionado al trabajo de Carl Gustav Jung o una canción aleatoria.</p>
           </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;

// create a const which will be a json that contains the links and the text



