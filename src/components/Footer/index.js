import { Instagram, Twitter } from 'react-bootstrap-icons'
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




const Footer = () => {
  
  return (
    <footer className="footer d-flex align-items-center">
      <div className="container d-flex justify-content-end align-items-center">
      <span>Made with love by &#160;</span> ALESSANDROVARU <span>&#160;&copy; </span>
      <i class="fa-brands fa-square-x-twitter fa-lg m-1" style={{color: '#ffffff'}}></i>
      <i class="fa-brands fa-instagram fa-lg m-1" style={{color: '#ffffff'}}></i>
      <i class="fa-brands fa-facebook fa-lg m-1" style={{color: '#ffffff'}}></i>
      <i class="fa-brands fa-github fa-lg m-1" style={{color: '#ffffff'}}></i>
      <i class="fa-brands fa-linkedin fa-lg m-1" style={{color: '#ffffff'}}></i>
      <i class="fa-brands fa-youtube fa-lg m-1" style={{color: '#ffffff'}}></i>
      </div>
    </footer>
  )
}

export default Footer