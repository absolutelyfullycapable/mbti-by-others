"use client";

import { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { MBTI_LABELS, type MbtiStat } from "@/lib/scoring";

type Props = {
  ownerName: string;
  sharePath: string;
  stats: { total: number; top: MbtiStat[]; all: MbtiStat[] };
  responses: {
    id: string;
    respondentName: string;
    mbti: string;
    createdAt: string;
  }[];
  latest?: {
    mbti: string;
    respondentName: string;
  } | null;
};

export function ResultView({
  ownerName,
  sharePath,
  stats,
  responses,
  latest,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const highlightMbti = latest?.mbti ?? stats.top[0]?.mbti ?? "————";
  const label = MBTI_LABELS[highlightMbti] ?? "대기 중";

  const saveImage = useCallback(async () => {
    if (!cardRef.current) return;
    setSaving(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      const a = document.createElement("a");
      a.download = `${ownerName}-mbti-${highlightMbti}.png`;
      a.href = dataUrl;
      a.click();
    } finally {
      setSaving(false);
    }
  }, [ownerName, highlightMbti]);

  async function copyShare() {
    const url = `${window.location.origin}${sharePath}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="anim-rise space-y-10">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
          Result · Stats
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
          {ownerName}님을
          <br />
          사람들은 이렇게 봐요
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {stats.total === 0
            ? "아직 응답이 없어요. 링크를 공유해 보세요."
            : `지금까지 ${stats.total}명이 응답했어요.`}
        </p>
      </div>

      <div
        ref={cardRef}
        className="border border-[var(--line)] bg-white p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            {latest ? (
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                {latest.respondentName} → {ownerName}
              </p>
            ) : (
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                {stats.total === 0 ? "응답 대기" : "가장 많이 나온 유형"}
              </p>
            )}
            <p
              className="mt-3 text-5xl tracking-[0.08em] sm:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {highlightMbti}
            </p>
            <p className="mt-2 inline-block bg-[var(--accent)] px-2 py-0.5 text-base font-medium">
              {label}
            </p>
          </div>
          <p
            className="inline-flex items-baseline text-[1.35rem] font-bold leading-none text-[var(--ink)]"
            style={{ fontFamily: "var(--font-brand)" }}
          >
            남BTI
            <span className="ml-1 text-[0.55em] font-normal text-[var(--ink)]">
              ෆ ͙˚˖
            </span>
          </p>
        </div>

        {stats.top.length > 0 && (
          <div className="mt-10 space-y-4 border-t border-[var(--line)] pt-8">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
              Top 5 MBTI
            </p>
            {stats.top.map((row, i) => (
              <div key={row.mbti} className="space-y-1.5">
                <div className="flex items-baseline justify-between text-sm">
                  <span>
                    <span className="mr-3 font-mono text-[11px] text-[var(--muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <strong
                      className="tracking-wide"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {row.mbti}
                    </strong>
                    <span className="ml-2 text-[var(--muted)]">
                      {MBTI_LABELS[row.mbti] ?? ""}
                    </span>
                  </span>
                  <span className="tabular-nums text-[var(--muted)]">
                    {row.percent}% · {row.count}
                  </span>
                </div>
                <div className="h-[3px] overflow-hidden bg-[var(--soft)]">
                  <div
                    className="stat-bar h-full bg-[var(--accent)]"
                    style={{
                      width: `${Math.max(row.percent, row.percent === 0 ? 0 : 3)}%`,
                      animationDelay: `${i * 0.08}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={saveImage}
          disabled={saving}
          className="btn-primary"
        >
          {saving ? "저장 중…" : "이미지로 저장"}
        </button>
        <button type="button" onClick={copyShare} className="btn-ghost">
          {copied ? "링크 복사됨" : "공유 링크 복사"}
        </button>
      </div>

      {responses.length > 0 && (
        <div className="border-t border-[var(--line)] pt-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
            Recent
          </p>
          <ul className="mt-4 space-y-0">
            {[...responses]
              .reverse()
              .slice(0, 20)
              .map((r) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between gap-3 border-b border-[var(--line)] py-3 text-sm"
                >
                  <span className="truncate text-[var(--muted)]">
                    {r.respondentName}
                  </span>
                  <span
                    className="font-bold tracking-wide"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {r.mbti}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
