import { motion } from 'framer-motion'
import { revealContainer, revealItem, inViewViewport } from '../utils/motion'

const placeholders = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  name: 'Project name',
  description: 'One-line project description',
}))

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
            {placeholders.map((item) => (
              <motion.article key={item.id} className="portfolio-card" variants={revealItem}>
                <div className="portfolio-cover">Coming soon</div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <span className="text-link">View Case Study</span>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Portfolio
