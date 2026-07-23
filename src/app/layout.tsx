import type { Metadata } from "next";
import { Dongle, Syne } from "next/font/google";
import "pretendard/dist/web/variable/pretendardvariable.css";
import "./globals.css";

const brand = Dongle({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-brand",
});

const display = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "남BTI — 남이 보는 내 MBTI",
    template: "%s · 남BTI",
  },
  description:
    "주변 사람들이 나를 어떤 MBTI로 보는지 모아 보는 테스트. 링크를 공유하고 상위 유형과 비율을 확인하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${brand.variable} ${display.variable} h-full`}
    >
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
