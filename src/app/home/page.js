// COMPONENTS
import NavigationBar from "@/components/Nav"
import HeroContainer from "@/components/HeroContainer"
import Footer from "@/components/Footer"
import AboutMe from "@/components/AboutMe"
//IMAGES
import backgroundImage from '/public/images/p1.jpg'
//STYLES
import './styles.css'

const content = {
  title: 'En la Belleza del caos',
  subtitle: 'Desarrollador Front-end, Diseñador Gráfico y Fotógrafo de la ciudad de Caracas. Trabajando actualmente en La Pizarra del DT con React y Ruby On Rails. El diseño gráfico y la fotografía los desarrollo en un proyecto personal llamado Mixtapes de Caracas.',
  backgroundImage: backgroundImage,
  link: {
    url: '/mandalas',
    text: 'Ver más'
  }
}


const HomePage = () => {
  
  return (
    <>
      <NavigationBar />
      <HeroContainer 
        content={content} 
        backgroundImage={backgroundImage}
      />
      <AboutMe />
      <Footer />
    </>
  )
}

export default HomePage