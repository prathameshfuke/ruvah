import { motion, useReducedMotion } from 'framer-motion'

function BreathLine({ className = '', drawOnView = false }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={`breath-line ${className}`.trim()}
      animate={reduceMotion ? {} : { y: [0, -3, 0, 3, 0] }}
      transition={reduceMotion ? {} : { duration: 5, ease: 'easeInOut', repeat: Infinity }}
    >
      <svg viewBox="0 0 1000 44" preserveAspectRatio="none" role="presentation" aria-hidden="true">
        <motion.path
          d="M8 22 C 140 22, 180 6, 300 22 S 460 38, 560 22 S 710 8, 840 22 S 930 30, 992 22"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="4"
          initial={drawOnView || !reduceMotion ? { pathLength: 0 } : { pathLength: 1 }}
          whileInView={drawOnView ? { pathLength: 1 } : undefined}
          animate={!drawOnView ? { pathLength: 1 } : undefined}
          viewport={{ once: true, margin: '-100px' }}
          transition={reduceMotion ? { duration: 0.01 } : { duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </motion.div>
  )
}

export default BreathLine
