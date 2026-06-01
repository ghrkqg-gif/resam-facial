"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const types = [
  {
    num: "TYPE 01",
    title: "구조적 안면비대칭",
    subtitle: "골격 자체의 틀어짐",
    icon: "🦴",
    color: "border-teal-500",
    bg: "from-teal-50 to-cyan-50",
    badge: "bg-teal-500",
    features: [
      "광대뼈 높이가 좌우 다름",
      "눈꼬리·눈두덩이 높낮이 차이",
      "턱의 방향이 한쪽으로 치우침",
      "코끝이 정중선에서 벗어남",
    ],
    cause: "출생 시 두개골 변형, 수면 자세, 턱 괴기 습관 등 골격에 직접적 영향을 주는 요인으로 발생",
  },
  {
    num: "TYPE 02",
    title: "기능적 안면비대칭",
    subtitle: "근육·교합의 불균형",
    icon: "💪",
    color: "border-cyan-500",
    bg: "from-cyan-50 to-teal-50",
    badge: "bg-cyan-500",
    features: [
      "한쪽으로만 음식을 씹는 습관",
      "교합(맞물림)의 불균형",
      "한쪽 근육이 더 발달",
      "얼굴 근육 긴장 불균형",
    ],
    cause: "편측 저작 습관, 치아 교합 문제, 근육 긴장의 비대칭으로 장기간에 걸쳐 골격까지 영향을 줌",
  },
  {
    num: "TYPE 03",
    title: "복합성 안면비대칭",
    subtitle: "구조적+기능적 복합",
    icon: "🔄",
    color: "border-emerald-500",
    bg: "from-emerald-50 to-teal-50",
    badge: "bg-emerald-500",
    features: [
      "위 두 가지가 복합적으로 나타남",
      "척추·골반 틀어짐까지 연관",
      "체형 비대칭과 함께 동반",
      "교정 후 재발이 반복되는 경우",
    ],
    cause: "골격 비틀림이 기능적 불균형을 유발하거나, 기능적 문제가 골격 변형으로 이어진 복합 상태",
  },
];

export default function Types() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="types" ref={ref} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal-50 text-teal-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            안면비대칭 분류
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            안면비대칭<br />
            <span className="text-teal-600">3가지 유형</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            내 비대칭이 어떤 유형인지 아는 것이 교정의 첫 걸음입니다.<br />
            정확한 유형 진단 후 맞춤 프로그램을 적용합니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {types.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`bg-gradient-to-br ${t.bg} border-t-4 ${t.color} rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className={`${t.badge} text-white text-xs font-black px-3 py-1 rounded-full`}>
                  {t.num}
                </span>
                <span className="text-3xl">{t.icon}</span>
              </div>

              <h3 className="text-xl font-black text-gray-900 mb-1">{t.title}</h3>
              <p className="text-teal-600 text-sm font-medium mb-5">{t.subtitle}</p>

              <div className="space-y-2 mb-6">
                {t.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <div className="bg-white/70 rounded-2xl p-4">
                <p className="text-xs text-gray-500 leading-relaxed">
                  <span className="font-bold text-gray-700">발생 원인: </span>
                  {t.cause}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
