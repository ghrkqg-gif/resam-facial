import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "리샘 안면비대칭·두상교정 | CT/X-ray로 증명된 뼈교정",
  description: "CT·X-ray·3D스캔으로 증명된 과학적 안면비대칭·두상교정. 전지점 누적 30만 케이스, 경기도 성남시 분당구",
  keywords: "안면비대칭, 두상교정, 뼈교정, 안면비대칭교정, 분당안면비대칭, 리샘",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
