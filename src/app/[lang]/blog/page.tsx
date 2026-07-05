import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, defaultLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { blogPosts } from "@/data/blog";
import RevealText from "@/components/RevealText";
import RevealOnScroll from "@/components/RevealOnScroll";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: dict.blog.title,
    description: dict.blog.subtitle,
    alternates: { canonical: `/${locale}/blog` },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  const formatter = new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative pt-40 pb-28 lg:pb-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <RevealOnScroll>
            <p className="mb-6 text-xs font-medium uppercase tracking-wide text-[var(--color-accent)]">
              {dict.blog.eyebrow}
            </p>
          </RevealOnScroll>
          <RevealText
            as="h1"
            className="break-words font-display text-[10vw] leading-[1.2] text-[var(--color-text-strong)] sm:text-5xl lg:text-6xl"
          >
            {dict.blog.title}
          </RevealText>
          <RevealOnScroll delay={0.15}>
            <p className="mt-6 text-lg text-[var(--color-text-muted)]">
              {dict.blog.subtitle}
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <RevealOnScroll key={post.slug} delay={i * 0.08}>
              <Link
                href={`/${locale}/blog/${post.slug}`}
                data-cursor="link"
                data-cursor-label={dict.blog.readMore}
                className="group flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-7 transition-colors duration-300 hover:border-[var(--color-accent)]"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-accent)]">
                  {post.category[locale]}
                </span>
                <h2 className="mt-4 text-xl font-semibold text-[var(--color-text-strong)]">
                  {post.title[locale]}
                </h2>
                <p className="mt-3 flex-1 text-sm text-[var(--color-text-muted)]">
                  {post.excerpt[locale]}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-5 text-xs text-[var(--color-text-faint)]">
                  <span>{formatter.format(new Date(post.date))}</span>
                  <span>
                    {post.readingMinutes} {dict.blog.minutesRead}
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
