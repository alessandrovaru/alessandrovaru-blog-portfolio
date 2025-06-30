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
            {Array.from({ length: 11 }, (_, i) => (
              <Image
                key={i}
                src={`/images/dlhtynqn/1/${i + 1}.webp`}
                alt={`Galería ${i + 1}`}
                width={800}
                height={600}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
