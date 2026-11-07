import { motion, useReducedMotion } from 'framer-motion'
import BreathLine from '../components/BreathLine'
import { Button } from '../components/Button'
import { revealContainer, revealItem, inViewViewport } from '../utils/motion'

const founders = [
  {
    name: 'Kashish Oswal',
    role: 'Design Partner',
    image: '/assets/kashish.png',
    link: 'https://kashishoswal.netlify.app/',
    skills:
      'Brand identity, packaging, UI/UX, publication, social media, digital communication, menus, brochures, website design. Everything visual, built with purpose.',
  },
  {
    name: 'Prathamesh Fuke',
    role: 'Tech Partner',
    image: '/assets/prathamesh.png',
    link: 'https://prathameshfukeresume.netlify.app/',
    skills:
      'AI engineering, machine learning, full-stack development, software architecture, automation systems, booking & CRM integrations. Everything intelligent, built to scale.',
  },
]

function Founders() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="page page--mint">
      <section className="section-block">
        <div className="container">
          <motion.div className="text-center" initial="hidden" animate="visible" variants={revealContainer}>
            <motion.p className="eyebrow eyebrow--center" variants={revealItem}>
              THE TWO FOUNDERS
            </motion.p>
            <motion.h1 className="display display--burgundy" variants={revealItem}>
              TWO PEOPLE. TWO DISCIPLINES. ONE OUTPUT.
            </motion.h1>
          </motion.div>

          <BreathLine className="founders-connector" />

          <motion.div className="grid grid--two founders-grid" initial="hidden" whileInView="visible" variants={revealContainer} viewport={inViewViewport}>
            {founders.map((founder) => (
              <motion.article
                key={founder.name}
                className="card card--lilac founder-card"
                variants={revealItem}
                whileHover={reduceMotion ? {} : { y: -4, rotate: 0.5 }}
              >
                <img src={founder.image} alt={founder.name} />
                <p className="role">{founder.role}</p>
                <h2>{founder.name}</h2>
                <p>{founder.skills}</p>
                <Button href={founder.link} target="_blank" rel="noreferrer" variant="secondary">
                  View Portfolio →
                </Button>
              </motion.article>
            ))}
          </motion.div>

          <p className="founders-close">Two disciplines. One studio. Built to think.</p>
        </div>
      </section>
    </div>
  )
}

export default Founders
