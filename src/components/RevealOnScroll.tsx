"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export default function RevealOnScroll({
  children,
  className,
  delay = 0,
  y = 32,
  once = true,
}: RevealOnScrollProps) {
  return (
    <motion.div
      className={clsx(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
