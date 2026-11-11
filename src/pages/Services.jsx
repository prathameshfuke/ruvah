import { motion, useReducedMotion } from 'framer-motion'
import { revealContainer, revealItem, inViewViewport } from '../utils/motion'

const servicePillars = [
  {
    title: 'Brand',
    items: ['Brand strategy', 'Logo and identity systems', 'Packaging and publication design', 'Social media templates'],
  },
  {
    title: 'Digital',
    items: ['UI/UX design', 'Website design and content architecture', 'Landing pages and conversion assets', 'Digital campaigns'],
  },
  {
    title: 'Tech Systems',
    items: ['Full-stack product builds', 'AI automation workflows', 'Booking and CRM integrations', 'Analytics and support systems'],
  },
]

const workModels = [
  {
    title: 'Full Studio — Brand + Digital + Tech',
    tag: 'Our Best Work',
    emphasis: true,
    description:
      'Everything built together — identity, website, and intelligent systems that all speak the same language. This is where RUVAH shines.',
    chips: [
      'Brand Identity',
      'UI/UX',
      'AI automation',
      'Booking systems',
      'Social design',
      'Website development',
    ],
  },
  {
    title: 'Design Only — Just the Creative Side',
    description:
      'You need brand, design, and digital communication — without the tech systems. We handle everything visual, beautifully and completely.',
    chips: ['Brand identity', 'Logo', 'Packaging', 'Publication', 'UI/UX', 'Social templates'],
  },
  {
    title: 'Tech Only — Just the Intelligent Side',
    description:
      'You already have a brand. You need tech — AI tools, automation, a website, or a system built for scale. We build it precisely.',
    chips: ['CRM & booking', 'AI integration', 'Automation', 'ML solutions', 'Full-stack dev'],
  },
]

function Services() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="page page--mint">
      <section className="section-block">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={revealContainer}>
            <motion.h1 className="display display--burgundy" variants={revealItem}>
              WHAT WE DO?
            </motion.h1>
            <motion.p className="lead" variants={revealItem}>
              Service Pillars — Three ways we grow your business.
            </motion.p>
            <motion.div className="grid grid--three" variants={revealContainer}>
              {servicePillars.map((pillar) => (
                <motion.article key={pillar.title} className="card card--sage" variants={revealItem}>
                  <h2>{pillar.title}</h2>
                  <ul className="list">
                    {pillar.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section-block section-block--tight-top">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" variants={revealContainer} viewport={inViewViewport}>
            <motion.h2 className="display display--burgundy" variants={revealItem}>
              HOW WE WORK WITH YOU
            </motion.h2>
            <motion.div className="grid grid--three work-model-grid" variants={revealContainer}>
              {workModels.map((model, index) => (
                <motion.article
                  key={model.title}
                  className={`card work-model-card ${model.emphasis ? 'work-model-card--emphasis' : 'work-model-card--lavender'}`}
                  variants={revealItem}
                  whileHover={reduceMotion ? {} : { y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {model.tag ? <span className="ribbon">{model.tag}</span> : null}
                  <h3>{model.title}</h3>
                  {model.description && <p style={{ fontSize: '0.9rem', margin: '0.6rem 0 1rem', opacity: 0.75, lineHeight: 1.6 }}>{model.description}</p>}
                  <div className="pill-wrap">
                    {model.chips.map((chip) => (
                      <span key={`${chip}-${index}`} className="pill">
                        {chip}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </motion.div>
            <motion.p className="closing-line" variants={revealItem}>
              Whether it&apos;s brand alone, tech alone, or both — RUVAH delivers with the same depth, the same
              standard, and the same partnership mindset.<br />No half-measures.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services
