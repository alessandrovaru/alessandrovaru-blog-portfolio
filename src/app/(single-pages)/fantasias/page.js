import Image from 'next/image';
import './styles.css';

export const metadata = {
  title: "Fantasías - Episodio 1",
  description: "Documental contemplativo ambientado en la ciudad de Caracas, Venezuela.",
  generator: "Next.js",
  applicationName: "alessandrovaru-blog-portfolio",
  referrer: 'origin-when-cross-origin',
  keywords:['Next.js', 'React', 'Portfolio', 'Blog', 'Alessandro Varuzza', 'Alessandrovaru', 'Varuzza', 'Alessandro', 'Gian Alessandro Varuzza', 'Gian Alessandro', 'Gian', 'Mandalas', 'Mandala', 'Mandala Art', 'Mandala Artist', 'Mandala Art', 'Mixtapes De Caracas', 'Mixtapes', 'Caracas', 'Fantasías', 'Baraka', 'Documental Contemplativo', 'Documental', 'Ron Fricke', 'surrealism'],
  creator: 'Alessandro Varuzza',
  publisher: 'Alessandro Varuzza',
  formatDetection: ['telephone=no', 'email=no', 'address=no'],
  metadataBase: new URL('https://alessandrovaru.com/fantasias'),
  alternates: {
    canonical: '/',
    languages: {
      'es-VE': '/es',
    }
  },
};

function Page() {

  return (
    <div className="fantasia-container container">
      <div className='fantasia-wrapper'>
        <article>
            <h1 className='fantasia-title'>Fantasías</h1>
            <h2 className='fantasia-subtitle mb-2'>Episodio 2</h2>
            <iframe src="https://www.youtube.com/embed/rX8mLxA7FZc?si=xLXnNUVGp1_dR5hp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            {/* <iframe src="https://www.youtube.com/embed/YLVDs2DRre8?si=HQ88GaEueOe7IBwQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
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