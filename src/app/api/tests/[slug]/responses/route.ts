import { NextResponse } from "next/server";
import { QUESTIONS } from "@/data/questions";
import { addResponse, getTestBySlug } from "@/lib/store";
import { aggregateMbti, scoreAnswers } from "@/lib/scoring";

type Params = { params: Promise<{ slug: string }> };

export async function POST(request: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const test = await getTestBySlug(slug);
    if (!test) {
      return NextResponse.json(
        { error: "테스트를 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    const body = (await request.json()) as {
      answers?: number[];
      respondentName?: string;
    };

    const answers = body.answers;
    if (!Array.isArray(answers) || answers.length !== QUESTIONS.length) {
      return NextResponse.json(
        { error: `답변은 ${QUESTIONS.length}개여야 합니다.` },
        { status: 400 },
      );
    }

    for (const a of answers) {
      if (typeof a !== "number" || a < -3 || a > 3) {
        return NextResponse.json(
          { error: "유효하지 않은 답변이 있습니다." },
          { status: 400 },
        );
      }
    }

    const scored = scoreAnswers(answers);
    const { test: updated, response } = await addResponse(slug, {
      respondentName: body.respondentName,
      mbti: scored.mbti,
      scores: scored.scores,
    });

    const stats = aggregateMbti(updated.responses);

    return NextResponse.json({
      mbti: scored.mbti,
      scores: scored.scores,
      letters: scored.letters,
      respondentName: response.respondentName,
      ownerName: updated.ownerName,
      resultToken: updated.resultToken,
      stats,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "제출에 실패했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
