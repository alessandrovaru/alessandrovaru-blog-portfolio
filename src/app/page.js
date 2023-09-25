import HeroContainer from '@/components/HeroContainer'

import logo from "/public/images/logoName.png";

import background from "/public/images/p3.jpg";

import HomeSlider from '@/components/HomeSlider';

export default function Home() {
  return (
    // <HeroContainer 
    //   logo={logo}
    //   title="Alessandrovaru"
    //   subtitle="La belleza en el caos"
    //   description="Alessandrovaru es un proyecto de arte digital en el que expreso una parte de mí y de mi visión del mundo."
    //   background={background}
    //   menu={[
    //     {
    //       name: "Sesiones",
    //       url: "/sesiones",
    //     },
    //     {
    //       name: "Visiones",
    //       url: "/visiones",
    //     },
    //     {
    //       name: "Mixtapes de Caracas",
    //       url: "/poemas",
    //     },
    //     {
    //       name: "Mandalas",
    //       url: "/mandalas",
    //     },
    //     {
    //       name: "Github",
    //       url: "/poemas",
    //     },
    //     {
    //       name: "Linkedin",
    //       url: "/poemas",
    //     },
    //     {
    //       name: "Youtube",
    //       url: "/poemas",
    //     },
    //     {
    //       name: "¿Quién soy?",
    //       url: "/poemas",
    //     },
    //   ]}
    // /> 
    <>
      <HomeSlider />
    </>
  )
}
