import clsx from "clsx";

type MarqueeProps = {
  items: string[];
  variant?: "default" | "giant" | "dark";
};

export default function Marquee({ items, variant = "default" }: MarqueeProps) {
  const doubled = [...items, ...items, ...items, ...items];

  if (variant === "giant" || variant === "dark") {
    return (
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track gap-10">
          {doubled.map((item, i) => (
            <span
              key={i}
              className={clsx(
                "font-display flex items-center gap-10 whitespace-nowrap text-[22vw] uppercase leading-none sm:text-[13rem] lg:text-[17rem]",
                variant === "dark"
                  ? "text-[var(--color-dark-surface)]"
                  : "text-[var(--color-border-strong)]"
              )}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="marquee-mask overflow-hidden border-y border-[var(--color-border)] py-6">
      <div className="marquee-track gap-10">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-lg font-medium text-[var(--color-text-muted)] sm:text-2xl"
          >
            {item}
            <span aria-hidden className="text-[var(--color-accent)]">
              &#10022;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
