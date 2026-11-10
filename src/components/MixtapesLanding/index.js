import Image from "next/image";
import Link from "next/link";
import logo from "/public/images/logo-mixtapes.png";

import "./styles.css";

const MixtapesLanding = (props) => {
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
              src={logo}
              className="img-fluid"
              alt="Logo de Mixtapes de Caracas"
              width={250}
              height={250}
            />
          </div>
          <div className="menu col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
           <div>
            <p className="small-title">Serie Fotográfica</p>
            <h1>MIXTAPES DE CARACAS</h1>
            <div>
              {props.pagesList.map((page) => {
                return (
                  <span key={page.url}>
                    <Link className="postLink" href={page.url}>{page.title}</Link>
                  </span>
                );

              })}
              </div>
              <p className="instructions">Mixtapes de Caracas es un proyecto en el que fotografía, diseño, video y textos expresan mi visión de la belleza en el caos de mi ciudad amada.</p>
              <p className="instructions">En los primeros volúmenes, las historias son cortas o inexistentes y es debido a que este es un proyecto en constante evolución y en un principio no tenía pensado escribir una historia para cada volumen, se trataba únicamente de los captions de estos posts en Instagram.</p>
              <p className="instructions">Lamentablemente, los Mixtapes hasta el volumen 12 se perdieron en un disco duro que se dañó, pero logré recuperarlas de mis redes sociales.</p>
              <p className="instructions">Para ver las fotos, haz click en el título de cada Mixtape.</p>
              <Link href='/' className='btn btn-light mt-3 me-3'>Home</Link>
           </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MixtapesLanding;
