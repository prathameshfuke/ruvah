import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Button.css'

export function Button({
  children,
  variant = 'primary',
  className = '',
  to,
  href,
  onClick,
  target,
  rel,
  type = 'button',
}) {
  const reduceMotion = useReducedMotion()
  const classes = `btn btn-${variant} ${className}`.trim()
  const hover = reduceMotion
    ? {}
    : {
        y: -3,
        scale: 1.03,
        boxShadow: '0 14px 32px rgba(33, 1, 36, 0.2)',
      }
  const tap = reduceMotion ? {} : { scale: 0.98, y: -1 }
  const transition = reduceMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 340, damping: 22 }

  if (to) {
    return (
      <motion.div whileHover={hover} whileTap={tap} transition={transition}>
        <Link className={classes} to={to}>
          <span className="btn__text">{children}</span>
          <span className="btn__sheen" aria-hidden />
        </Link>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.div whileHover={hover} whileTap={tap} transition={transition}>
        <a className={classes} href={href} target={target} rel={rel}>
          <span className="btn__text">{children}</span>
          <span className="btn__sheen" aria-hidden />
        </a>
      </motion.div>
    )
  }

  return (
    <motion.button
      className={classes}
      onClick={onClick}
      type={type}
      whileHover={hover}
      whileTap={tap}
      transition={transition}
    >
      <span className="btn__text">{children}</span>
      <span className="btn__sheen" aria-hidden />
    </motion.button>
  )
}
