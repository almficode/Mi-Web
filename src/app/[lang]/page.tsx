import { isLocale, defaultLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/site-config";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Services from "@/components/Services";
import Metrics from "@/components/Metrics";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Almficode",
    description: dict.meta.description,
    url: `${siteConfig.url}/${locale}`,
    email: siteConfig.email,
    areaServed: "ES",
    sameAs: Object.values(siteConfig.social).filter((url) => url !== "#"),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero dict={dict} locale={locale} />
      <Projects dict={dict} locale={locale} />
      <Services dict={dict} />
      <About dict={dict} />
      <Metrics dict={dict} />
      <Process dict={dict} />
      <Pricing dict={dict} />
      <FAQ dict={dict} />
      <CTA dict={dict} />
    </>
  );
}
