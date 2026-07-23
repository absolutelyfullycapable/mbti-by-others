"use client";

import { BrandMark } from "@/components/Brand";
import { CreateForm } from "@/components/CreateForm";

export function HomeHero() {
  return (
    <section className="flex flex-1 flex-col justify-center py-10 sm:py-14">
      <CreateForm
        intro={
          <>
            <h1 className="anim-brand">
              <BrandMark size="hero" asLink={false} />
            </h1>
            <p className="anim-rise-delay mt-5 max-w-md text-[15px] leading-relaxed text-[var(--muted)] sm:text-base">
              나는 나를 알지만, 남들은 다르게 본다.
              <br />
              링크를 공유하면 주변이 본 내 유형이 통계로 쌓여요.
            </p>
          </>
        }
      />
    </section>
  );
}
