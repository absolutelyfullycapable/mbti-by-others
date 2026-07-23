import { NextResponse } from "next/server";
import { createTest } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { name?: string };
    const name = body.name?.trim() ?? "";
    if (!name) {
      return NextResponse.json(
        { error: "이름을 입력해 주세요." },
        { status: 400 },
      );
    }
    if (name.length > 20) {
      return NextResponse.json(
        { error: "이름은 20자 이내로 입력해 주세요." },
        { status: 400 },
      );
    }

    const test = await createTest(name);
    return NextResponse.json({
      slug: test.slug,
      resultToken: test.resultToken,
      ownerName: test.ownerName,
      sharePath: `/t/${test.slug}`,
      resultPath: `/r/${test.resultToken}`,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "생성에 실패했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
