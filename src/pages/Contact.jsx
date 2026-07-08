import { motion } from 'framer-motion'
import { Button } from '../components/Button'
import { revealContainer, revealItem } from '../utils/motion'

function Contact() {
  return (
    <div className="page page--mint">
      <section className="section-block section-block--contact">
        <div className="container container--narrow">
          <motion.div className="text-center" initial="hidden" animate="visible" variants={revealContainer}>
            <motion.h1 className="display display--burgundy" variants={revealItem}>
              LET&apos;S BUILD SOMETHING THAT THINKS.
            </motion.h1>
            <motion.a className="contact-email" href="mailto:ruvah.work@outlook.com" variants={revealItem}>
              ruvah.work@outlook.com
            </motion.a>
            <motion.p className="body-copy" variants={revealItem}>
              Based in Pune, India. Working with clients everywhere.
            </motion.p>
            <motion.div variants={revealItem}>
              <Button href="mailto:ruvah.work@outlook.com?subject=30-Minute%20Discovery%20Call" variant="primary">
                Book a 30-Minute Discovery Call
              </Button>
            </motion.div>
            <motion.p className="contact-microcopy" variants={revealItem}>
              No commitment, no brief needed — just a conversation about your business and what you want to build.
            </motion.p>
          </motion.div>
          <motion.div className="schedule-card" initial="hidden" whileInView="visible" variants={revealItem} viewport={{ once: true }}>
            <p>Scheduling embed placeholder (Calendly or equivalent)</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
