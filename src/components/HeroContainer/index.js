import Link from 'next/link'
import'./styles.css'

import Image from 'next/image';



const HeroContainer = (props) => {
  return (
    <div 
      className="hero-container"
      style={{
        backgroundImage: `url(${props.background.src})`,
      }}
    >
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">{props.title}</h1>
          <h2 className="hero-subtitle">{props.subtitle}</h2>
          <p className="hero-description">{props.description}</p>
          {props.menu && (
            <div className="hero-menu">
              {props.menu.map((item, index) => (
                <Link href={item.url} key={index}>
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeroContainer