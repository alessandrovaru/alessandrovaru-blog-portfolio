import Nav from "@/components/Nav"
import Image from "next/image"
import Logo from "@/images/logo.png"

const HomePage = () => {
  return (
    <>
      <Nav />
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1>Bienvenido a mi sitio web</h1>
            <p>Este es un sitio web creado con Next.js y Bootstrap</p>
            <button className="btn btn-primary">Ver Mandalas</button>
          </div>
          <div className="col-md-6">
            <Image
              src={Logo}
              alt="Mandalas"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage