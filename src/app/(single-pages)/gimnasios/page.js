import NavigationBar from '@/components/Nav'
import Image from 'next/image'

export default function TemplateLanding() {

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <NavigationBar />
      <main className="flex-grow-1">
        {/* Sección Principal */}
        <section className="py-5 py-md-7 bg-dark text-white min-vh-100 d-flex flex-column justify-content-center">
          <div className="container">
            <div className="text-center">
              <h1 className="display-4 fw-bold mb-3">Plantilla Definitiva para la Gestión de Gimnasios de Latinoamerica</h1>
              <p className="lead mb-4">
                Impulsa tu negocio de artes marciales con nuestra plantilla completa, personalizable y fácil de usar.
                Perfecta para gimnasios de Entrenamiento Funcional, Artes Marciales, Crossfit y más.
              </p>
              <div>
                <a href='https://tally.so/r/wk7aPM' target='_blank' className="btn btn-danger btn-lg me-2">Comenzar</a>
                <a href='#demo' className="btn btn-outline-light btn-lg">Ver Demostración</a>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Características */}
        <section id="features" className="py-5 bg-secondary">
          <div className="container">
            <h2 className="text-center mb-5">Características de la Plantilla</h2>
            <div className="row g-4">
              {[
                {
                  title: "Diseño Responsivo",
                  description: "Diseño totalmente responsivo que se ve genial en dispositivos de escritorio, tablet y móviles.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-lightning-charge text-danger mb-3" viewBox="0 0 16 16">
                      <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
                    </svg>
                  ),
                },
                {
                  title: "Gestión de Miembros",
                  description: "Interfaz fácil de usar para gestionar miembros del gimnasio, clases y suscripciones.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-people text-danger mb-3" viewBox="0 0 16 16">
                      <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                    </svg>
                  ),
                },
                {
                  title: "Personalizable",
                  description: "Personaliza fácilmente colores, contenido y funcionalidades para que coincidan con la imagen de tu gimnasio.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-gear text-danger mb-3" viewBox="0 0 16 16">
                      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292A1.873 1.873 0 0 1 13.06 4.377l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 1 13.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 1 2.692-1.115l.094-.319z"/>
                    </svg>
                  ),
                },
                {
                  title: "Integración con Firebase",
                  description: "Conexión fluida con Firebase para servicios backend como autenticación y gestión de bases de datos con Firestore.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-fire text-danger mb-3" viewBox="0 0 16 16">
                      <path d="M8 16s4-3.59 4-8c0-3.5-3-7-3-7S6 4.5 6 8c0 4.41 4 8 4 8z"/>
                    </svg>
                  ),
                },
                {
                  title: "Next.js 14 y React Moderno",
                  description: "Aprovecha las últimas características de Next.js 14 y React v18 para una experiencia de usuario fluida y escalable.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-speedometer2 text-danger mb-3" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3.793l2.146 2.147a.5.5 0 1 1-.708.708L8.5 8.707V4.5A.5.5 0 0 1 8 4z"/>
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8z"/>
                    </svg>
                  ),
                },
                {
                  title: "Rutas API Seguras",
                  description: "Rutas API protegidas con Firebase, permitiendo funcionalidades como la obtención y actualización de datos de forma segura.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-lock-fill text-danger mb-3" viewBox="0 0 16 16">
                      <path d="M8 1a3 3 0 0 1 3 3v3H5V4a3 3 0 0 1 3-3z"/>
                      <path d="M3.5 7V4a4.5 4.5 0 0 1 9 0v3h1.5A1.5 1.5 0 0 1 15 8.5v6A1.5 1.5 0 0 1 13.5 16h-11A1.5 1.5 0 0 1 1 14.5v-6A1.5 1.5 0 0 1 2.5 7H3.5zM6 7V4a2 2 0 0 1 4 0v3H6z"/>
                    </svg>
                  ),
                },
              ].map((feature, index) => (
                <div key={index} className="col-md-4">
                  <div className="card h-100 bg-dark text-white border-0">
                    <div className="card-body text-center">
                      {feature.icon}
                      <h3 className="card-title h5">{feature.title}</h3>
                      <p className="card-text">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección Demostración */}
        <section id="demo" className="py-5">
          <div className="container">
            <h2 className="text-center mb-5">Míralo en Acción</h2>
            <div className="ratio ratio-16x9 mb-4">
            <video width="320" height="240" controls preload="none" autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/alessandrovaru-nextjs.appspot.com/o/videos%2Fdemo.mp4?alt=media&token=d3899a6d-d3fb-4adf-b9c1-0933c8d2d996" type="video/mp4" />
              <track
                src="https://firebasestorage.googleapis.com/v0/b/alessandrovaru-nextjs.appspot.com/o/videos%2Fdemo.mp4?alt=media&token=d3899a6d-d3fb-4adf-b9c1-0933c8d2d996"
                kind="subtitles"
                srcLang="en"
                label="English"
              />
              Your browser does not support the video tag.
            </video>
            </div>
            <div className="text-center">
              <a href='#pricing' className="btn btn-danger btn-lg">¡Me interesa!</a>
            </div>
          </div>
        </section>

        {/* Sección Precios */}
        <section id="pricing" className="py-5 bg-dark">
          <div className="container">
            <h2 className="text-center mb-5">Precios Simples y Transparentes</h2>
            <div className="row g-4 justify-content-center">
              {[
                {
                  title: "Legendario",
                  price: "$99",
                  description: "Pago mensual",
                  features: [
                    "Diseño responsivo",
                    "Gestión de miembros",
                    "Programación de clases",
                    "Soporte y actualizaciones en todo momento",
                    "All time support",
                  ],
                  cta: "Elige Suscripción",
                  highlight: true,
                },
                {
                  title: "Amateur",
                  price: "$999",
                  description: "Pago único",
                  features: [
                    "Gestión de miembros",
                    "Administración de clases, miembros e instructores",
                    "Página de aterrizaje personalizable",
                    "Inicio de sesión con Google OAuth",
                    "3 meses de soporte",
                  ],
                  cta: "Elige Amateur",
                  highlight: false,
                },
                {
                  title: "Pro",
                  price: "$1399",
                  description: "Pago único",
                  features: [
                    "Todas las características de Amateur",
                    "Notificaciones Push",
                    "Reserva de clases",
                    "Panel de análisis",
                    "6 meses de soporte",
                  ],
                  cta: "Elige Pro",
                  highlight: false,
                },
              ].map((plan, index) => (
                <div key={index} className="col-md-4">
                  <div className={`card h-100 ${plan.highlight ? 'border-danger' : ''}`}>
                    <div className="card-body">
                      <h3 className="card-title text-center">{plan.title}</h3>
                      <div className="display-6 text-center mb-2">{plan.price}</div>
                      <p className="text-muted text-center mb-4 text-secondary">{plan.description}</p>
                      <ul className="list-unstyled mb-4">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="mb-2 text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <a href='https://tally.so/r/wk7aPM' target='_blank' className={`btn ${plan.highlight ? 'btn-danger' : 'btn-outline-danger'} w-100`}>
                        {plan.cta}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección Llamada a la Acción */}
        <section className="py-5 bg-danger text-white">
          <div className="container">
            <div className="text-center">
              <h2 className="mb-3">¿Listo para Transformar Tu Gimnasio?</h2>
              <p className="lead mb-4">
                Comienza hoy con nuestra Plantilla para Gimnasios MMA y lleva tu negocio de artes marciales al siguiente nivel.
              </p>
              <a href='https://tally.so/r/wk7aPM' target='_blank' className="btn btn-light btn-lg me-2">Comprar Ahora</a>
              
            </div>
          </div>
        </section>
      </main>

      {/* Pie de Página */}
      <footer className="py-3 bg-dark text-white-50">
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
  )
}
