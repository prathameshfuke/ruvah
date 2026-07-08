import { NavLink } from 'react-router-dom'
import { Button } from './Button'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Who We Are', to: '/about' },
  { label: 'What We Do', to: '/services' },
  { label: 'Process', to: '/process' },
  { label: 'Founders', to: '/founders' },
  { label: 'Work', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
]

function Navbar({ dark = false }) {
  return (
    <header className={`site-navbar ${dark ? 'site-navbar--dark' : ''}`}>
      <div className="container site-navbar__inner">
        <NavLink className="site-logo" to="/" aria-label="Ruvah home">
          <img src="/assets/ruvah_without_bg.png" alt="Ruvah" />
        </NavLink>
        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink key={link.to} className="site-nav__link" to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Button className="site-navbar__cta" to="/contact" variant={dark ? 'secondary-light' : 'primary'}>
          Book a Call
        </Button>
      </div>
    </header>
  )
}

export default Navbar
