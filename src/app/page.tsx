import { SiteHeader } from "@/components/Brand";
import { HomeHero } from "@/components/HomeHero";

export default function HomePage() {
  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-5 pb-16 pt-6 sm:px-8 sm:pt-8">
      <SiteHeader />
      <HomeHero />
      <footer className="border-t border-[var(--line)] pt-6 text-xs text-[var(--muted)]">
        공유 링크는 친구에게, 결과 링크는 나만.
      </footer>
    </main>
  );
}
