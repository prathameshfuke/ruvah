import { motion } from 'framer-motion'
import { revealContainer, revealItem, inViewViewport } from '../utils/motion'

const comparisons = [
  {
    title: 'vs. Design agencies',
    copy: 'They give you a logo. We give you a logo and the system to back it up.',
  },
  {
    title: 'vs. Dev shops',
    copy: 'They build your app. We make sure it looks and feels premium doing it.',
  },
  {
    title: 'vs. Big agencies',
    copy: "They're slow and built for corporates. We're nimble and built for growth.",
  },
]

function WhyRuvah() {
  return (
    <div className="page page--plum">
      <section className="section-block section-block--plum">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={revealContainer}>
            <motion.h1 className="display display--light" variants={revealItem}>
              USP: WHY RUVAH?
            </motion.h1>
            <motion.p className="quote quote--light" variants={revealItem}>
              The only studio where your brand and your tech stack are built in the same room.
            </motion.p>
          </motion.div>

          <motion.div className="grid grid--three" initial="hidden" whileInView="visible" variants={revealContainer} viewport={inViewViewport}>
            {comparisons.map((comparison) => (
              <motion.article key={comparison.title} className="card card--sage manifesto-card" variants={revealItem}>
                <h2>{comparison.title}</h2>
                <p>{comparison.copy}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default WhyRuvah
