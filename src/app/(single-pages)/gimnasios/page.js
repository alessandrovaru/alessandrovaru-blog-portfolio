import NavigationBar from '@/components/Nav'
import styles from './styles.module.css'

export const metadata = {
  title: 'Aplicación web definitiva para la gestión de gimnasios en Latinoamérica',
  description: 'Optimiza la administración de tu gimnasio y la experiencia de tus usuarios con nuestra aplicación web, construida con Next.js 14 y Google Firebase. Personalizable, económica y fácil de usar.',
  openGraph: {
    title: 'Aplicación web definitiva para la gestión de gimnasios en Latinoamérica',
    description: 'Optimiza la administración de tu gimnasio y la experiencia de tus usuarios con nuestra aplicación web, construida con Next.js 14 y Google Firebase. Personalizable, económica y fácil de usar.',
    url: 'https://www.alessandrovaru.com/gimnasios',
    siteName: 'Alessandrovaru',
    images: [
      {
        url: 'images/metadata/gym.jpg',
        width: 1366,
        height: 768
      },
    ],
    locale: 'es_ES',
  },
}

export default function TemplateLanding() {

  return (
    <>
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <NavigationBar />
      <main className="flex-grow-1">
        {/* Sección Principal */}
        <section className={`${styles.hero} py-5 py-md-7 bg-danger bg-gradient text-white min-vh-100 d-flex flex-column justify-content-center`}>
          <div className="container position-relative z-1">
            <div className="text-center">
              <h1 className="display-4 fw-bold mb-3">La Solución Definitiva para la Gestión de tu Gimnasio</h1>
              <p className="lead mb-4">
                Optimiza la administración de tu gimnasio y la experiencia de tus usuarios con nuestra aplicación web, construida con Next.js 14 y Google Firebase. <u>Personalizable, económica y fácil de usar.</u>
              </p>
              <div>
                <a href='#features' className="btn btn-dark btn-lg me-2 mb-3" style={{fontSize: 'clamp(0.5rem, 5vw, 1rem)'}}>Descubre Más</a>
                <a href='#demo' className="btn btn-outline-light btn-lg mb-3" style={{fontSize: 'clamp(0.5rem, 5vw, 1rem)'}}>Ver Demostración</a>
              </div>
            </div>
          </div>
          <div className={` ${styles.demo} ratio ratio-16x9 mb-4 position-absolute z-0 opacity-50`}>
            <video
              width="320"
              height="240"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="https://firebasestorage.googleapis.com/v0/b/alessandrovaru-nextjs.appspot.com/o/videos%2Fhero.mp4?alt=media&token=19ad0565-2798-4575-b83d-bfa71da2d5bb"
                type="video/mp4"
              />
              <track
                src="https://firebasestorage.googleapis.com/v0/b/alessandrovaru-nextjs.appspot.com/o/videos%2Fhero.mp4?alt=media&token=19ad0565-2798-4575-b83d-bfa71da2d5bb"
                kind="subtitles"
                srcLang="es"
                label="Español"
              />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
        </section>
        

        {/* Sección de Características */}
        <section id="features" className={`position-relative z-2 py-5 bg-dark bg-gradient`}>
          <div className="container">
            <h2 className="text-center mb-5">Características Principales</h2>
            <div className="row g-4">
              {[
                {
                  title: "Gestión de Miembros",
                  description: "Administra fácilmente los datos de tus miembros, suscripciones y asistencia con una interfaz intuitiva.",
                  icon: (
                    <i className="fas fa-users text-dark mb-4 mt-2" style={{fontSize: 'clamp(1.5rem, 5vw, 2rem)'}}></i>
                  ),
                },
                {
                  title: "Plataforma de Pagos",
                  description: "Facilita el pago de suscripciones y clases mediante múltiples métodos de pago seguros y confiables.",
                  icon: (
                    <i className="fas fa-credit-card text-dark mb-4 mt-2" style={{fontSize: 'clamp(1.5rem, 5vw, 2rem)'}}></i>
                  ),
                },
                {
                  title: "Personalizable",
                  description: "Adapta colores, contenidos y funcionalidades para que reflejen la identidad única de tu gimnasio.",
                  icon: (
                    <i className="fas fa-paint-brush text-dark mb-4 mt-2" style={{fontSize: 'clamp(1.5rem, 5vw, 2rem)'}}></i>
                  ),
                },
                {
                  title: "Reservas y Notificaciones Push",
                  description: "Permite a tus miembros reservar clases en línea y recibir notificaciones push para mantenerlos comprometidos.",
                  icon: (
                    <i className="fas fa-bell text-dark mb-4 mt-2" style={{fontSize: 'clamp(1.5rem, 5vw, 2rem)'}}></i>
                  ),
                },
                {
                  title: "Panel de Análisis de Datos",
                  description: "Accede a informes detallados sobre membresías, clases y pagos para tomar decisiones informadas.",
                  icon: (
                    <i className="fas fa-chart-line text-dark mb-4 mt-2" style={{fontSize: 'clamp(1.5rem, 5vw, 2rem)'}}></i>
                  ),
                },
                {
                  title: "Soporte Técnico",
                  description: "Recibe asistencia dedicada para la configuración, personalización y mantenimiento de tu plantilla.",
                  icon: (
                    <i className="fas fa-headset text-dark mb-4 mt-2" style={{fontSize: 'clamp(1.5rem, 5vw, 2rem)'}}></i>
                  ),
                },
              ].map((feature, index) => (
                <div key={index} className="col-md-4">
                  <div className={`${styles.features} card h-100 bg-danger bg-gradient text-white border-0`}>
                    <div className="card-body text-center">
                      {feature.icon}
                      <p className="text-white card-title" style={{ fontWeight: 'bold'}}>{feature.title}</p>
                      <p className="text-darkcard-text">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección Demostración */}
        <section id="demo" className={`py-5 bg-light bg-gradient text-white`}>
          <div className="container">
            <h2 className="text-center text-dark mb-5">Mira la Plantilla en Acción</h2>
            <div className={` ${styles.demo} ratio ratio-16x9 mb-4`}>
              <video
                width="320"
                height="240"
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  src="https://firebasestorage.googleapis.com/v0/b/alessandrovaru-nextjs.appspot.com/o/videos%2Fdemo.mp4?alt=media&token=d3899a6d-d3fb-4adf-b9c1-0933c8d2d996"
                  type="video/mp4"
                />
                <track
                  src="https://firebasestorage.googleapis.com/v0/b/alessandrovaru-nextjs.appspot.com/o/videos%2Fdemo.mp4?alt=media&token=d3899a6d-d3fb-4adf-b9c1-0933c8d2d996"
                  kind="subtitles"
                  srcLang="es"
                  label="Español"
                />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
            <div className="text-center">
              <a href="#pricing" className="btn btn-danger btn-lg">
                ¡Empieza Ahora!
              </a>
            </div>
          </div>
        </section>

        {/* Sección de con h2 y p a la izquierda y un video vertical a la derecha */}

        <section className={`py-5 bg-light bg-gradient text-dark`}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <h2 className="text-left text-dark mb-4">Que tus usuarios gestionen su horario de clases</h2>
                <p className="lead text-left text-secondary">
                  Tus miembros podrán ver y reservar clases, así como recibir notificaciones push para mantenerlos comprometidos.
                </p>
                <h2 className="text-left text-dark mb-4">Reserva de clases en línea</h2>
                <p className="lead text-left text-secondary">
                  Tus miembros podrán reservar clases en línea y recibir notificaciones push para mantenerlos comprometidos.
                </p>
              </div>
              <div className="col-md-6">
                <div className={` ${styles.demo} ratio ratio-1x1 mb-4`}>
                  <video
                    width="320"
                    height="240"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source
                      src="https://firebasestorage.googleapis.com/v0/b/alessandrovaru-nextjs.appspot.com/o/videos%2Fdemo-horario.mp4?alt=media&token=b2f42e47-2b22-495d-a9ba-4f84a0cef892"
                      type="video/mp4"
                    />
                    <track
                      src="https://firebasestorage.googleapis.com/v0/b/alessandrovaru-nextjs.appspot.com/o/videos%2Fdemo-horario.mp4?alt=media&token=b2f42e47-2b22-495d-a9ba-4f84a0cef892"
                      kind="subtitles"
                      srcLang="es"
                      label="Español"
                    />
                    Tu navegador no soporta el elemento de video.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Sección de Onboarding Profesional */}
        <section id="onboarding" className={`py-5 bg-secondary bg-gradient text-white`}>
          <div className="container">
            <h2 className="text-center mb-4">Onboarding Profesional</h2>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <p className="lead text-center">
                  Nuestro equipo de técnicos especializados se encargará de montar y configurar la plantilla para tu gimnasio, asegurando una implementación rápida y sin contratiempos. Nos ocupamos de todo para que puedas enfocarte en lo que mejor sabes hacer: gestionar tu gimnasio.
                </p>
                <p className="text-center small">
                  *Nota: La compra del dominio no está incluida, pero sí la configuración completa de la plantilla.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Precios */}
        <section id="pricing" className={`py-5 bg-light bg-gradient`}>
          <div className="container">
            <h2 className="text-center text-dark mb-5">Planes Flexibles para Todos los Gimnasios</h2>
            <div className="row g-4 justify-content-center">
              {[
                {
                  title: "Legendario",
                  price: "$99/mes",
                  description: "Suscripción anual con beneficios exclusivos",
                  features: [
                    "Todas las características de Pro y Amateur",
                    "Actualizaciones automáticas",
                    "Microsoft Clarity Analytics",
                    "Soporte prioritario",
                    "Sistema de propuestas de integraciones",
                  ],
                  cta: "Contratar Ahora",
                  highlight: true,
                },
                {
                  title: "Amateur",
                  price: "$999",
                  description: "Pago único para comenzar",
                  features: [
                    "Administración de clases, miembros e instructores",
                    "Página de inicio personalizable",
                    "Inicio de sesión con Google OAuth",
                    "Panel de análisis",
                    "3 meses de soporte",
                  ],
                  cta: "Comprar Ahora",
                  highlight: false,
                },
                {
                  title: "Pro",
                  price: "$1399",
                  description: "Pago único con funcionalidades avanzadas",
                  features: [
                    "Todas las características de Amateur",
                    "Notificaciones Push",
                    "Reserva de clases en línea",
                    "Plataforma de pagos (Pago móvil, Zelle, etc.)",
                    "6 meses de soporte",
                  ],
                  cta: "Comprar Ahora",
                  highlight: false,
                },
              ].map((plan, index) => (
                <div key={index} className="col-md-4">
                  <div className={` ${styles.pricing} card h-100 ${plan.highlight ? 'border-danger' : 'border-secondary'}`}>
                    <div className="card-body">
                      <h2 className="card-title text-center">{plan.title}</h2>
                      <p className="display-6 text-center text-dark mb-2">{plan.price}</p>
                      <p className="text-muted text-center mb-4">{plan.description}</p>
                      <ul className="list-unstyled mb-4">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="mb-2 text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-check-circle-fill me-2" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="text-center">
                        <a href='https://tally.so/r/wk7aPM' target='_blank' className={`btn ${plan.highlight ? 'btn-danger' : 'btn-outline-danger'} w-100`}>
                          {plan.cta}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        

        {/* Sección Llamada a la Acción */}
        <section className={`${styles.cta} py-5 bg-danger bg-gradient text-white`}>
          <div className="container">
            <div className="text-center">
              <h2 className="mb-3">¡Transforma Tu Gimnasio Hoy!</h2>
              <p className="lead mb-4">
                Comienza con nuestra plantilla y optimiza la gestión de tu gimnasio para maximizar ingresos y satisfacción de tus miembros.
              </p>
              <a href='https://tally.so/r/wk7aPM' target='_blank' className="btn btn-light btn-lg me-2">Comprar Ahora</a>
              <a href='#pricing' className="btn btn-outline-light btn-lg">Ver Planes</a>
            </div>
          </div>
        </section>
      </main>

      {/* Pie de Página */}
      <footer className="py-3 bg-dark bg-gradient text-white-50">
        <div className="container">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
            <p className="mb-0">© 2024 Todos los derechos reservados.</p>
            <nav>
              <a className="text-white-50 text-decoration-none me-3" href="#">Términos de Servicio</a>
              <a className="text-white-50 text-decoration-none" href="#">Política de Privacidad</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}
