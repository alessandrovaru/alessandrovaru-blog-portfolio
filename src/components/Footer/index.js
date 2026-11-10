import { Instagram, Facebook, Youtube, TwitterX, Github, Linkedin } from 'react-bootstrap-icons'
import './styles.css'

const SOCIAL = [
  { href: 'https://instagram.com/alessandrovaru', label: 'Instagram', Icon: Instagram },
  { href: 'https://facebook.com/alessandrovaru', label: 'Facebook', Icon: Facebook },
  { href: 'https://youtube.com/@alessandrovaru', label: 'YouTube', Icon: Youtube },
  { href: 'https://x.com/alessandrovaru', label: 'X (Twitter)', Icon: TwitterX },
  { href: 'https://github.com/alessandrovaru', label: 'GitHub', Icon: Github },
  { href: 'https://linkedin.com/in/alessandrovaru', label: 'LinkedIn', Icon: Linkedin },
]

const Footer = () => {
  return (
    <footer className="footer d-flex align-items-center">
      <div className="container d-flex justify-content-end align-items-center">
        <span>Made with love by &#160;</span> ALESSANDROVARU <span>&#160;&copy; </span>
        {SOCIAL.map(({ href, label, Icon }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
            <Icon className="m-1" size={16} color="#000" aria-hidden="true" />
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
