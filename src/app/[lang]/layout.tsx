import type { Metadata } from "next";
import { Geist, Boldonse } from "next/font/google";
import "../globals.css";
import { locales, isLocale, defaultLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/site-config";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FloatingBar from "@/components/FloatingBar";
import Loader from "@/components/Loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const boldonse = Boldonse({
  variable: "--font-boldonse",
  subsets: ["latin"],
  weight: "400",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.meta.title,
      template: `%s · Almficode`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${siteConfig.url}/${locale}`,
      siteName: "Almficode",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${boldonse.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
        <Loader tagline={dict.loader.tagline} />
        <LenisProvider>
          <CustomCursor />
          <Header locale={locale} dict={dict} />
          <main>{children}</main>
          <Footer dict={dict} locale={locale} />
          <WhatsAppFloat
            label={dict.whatsappFloat.label}
            message={dict.whatsappFloat.message}
          />
          <FloatingBar dict={dict} locale={locale} />
        </LenisProvider>
      </body>
    </html>
  );
}
