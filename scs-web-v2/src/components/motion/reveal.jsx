"use client";

import { motion, useReducedMotion } from "motion/react";

const tags = { div: motion.div, li: motion.li, section: motion.section, article: motion.article };

export function Reveal({ children, className, delay = 0, y = 20, as = "div", ...props }) {
  const reduce = useReducedMotion();
  const Component = tags[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...props}
    >
      {children}
    </Component>
  );
}
