"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ResultView } from "@/components/ResultView";
import type { MbtiStat } from "@/lib/scoring";

type ResultPayload = {
  ownerName: string;
  slug: string;
  sharePath: string;
  stats: { total: number; top: MbtiStat[]; all: MbtiStat[] };
  responses: {
    id: string;
    respondentName: string;
    mbti: string;
    createdAt: string;
  }[];
};

type Latest = { mbti: string; respondentName: string };

export function ResultPageClient({ token }: { token: string }) {
  const searchParams = useSearchParams();
  const justSubmitted = searchParams.get("justSubmitted") === "1";

  const [data, setData] = useState<ResultPayload | null>(null);
  const [latest, setLatest] = useState<Latest | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (justSubmitted) {
      try {
        const raw = sessionStorage.getItem(`mbti-result-${token}`);
        if (raw) {
          const parsed = JSON.parse(raw) as {
            mbti: string;
            respondentName: string;
          };
          setLatest({
            mbti: parsed.mbti,
            respondentName: parsed.respondentName,
          });
        }
      } catch {
        /* ignore */
      }
    }

    fetch(`/api/results/${token}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "불러오기 실패");
        setData(json);
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "불러오기에 실패했습니다."),
      )
      .finally(() => setLoading(false));
  }, [token, justSubmitted]);

  if (loading) {
    return <p className="text-[var(--muted)]">결과를 불러오는 중…</p>;
  }

  if (error || !data) {
    return (
      <p className="text-[var(--coral-deep)]">
        {error || "결과 페이지를 찾을 수 없습니다."}
      </p>
    );
  }

  return (
    <ResultView
      ownerName={data.ownerName}
      sharePath={data.sharePath}
      stats={data.stats}
      responses={data.responses}
      latest={latest}
    />
  );
}
