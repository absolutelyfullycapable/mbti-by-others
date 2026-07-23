import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/Brand";
import { TestForm } from "@/components/TestForm";
import { getTestBySlug } from "@/lib/store";

type Props = { params: Promise<{ slug: string }> };

export default async function TestPage({ params }: Props) {
  const { slug } = await params;
  const test = await getTestBySlug(slug);
  if (!test) notFound();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-6 sm:px-8 sm:py-8">
      <SiteHeader subtle />
      <TestForm slug={test.slug} ownerName={test.ownerName} />
    </main>
  );
}
