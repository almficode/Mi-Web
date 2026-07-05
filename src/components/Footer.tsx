import Link from "next/link";
import Logo from "./Logo";
import { siteConfig } from "@/lib/site-config";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";

const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.8 10v6.4M7.8 7.6v.01M12 16.4v-3.6c0-1.4.9-2.4 2.2-2.4 1.3 0 2 .9 2 2.4v3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  x: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

export default function Footer({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const year = new Date().getFullYear();

  const links = [
    { href: `/${locale}#about`, label: dict.nav.about },
    { href: `/${locale}#services`, label: dict.nav.services },
    { href: `/${locale}#projects`, label: dict.nav.projects },
    { href: `/${locale}#pricing`, label: dict.floatingBar.pricing },
    { href: `/${locale}/blog`, label: dict.nav.blog },
  ];

  return (
    <footer className="relative overflow-hidden bg-[var(--color-dark)] pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 border-b border-[var(--color-dark-border)] pb-14 lg:grid-cols-[1.5fr_1fr_1fr]">
          <p className="font-display max-w-md text-2xl leading-tight text-[var(--color-dark-text-muted)] sm:text-3xl">
            {dict.footer.statement}
          </p>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-[var(--color-dark-text-muted)]">
              {dict.footer.linksTitle}
            </p>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-cursor="link"
                    className="font-display text-lg uppercase text-[var(--color-dark-text)] transition-colors duration-300 hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-[var(--color-dark-text-muted)]">
              {dict.footer.socialTitle}
            </p>
            <ul className="flex flex-col gap-3">
              {Object.entries(siteConfig.social).map(([key]) => (
                <li key={key}>
                  <a
                    href={siteConfig.social[key as keyof typeof siteConfig.social]}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="font-display flex items-center gap-2 text-lg uppercase text-[var(--color-dark-text)] transition-colors duration-300 hover:text-[var(--color-accent)]"
                  >
                    {socialIcons[key]}
                    {key}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mb-3 mt-8 text-xs font-medium uppercase tracking-wide text-[var(--color-dark-text-muted)]">
              {dict.footer.contactTitle}
            </p>
            <ul className="flex flex-col gap-2 text-sm text-[var(--color-dark-text)]">
              <li>
                <a href={`mailto:${siteConfig.email}`} data-cursor="link" className="hover:text-[var(--color-accent)]">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="hover:text-[var(--color-accent)]"
                >
                  +34 653 48 37 03
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-[var(--color-dark-text-muted)] sm:flex-row">
          <p>
            © {year} {dict.footer.rights}{" "}
            <Link href={`/${locale}`} className="underline decoration-[var(--color-dark-border)] underline-offset-2 hover:text-[var(--color-accent)]">
              Almficode
            </Link>
          </p>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {Object.entries(dict.legal.links).map(([slug, label]) => (
              <Link
                key={slug}
                href={`/${locale}/legal/${slug}`}
                data-cursor="link"
                className="transition-colors duration-300 hover:text-[var(--color-accent)]"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div aria-hidden className="relative -mb-4 flex items-center justify-center overflow-hidden py-4 sm:-mb-8">
        <Logo locale={locale} variant="light" className="pointer-events-none scale-[3.4] opacity-[0.06] sm:scale-[5.2]" />
      </div>
    </footer>
  );
}
