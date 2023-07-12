import NavigationBar from "@/components/Nav"
import Image from "next/image"
import Logo from "@/images/logoName.png"
import './styles.css'
import HeroContainer from "@/components/HeroContainer"
import Footer from "@/components/Footer"

const HomePage = () => {
  return (
    <>
      <NavigationBar />
      <HeroContainer />
      <HeroContainer />
      <Footer />
    </>
  )
}

export default HomePage