import { NextResponse } from "next/server";
import { getTestBySlug } from "@/lib/store";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const test = await getTestBySlug(slug);
  if (!test) {
    return NextResponse.json(
      { error: "테스트를 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json({
    slug: test.slug,
    ownerName: test.ownerName,
    responseCount: test.responses.length,
  });
}
