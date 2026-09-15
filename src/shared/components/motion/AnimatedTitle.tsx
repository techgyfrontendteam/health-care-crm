"use client";

import { motion, useReducedMotion } from "framer-motion";

interface AnimatedTitleProps {
  title: string;
  className?: string;
}

export function AnimatedTitle({ title, className }: AnimatedTitleProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.h1
      data-word-title
      className={className}
      aria-label={title}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.065 } },
      }}
    >
      {title.split(/\s+/).map((word, index) => (
        <motion.span
          aria-hidden="true"
          className="mr-[0.28em] inline-block last:mr-0"
          key={`${word}-${index}`}
          variants={{
            hidden: { opacity: 0, filter: "blur(9px)", y: 8 },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: { duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
