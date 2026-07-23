import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";
import type { AxisScores } from "@/lib/scoring";

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

type StoreData = {
  tests: Record<string, TestRecord>;
  byResultToken: Record<string, string>;
};

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "store.json");

const emptyStore = (): StoreData => ({ tests: {}, byResultToken: {} });

async function ensureStore(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, JSON.stringify(emptyStore(), null, 2), "utf8");
  }
}

async function readStore(): Promise<StoreData> {
  await ensureStore();
  const raw = await fs.readFile(STORE_PATH, "utf8");
  try {
    return JSON.parse(raw) as StoreData;
  } catch {
    return emptyStore();
  }
}

async function writeStore(data: StoreData): Promise<void> {
  await ensureStore();
  await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf8");
}

export async function createTest(ownerName: string): Promise<TestRecord> {
  const name = ownerName.trim();
  if (!name) throw new Error("이름을 입력해 주세요.");

  const store = await readStore();
  const slug = nanoid(10);
  const resultToken = nanoid(24);
  const record: TestRecord = {
    id: nanoid(),
    slug,
    resultToken,
    ownerName: name,
    createdAt: new Date().toISOString(),
    responses: [],
  };

  store.tests[slug] = record;
  store.byResultToken[resultToken] = slug;
  await writeStore(store);
  return record;
}

export async function getTestBySlug(slug: string): Promise<TestRecord | null> {
  const store = await readStore();
  return store.tests[slug] ?? null;
}

export async function getTestByResultToken(
  token: string,
): Promise<TestRecord | null> {
  const store = await readStore();
  const slug = store.byResultToken[token];
  if (!slug) return null;
  return store.tests[slug] ?? null;
}

export async function addResponse(
  slug: string,
  input: {
    respondentName?: string;
    mbti: string;
    scores: AxisScores;
  },
): Promise<{ test: TestRecord; response: ResponseRecord }> {
  const store = await readStore();
  const test = store.tests[slug];
  if (!test) throw new Error("테스트를 찾을 수 없습니다.");

  const respondentName =
    input.respondentName?.trim() || "(익명)";

  const response: ResponseRecord = {
    id: nanoid(),
    respondentName,
    mbti: input.mbti,
    scores: input.scores,
    createdAt: new Date().toISOString(),
  };

  test.responses.push(response);
  await writeStore(store);
  return { test, response };
}
