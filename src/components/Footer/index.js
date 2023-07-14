import { Instagram, Twitter } from 'react-bootstrap-icons'
import './styles.css'

const Footer = () => {
  return (
    <footer className="footer d-flex align-items-center">
      <div className="container-fluid d-flex justify-content-end align-items-center">
        <span>Alessandrovaru &copy; 2023</span>
        <Instagram className='ms-3' size={16} color='white' />
        <Twitter className='ms-3' size={16} color='white' />
      </div>
    </footer>
  )
}

export default Footer