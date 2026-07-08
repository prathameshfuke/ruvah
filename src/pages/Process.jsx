import { motion } from 'framer-motion'
import { revealContainer, revealItem, inViewViewport } from '../utils/motion'

const steps = [
  {
    title: 'Discover',
    description:
      'We begin with a focused discovery call to understand your business model, audience, market position, and growth bottlenecks.',
  },
  {
    title: 'Define',
    description:
      'We define the strategy: what to build, in what order, and how design and technology will support one measurable outcome.',
  },
  {
    title: 'Build',
    description:
      'Brand systems, digital assets, and technology implementation are built in one coordinated sprint cycle with clear checkpoints.',
  },
  {
    title: 'Launch + Support',
    description:
      'We launch confidently, then stay involved with optimizations, system support, and ongoing execution as your needs evolve.',
  },
]

function Process() {
  return (
    <div className="page page--plum">
      <section className="section-block section-block--plum">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={revealContainer}>
            <motion.h1 className="display display--light" variants={revealItem}>
              HOW IT WORKS?
            </motion.h1>
            <motion.p className="quote quote--light" variants={revealItem}>
              From first call to fully running — in four steps.
            </motion.p>
          </motion.div>
          <motion.div
            className="process-vertical"
            initial="hidden"
            whileInView="visible"
            variants={revealContainer}
            viewport={inViewViewport}
          >
            {steps.map((step, index) => (
              <motion.article key={step.title} className="process-item" variants={revealItem}>
                <div className="process-marker">
                  <span className="process-index">0{index + 1}</span>
                  <span className="process-node" />
                </div>
                <div className="process-content">
                  <h2>{step.title}</h2>
                  <p>{step.description}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Process
