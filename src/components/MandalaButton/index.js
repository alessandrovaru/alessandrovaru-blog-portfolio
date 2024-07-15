"use client";

import { useEffect, useState } from "react";
import logo from "/public/images/mandalawhite.png";

import background from "/public/images/p1.jpg";

import "./styles.css";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from 'dompurify';


const MandalaButton = (props) => {
  const [mandalaClicked, setMandalaClicked] = useState(false);
  const [poemClicked, setPoemClicked] = useState(false);
  const [acceptedLink, setAcceptedLink] = useState(false);

  
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

  //Random Link
  const randomLink = () => {
    const links = [
      "https://www.tdx.cat/bitstream/handle/10803/462856/tae.pdf",
      "http://www.instituto-integra.com/wp-content/uploads/2017/05/el_libro_rojo_jung_carl_gustav.pdf",
      "https://www.youtube.com/watch?v=Z9sliXzD5Jc&ab_channel=DavidDeanBurkhart",
      "https://www.youtube.com/watch?v=WPRkIavs1Gk&ab_channel=GallerySessions",
      "https://jungutah.org/blog/mandalas-symbols-of-the-self-2/",
      "https://www.youtube.com/watch?v=PLRXzJFAIoM&t=477s&ab_channel=SOLirisTV",
      "https://www.youtube.com/watch?v=bs3HK3pxVAY&list=PLuyJdbBL2WAkLIwpzmGK8gvKumPhoutjE&index=1&ab_channel=TheIntrovertedThinker",
    ];
    const randomIndex = Math.floor(Math.random() * links.length);
    const item = links[randomIndex];
    setPoemClicked(false);
    setMandalaClicked(false);
    window.open(item, "_blank");
  };

  const mandalaClick = () => {
    setMandalaClicked(true);
  };

  const html = `
    
`

  return (
    <section className="mandala-button-container">
      <div
        className="mandala-button"
        style={{
          backgroundImage: `url(${background.src})`,
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
                onClick={randomLink}  
                width={250}
                height={250}
              />
            </div>
            <div className="menu col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <div>
              {/* add a small text before the h1 saying "serie fotografica" */}
              <p className="small-title">Serie Fotográfica</p>
              <h1>Mandalas</h1>
                <div>
                {props.pagesList.map((page, index) => {
                  return (
                    <span key={index}>
                      <Link className="postLink" href="{page.url}">{page.title}</Link>
                    </span>
                  );

                })}
                </div>
                <p className="instructions">Puedes hacer click en el mandala y serás redirigido a un link aleatorio relacionado al trabajo de Carl Gustav Jung o una canción aleatoria.</p>
                <Link href='/' className='btn btn-light mt-3 me-3'>Home</Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MandalaButton;

// create a const which will be a json that contains the links and the text



