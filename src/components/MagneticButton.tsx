"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  fullWidth?: boolean;
} & (
  | ({ as?: "button" } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: "a" } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
);

export default function MagneticButton({
  children,
  className,
  strength = 0.35,
  fullWidth = false,
  as = "button",
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 200, mass: 0.4 });
  const springY = useSpring(y, { damping: 15, stiffness: 200, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = (as === "a" ? "a" : "button") as "a" | "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={fullWidth ? "block w-full" : "inline-block"}
      data-cursor="link"
    >
      <Tag
        className={clsx(
          "group relative flex items-center justify-center overflow-hidden rounded-[var(--radius-pill)] px-8 py-4 text-sm font-medium uppercase tracking-wide transition-colors duration-300",
          fullWidth && "w-full",
          className
        )}
        {...(rest as React.HTMLAttributes<HTMLElement>)}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
