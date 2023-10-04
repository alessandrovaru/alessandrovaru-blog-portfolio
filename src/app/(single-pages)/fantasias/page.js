import Image from 'next/image';
import './styles.css';

import fantasiaLogo  from '/public/images/logos/fantasias.png';
function Page() {

  return (
    <div className="fantasia-container container">
      <div className='fantasia-wrapper'>
        <article>
            <h1 className='fantasia-title'>Fantasías</h1>
            <h2 className='fantasia-subtitle mb-2'>Episodio 1</h2>
            <iframe src="https://www.youtube.com/embed/6S3LJwS9jdg?si=xy7iMxqDwu4_lGsc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <h3 className='fantasia-description-title mt-2'>Descripción</h3>
            <section>
              <p>Fantasías es una serie documental contemplativa de la ciudad de Caracas.</p>
              <p>Un documental contemplativo es un subgénero del cine documental caracterizado por su enfoque en la observación y la reflexión más que en la narración tradicional y lineal.</p>
              <p>Estos documentales a menudo evitan la estructura narrativa convencional, las entrevistas directas, y las voces en off explicativas. En lugar de eso, optan por un ritmo más pausado, permitiendo que los espectadores absorban y reflexionen sobre lo que ven y escuchan en la pantalla sin la guía directa de un narrador o un personaje principal.</p>
            </section>
            <section>
                <h2 className='fantasia-article-subtitle'>Características del Documental Contemplativo</h2>
                <p>El documental contemplativo es un subgénero cinematográfico distintivo. A continuación, exploramos
                    sus características más sobresalientes:</p>
                <ul>
                    <li><strong>Visualización detallada:</strong> Tomas largas y detalladas que invitan a la
                        observación reflexiva.</li>
                    <li><strong>Ritmo lento:</strong> Adopta un ritmo pausado para fomentar la reflexión del
                        espectador.</li>
                    <li><strong>Narrativa mínima:</strong> Minimiza el uso de narrativas explícitas y lineales.</li>
                    <li><strong>Sonido ambiente:</strong> Prioriza los sonidos naturales del entorno documentado.</li>
                    <li><strong>Enfoque ambiental:</strong> Enfatiza los entornos y contextos de los sujetos.</li>
                </ul>
            </section>
            <section>
                <h2 className='fantasia-article-subtitle'>Ejemplo de Documental Contemplativo: Baraka (1992)</h2>
                <p><em>Baraka</em> de Ron Fricke es un clásico del documental contemplativo que ofrece una serie de
                    imágenes impresionantes de culturas y entornos globales sin recurrir a narraciones verbales o
                    estructuras convencionales.</p>
            </section>
            <section>
                <h2 className='fantasia-article-subtitle'>Propósito de los Documentales Contemplativos</h2>
                <p>Los documentales contemplativos buscan generar reflexión y contemplación sobre temas como la
                    humanidad, la naturaleza, la cultura y la espiritualidad a través de un estilo visual y sonoro
                    distintivo.</p>
            </section>
        </article>
       
      </div>
    </div>
  );
}

export default Page;