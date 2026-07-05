"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

type RevealTextProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  splitBy?: "lines" | "words";
  delay?: number;
  start?: string;
};

export default function RevealText({
  children,
  as: Tag = "h2",
  className,
  splitBy = "lines",
  delay = 0,
  start = "top 85%",
}: RevealTextProps) {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const split = new SplitType(el, {
      types: splitBy === "lines" ? "lines,words" : "words",
      lineClass: "reveal-line",
      wordClass: "reveal-word",
    });

    const targets = splitBy === "lines" ? split.words : split.words;

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return () => split.revert();
    }

    gsap.set(targets, { opacity: 0, y: "110%" });

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        y: "0%",
        duration: 1,
        ease: "power4.out",
        stagger: 0.025,
        delay,
        scrollTrigger: {
          trigger: el,
          start,
        },
      });
    }, el);

    return () => {
      ctx.revert();
      split.revert();
    };
  }, [children, splitBy, delay, start]);

  return (
    <Tag ref={ref as never} className={clsx("overflow-hidden", className)}>
      {children}
    </Tag>
  );
}
