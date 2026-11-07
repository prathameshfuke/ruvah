import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { revealContainer, revealItem, inViewViewport } from '../utils/motion'

const projects = [
  {
    id: 'restaurant-case-study',
    name: 'Hospitality Brand & Systems',
    category: 'Full Studio — Brand + Tech',
    description: 'Complete brand identity, menu design, website with SEO basics, 12 Instagram templates, online reservation system, and WhatsApp automation for a Pune restaurant.',
    link: '/case-study',
    featured: true,
  },
  {
    id: 2,
    name: 'Lifestyle & Fitness Studio',
    category: 'Brand Identity + Booking',
    description: 'Visual identity system, member booking infrastructure, and conversion-focused web presence.',
    comingSoon: true,
  },
  {
    id: 3,
    name: 'Direct-to-Consumer Brand',
    category: 'Packaging + E-Commerce',
    description: 'Packaging design, unboxing experience, and custom storefront with automated order management.',
    comingSoon: true,
  },
]

function Portfolio() {
  return (
    <div className="page page--mint">
      <section className="section-block">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={revealContainer}>
            <motion.h1 className="display display--burgundy" variants={revealItem}>
              OUR WORK
            </motion.h1>
            <motion.p className="lead" variants={revealItem}>
              A growing collection of brands and systems we&apos;ve built.
            </motion.p>
          </motion.div>

          <motion.div className="portfolio-grid" initial="hidden" whileInView="visible" variants={revealContainer} viewport={inViewViewport}>
            {projects.map((item) => (
              <motion.article key={item.id} className="portfolio-card" variants={revealItem}>
                <div className="portfolio-cover" style={{ background: item.featured ? 'var(--color-sage)' : undefined, color: 'var(--color-burgundy)' }}>
                  {item.featured ? 'Featured Case Study' : 'Coming soon'}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-burgundy)', fontWeight: 600, marginTop: '0.6rem' }}>{item.category}</p>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                {item.link ? (
                  <Link to={item.link} className="text-link" style={{ display: 'inline-block', marginTop: '0.6rem' }}>
                    View Case Study →
                  </Link>
                ) : (
                  <span style={{ fontSize: '0.85rem', opacity: 0.5, display: 'inline-block', marginTop: '0.6rem' }}>In Progress</span>
                )}
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Portfolio
