import NavigationBar from '@/components/Nav'
import Head from 'next/head'
import Image from 'next/image'

export default function TemplateLanding() {

  return (
    <>
      <Head>
        {/* Título de la Página */}
        <title>Plantilla Definitiva para la Gestión de Gimnasios en Latinoamérica</title>
        
        {/* Meta Descripción */}
        <meta 
          name="description" 
          content="Impulsa tu gimnasio con nuestra plantilla completa, personalizable y fácil de usar. Perfecta para gimnasios de Entrenamiento Funcional, Artes Marciales, Crossfit, spinning y más." 
        />
        
        {/* Meta Charset */}
        <meta charSet="UTF-8" />
        
        {/* Meta Viewport para Responsividad */}
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0" 
        />
        
        {/* Open Graph Meta Tags para Redes Sociales */}
        <meta property="og:title" content="Plantilla Definitiva para la Gestión de Gimnasios en Latinoamérica" />
        <meta property="og:description" content="Impulsa tu gimnasio con nuestra plantilla completa, personalizable y fácil de usar. Perfecta para gimnasios de Entrenamiento Funcional, Artes Marciales, Crossfit, spinning y más." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alessandrovaru.com" />
        <meta property="og:image" content="https://alessandrovaru.com/images/logoName.png" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Plantilla Definitiva para la Gestión de Gimnasios en Latinoamérica" />
        <meta name="twitter:description" content="Impulsa tu gimnasio con nuestra plantilla completa, personalizable y fácil de usar. Perfecta para gimnasios de Entrenamiento Funcional, Artes Marciales, Crossfit, spinning y más." />
        <meta name="twitter:image" content="https://tu-dominio.com/images/logoName.png" />
        

      </Head>
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <NavigationBar />
      <main className="flex-grow-1">
        {/* Sección Principal */}
        <section className="py-5 py-md-7 bg-dark text-white min-vh-100 d-flex flex-column justify-content-center">
          <div className="container">
            <div className="text-center">
              <h1 className="display-4 fw-bold mb-3 display">Plantilla Definitiva para la Gestión de Gimnasios de Latinoamerica</h1>
              <p className="lead mb-4">
                Impulsa tu gimnasio con nuestra plantilla completa, personalizable y fácil de usar.
                Perfecta para gimnasios de Entrenamiento Funcional, Artes Marciales, Crossfit, spinning y más.
              </p>
              <div>
                <a href='#features' className="btn btn-danger btn-lg me-2">Comenzar</a>
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
                  title: "Gestión de Miembros",
                  description: "Interfaz fácil de usar para gestionar miembros del gimnasio, clases y suscripciones.",
                  icon: (
                    <i className="fas fa-users text-danger mb-3" style={{fontSize: 'clamp(1.5rem, 5vw, 2rem)'}}></i>
                  ),
                },
                {
                  title: "Plataforma de pagos",
                  description: "Permite a tus miembros pagar sus suscripciones y clases directamente desde la aplicación.",
                  icon: (
                    <i className="fas fa-credit-card text-danger mb-3" style={{fontSize: 'clamp(1.5rem, 5vw, 2rem)'}}></i>
                  ),
                },
                {
                  title: "Personalizable",
                  description: "Personaliza fácilmente colores, contenido y funcionalidades para que coincidan con la imagen de tu gimnasio.",
                  icon: (
                    <i className="fas fa-paint-brush text-danger mb-3" style={{fontSize: 'clamp(1.5rem, 5vw, 2rem)'}}></i>
                  ),
                },
                {
                  title: "Reservas de Clases y notificaciones push",
                  description: "Permite a tus miembros reservar clases y envía notificaciones push para mantenerlos comprometidos.",
                  icon: (
                    <i className="fas fa-bell text-danger mb-3" style={{fontSize: 'clamp(1.5rem, 5vw, 2rem)'}}></i>
                  ),
                },
                {
                  title: "Panel de Análisis de Datos",
                  description: "Visualiza datos de miembros, clases y pagos para tomar decisiones informadas y mejorar tu gimnasio.",
                  icon: (
                    <i className="fas fa-chart-line text-danger mb-3" style={{fontSize: 'clamp(1.5rem, 5vw, 2rem)'}}></i>
                  ),
                },
                {
                  title: "Soporte Técnico",
                  description: "Soporte técnico dedicado para ayudarte a configurar, personalizar y mantener tu plantilla.",
                  icon: (
                    <i className="fas fa-headset text-danger mb-3" style={{fontSize: 'clamp(1.5rem, 5vw, 2rem)'}}></i>
                  ),
                },
              ].map((feature, index) => (
                <div key={index} className="col-md-4">
                  <div className="card h-100 bg-dark text-white border-0">
                    <div className="card-body text-center">
                      {feature.icon}
                      <h4 className="card-title">{feature.title}</h4>
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
              <video
                width="320"
                height="240"
                autoPlay
                muted
                loop
                playsInline
                // controls // Opcional: Remueve esto si no necesitas controles
              >
                <source
                  src="https://firebasestorage.googleapis.com/v0/b/alessandrovaru-nextjs.appspot.com/o/videos%2Fdemo.mp4?alt=media&token=d3899a6d-d3fb-4adf-b9c1-0933c8d2d996"
                  type="video/mp4"
                />
                <track
                  src="https://firebasestorage.googleapis.com/v0/b/alessandrovaru-nextjs.appspot.com/o/videos%2Fdemo.mp4?alt=media&token=d3899a6d-d3fb-4adf-b9c1-0933c8d2d996"
                  kind="subtitles"
                  srcLang="en"
                  label="English"
                />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
            <div className="text-center">
              <a href="#pricing" className="btn btn-danger btn-lg">
                ¡Me interesa!
              </a>
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
                  description: "Cada mes (suscripción anual)",
                  features: [
                    "Todas las características de Pro y Amateur",
                    "Actualizaciones automáticas",
                    "Mantenimiento del dominio",
                    "Microsoft Clarity Analytics",
                    "Soporte prioritario",
                  ],
                  cta: "Solicitar información",
                  highlight: true,
                },
                {
                  title: "Amateur",
                  price: "$999",
                  description: "Pago único",
                  features: [
                    "Administración de clases, miembros, instructores",
                    "Página de Home personalizable",
                    "Inicio de sesión con Google OAuth",
                    "Panel de análisis",
                    "3 meses de soporte",
                  ],
                  cta: "Solicitar información",
                  highlight: false,
                },
                {
                  title: "Pro",
                  price: "$1399",
                  description: "Pago único",
                  features: [
                    "Todas las características de Amateur",
                    "Notificaciones Push",
                    "Reserva clases en línea",
                    "Plataforma de pagos (Pago móvil, zelle, etc.)",
                    "6 meses de soporte",
                  ],
                  cta: "Solicitar información",
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
                      <div className="text-center">
                        <p className="text-muted ">¿Quieres más información?</p>
                      </div>
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
                Comienza hoy con nuestra Plantilla para Gimnasio y lleva tu negocio al siguiente nivel.
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
    </>
  )
}
