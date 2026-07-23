/** 한글 받침 여부로 은/는 선택. 비한글은 모음 끝이면 는, 아니면 은. */
export function hasBatchim(word: string): boolean {
  const trimmed = word.trim();
  if (!trimmed) return false;
  const last = trimmed[trimmed.length - 1];
  const code = last.charCodeAt(0);

  if (code >= 0xac00 && code <= 0xd7a3) {
    return (code - 0xac00) % 28 !== 0;
  }

  return !/[aeiouAEIOUwWyY]$/.test(last);
}

export function topicParticle(name: string): "은" | "는" {
  return hasBatchim(name) ? "은" : "는";
}

export function objectParticle(name: string): "을" | "를" {
  return hasBatchim(name) ? "을" : "를";
}

/** 예: 커서 + 는 → "커서는" */
export function withTopicParticle(name: string): string {
  const n = name.trim() || "이 사람";
  return `${n}${topicParticle(n)}`;
}

export function withObjectParticle(name: string): string {
  const n = name.trim() || "이 사람";
  return `${n}${objectParticle(n)}`;
}

export function formatQuestion(name: string, predicate: string): string {
  return `${withTopicParticle(name)} ${predicate}`;
}
