import { motion } from "framer-motion";

/**
 * BlurText — animates each word or character from blurred → sharp on scroll.
 * Props:
 *   text        : string
 *   delay       : ms between each word/char (default 120)
 *   animateBy   : "words" | "chars" (default "words")
 *   direction   : "top" | "bottom" (default "top")
 *   className   : extra className on the wrapper span
 *   style       : extra style on the wrapper span
 *   onAnimationComplete : called when all children finish
 */
export default function BlurText({
  text = "",
  delay = 120,
  animateBy = "words",
  direction = "top",
  className = "",
  style = {},
  onAnimationComplete,
}) {
  const units =
    animateBy === "words"
      ? text.split(" ").map((w, i, arr) => (i < arr.length - 1 ? w + "\u00A0" : w))
      : text.split("");

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const wordVariant = {
    hidden: {
      opacity: 0,
      filter: "blur(14px)",
      y: direction === "top" ? -22 : 22,
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      onAnimationComplete={onAnimationComplete}
      className={className}
      style={{ display: "inline", ...style }}
    >
      {units.map((unit, i) => (
        <motion.span
          key={i}
          variants={wordVariant}
          style={{ display: "inline-block" }}
        >
          {unit}
        </motion.span>
      ))}
    </motion.span>
  );
}
