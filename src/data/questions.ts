export type Axis = "EI" | "SN" | "TF" | "JP";
export type Letter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export type Question = {
  number: number;
  key: string;
  /** 주어(이름+조사) 뒤에 이어 붙일 서술부 */
  text: string;
  axis: Axis;
  /** 동의(긍정)할수록 가까워지는 글자 */
  agree: Letter;
};

export const ANSWER_SCALE = [
  { value: 3, label: "매우 그렇다" },
  { value: 2, label: "다소 그렇다" },
  { value: 1, label: "그렇다" },
  { value: 0, label: "확실하지 않다" },
  { value: -1, label: "그렇지 않다" },
  { value: -2, label: "다소 그렇지 않다" },
  { value: -3, label: "전혀 그렇지 않다" },
] as const;

/**
 * 24문항 short form (축당 6)
 * 관찰 가능한 행동 중심 · 축 균형 · 타인 응답용
 */
export const QUESTIONS: Question[] = [
  { number: 1, key: "mq_0", text: "새로운 친구를 꾸준히 만드는 편이다.", axis: "EI", agree: "E" },
  { number: 2, key: "mq_41", text: "낯설고 새로운 생각이나 시각을 살펴보는 일을 즐긴다.", axis: "SN", agree: "N" },
  { number: 3, key: "mq_58", text: "정해진 기한 안에 일을 끝내는 것이 어렵다.", axis: "JP", agree: "P" },
  { number: 4, key: "mq_40", text: "직접 전화하는 것을 되도록 피한다.", axis: "EI", agree: "I" },
  { number: 5, key: "mq_17", text: "있는 그대로 말하기보다 상대를 배려하는 태도를 더 중요하게 여긴다.", axis: "TF", agree: "F" },
  { number: 6, key: "mq_3", text: "집과 일하는 공간이 깔끔하게 정리되어 있다.", axis: "JP", agree: "J" },
  { number: 7, key: "mq_15", text: "여럿이 함께하는 활동에 끼어드는 것을 즐긴다.", axis: "EI", agree: "E" },
  { number: 8, key: "mq_16", text: "아직 검증되지 않은 새로운 방식을 시험해 보는 것을 좋아한다.", axis: "SN", agree: "N" },
  { number: 9, key: "mq_12", text: "무엇을 할지 정할 때 사람들의 기분보다 객관적인 사실을 먼저 본다.", axis: "TF", agree: "T" },
  { number: 10, key: "mq_13", text: "그날그날 계획 없이 흘러가는 날이 많다.", axis: "JP", agree: "P" },
  { number: 11, key: "mq_11", text: "작품이나 창작물을 여러 방식으로 해석해 보는 대화에는 별로 관심이 없다.", axis: "SN", agree: "S" },
  { number: 12, key: "mq_20", text: "여럿이 하는 활동보다 혼자 즐기는 취미를 더 선호한다.", axis: "EI", agree: "I" },
  { number: 13, key: "mq_22", text: "감정을 조금 놓치더라도 빠르고 효율적인 결정을 더 중요하게 본다.", axis: "TF", agree: "T" },
  { number: 14, key: "mq_23", text: "쉬기 전에 먼저 해야 할 일을 끝내 두는 쪽을 택한다.", axis: "JP", agree: "J" },
  { number: 15, key: "mq_24", text: "의견이 갈릴 때 상대의 기분을 지키기보다 자기 주장이 맞음을 밝히는 데 더 힘을 쏟는다.", axis: "TF", agree: "T" },
  { number: 16, key: "mq_25", text: "모임에서는 대개 상대가 먼저 다가오기를 기다리는 편이다.", axis: "EI", agree: "I" },
  { number: 17, key: "mq_28", text: "해야 할 일을 끝까지 미뤄 두는 경우가 많다.", axis: "JP", agree: "P" },
  { number: 18, key: "mq_31", text: "이야기가 너무 추상적이고 이론적으로만 흐르면 지루해지거나 관심을 잃는다.", axis: "SN", agree: "S" },
  { number: 19, key: "mq_35", text: "주변 사람들은 활발하고 외향적인 사람이라고 말할 것이다.", axis: "EI", agree: "E" },
  { number: 20, key: "mq_37", text: "대개 감정보다 객관적인 사실을 바탕으로 결정을 내린다.", axis: "TF", agree: "T" },
  { number: 21, key: "mq_38", text: "하루 일과를 미리 짜 두는 것이 편하다.", axis: "JP", agree: "J" },
  { number: 22, key: "mq_1", text: "단순하고 바로 이해되는 아이디어보다 복잡하고 신선한 아이디어에 끌린다.", axis: "SN", agree: "N" },
  { number: 23, key: "mq_47", text: "결정할 때 가장 논리적이고 효율적인 답보다 관련된 사람들의 감정에 더 주의를 기울인다.", axis: "TF", agree: "F" },
  { number: 24, key: "mq_51", text: "추상적인 철학 물음에 깊이 빠져드는 것은 시간을 허비하는 일이라고 본다.", axis: "SN", agree: "S" },
];
