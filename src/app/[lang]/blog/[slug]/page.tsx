import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, defaultLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/lib/site-config";
import RevealText from "@/components/RevealText";
import RevealOnScroll from "@/components/RevealOnScroll";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    blogPosts.map((post) => ({ lang, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title[locale],
    description: post.excerpt[locale],
    alternates: { canonical: `/${locale}/blog/${slug}` },
    openGraph: {
      title: post.title[locale],
      description: post.excerpt[locale],
      url: `${siteConfig.url}/${locale}/blog/${slug}`,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const formatter = new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[locale],
    description: post.excerpt[locale],
    datePublished: post.date,
    author: { "@type": "Organization", name: "Almficode" },
  };

  return (
    <article className="relative pt-40 pb-28 lg:pb-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <RevealOnScroll>
          <Link
            href={`/${locale}/blog`}
            data-cursor="link"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
          >
            &#8592; {dict.blog.backToBlog}
          </Link>
        </RevealOnScroll>

        <p className="mb-6 text-xs font-medium uppercase tracking-wide text-[var(--color-accent)]">
          {post.category[locale]}
        </p>

        <RevealText
          as="h1"
          className="break-words font-display text-[11vw] leading-[1.2] text-[var(--color-text-strong)] sm:text-5xl lg:text-6xl"
        >
          {post.title[locale]}
        </RevealText>

        <div className="mt-6 flex items-center gap-4 text-sm text-[var(--color-text-faint)]">
          <span>{formatter.format(new Date(post.date))}</span>
          <span aria-hidden>&middot;</span>
          <span>
            {post.readingMinutes} {dict.blog.minutesRead}
          </span>
        </div>

        <div className="mt-14 flex flex-col gap-6">
          {post.content[locale].map((paragraph, i) => (
            <RevealOnScroll key={i} delay={Math.min(i * 0.05, 0.3)}>
              <p className="text-lg leading-relaxed text-[var(--color-text)]">
                {paragraph}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </article>
  );
}
