import Link from "next/link";
import { BrandMark } from "@/components/Brand";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-5 py-16">
      <BrandMark />
      <h1 className="mt-10 text-3xl font-bold">페이지를 찾을 수 없어요</h1>
      <p className="mt-3 text-[var(--muted)]">
        링크가 잘못되었거나 만료되었을 수 있어요.
      </p>
      <Link href="/" className="btn-primary mt-8 w-fit">
        홈으로
      </Link>
    </main>
  );
}
