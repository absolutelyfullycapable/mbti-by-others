import Link from "next/link";

export function BrandMark({
  href = "/",
  size = "sm",
  asLink = true,
}: {
  href?: string;
  size?: "sm" | "lg" | "hero";
  asLink?: boolean;
}) {
  const sizeClass =
    size === "hero"
      ? "text-[clamp(4.5rem,16vw,7.5rem)] leading-none"
      : size === "lg"
        ? "text-4xl leading-none"
        : "text-[1.75rem] leading-none";

  const className = `font-bold text-[var(--ink)] ${sizeClass}`;
  const style = { fontFamily: "var(--font-brand)" } as const;

  const content = (
    <>
      남BTI
      <span className="ml-1 font-normal tracking-normal text-[0.55em] text-[var(--ink)]">
        ෆ ͙˚˖
      </span>
    </>
  );

  if (!asLink) {
    return (
      <span className={`inline-flex items-baseline ${className}`} style={style}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-baseline ${className}`}
      style={style}
    >
      {content}
    </Link>
  );
}

export function SiteHeader({ subtle }: { subtle?: boolean }) {
  return (
    <header
      className={`flex items-center justify-between ${
        subtle ? "mb-8" : "mb-0"
      }`}
    >
      <BrandMark />
      <span className="hidden text-[11px] text-[var(--muted)] sm:block">
        남이 보는 내 MBTI
      </span>
    </header>
  );
}
