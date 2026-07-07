"use client";

import { useEffect, useRef } from "react";

/**
 * "Plano digital": wireframes de interfaces web flotando en profundidad,
 * unidos por una red neuronal con pulsos de luz — webs naciendo dentro
 * de una IA. Todo dibujado en vivo, nunca se repite igual.
 */

type CardKind = "browser" | "button" | "chat" | "image";

type Card = {
  kind: CardKind;
  x: number;
  y: number;
  w: number;
  depth: number; // 0 lejos … 1 cerca
  sway: number;
  color: string;
};

type Node = { x: number; y: number; pulsePhase: number };
type Link = { a: number; b: number; pulses: { t: number; speed: number }[] };

const CARD_KINDS: CardKind[] = ["browser", "button", "chat", "image", "browser", "chat"];
const COLORS = ["255,255,255", "255,73,37", "0,153,255", "255,139,117"];

export default function HeroBlueprintCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let cards: Card[] = [];
    let nodes: Node[] = [];
    let links: Link[] = [];

    const spawnCard = (fromBottom: boolean): Card => {
      const depth = 0.25 + Math.random() * 0.75;
      return {
        kind: CARD_KINDS[Math.floor(Math.random() * CARD_KINDS.length)],
        x: Math.random() * width,
        y: fromBottom ? height + 120 : Math.random() * height,
        w: (90 + Math.random() * 130) * depth,
        depth,
        sway: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    };

    const setup = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cards = Array.from({ length: width < 640 ? 8 : 13 }, () => spawnCard(false));

      // neural field
      const nodeCount = width < 640 ? 22 : 38;
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        pulsePhase: Math.random() * Math.PI * 2,
      }));
      links = [];
      const maxDist = Math.min(width, height) * 0.28;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.hypot(dx, dy) < maxDist) {
            links.push({ a: i, b: j, pulses: [] });
          }
        }
      }
    };
    setup();
    window.addEventListener("resize", setup);

    const stroke = (color: string, alpha: number, lw: number) => {
      ctx.strokeStyle = `rgba(${color},${alpha})`;
      ctx.lineWidth = lw;
    };

    const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.stroke();
    };

    const drawCard = (card: Card, time: number) => {
      const alpha = 0.1 + card.depth * 0.3;
      const swayX = Math.sin(time * 0.00035 + card.sway) * 14 * card.depth;
      const x = card.x + swayX;
      const y = card.y;
      const w = card.w;
      stroke(card.color, alpha, card.depth > 0.6 ? 1.4 : 1);

      if (card.kind === "browser") {
        const h = w * 0.72;
        roundRect(x, y, w, h, 8);
        ctx.beginPath();
        ctx.moveTo(x, y + h * 0.18);
        ctx.lineTo(x + w, y + h * 0.18);
        ctx.stroke();
        for (let d = 0; d < 3; d++) {
          ctx.beginPath();
          ctx.arc(x + 10 + d * 9, y + h * 0.09, 2, 0, Math.PI * 2);
          ctx.stroke();
        }
        // content lines
        ctx.beginPath();
        ctx.moveTo(x + w * 0.12, y + h * 0.38);
        ctx.lineTo(x + w * 0.68, y + h * 0.38);
        ctx.moveTo(x + w * 0.12, y + h * 0.52);
        ctx.lineTo(x + w * 0.5, y + h * 0.52);
        ctx.stroke();
        roundRect(x + w * 0.12, y + h * 0.64, w * 0.26, h * 0.16, 6);
      } else if (card.kind === "button") {
        const h = w * 0.28;
        roundRect(x, y, w, h, h / 2);
        ctx.beginPath();
        ctx.moveTo(x + w * 0.2, y + h / 2);
        ctx.lineTo(x + w * 0.62, y + h / 2);
        ctx.stroke();
        // arrow
        ctx.beginPath();
        ctx.moveTo(x + w * 0.72, y + h / 2);
        ctx.lineTo(x + w * 0.82, y + h / 2);
        ctx.moveTo(x + w * 0.78, y + h * 0.36);
        ctx.lineTo(x + w * 0.82, y + h / 2);
        ctx.lineTo(x + w * 0.78, y + h * 0.64);
        ctx.stroke();
      } else if (card.kind === "chat") {
        const h = w * 0.5;
        roundRect(x, y, w, h, 10);
        // tail
        ctx.beginPath();
        ctx.moveTo(x + w * 0.16, y + h);
        ctx.lineTo(x + w * 0.1, y + h + w * 0.09);
        ctx.lineTo(x + w * 0.28, y + h);
        ctx.stroke();
        // typing dots
        for (let d = 0; d < 3; d++) {
          ctx.beginPath();
          const bob = Math.sin(time * 0.004 + d * 0.9 + card.sway) * 2;
          ctx.arc(x + w * (0.3 + d * 0.2), y + h * 0.5 + bob, 2.4 * card.depth + 1, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else {
        const h = w * 0.66;
        roundRect(x, y, w, h, 8);
        // mountain / image glyph
        ctx.beginPath();
        ctx.moveTo(x + w * 0.15, y + h * 0.78);
        ctx.lineTo(x + w * 0.4, y + h * 0.42);
        ctx.lineTo(x + w * 0.58, y + h * 0.62);
        ctx.lineTo(x + w * 0.72, y + h * 0.46);
        ctx.lineTo(x + w * 0.88, y + h * 0.78);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x + w * 0.72, y + h * 0.26, w * 0.05, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const step = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#141414";
      ctx.fillRect(0, 0, width, height);

      // faint drifting dot grid
      const grid = 64;
      const offset = (time * 0.006) % grid;
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      for (let gx = -grid; gx < width + grid; gx += grid) {
        for (let gy = -grid; gy < height + grid; gy += grid) {
          ctx.fillRect(gx + offset * 0.4, gy + offset, 1.4, 1.4);
        }
      }

      // neural links + traveling pulses
      for (const link of links) {
        const a = nodes[link.a];
        const b = nodes[link.b];
        stroke("255,255,255", 0.05, 1);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        if (link.pulses.length < 1 && Math.random() < 0.0015) {
          link.pulses.push({ t: 0, speed: 0.003 + Math.random() * 0.004 });
        }
        link.pulses = link.pulses.filter((pulse) => {
          pulse.t += pulse.speed * 16;
          if (pulse.t >= 1) return false;
          const px = a.x + (b.x - a.x) * pulse.t;
          const py = a.y + (b.y - a.y) * pulse.t;
          const glow = ctx.createRadialGradient(px, py, 0, px, py, 14);
          const c = Math.random() < 0.5 ? "255,73,37" : "0,153,255";
          glow.addColorStop(0, `rgba(${c},0.8)`);
          glow.addColorStop(1, `rgba(${c},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(px, py, 14, 0, Math.PI * 2);
          ctx.fill();
          return true;
        });
      }

      // nodes breathing softly
      for (const node of nodes) {
        const breathe = 0.5 + Math.sin(time * 0.0012 + node.pulsePhase) * 0.5;
        ctx.fillStyle = `rgba(255,255,255,${0.12 + breathe * 0.2})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.6 + breathe, 0, Math.PI * 2);
        ctx.fill();
      }

      // floating wireframe UI cards (far first, near last)
      const sorted = [...cards].sort((a, b) => a.depth - b.depth);
      for (const card of sorted) {
        card.y -= 0.12 + card.depth * 0.3;
        drawCard(card, time);
        if (card.y < -160) Object.assign(card, spawnCard(true));
      }

      rafId = requestAnimationFrame(step);
    };

    if (prefersReducedMotion) {
      // one static, fully-composed frame
      step(0);
      cancelAnimationFrame(rafId);
    } else {
      rafId = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setup);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" aria-hidden />;
}
