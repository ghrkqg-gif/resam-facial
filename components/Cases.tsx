"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const cases = [
  {
    id: 1,
    label: "CASE 01",
    type: "안면비대칭",
    before: "좌우 눈높이 차이 8mm\n광대뼈 돌출 불균형\n턱선 틀어짐",
    after: "눈높이 차이 1mm 이내\n광대라인 균형 회복\n자연스러운 턱선",
    period: "12주 교정",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: 2,
    label: "CASE 02",
    type: "두상교정",
    before: "후두부 편측 평탄화\n두상 좌우 비대칭\n이마 돌출 불균형",
    after: "후두부 균형 회복\n입체적인 두상 완성\n전체적 균형 향상",
    period: "8주 교정",
    color: "from-cyan-500 to-teal-600",
  },
  {
    id: 3,
    label: "CASE 03",
    type: "복합 교정",
    before: "안면골 전체 비틀림\n코끝 방향 쏠림\n하관 좌우 불균형",
    after: "골격 비틀림 해소\n코끝 정중선 회복\n하관 균형 개선",
    period: "16주 교정",
    color: "from-teal-600 to-emerald-600",
  },
];

export default function Cases() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cases" ref={ref} className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal-50 text-teal-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            실제 교정 결과
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            뼈교정 CASE<br />
            <span className="text-teal-600">전후 사진</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            CT·X-ray 수치로 확인된 실제 교정 케이스입니다.<br />
            모든 결과는 개인차가 있을 수 있습니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* 이미지 플레이스홀더 */}
              <div className={`relative h-56 bg-gradient-to-br ${c.color} flex items-center justify-center`}>
                <div className="flex gap-6 items-center">
                  <div className="text-center">
                    <div className="w-20 h-24 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-2">
                      <span className="text-white/80 text-xs font-medium">BEFORE</span>
                    </div>
                  </div>
                  <div className="text-white text-2xl">→</div>
                  <div className="text-center">
                    <div className="w-20 h-24 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-2 border-2 border-white/40">
                      <span className="text-white/80 text-xs font-medium">AFTER</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur px-3 py-1 rounded-full">
                  <span className="text-white text-xs font-bold">{c.label}</span>
                </div>
                <div className="absolute top-4 right-4 bg-white text-teal-700 px-3 py-1 rounded-full text-xs font-bold">
                  {c.period}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-teal-500 rounded-full" />
                  <span className="font-bold text-gray-900">{c.type}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-50 rounded-xl p-3">
                    <div className="text-red-400 text-xs font-bold mb-2">교정 전</div>
                    {c.before.split("\n").map((line, j) => (
                      <div key={j} className="text-gray-600 text-xs leading-relaxed">• {line}</div>
                    ))}
                  </div>
                  <div className="bg-teal-50 rounded-xl p-3">
                    <div className="text-teal-600 text-xs font-bold mb-2">교정 후</div>
                    {c.after.split("\n").map((line, j) => (
                      <div key={j} className="text-gray-600 text-xs leading-relaxed">✓ {line}</div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href="#consult"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1"
          >
            나도 상담받기 →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
