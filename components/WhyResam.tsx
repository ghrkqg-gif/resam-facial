"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const reasons = [
  {
    icon: "📊",
    title: "전지점 누적 30만+ 교정케이스",
    desc: "압도적인 임상 경험. 다양한 안면비대칭 유형의 교정 노하우가 쌓여 있습니다.",
    highlight: true,
  },
  {
    icon: "🔬",
    title: "CT·X-ray·3D스캔 과학적 진단",
    desc: "느낌이 아닌 수치로 진단하고, 교정 전후 변화를 데이터로 증명합니다.",
    highlight: false,
  },
  {
    icon: "🎯",
    title: "유형별 맞춤 교정 프로그램",
    desc: "4가지 특화 프로그램으로 각 증상에 최적화된 교정을 진행합니다.",
    highlight: false,
  },
  {
    icon: "⚕️",
    title: "무수술·비침습 안전 교정",
    desc: "칼 없이, 전신마취 없이. 부작용 걱정 없는 안전한 교정을 지향합니다.",
    highlight: false,
  },
  {
    icon: "🔄",
    title: "전신 연결고리 통합 교정",
    desc: "안면만 보지 않습니다. 척추-골반-두개골 전신 연결을 함께 교정해 재발을 막습니다.",
    highlight: false,
  },
  {
    icon: "📱",
    title: "교정 진도 기록 및 비교",
    desc: "매 방문 사진·측정 기록을 남겨 변화 과정을 투명하게 공유합니다.",
    highlight: false,
  },
];

export default function WhyResam() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why" ref={ref} className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal-50 text-teal-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            리샘의 차별점
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            왜 리샘인가
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            수많은 교정 센터 중 리샘을 선택해야 하는 이유,<br />
            데이터와 경험이 증명합니다.
          </p>
        </motion.div>

        {/* 하이라이트 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-8 md:p-10 text-white mb-8 text-center"
        >
          <div className="text-5xl mb-4">🏆</div>
          <div className="text-5xl md:text-7xl font-black mb-2">30만+</div>
          <div className="text-teal-200 text-lg mb-4">전지점 누적 교정 케이스</div>
          <p className="text-teal-100/80 max-w-md mx-auto text-sm leading-relaxed">
            대한민국에서 가장 많은 안면비대칭·두상교정 임상 경험.<br />
            숫자가 곧 실력입니다.
          </p>
        </motion.div>

        {/* 이유 그리드 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.slice(1).map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{r.icon}</div>
              <h3 className="font-black text-gray-900 mb-2 leading-snug">{r.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 신뢰 지표 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { num: "30만+", label: "누적 케이스" },
            { num: "4가지", label: "전문 프로그램" },
            { num: "CT·X-ray", label: "과학적 진단" },
            { num: "0회", label: "수술 없는 교정" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center bg-white rounded-2xl p-5 shadow-sm"
            >
              <div className="text-2xl font-black text-teal-600 mb-1">{stat.num}</div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
