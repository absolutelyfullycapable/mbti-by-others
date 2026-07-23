import { NextResponse } from "next/server";
import { getTestByResultToken } from "@/lib/store";
import { aggregateMbti } from "@/lib/scoring";

type Params = { params: Promise<{ token: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { token } = await params;
  const test = await getTestByResultToken(token);
  if (!test) {
    return NextResponse.json(
      { error: "결과 페이지를 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  const stats = aggregateMbti(test.responses);

  return NextResponse.json({
    ownerName: test.ownerName,
    slug: test.slug,
    sharePath: `/t/${test.slug}`,
    createdAt: test.createdAt,
    stats,
    responses: test.responses.map((r) => ({
      id: r.id,
      respondentName: r.respondentName,
      mbti: r.mbti,
      createdAt: r.createdAt,
    })),
  });
}
