import clsx from "clsx";
import Link from "next/link";

type LogoProps = {
  locale: string;
  variant?: "dark" | "light";
  className?: string;
};

export default function Logo({ locale, variant = "dark", className }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href={`/${locale}`}
      className={clsx("group inline-flex items-center gap-2.5", className)}
      data-cursor="link"
      aria-label="Almficode — inicio"
    >
      <svg
        width="30"
        height="22"
        viewBox="0 0 40 28"
        fill="none"
        className="shrink-0 transition-transform duration-500 group-hover:scale-110"
        aria-hidden
      >
        <circle cx="14" cy="14" r="13" stroke="var(--color-accent)" strokeWidth="2.4" />
        <circle cx="26" cy="14" r="13" stroke="var(--color-accent)" strokeWidth="2.4" fill={isLight ? "var(--color-dark)" : "white"} />
      </svg>
      <span
        className={clsx(
          "font-display text-[17px] leading-none",
          isLight ? "text-[var(--color-dark-text)]" : "text-[var(--color-text-strong)]"
        )}
      >
        Alm<span className="text-[var(--color-accent)]">fi</span>code
      </span>
    </Link>
  );
}
