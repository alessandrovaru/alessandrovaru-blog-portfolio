import Link from 'next/link'
import NavigationBar from '@/components/Nav'
import Archivo from '@/components/PaginasWeb/Archivo'
import Carrusel from '@/components/PaginasWeb/Carrusel'
import Revelar from '@/components/PaginasWeb/Revelar'
import styles from '@/components/PaginasWeb/paginas-web.module.css'
import datos from './webs.json'

const titulo = 'Páginas web para negocios'
const descripcion = `${datos.total} webs hechas para concesionarios, ópticas, floristerías y más. Hago la de tu negocio antes de cobrarte: la ves terminada y, si te gusta, es tuya.`

export const metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: '/paginas-web' },
  openGraph: {
    title: `${titulo} · Alessandrovaru`,
    description: descripcion,
    url: '/paginas-web',
    siteName: 'Alessandrovaru',
    images: [{ url: '/images/webs/portada-home.webp', width: 2400, height: 1500, alt: 'Un mosaico de las webs hechas por Alessandrovaru' }],
    locale: 'es_VE',
    type: 'website',
  },
}

// El contacto de la landing. Si se pone un WhatsApp, pasa a ser el principal.
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_WEBS?.replace(/\D/g, '') || ''
const CONTACTO = WHATSAPP
  ? { href: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hola, Alessandro. Vi tus páginas web y quiero la de mi negocio.')}`, texto: 'Quiero la mía' }
  : { href: 'https://ig.me/m/alessandrovaru', texto: 'Quiero la mía' }

const PASOS = [
  ['Miro tu negocio', 'Tu Instagram, tus fotos, tus precios y tu forma de hablarle a tus clientes. De ahí sale todo: la página no empieza en una plantilla.'],
  ['Te la enseño hecha', 'Te llega un enlace con una clave. La abres en tu teléfono, la recorres y decides con la página delante, no con un presupuesto.'],
  ['Si te gusta, es tuya', 'Un solo pago, sin mensualidad. Cambio lo de muestra por lo tuyo, la configuro en tu dominio y te dejo un panel para que la tengas al día.'],
]

const TRAE = [
  ['Tu catálogo, con ficha', 'Cada carro, montura o ramo con sus fotos, su precio y su botón.'],
  ['WhatsApp a un toque', 'Quien la visita te escribe sobre lo que vio, sin que le mandes fotos una por una.'],
  ['Un panel para ti', 'Subes, cambias y quitas lo que vendes. Sin pedirle nada a nadie.'],
  ['Primero el teléfono', 'Pensada para donde la abren tus clientes, y entera en la computadora.'],
  ['Una entrada con tu marca', 'Abre con una animación hecha de lo tuyo: tu logo, tu producto, tus colores.'],
  ['Tu dominio, configurado', 'El .com lo compras a tu nombre, así es tuyo; yo lo dejo funcionando.'],
]

export default function PaginasWeb() {
  return (
    <div className={styles.pagina}>
      <NavigationBar />
      <main>
        <Archivo datos={datos} contacto={CONTACTO} />

        <section id="como" className={styles.seccion}>
          <Revelar as="h2" className={styles.h2}>Primero la ves. Después decides.</Revelar>
          <ol className={styles.pasos}>
            {PASOS.map(([t, d], i) => (
              <Revelar as="li" key={t} retraso={i * 90}>
                <span className={styles.paso}>{String(i + 1).padStart(2, '0')}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </Revelar>
            ))}
          </ol>
        </section>

        <section className={`${styles.seccion} ${styles.seccionCarrusel}`} aria-labelledby="estilos">
          <Revelar as="h2" id="estilos" className={styles.h2}>Cada negocio, su web</Revelar>
          <Revelar as="p" className={styles.texto}>
            Un concesionario no se parece a una floristería, y dos concesionarios tampoco se parecen entre sí. Estas son algunas de las que ya están hechas.
          </Revelar>
          <Carrusel destacadas={datos.destacadas} rubros={datos.rubros} />
        </section>

        <section className={styles.seccion} aria-labelledby="trae">
          <Revelar as="h2" id="trae" className={styles.h2}>Lo que trae</Revelar>
          <ul className={styles.trae}>
            {TRAE.map(([t, d], i) => (
              <Revelar as="li" key={t} retraso={(i % 3) * 80}>
                <h3>{t}</h3>
                <p>{d}</p>
              </Revelar>
            ))}
          </ul>
          <Revelar className={styles.precio}>
            <p className={styles.precioCifra}>
              <small>desde</small> $449
            </p>
            <p>Un solo pago. Sin mensualidad. Se puede pagar por partes.</p>
          </Revelar>
        </section>

        <section className={`${styles.seccion} ${styles.quien}`} aria-labelledby="quien">
          <Revelar as="h2" id="quien" className={styles.h2}>Quién la hace</Revelar>
          <Revelar as="p" className={styles.texto}>
            Soy Alessandro Varuzza, desarrollador de software y artista digital en Caracas. Llevo más de diez años haciendo la parte que se ve y la que no.
            Las mismas manos que hacen los <Link href="/mandalas">Mandalas</Link> y <Link href="/dlhtynqn">DLHTYNQN</Link> hacen la web de tu negocio:
            por eso ninguna sale de una plantilla.
          </Revelar>
        </section>

        <section className={styles.cierre} aria-label="Escríbeme">
          <a href={CONTACTO.href} target="_blank" rel="noopener noreferrer" className={styles.cierreBoton}>
            {CONTACTO.texto}
          </a>
          <p className={styles.firmaGigante} aria-hidden="true">ALESSANDROVARU</p>
        </section>
      </main>
    </div>
  )
}
