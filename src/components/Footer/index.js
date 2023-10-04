import './styles.css'

const Footer = () => {
  return (
    <footer className="footer d-flex align-items-center">
      <div className="container d-flex justify-content-end align-items-center">
        <span>Made with love by &#160;</span> ALESSANDROVARU <span>&#160;&copy; </span>
        <a href="https://instagram.com/alessandrovaru" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-instagram fa-lg m-1" style={{color: '#ffffff'}}></i>
        </a>
        <a href="https://facebook.com/alessandrovaru" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-facebook fa-lg m-1" style={{color: '#ffffff'}}></i>
        </a>
        <a href="https://youtube.com/@alessandrovaru" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-youtube fa-lg m-1" style={{color: '#ffffff'}}></i>
        </a>
        <a href="https://twitter.com/alessandrovaru" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-square-x-twitter fa-lg m-1" style={{color: '#ffffff'}}></i>
        </a>
        <a href="https://github.com/alessandrovaru" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github fa-lg m-1" style={{color: '#ffffff'}}></i>
        </a>
        <a href="https://linkedin.com/in/alessandrovaru" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-linkedin fa-lg m-1" style={{color: '#ffffff'}}></i>
        </a>
      </div>
    </footer>
  )
}

export default Footer
