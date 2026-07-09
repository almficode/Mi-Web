"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/site-config";

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  // The home hero is a dark full-screen video, so the header needs its
  // light variant there until the user scrolls (or the menu overlay opens).
  const isHome = pathname === `/${locale}`;
  const onDark = (isHome && !scrolled) || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { href: `/${locale}#about`, label: dict.nav.about },
    { href: `/${locale}#services`, label: dict.nav.services },
    { href: `/${locale}#projects`, label: dict.nav.projects },
    { href: `/${locale}#process`, label: dict.nav.process },
    { href: `/${locale}#faq`, label: dict.nav.faq },
    { href: `/${locale}/blog`, label: dict.nav.blog },
  ];

  const socials = [
    { label: "Instagram", href: siteConfig.social.instagram },
    { label: "LinkedIn", href: siteConfig.social.linkedin },
    { label: "X", href: siteConfig.social.x },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled && !menuOpen
            ? "border-b border-[var(--color-border)] bg-white/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="relative z-[60]">
            <Logo locale={locale} variant={onDark ? "light" : "dark"} />
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            data-cursor="link"
            className="relative z-[60] flex items-center gap-3 rounded-[var(--radius-pill)] border border-[var(--color-border-strong)] bg-white px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-strong)]"
          >
            {menuOpen ? dict.nav.close : dict.nav.menu}
            <span className="flex flex-col gap-[3px]">
              <span
                className={`block h-[1.6px] w-4 bg-current transition-transform duration-300 ${
                  menuOpen ? "translate-y-[4.6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.6px] w-4 bg-current transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[4.6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[var(--color-dark)] px-6 pb-10 pt-28 lg:px-10"
          >
            <nav className="flex flex-1 flex-col justify-center gap-2">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    data-cursor="link"
                    className="font-display block border-b border-[var(--color-dark-border)] py-4 text-[12vw] uppercase leading-none text-[var(--color-dark-text)] transition-colors duration-300 hover:text-[var(--color-accent)] sm:text-6xl lg:text-7xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex gap-6">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="text-sm font-medium uppercase tracking-wide text-[var(--color-dark-text-muted)] hover:text-[var(--color-accent)]"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
              <LanguageSwitcher locale={locale} variant="light" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
