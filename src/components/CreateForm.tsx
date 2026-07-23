"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

type Created = {
  sharePath: string;
  resultPath: string;
  ownerName: string;
};

export function CreateForm({ intro }: { intro?: ReactNode }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState<Created | null>(null);
  const [copied, setCopied] = useState<"share" | "result" | null>(null);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "생성 실패");
      setCreated({
        sharePath: data.sharePath,
        resultPath: data.resultPath,
        ownerName: data.ownerName,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "생성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function copy(kind: "share" | "result", path: string) {
    const url = `${window.location.origin}${path}`;
    await navigator.clipboard.writeText(url);
    setCopied(kind);
    setTimeout(() => setCopied(null), 1800);
  }

  if (created) {
    return (
      <div className="anim-rise space-y-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
            Link ready
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            {created.ownerName}님의 테스트
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            공유 링크는 주변에, 결과 링크는 안전하게 보관하세요.
          </p>
        </div>

        <LinkBlock
          label="Share"
          title="친구에게 보낼 링크"
          origin={origin}
          path={created.sharePath}
          copied={copied === "share"}
          onCopy={() => copy("share", created.sharePath)}
          actionLabel="미리보기"
          onAction={() => router.push(created.sharePath)}
        />

        <LinkBlock
          label="Private"
          title="결과 · 통계 전용"
          origin={origin}
          path={created.resultPath}
          copied={copied === "result"}
          onCopy={() => copy("result", created.resultPath)}
          actionLabel="결과 열기"
          onAction={() => router.push(created.resultPath)}
          emphasize
        />
      </div>
    );
  }

  return (
    <>
      {intro}
      <form onSubmit={onSubmit} className="anim-rise-delay-2 mt-12 space-y-8">
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
            내 이름
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            maxLength={20}
            required
            className="input-line mt-3"
            autoComplete="nickname"
          />
        </label>
        {error && <p className="text-sm text-[var(--ink)]">{error}</p>}
        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="btn-primary w-full sm:w-auto sm:min-w-[220px]"
        >
          {loading ? "만드는 중…" : "테스트 링크 만들기"}
        </button>
      </form>
    </>
  );
}

function LinkBlock({
  label,
  title,
  origin,
  path,
  copied,
  onCopy,
  actionLabel,
  onAction,
  emphasize,
}: {
  label: string;
  title: string;
  origin: string;
  path: string;
  copied: boolean;
  onCopy: () => void;
  actionLabel: string;
  onAction: () => void;
  emphasize?: boolean;
}) {
  return (
    <div
      className={`border-t pt-5 ${
        emphasize ? "border-[var(--accent)]" : "border-[var(--line)]"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
          {label}
        </p>
        <p className="text-sm font-medium">{title}</p>
      </div>
      <p className="mt-3 break-all font-mono text-xs leading-relaxed text-[var(--muted)]">
        {origin}
        {path}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={onCopy} className="btn-primary px-4 py-2.5 text-sm">
          {copied ? "복사됨" : "복사"}
        </button>
        <button type="button" onClick={onAction} className="btn-ghost px-4 py-2.5 text-sm">
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
