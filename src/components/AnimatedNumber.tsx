"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

export default function AnimatedNumber({ value }: { value: string }) {
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const count = useMotionValue(0);
  const target = match ? parseInt(match[2], 10) : 0;
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, target, { duration: 1.1, ease: [0.11, 0.85, 0.2, 1] });
    return () => controls.stop();
  }, [isInView, target, count]);

  if (!match) {
    return <span ref={ref}>{value}</span>;
  }

  const [, prefix, , suffix] = match;

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
