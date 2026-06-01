"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#134e4a] to-[#0f172a]">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-300 rounded-full blur-3xl opacity-20" />
      </div>

      {/* 그리드 오버레이 */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(94,234,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        {/* 상단 뱃지 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/40 rounded-full px-5 py-2 mb-8 text-teal-300 text-sm font-medium"
        >
          <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
          CT · X-ray · 3D스캔으로 증명된 과학적 뼈교정
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black mb-6 leading-tight"
        >
          <span className="block text-white">안면비대칭 ·</span>
          <span className="block bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
            두상교정 전문
          </span>
          <span className="block text-white text-4xl md:text-5xl mt-2 font-bold">리 샘</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-teal-100/80 mb-4 max-w-2xl mx-auto leading-relaxed"
        >
          수술 없이, 전신마취 없이
          <br />
          <strong className="text-teal-300">얼굴뼈·두개골을 직접 교정</strong>하는 유일한 방법
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-teal-300/70 text-sm mb-10"
        >
          전지점 누적 교정케이스 <strong className="text-teal-300 text-base">30만 건+</strong>
        </motion.p>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#consult"
            className="bg-teal-500 hover:bg-teal-400 text-white font-bold px-10 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] hover:-translate-y-1"
          >
            무료 상담 신청하기
          </a>
          <a
            href="tel:031-713-2784"
            className="border border-teal-400/50 hover:border-teal-400 text-teal-300 hover:text-white font-bold px-10 py-4 rounded-full text-lg transition-all duration-300 hover:bg-teal-500/20"
          >
            031-713-2784
          </a>
        </motion.div>

        {/* 통계 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {[
            { num: "30만+", label: "누적 교정케이스" },
            { num: "CT·X-ray", label: "과학적 진단" },
            { num: "무수술", label: "비침습적 교정" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur border border-teal-400/20 rounded-2xl p-4"
            >
              <div className="text-teal-300 font-black text-xl md:text-2xl">{item.num}</div>
              <div className="text-white/60 text-xs mt-1">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-teal-400/60 text-xs"
      >
        <span>아래로 스크롤</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 border-2 border-teal-400/40 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-teal-400/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
