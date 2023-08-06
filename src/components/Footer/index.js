import { Instagram, Twitter } from 'react-bootstrap-icons'
import './styles.css'

const Footer = () => {
  return (
    <footer className="footer d-flex align-items-center">
      <div className="container d-flex justify-content-end align-items-center">
      <span>Made with love by &#160;</span> ALESSANDROVARU <span>&#160;&copy; </span>
        <Instagram className='ms-3' size={16} color='white' />
        <Twitter className='ms-3' size={16} color='white' /> 
      </div>
    </footer>
  )
}

export default Footer