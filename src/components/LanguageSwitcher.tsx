"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { locales, type Locale } from "@/lib/i18n-config";

export default function LanguageSwitcher({
  locale,
  variant = "dark",
}: {
  locale: Locale;
  variant?: "dark" | "light";
}) {
  const pathname = usePathname();
  const isLight = variant === "light";

  const pathWithoutLocale = pathname.replace(new RegExp(`^/(${locales.join("|")})`), "") || "/";

  return (
    <div
      className={clsx(
        "flex items-center gap-1 rounded-[var(--radius-pill)] border px-1 py-1 text-xs font-medium uppercase tracking-wide",
        isLight
          ? "border-white/20 text-[var(--color-dark-text-muted)]"
          : "border-[var(--color-border)] text-[var(--color-text-muted)]"
      )}
    >
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${pathWithoutLocale}`}
          data-cursor="link"
          className={clsx(
            "rounded-[var(--radius-pill)] px-2.5 py-1 transition-colors duration-300",
            l === locale
              ? isLight
                ? "bg-white text-[var(--color-dark)]"
                : "bg-[var(--color-text-strong)] text-white"
              : "hover:text-[var(--color-accent)]"
          )}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
