"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "/public/images/mandalawhite.png";
import background from "/public/images/p1.jpg";

import "./styles.css";

// Lecturas y videos relacionados con Carl Gustav Jung y los mandalas.
const JUNG_LINKS = [
  "https://www.tdx.cat/bitstream/handle/10803/462856/tae.pdf",
  "http://www.instituto-integra.com/wp-content/uploads/2017/05/el_libro_rojo_jung_carl_gustav.pdf",
  "https://www.youtube.com/watch?v=Z9sliXzD5Jc",
  "https://www.youtube.com/watch?v=WPRkIavs1Gk",
  "https://jungutah.org/blog/mandalas-symbols-of-the-self-2/",
  "https://www.youtube.com/watch?v=PLRXzJFAIoM&t=477s",
  "https://www.youtube.com/watch?v=bs3HK3pxVAY&list=PLuyJdbBL2WAkLIwpzmGK8gvKumPhoutjE&index=1",
];

const openRandomLink = () => {
  const link = JUNG_LINKS[Math.floor(Math.random() * JUNG_LINKS.length)];
  window.open(link, "_blank", "noopener,noreferrer");
};

const MandalaButton = ({ pagesList }) => {
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
                title="Haz click en el mandala"
                src={logo}
                className="img-fluid"
                alt="Mandala: abre un enlace aleatorio sobre Carl Gustav Jung"
                role="button"
                tabIndex={0}
                onClick={openRandomLink}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openRandomLink();
                  }
                }}
                width={250}
                height={250}
              />
            </div>
            <div className="menu col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div>
                <p className="small-title">Serie Fotográfica</p>
                <h1>Mandalas</h1>
                <div>
                  {pagesList.map((page) => (
                    <span key={page.url}>
                      <Link className="postLink" href={page.url}>{page.title}</Link>
                    </span>
                  ))}
                </div>
                <p className="instructions">Puedes hacer click en el mandala y serás redirigido a un link aleatorio relacionado al trabajo de Carl Gustav Jung o una canción aleatoria.</p>
                <Link href="/" className="btn btn-light mt-3 me-3">Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MandalaButton;
