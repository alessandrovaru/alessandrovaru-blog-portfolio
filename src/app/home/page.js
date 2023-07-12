import NavigationBar from "@/components/Nav"
import Image from "next/image"
import Logo from "@/images/logoName.png"
import './styles.css'
import HeroContainer from "@/components/HeroContainer"
import Footer from "@/components/Footer"
import AboutMe from "@/components/AboutMe"

const HomePage = () => {
  return (
    <>
      <NavigationBar />
      <HeroContainer />
      <AboutMe />
      <Footer />
    </>
  )
}

export default HomePage