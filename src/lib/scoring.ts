import { QUESTIONS, type Axis, type Letter } from "@/data/questions";

export type AxisScores = Record<Axis, number>;

export type ScoreResult = {
  mbti: string;
  scores: AxisScores;
  letters: { EI: Letter; SN: Letter; TF: Letter; JP: Letter };
};

const AXIS_PAIR: Record<Axis, [Letter, Letter]> = {
  EI: ["E", "I"],
  SN: ["S", "N"],
  TF: ["T", "F"],
  JP: ["J", "P"],
};

export function scoreAnswers(answers: number[]): ScoreResult {
  if (answers.length !== QUESTIONS.length) {
    throw new Error(`답변 개수가 ${QUESTIONS.length}개가 아닙니다.`);
  }

  const scores: AxisScores = { EI: 0, SN: 0, TF: 0, JP: 0 };

  QUESTIONS.forEach((q, i) => {
    const value = answers[i] ?? 0;
    const [first] = AXIS_PAIR[q.axis];
    const direction = q.agree === first ? 1 : -1;
    scores[q.axis] += value * direction;
  });

  const letters = {
    EI: (scores.EI >= 0 ? "E" : "I") as Letter,
    SN: (scores.SN >= 0 ? "S" : "N") as Letter,
    TF: (scores.TF >= 0 ? "T" : "F") as Letter,
    JP: (scores.JP >= 0 ? "J" : "P") as Letter,
  };

  // SN 축: 점수가 S 쪽(+)이면 S, N 쪽이면 N
  // 위 로직에서 agree가 N이면 direction=-1 when first=S, so agreeing with N decreases SN → N wins when SN < 0. Good.
  // Wait: AXIS_PAIR SN is ["S","N"], first=S. agree N → direction=-1. Positive answer → SN decreases → letters SN = scores.SN >= 0 ? S : N. Good.

  const mbti = `${letters.EI}${letters.SN}${letters.TF}${letters.JP}`;

  return { mbti, scores, letters };
}

export type MbtiStat = {
  mbti: string;
  count: number;
  percent: number;
};

export function aggregateMbti(
  responses: { mbti: string }[],
): { total: number; top: MbtiStat[]; all: MbtiStat[] } {
  const total = responses.length;
  const map = new Map<string, number>();

  for (const r of responses) {
    map.set(r.mbti, (map.get(r.mbti) ?? 0) + 1);
  }

  const all: MbtiStat[] = [...map.entries()]
    .map(([mbti, count]) => ({
      mbti,
      count,
      percent: total === 0 ? 0 : Math.round((count / total) * 1000) / 10,
    }))
    .sort((a, b) => b.count - a.count || a.mbti.localeCompare(b.mbti));

  return { total, top: all.slice(0, 5), all };
}

export const MBTI_LABELS: Record<string, string> = {
  INTJ: "전략가",
  INTP: "논리술사",
  ENTJ: "통솔자",
  ENTP: "변론가",
  INFJ: "옹호자",
  INFP: "중재자",
  ENFJ: "선도자",
  ENFP: "활동가",
  ISTJ: "현실주의자",
  ISFJ: "수호자",
  ESTJ: "경영자",
  ESFJ: "집정관",
  ISTP: "장인",
  ISFP: "모험가",
  ESTP: "사업가",
  ESFP: "연예인",
};
