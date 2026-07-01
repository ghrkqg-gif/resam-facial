"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-gray-50 border-b border-gray-100" style={{ paddingTop: "64px" }}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* 왼쪽: 로고 + 병원명 */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-md shadow-indigo-200">
                <span className="text-white font-black text-base">리샘</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-black text-gray-900">리샘한의원 분당점</h1>
                  <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-full">
                    이벤트 진행 중
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  안면비대칭·두상교정 전문 한방 클리닉
                </p>
              </div>
            </div>

            {/* 구분선 */}
            <div className="hidden md:block w-px h-16 bg-gray-100 mx-2" />

            {/* 오른쪽: 상세 정보 */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1 md:justify-end">
              {/* 진료시간 */}
              <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm">
                <p className="text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">진료시간</p>
                <div className="space-y-0.5">
                  <p className="text-gray-700 font-medium">평일 <span className="text-indigo-600 font-bold">11:00 ~ 21:00</span></p>
                  <p className="text-gray-700 font-medium">토요일 <span className="text-indigo-600 font-bold">09:00 ~ 15:00</span></p>
                  <p className="text-gray-400 text-xs">일요일 휴진 · 점심 14:00~15:00</p>
                </div>
              </div>

              {/* 연락처 + 위치 */}
              <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm">
                <p className="text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">연락 & 위치</p>
                <a href="tel:031-713-2784" className="flex items-center gap-1.5 text-indigo-600 font-bold hover:text-indigo-500 transition-colors mb-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  031-713-2784
                </a>
                <p className="text-gray-400 text-xs leading-relaxed">
                  경기도 성남시 분당구 성남대로 345<br />
                  정자역프라자 707호 (정자역 도보 1분)
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
