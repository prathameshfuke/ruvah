import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa6'
import { revealContainer, revealItem, inViewViewport } from '../utils/motion'

const deliverables = [
  'Complete brand identity — logo, colors, typography, brand guidelines',
  'Menu design — print + digital QR version',
  'Website — designed, built, and live with SEO basics',
  'Instagram profile setup with 12 content templates',
  'Online reservation system integrated into the website',
  'WhatsApp automation for booking confirmations and review requests',
]

const galleryImages = Array.from({ length: 17 }, (_, index) => {
  const serial = `${index + 1}`.padStart(4, '0')
  return `/assets/case-study/Ruvah Deck_page-${serial}.jpg`
})

function CaseStudy() {
  return (
    <div className="page page--mint">
      <section className="section-block">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={revealContainer}>
            <motion.h1 className="display display--burgundy" variants={revealItem}>
              CASE STUDY / SAMPLE WORK
            </motion.h1>
            <motion.p className="lead" variants={revealItem}>
              What a full Ruvah project looks like.
            </motion.p>
            <motion.p className="body-copy" variants={revealItem}>
              Example: a restaurant in Pune comes to us wanting to grow their dine-in and online orders.
            </motion.p>
          </motion.div>

          <motion.article
            className="card card--sage checklist-card"
            initial="hidden"
            whileInView="visible"
            variants={revealContainer}
            viewport={inViewViewport}
          >
            <h2>Project Deliverables</h2>
            <ul className="checklist">
              {deliverables.map((item) => (
                <motion.li key={item} variants={revealItem}>
                  <FaCheck />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.article>

          <motion.div
            className="gallery-grid"
            initial="hidden"
            whileInView="visible"
            variants={revealContainer}
            viewport={inViewViewport}
          >
            {galleryImages.map((src, index) => (
              <motion.figure key={src} className="gallery-card" variants={revealItem}>
                <img src={src} alt={`Ruvah deck visual ${index + 1}`} loading="lazy" />
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CaseStudy
