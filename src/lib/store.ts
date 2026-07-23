import { nanoid } from "nanoid";
import type { AxisScores } from "@/lib/scoring";
import { getSupabase } from "@/lib/supabase";

export type ResponseRecord = {
  id: string;
  respondentName: string;
  mbti: string;
  scores: AxisScores;
  createdAt: string;
};

export type TestRecord = {
  id: string;
  slug: string;
  resultToken: string;
  ownerName: string;
  createdAt: string;
  responses: ResponseRecord[];
};

type TestRow = {
  id: string;
  slug: string;
  result_token: string;
  owner_name: string;
  created_at: string;
};

type ResponseRow = {
  id: string;
  test_id: string;
  respondent_name: string;
  mbti: string;
  scores: AxisScores;
  created_at: string;
};

function mapResponse(row: ResponseRow): ResponseRecord {
  return {
    id: row.id,
    respondentName: row.respondent_name,
    mbti: row.mbti,
    scores: row.scores,
    createdAt: row.created_at,
  };
}

function mapTest(row: TestRow, responses: ResponseRecord[] = []): TestRecord {
  return {
    id: row.id,
    slug: row.slug,
    resultToken: row.result_token,
    ownerName: row.owner_name,
    createdAt: row.created_at,
    responses,
  };
}

async function fetchResponses(testId: string): Promise<ResponseRecord[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc("rpc_list_responses", {
    p_test_id: testId,
  });
  if (error) throw new Error(error.message);
  return ((data ?? []) as ResponseRow[]).map(mapResponse);
}

export async function createTest(ownerName: string): Promise<TestRecord> {
  const name = ownerName.trim();
  if (!name) throw new Error("이름을 입력해 주세요.");

  const supabase = getSupabase();
  const { data, error } = await supabase.rpc("rpc_insert_test", {
    p_id: nanoid(),
    p_slug: nanoid(10),
    p_result_token: nanoid(24),
    p_owner_name: name,
  });

  if (error) throw new Error(error.message);
  if (!data) throw new Error("테스트 생성에 실패했습니다.");
  return mapTest(data as TestRow, []);
}

export async function getTestBySlug(slug: string): Promise<TestRecord | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc("rpc_get_test_by_slug", {
    p_slug: slug,
  });

  if (error) throw new Error(error.message);
  if (!data) return null;

  const row = data as TestRow;
  const responses = await fetchResponses(row.id);
  return mapTest(row, responses);
}

export async function getTestByResultToken(
  token: string,
): Promise<TestRecord | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc("rpc_get_test_by_result_token", {
    p_token: token,
  });

  if (error) throw new Error(error.message);
  if (!data) return null;

  const row = data as TestRow;
  const responses = await fetchResponses(row.id);
  return mapTest(row, responses);
}

export async function addResponse(
  slug: string,
  input: {
    respondentName?: string;
    mbti: string;
    scores: AxisScores;
  },
): Promise<{ test: TestRecord; response: ResponseRecord }> {
  const test = await getTestBySlug(slug);
  if (!test) throw new Error("테스트를 찾을 수 없습니다.");

  const supabase = getSupabase();
  const respondentName = input.respondentName?.trim() || "(익명)";

  const { data, error } = await supabase.rpc("rpc_insert_response", {
    p_id: nanoid(),
    p_test_id: test.id,
    p_respondent_name: respondentName,
    p_mbti: input.mbti,
    p_scores: input.scores,
  });

  if (error) throw new Error(error.message);
  if (!data) throw new Error("응답 저장에 실패했습니다.");

  const response = mapResponse(data as ResponseRow);
  const responses = await fetchResponses(test.id);
  return { test: { ...test, responses }, response };
}
