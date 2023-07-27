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
            <h1>{props.content.title}</h1>
            <p>{props.content.subtitle}</p>
            <Link href={props.content.link.url} >
              <button className="btn btn-light">{props.content.link.text}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroContainer