import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { revealContainer, revealItem, inViewViewport } from '../utils/motion'

const values = [
  'Design and technology are planned together from day one.',
  'Every output must be useful, measurable, and business-led.',
  'Partnership over handoff — we stay accountable after launch.',
]

function About() {
  return (
    <div className="page page--mint">
      <section className="section-block">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={revealContainer}>
            <motion.h1 className="display display--burgundy" variants={revealItem}>
              WHO WE ARE?
            </motion.h1>
            <motion.p className="lead lead--bold" variants={revealItem}>
              One studio. Design + Tech. Built together.
            </motion.p>
            <motion.p className="body-copy" variants={revealItem}>
              Ruvah is a Pune-based B2B creative-tech studio helping businesses grow through connected brand systems,
              digital execution, and technology infrastructure. We build identity and implementation in one room, so
              every decision is coherent from first impression to final workflow.
            </motion.p>
            <motion.aside className="callout callout--sage" variants={revealItem}>
              <h2>The Name</h2>
              <p>
                Ruvah comes from Hebrew roots that evoke breath, spirit, and an invisible force that moves things.
                That idea shapes our work: quiet precision, strong momentum, one continuous output.
              </p>
            </motion.aside>
          </motion.div>
        </div>
      </section>

      <section className="section-block section-block--tight-top">
        <div className="container">
          <motion.div className="grid grid--three" initial="hidden" whileInView="visible" variants={revealContainer} viewport={inViewViewport}>
            <motion.article className="card card--lavender" variants={revealItem}>
              <h3>VISION</h3>
              <p>
                To become the trusted growth studio for modern businesses that need brand and technology moving in the
                same direction.
              </p>
            </motion.article>
            <motion.article className="card card--lavender" variants={revealItem}>
              <h3>MISSION</h3>
              <p>
                To deliver integrated creative-tech systems that help clients attract better leads, operate smoothly,
                and scale with clarity.
              </p>
            </motion.article>
            <motion.article className="card card--lavender" variants={revealItem}>
              <h3>VALUE</h3>
              <ul className="list">
                {values.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </motion.article>
          </motion.div>
        </div>
      </section>

      <section className="section-block section-block--tight-top">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" variants={revealContainer} viewport={inViewViewport}>
            <motion.h2 className="display display--burgundy" variants={revealItem}>
              THE TWO FOUNDERS
            </motion.h2>
            <motion.div className="grid grid--two" variants={revealContainer}>
              <motion.article className="card card--lilac founder-strip-card" variants={revealItem}>
                <img src="/assets/kashish.png" alt="Kashish Oswal" />
                <p className="role">Design Partner</p>
                <p>Brand systems and visual direction built to communicate clearly and convert consistently.</p>
              </motion.article>
              <motion.article className="card card--lilac founder-strip-card" variants={revealItem}>
                <img src="/assets/prathamesh.png" alt="Prathamesh Fuke" />
                <p className="role">Tech Partner</p>
                <p>AI and engineering systems built for dependable operations, scale, and measurable outcomes.</p>
              </motion.article>
            </motion.div>
            <motion.p className="founder-link-wrap" variants={revealItem}>
              <Link className="text-link" to="/founders">
                Full bios + portfolios →
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
