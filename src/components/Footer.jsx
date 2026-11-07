import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Who We Are', to: '/about' },
  { label: 'What We Do', to: '/services' },
  { label: 'Process', to: '/process' },
  { label: 'Founders', to: '/founders' },
  { label: 'Work', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
]

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__top">
          <NavLink className="site-logo site-logo--footer" to="/" aria-label="Ruvah home">
            <img src="/assets/ruvah_without_bg.png" alt="Ruvah" />
          </NavLink>
          <nav className="site-footer__nav" aria-label="Footer">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="site-footer__meta">
          <a href="mailto:ruvah.work@outlook.com">ruvah.work@outlook.com</a>
          <p>Based in Pune, India.</p>
        </div>
        <p className="site-footer__copy">© {new Date().getFullYear()} Ruvah. Brands that think.</p>
      </div>
    </footer>
  )
}

export default Footer
