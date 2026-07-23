"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ANSWER_SCALE, QUESTIONS } from "@/data/questions";
import { formatQuestion } from "@/lib/josa";

const PAGE_SIZE = 6;

type Props = {
  slug: string;
  ownerName: string;
};

export function TestForm({ slug, ownerName }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<"intro" | "quiz">("intro");
  const [respondentName, setRespondentName] = useState("");
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => Array(QUESTIONS.length).fill(null),
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const totalPages = Math.ceil(QUESTIONS.length / PAGE_SIZE);
  const slice = useMemo(
    () => QUESTIONS.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [page],
  );

  const pageComplete = slice.every((q) => answers[q.number - 1] !== null);
  const answeredCount = answers.filter((a) => a !== null).length;

  function setAnswer(index: number, value: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function goToPage(next: number) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    if (answers.some((a) => a === null)) {
      setError("모든 문항에 답해 주세요.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/tests/${slug}/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          respondentName: respondentName.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "제출 실패");

      sessionStorage.setItem(
        `mbti-result-${data.resultToken}`,
        JSON.stringify({
          mbti: data.mbti,
          scores: data.scores,
          respondentName: data.respondentName,
          ownerName: data.ownerName,
          stats: data.stats,
        }),
      );
      router.push(`/r/${data.resultToken}?justSubmitted=1`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "제출에 실패했습니다.");
      setSubmitting(false);
    }
  }

  if (step === "intro") {
    return (
      <div className="anim-rise max-w-md space-y-10">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
            {ownerName}님 테스트
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            닉네임을 남겨 주세요
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)]">
            결과에 표시될 이름이에요. 비우면 (익명)으로 남아요.
            <br />
            답변은 {ownerName}님 통계에 합쳐져요.
          </p>
        </div>

        <label className="block">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
            닉네임 · 선택
          </span>
          <input
            value={respondentName}
            onChange={(e) => setRespondentName(e.target.value)}
            placeholder="비우면 (익명)"
            maxLength={20}
            className="input-line mt-3 text-lg"
          />
        </label>

        <button
          type="button"
          onClick={() => setStep("quiz")}
          className="btn-primary w-full sm:w-auto sm:min-w-[200px]"
        >
          24문항 시작
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-5 sm:max-w-none sm:space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
            {ownerName} · {answeredCount}/{QUESTIONS.length}
          </p>
          <div className="mt-3 h-[3px] w-full max-w-xs overflow-hidden bg-[var(--soft)]">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-300"
              style={{
                width: `${(answeredCount / QUESTIONS.length) * 100}%`,
              }}
            />
          </div>
        </div>
        <p
          className="shrink-0 text-sm font-bold tabular-nums"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {page + 1}/{totalPages}
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {slice.map((q) => {
          const idx = q.number - 1;
          const selected = answers[idx];
          return (
            <fieldset
              key={q.key}
              className="min-w-0 overflow-hidden border-t border-[var(--line)] pt-3.5 sm:pt-5"
            >
              <legend className="float-left mb-3 w-full text-[14px] font-medium leading-snug sm:mb-4 sm:text-[15px] sm:leading-relaxed">
                <span className="mr-2 font-mono text-[11px] text-[var(--muted)]">
                  {String(q.number).padStart(2, "0")}
                </span>
                {formatQuestion(ownerName, q.text)}
              </legend>
              <div className="clear-both mt-1 flex w-full min-w-0 items-center justify-between gap-2 sm:mt-2 sm:gap-3">
                <span className="shrink-0 text-[10px] leading-tight text-[var(--muted)] sm:text-[11px]">
                  그렇다
                </span>
                <div className="flex min-w-0 flex-1 items-center justify-between px-1 sm:flex-none sm:justify-center sm:gap-5 sm:px-0">
                  {ANSWER_SCALE.map((opt) => {
                    const size =
                      Math.abs(opt.value) === 3
                        ? "h-9 w-9 sm:h-11 sm:w-11"
                        : Math.abs(opt.value) === 2
                          ? "h-[1.875rem] w-[1.875rem] sm:h-9 sm:w-9"
                          : Math.abs(opt.value) === 1
                            ? "h-6.5 w-6.5 sm:h-8 sm:w-8"
                            : "h-4.5 w-4.5 sm:h-6 sm:w-6";
                    const checkSize =
                      Math.abs(opt.value) === 3
                        ? "h-3.5 w-3.5 sm:h-4 sm:w-4"
                        : Math.abs(opt.value) === 2
                          ? "h-3 w-3 sm:h-3.5 sm:w-3.5"
                          : Math.abs(opt.value) === 1
                            ? "h-2.5 w-2.5 sm:h-3 sm:w-3"
                            : "h-2 w-2 sm:h-2.5 sm:w-2.5";
                    const isOn = selected === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        title={opt.label}
                        aria-label={opt.label}
                        onClick={() => setAnswer(idx, opt.value)}
                        className={`${size} inline-flex shrink-0 items-center justify-center rounded-full border-2 transition ${
                          isOn
                            ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--ink)]"
                            : "border-[var(--ink)]/25 bg-transparent text-transparent hover:border-[var(--ink)]"
                        }`}
                      >
                        <svg
                          className={checkSize}
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M3.5 8.2L6.4 11.2L12.5 4.5"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    );
                  })}
                </div>
                <span className="shrink-0 text-[10px] leading-tight text-[var(--muted)] sm:text-[11px]">
                  그렇지 않다
                </span>
              </div>
            </fieldset>
          );
        })}
      </div>

      {error && <p className="text-sm text-[var(--ink)]">{error}</p>}

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          disabled={page === 0}
          onClick={() => goToPage(page - 1)}
          className="btn-ghost"
        >
          이전
        </button>
        {page < totalPages - 1 ? (
          <button
            type="button"
            disabled={!pageComplete}
            onClick={() => goToPage(page + 1)}
            className="btn-primary flex-1"
          >
            다음
          </button>
        ) : (
          <button
            type="button"
            disabled={!pageComplete || submitting}
            onClick={submit}
            className="btn-primary flex-1"
          >
            {submitting ? "결과 계산 중…" : "결과 보기"}
          </button>
        )}
      </div>
    </div>
  );
}
