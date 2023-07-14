import Link from 'next/link'
import'./styles.css'



const HeroContainer = (props) => {
  return (
    <div 
      className="hero-container"
      style={{
        backgroundImage: `url(${props.backgroundImage.src})`,
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12">
            <h1>{props.homeContent.title}</h1>
            <p>{props.homeContent.subtitle}</p>
            <Link href={props.homeContent.link.url} >
              <button className="btn btn-light">{props.homeContent.link.text}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroContainer