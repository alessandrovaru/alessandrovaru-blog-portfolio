import'./styles.css'

const HeroContainer = () => {
  return (
    <div className="hero-container container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1>Bienvenido a mi sitio web</h1>
          <p>Este es un sitio web creado con Next.js y Bootstrap</p>
          <button className="btn btn-primary">Ver Mandalas</button>
        </div>
      </div>
    </div>
  )
}

export default HeroContainer