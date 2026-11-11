import { motion } from 'framer-motion'
import { Button } from '../components/Button'
import { revealContainer, revealItem } from '../utils/motion'

/* ─── TODO: Replace with your real Cal.com / Calendly link ─── */
const BOOKING_URL = 'https://cal.com/ruvah'

function Contact() {
  return (
    <div className="page page--mint">
      <section className="section-block section-block--contact">
        <div className="container container--narrow">
          <motion.div className="text-center" initial="hidden" animate="visible" variants={revealContainer}>
            <motion.h1 className="display display--burgundy" variants={revealItem}>
              LET&apos;S BUILD SOMETHING THAT THINKS.
            </motion.h1>
            <motion.a className="contact-email" href="mailto:ruvah.work@gmail.com" variants={revealItem}>
              ruvah.work@gmail.com
            </motion.a>
            <motion.p className="body-copy" variants={revealItem}>
              Based in Pune, India. Working with clients everywhere.
            </motion.p>
            <motion.div variants={revealItem} className="cta-actions">
              <Button href={BOOKING_URL} target="_blank" rel="noreferrer" variant="primary">
                Book a 30-Minute Discovery Call
              </Button>
            </motion.div>
            <motion.p className="contact-microcopy" variants={revealItem}>
              No commitment, no brief needed — just a conversation about your business and what you want to build.
            </motion.p>
          </motion.div>
          {/* Cal.com / Calendly inline embed — replace the src below with your real embed URL */}
          <motion.div className="schedule-card" initial="hidden" whileInView="visible" variants={revealItem} viewport={{ once: true }}>
            <p style={{ fontWeight: 600, marginBottom: '0.6rem' }}>📅 Pick a time that works for you</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
              Click the button above to open our scheduling page, or{' '}
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" style={{ color: 'var(--color-burgundy)', textDecoration: 'underline' }}>
                book directly here
              </a>.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
