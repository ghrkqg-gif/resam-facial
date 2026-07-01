"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-white border-b border-gray-100" style={{ paddingTop: "64px" }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center gap-4"
        >
          {/* 로고 + 병원명 */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center shadow-sm shadow-indigo-200">
              <span className="text-white font-black text-sm leading-none">리샘</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-gray-900 leading-none">리샘한의원 분당점</h1>
                <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-2 py-0.5 rounded-full border border-indigo-100">
                  이벤트 진행 중
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-1">
                안면비대칭·두상교정 전문 한방 클리닉 &nbsp;|&nbsp; 경기도 성남시 분당구 정자역프라자 707호
              </p>
            </div>
          </div>

          {/* 구분선 */}
          <div className="hidden sm:block h-10 w-px bg-gray-100 mx-1" />

          {/* 연락처 + 진료시간 한 줄 */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
            <a
              href="tel:031-713-2784"
              className="flex items-center gap-1.5 font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              031-713-2784
            </a>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <span className="text-gray-500 text-xs">평일 <b className="text-gray-700">11:00~21:00</b></span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-500 text-xs">토요일 <b className="text-gray-700">09:00~15:00</b></span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-400 text-xs">일요일 휴진</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
