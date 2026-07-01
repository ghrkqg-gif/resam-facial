"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* 로고 */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[10px] font-extrabold leading-none">리샘</span>
          </div>
          <span className="font-extrabold text-gray-800 text-base">리샘한의원</span>
          <span className="hidden sm:inline text-gray-400 text-sm font-normal">분당점</span>
        </a>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a href="#events" className="hover:text-indigo-600 transition-colors">이벤트</a>
          <a href="#consult" className="hover:text-indigo-600 transition-colors">상담신청</a>
        </nav>

        {/* 전화 버튼 + 모바일 햄버거 */}
        <div className="flex items-center gap-3">
          <a
            href="tel:031-713-2784"
            className="hidden sm:inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            031-713-2784
          </a>
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-3">
          <a href="#events" onClick={() => setMenuOpen(false)} className="block text-sm text-gray-700 hover:text-indigo-600 py-1">이벤트</a>
          <a href="#consult" onClick={() => setMenuOpen(false)} className="block text-sm text-gray-700 hover:text-indigo-600 py-1">상담신청</a>
          <a href="tel:031-713-2784" className="block text-sm font-semibold text-indigo-600 py-1">📞 031-713-2784</a>
        </div>
      )}
    </header>
  );
}
