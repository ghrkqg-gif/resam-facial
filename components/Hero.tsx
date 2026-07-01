"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-white border-b border-gray-100" style={{ paddingTop: "64px" }}>
      <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            <span className="text-teal-600 text-sm font-semibold">안면비대칭·두상교정 전문센터</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-2">
            리샘 <span className="text-teal-600">특가 이벤트</span>
          </h1>
          <p className="text-gray-400 text-sm">
            수술 없이 얼굴뼈·두개골을 직접 교정 · 전지점 누적 30만+ 케이스
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-3 flex-shrink-0"
        >
          <a
            href="tel:031-713-2784"
            className="flex items-center gap-2 border border-teal-200 hover:border-teal-400 text-teal-700 font-semibold px-5 py-2.5 rounded-full text-sm transition-all duration-200 hover:bg-teal-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            031-713-2784
          </a>
          <a
            href="#location"
            className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-all duration-200"
          >
            오시는 길
          </a>
        </motion.div>
      </div>
    </section>
  );
}
