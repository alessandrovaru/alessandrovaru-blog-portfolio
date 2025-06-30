import Image from 'next/image'
import styles from './styles.module.css'
import HeroAnimation from './HeroAnimation'

export default function Page() {
  return (
    <>
      <HeroAnimation />
      <div className={styles.pageContainer}>
        <div className={styles.content}>
          <h2>Contenido de la Página</h2>
          <p>
            Aquí comienza el contenido normal de la página, después de la
            animación del hero. Puedes agregar cualquier componente o texto que
            desees. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque
            sit amet hendrerit risus, sed porttitor quam.
          </p>

          <h3>Galería de Imágenes</h3>
          <div className={styles.gallery}>
            <Image
              src="https://picsum.photos/800/600?random=1"
              alt="Galería 1"
              width={800}
              height={600}
            />
            <Image
              src="https://picsum.photos/800/600?random=2"
              alt="Galería 2"
              width={800}
              height={600}
            />
            <Image
              src="https://picsum.photos/800/600?random=3"
              alt="Galería 3"
              width={800}
              height={600}
            />
          </div>
        </div>
      </div>
    </>
  )
}
