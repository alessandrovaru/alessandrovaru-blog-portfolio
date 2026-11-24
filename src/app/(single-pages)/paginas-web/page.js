import Link from 'next/link'
import NavigationBar from '@/components/Nav'
import Archivo from '@/components/PaginasWeb/Archivo'
import Carrusel from '@/components/PaginasWeb/Carrusel'
import Revelar from '@/components/PaginasWeb/Revelar'
import styles from '@/components/PaginasWeb/paginas-web.module.css'
import datos from './webs.json'

const titulo = 'Páginas web para negocios'
const descripcion = 'Cientos de webs hechas para negocios, ninguna igual. Hago la de tu negocio antes de cobrarte: la ves terminada y, si te gusta, es tuya.'

export const metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: '/paginas-web' },
  openGraph: {
    title: `${titulo} · Alessandrovaru`,
    description: descripcion,
    url: '/paginas-web',
    siteName: 'Alessandrovaru',
    images: [{ url: '/images/webs/portada-home.webp', width: 2400, height: 1500, alt: 'Un mosaico de páginas web hechas por Alessandrovaru' }],
    locale: 'es_VE',
    type: 'website',
  },
}

// El contacto de la landing (decisión del usuario: Instagram). Si algún día se
// pone NEXT_PUBLIC_WHATSAPP_WEBS, pasa a ser el principal.
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_WEBS?.replace(/\D/g, '') || ''
const CONTACTO = WHATSAPP
  ? { href: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hola, Alessandro. Vi tus páginas web y quiero la de mi negocio.')}`, texto: 'Quiero la mía' }
  : { href: 'https://ig.me/m/alessandrovaru', texto: 'Quiero la mía' }

const PASOS = [
  ['Miro tu negocio', 'Tus fotos, tus productos y tu forma de hablarle a tus clientes. De ahí sale todo.'],
  ['Te la enseño hecha', 'Te llega un enlace. La recorres en tu teléfono y decides con la página delante, no con un presupuesto.'],
  ['Si te gusta, es tuya', 'Cambio lo de muestra por lo tuyo, la pongo en tu dominio y te dejo un panel para tenerla al día.'],
]

const TRAE = [
  ['Tu catálogo, con ficha', 'Cada producto con sus fotos, su precio y su botón.'],
  ['WhatsApp a un toque', 'Te escriben sobre lo que vieron, sin pedirte fotos una por una.'],
  ['Un panel para ti', 'Subes, cambias y quitas lo que vendes, sin depender de nadie.'],
  ['Una entrada con tu marca', 'Abre con una animación hecha de lo tuyo: tu logo, tu producto, tus colores.'],
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
          <Carrusel destacadas={datos.destacadas} rubros={datos.rubros} />
        </section>

        <section className={styles.seccion} aria-labelledby="trae">
          <Revelar as="h2" id="trae" className={styles.h2}>Lo que trae</Revelar>
          <ul className={styles.trae}>
            {TRAE.map(([t, d], i) => (
              <Revelar as="li" key={t} retraso={(i % 2) * 80}>
                <h3>{t}</h3>
                <p>{d}</p>
              </Revelar>
            ))}
          </ul>
          <Revelar className={styles.precio}>
            <div className={styles.precioCifra}>
              <small>Desde</small>
              <span>$449</span>
            </div>
            <p className={styles.letraChica}>
              Es el punto de partida. El precio final depende del país, de la tasa de cambio y de lo que necesite tu negocio. Un solo pago, sin mensualidad.
            </p>
          </Revelar>
        </section>

        <section className={`${styles.seccion} ${styles.quien}`} aria-labelledby="quien">
          <Revelar as="h2" id="quien" className={styles.h2}>Quién la hace</Revelar>
          <Revelar as="p" className={styles.texto}>
            Soy Alessandro Varuzza, desarrollador de software y artista digital en Caracas. Las mismas manos que hacen los{' '}
            <Link href="/mandalas">Mandalas</Link> y <Link href="/dlhtynqn">DLHTYNQN</Link> hacen la web de tu negocio: por eso ninguna sale de una plantilla.
          </Revelar>
        </section>

        <section className={styles.cierre} aria-labelledby="cierre">
          <Revelar as="h2" id="cierre" className={styles.cierreTitulo}>¿Hacemos la tuya?</Revelar>
          <Revelar>
            <a href={CONTACTO.href} target="_blank" rel="noopener noreferrer" className={styles.boton}>
              <span>Escríbeme</span>
              <i aria-hidden="true">↗</i>
            </a>
          </Revelar>
          <div className={styles.firmaGigante} aria-hidden="true">ALESSANDROVARU</div>
        </section>
      </main>
    </div>
  )
}
