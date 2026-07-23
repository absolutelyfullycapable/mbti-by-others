import { Suspense } from "react";
import { SiteHeader } from "@/components/Brand";
import { ResultPageClient } from "@/components/ResultPageClient";

type Props = { params: Promise<{ token: string }> };

export default async function ResultPage({ params }: Props) {
  const { token } = await params;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-16 pt-6 sm:px-8 sm:pt-8">
      <SiteHeader subtle />
      <Suspense
        fallback={
          <p className="text-sm text-[var(--muted)]">보드를 불러오는 중…</p>
        }
      >
        <ResultPageClient token={token} />
      </Suspense>
    </main>
  );
}
