"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type AboutCardProps = {
  index: number;
  title: string;
  description: string;
};

export default function AboutCard({ index, title, description }: AboutCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { damping: 18, stiffness: 220 });
  const springY = useSpring(y, { damping: 18, stiffness: 220 });
  const rotateX = useTransform(springY, [0, 1], [10, -10]);
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);
  const accent = index % 2 === 0 ? "var(--color-accent)" : "var(--color-accent-2)";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.85, rotate: index % 2 === 0 ? -4 : 4 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor="link"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-7 shadow-[var(--shadow-soft)] transition-colors duration-300 hover:border-[var(--color-accent)]"
      >
        <span
          className="mb-4 block text-2xl font-display transition-transform duration-500 group-hover:scale-110"
          style={{ color: accent }}
        >
          0{index + 1}
        </span>
        <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-strong)]">{title}</h3>
        <p className="text-sm text-[var(--color-text-muted)]">{description}</p>

        <div
          className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
          style={{ background: accent }}
        />
      </motion.div>
    </motion.div>
  );
}
