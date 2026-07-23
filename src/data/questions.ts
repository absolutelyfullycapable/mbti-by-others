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

/** 재작성 문항 + MBTI 4축 매핑 */
export const QUESTIONS: Question[] = [
  { number: 1, key: "mq_0", text: "새로운 친구를 꾸준히 만드는 편이다.", axis: "EI", agree: "E" },
  { number: 2, key: "mq_41", text: "낯설고 새로운 생각이나 시각을 살펴보는 일을 즐긴다.", axis: "SN", agree: "N" },
  { number: 3, key: "mq_27", text: "감정적으로 격해진 말다툼에도 쉽게 흔들리지 않는다.", axis: "TF", agree: "T" },
  { number: 4, key: "mq_58", text: "정해진 기한 안에 일을 끝내는 것이 어렵다.", axis: "JP", agree: "P" },
  { number: 5, key: "mq_39", text: "불안해하는 일이 거의 없다.", axis: "EI", agree: "E" },
  { number: 6, key: "mq_40", text: "직접 전화하는 것을 되도록 피한다.", axis: "EI", agree: "I" },
  { number: 7, key: "mq_29", text: "옳고 그름이 엇갈리는 문제에 대해 이야기 나누는 것을 즐긴다.", axis: "SN", agree: "N" },
  { number: 8, key: "mq_17", text: "있는 그대로 말하기보다 상대를 배려하는 태도를 더 중요하게 여긴다.", axis: "TF", agree: "F" },
  { number: 9, key: "mq_3", text: "집과 일하는 공간이 깔끔하게 정리되어 있다.", axis: "JP", agree: "J" },
  { number: 10, key: "mq_54", text: "심한 압박을 자주 느낀다.", axis: "TF", agree: "F" },
  { number: 11, key: "mq_15", text: "여럿이 함께하는 활동에 끼어드는 것을 즐긴다.", axis: "EI", agree: "E" },
  { number: 12, key: "mq_16", text: "아직 검증되지 않은 새로운 방식을 시험해 보는 것을 좋아한다.", axis: "SN", agree: "N" },
  { number: 13, key: "mq_12", text: "무엇을 할지 정할 때 사람들의 기분보다 객관적인 사실을 먼저 본다.", axis: "TF", agree: "T" },
  { number: 14, key: "mq_13", text: "그날그날 계획 없이 흘러가는 날이 많다.", axis: "JP", agree: "P" },
  { number: 15, key: "mq_14", text: "남들이 자신을 어떻게 볼지 거의 신경 쓰지 않는다.", axis: "EI", agree: "E" },
  { number: 16, key: "mq_10", text: "관심이 생기는 사람에게 먼저 말을 거는 일이 부담스럽지 않다.", axis: "EI", agree: "E" },
  { number: 17, key: "mq_11", text: "작품이나 창작물을 여러 방식으로 해석해 보는 대화에는 별로 관심이 없다.", axis: "SN", agree: "S" },
  { number: 18, key: "mq_7", text: "수치나 통계보다 사람의 사연과 감정에 더 깊이 와닿는다.", axis: "TF", agree: "F" },
  { number: 19, key: "mq_18", text: "새로운 지식과 경험을 찾아 나서는 편이다.", axis: "SN", agree: "N" },
  { number: 20, key: "mq_19", text: "일이 잘못될까 봐 자주 근심한다.", axis: "JP", agree: "J" },
  { number: 21, key: "mq_20", text: "여럿이 하는 활동보다 혼자 즐기는 취미를 더 선호한다.", axis: "EI", agree: "I" },
  { number: 22, key: "mq_21", text: "소설을 쓰는 일로 생계를 이어가는 모습은 떠올리기 어렵다.", axis: "SN", agree: "S" },
  { number: 23, key: "mq_22", text: "감정을 조금 놓치더라도 빠르고 효율적인 결정을 더 중요하게 본다.", axis: "TF", agree: "T" },
  { number: 24, key: "mq_23", text: "쉬기 전에 먼저 해야 할 일을 끝내 두는 쪽을 택한다.", axis: "JP", agree: "J" },
  { number: 25, key: "mq_24", text: "의견이 갈릴 때 상대의 기분을 지키기보다 자기 주장이 맞음을 밝히는 데 더 힘을 쏟는다.", axis: "TF", agree: "T" },
  { number: 26, key: "mq_25", text: "모임에서는 대개 상대가 먼저 다가오기를 기다리는 편이다.", axis: "EI", agree: "I" },
  { number: 27, key: "mq_26", text: "기분이 아주 빠르게 바뀌는 순간이 있다.", axis: "TF", agree: "F" },
  { number: 28, key: "mq_2", text: "사실만으로 구성된 주장보다 마음에 와닿는 이야기가 더 설득력 있게 느껴진다.", axis: "TF", agree: "F" },
  { number: 29, key: "mq_28", text: "해야 할 일을 끝까지 미뤄 두는 경우가 많다.", axis: "JP", agree: "P" },
  { number: 30, key: "mq_6", text: "할 일을 잘 정리하고 우선순위를 매겨, 기한보다 훨씬 앞서 끝내는 경우가 많다.", axis: "JP", agree: "J" },
  { number: 31, key: "mq_30", text: "혼자 있는 것보다 사람들과 함께 있는 쪽을 더 좋아한다.", axis: "EI", agree: "E" },
  { number: 32, key: "mq_31", text: "이야기가 너무 추상적이고 이론적으로만 흐르면 지루해지거나 관심을 잃는다.", axis: "SN", agree: "S" },
  { number: 33, key: "mq_32", text: "사실과 감정이 부딪힐 때는 감정 쪽으로 기울어 행동한다.", axis: "TF", agree: "F" },
  { number: 34, key: "mq_33", text: "일이나 공부 스케줄을 꾸준히 지키는 것이 어렵다.", axis: "JP", agree: "P" },
  { number: 35, key: "mq_34", text: "한 번 정한 일을 다시 곱씹는 경우는 거의 없다.", axis: "JP", agree: "J" },
  { number: 36, key: "mq_35", text: "주변 사람들은 활발하고 외향적인 사람이라고 말할 것이다.", axis: "EI", agree: "E" },
  { number: 37, key: "mq_36", text: "글쓰기처럼 창의력을 드러내는 여러 활동에 관심이 있다.", axis: "SN", agree: "N" },
  { number: 38, key: "mq_37", text: "대개 감정보다 객관적인 사실을 바탕으로 결정을 내린다.", axis: "TF", agree: "T" },
  { number: 39, key: "mq_38", text: "하루 일과를 미리 짜 두는 것이 편하다.", axis: "JP", agree: "J" },
  { number: 40, key: "mq_4", text: "긴장감이 큰 상황에서도 차분함을 잃지 않는 편이다.", axis: "TF", agree: "T" },
  { number: 41, key: "mq_5", text: "낯선 사람과 관계를 트거나 자신을 드러내는 일이 매우 부담스럽다.", axis: "EI", agree: "I" },
  { number: 42, key: "mq_1", text: "단순하고 바로 이해되는 아이디어보다 복잡하고 신선한 아이디어에 끌린다.", axis: "SN", agree: "N" },
  { number: 43, key: "mq_42", text: "처음 만난 사람과도 금방 가까워질 수 있다.", axis: "EI", agree: "E" },
  { number: 44, key: "mq_43", text: "계획이 꼬이면 가능한 한 빨리 원래 계획으로 되돌리는 것을 가장 중요하게 여긴다.", axis: "JP", agree: "J" },
  { number: 45, key: "mq_44", text: "예전에 한 실수에 대해 아직도 아쉬워하곤 한다.", axis: "JP", agree: "J" },
  { number: 46, key: "mq_45", text: "미래 사회가 어떻게 될지에 대한 이론적인 이야기에는 큰 관심이 없다.", axis: "SN", agree: "S" },
  { number: 47, key: "mq_46", text: "감정을 다스리기보다 감정에 이끌려 움직이는 경우가 많다.", axis: "TF", agree: "F" },
  { number: 48, key: "mq_47", text: "결정할 때 가장 논리적이고 효율적인 답보다 관련된 사람들의 감정에 더 주의를 기울인다.", axis: "TF", agree: "F" },
  { number: 49, key: "mq_48", text: "계획대로 꾸준히 진행하기보다, 그때그때 솟는 기운으로 일을 몰아서 처리하는 편이다.", axis: "JP", agree: "P" },
  { number: 50, key: "mq_49", text: "상대가 높이 평가하면, 나중에 기대에 못 미쳐 실망시킬까 봐 걱정하곤 한다.", axis: "TF", agree: "F" },
  { number: 51, key: "mq_50", text: "대부분의 시간을 혼자 일할 수 있는 직업을 원한다.", axis: "EI", agree: "I" },
  { number: 52, key: "mq_51", text: "추상적인 철학 물음에 깊이 빠져드는 것은 시간을 허비하는 일이라고 본다.", axis: "SN", agree: "S" },
  { number: 53, key: "mq_52", text: "조용하고 사적인 곳보다 사람이 많고 시끌벅적한 장소에 더 끌린다.", axis: "EI", agree: "E" },
  { number: 54, key: "mq_53", text: "어떤 선택이 맞다고 느끼면 더 따져보지 않고 바로 실행에 옮기는 경우가 많다.", axis: "JP", agree: "P" },
  { number: 55, key: "mq_9", text: "사소한 실수에도 실력이나 지식을 의심할 때가 있다.", axis: "TF", agree: "F" },
  { number: 56, key: "mq_55", text: "중간 과정을 건너뛰지 않고 순서대로 일을 끝낸다.", axis: "JP", agree: "J" },
  { number: 57, key: "mq_56", text: "정해진 절차를 따르는 일보다, 창의적인 답을 스스로 짜내야 하는 일을 더 선호한다.", axis: "SN", agree: "N" },
  { number: 58, key: "mq_57", text: "결정할 때 논리적 추론보다 감정적 직감에 더 기대는 편이다.", axis: "TF", agree: "F" },
  { number: 59, key: "mq_8", text: "일정표나 할 일 목록처럼 일을 정리해 주는 도구를 쓰는 것을 좋아한다.", axis: "JP", agree: "J" },
  { number: 60, key: "mq_59", text: "결국 모든 일이 잘 되어 갈 것이라는 확신이 있다.", axis: "EI", agree: "E" },
];
