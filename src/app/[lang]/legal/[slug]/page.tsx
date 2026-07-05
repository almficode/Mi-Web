import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, defaultLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { legalPages } from "@/data/legal";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    legalPages.map((page) => ({ lang, slug: page.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const page = legalPages.find((p) => p.slug === slug);
  if (!page) return {};

  return {
    title: page.title[locale],
    robots: { index: false },
    alternates: { canonical: `/${locale}/legal/${slug}` },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const page = legalPages.find((p) => p.slug === slug);

  if (!page) notFound();

  return (
    <article className="relative pt-40 pb-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <Link
          href={`/${locale}`}
          data-cursor="link"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
        >
          ← {dict.legal.backHome}
        </Link>

        <h1 className="break-words font-display text-[10vw] leading-[1.2] text-[var(--color-text-strong)] sm:text-5xl">
          {page.title[locale]}
        </h1>

        <p className="mt-8 text-lg text-[var(--color-text-muted)]">{page.intro[locale]}</p>

        <div className="mt-12 flex flex-col gap-10">
          {page.sections.map((section) => (
            <section key={section.heading[locale]}>
              <h2 className="text-xl font-semibold text-[var(--color-text-strong)]">
                {section.heading[locale]}
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                {section.paragraphs[locale].map((paragraph, i) => (
                  <p key={i} className="leading-relaxed text-[var(--color-text)]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 text-sm text-[var(--color-text-faint)]">
          {dict.legal.lastUpdated}
        </p>
      </div>
    </article>
  );
}
