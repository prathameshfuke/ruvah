import { motion } from 'framer-motion'
import { revealContainer, revealItem, inViewViewport } from '../utils/motion'

const industries = [
  'Cafes & restaurants',
  'Hotels & hostels',
  'Gyms & fitness',
  'Local fashion brands',
  'Student startups',
  'Real estate agencies',
  'Cloud kitchens',
  'B2C brands',
]

function Industries() {
  return (
    <div className="page page--mint">
      <section className="section-block">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={revealContainer}>
            <motion.h1 className="display display--burgundy" variants={revealItem}>
              WHO WE WORK WITH?
            </motion.h1>
            <motion.p className="lead" variants={revealItem}>
              Built for businesses that want to grow — not just look good.
            </motion.p>
          </motion.div>
          <motion.div className="grid grid--two" initial="hidden" whileInView="visible" variants={revealContainer} viewport={inViewViewport}>
            <motion.article className="card card--lavender" variants={revealItem}>
              <h2>Industries served</h2>
              <ul className="list">
                {industries.map((industry) => (
                  <li key={industry}>{industry}</li>
                ))}
              </ul>
            </motion.article>
            <motion.article className="fit-block" variants={revealItem}>
              <h2>You&apos;re a fit if</h2>
              <p>
                You&apos;re a business owner or team that wants identity, digital execution, and operational tech to
                move together. You value speed with depth, clear communication, and a studio that stays close beyond
                delivery.
              </p>
            </motion.article>
          </motion.div>

          <motion.div className="client-strip" initial="hidden" whileInView="visible" variants={revealContainer} viewport={inViewViewport}>
            {[1, 2, 3, 4].map((slot) => (
              <motion.div key={slot} className="client-strip__placeholder" variants={revealItem}>
                Client logo / photo placeholder
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Industries
