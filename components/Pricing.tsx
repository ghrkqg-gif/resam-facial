"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const plans = [
  {
    name: "첫 1회 체험가",
    tag: "TRIAL",
    tagColor: "bg-teal-500",
    highlight: false,
    price: "상담 후 안내",
    priceNote: "초진 시 특별 할인가 적용",
    desc: "처음 방문하시는 분께 드리는 특별 체험가입니다.",
    includes: [
      "초진 상담 (30분)",
      "안면비대칭 유형 진단",
      "체험 교정 1회 시술",
      "교정 전 사진·측정 기록",
      "맞춤 프로그램 안내",
    ],
    cta: "체험가 문의하기",
    ctaStyle: "border border-teal-500 text-teal-600 hover:bg-teal-50",
  },
  {
    name: "패키지 프로그램",
    tag: "BEST",
    tagColor: "bg-gradient-to-r from-teal-500 to-cyan-500",
    highlight: true,
    price: "상담 후 안내",
    priceNote: "회차별 할인율 최대 적용",
    desc: "꾸준한 교정으로 근본적인 변화를 원하시는 분께 추천합니다.",
    includes: [
      "정밀 진단 (CT·X-ray 분석)",
      "맞춤 교정 프로그램 설계",
      "패키지 구성 회차 교정",
      "중간 경과 측정 및 분석",
      "교정 후 사진·수치 비교",
      "유지 관리 가이드 제공",
    ],
    cta: "패키지 상담 신청",
    ctaStyle: "bg-teal-600 hover:bg-teal-500 text-white",
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" ref={ref} className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal-50 text-teal-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            합리적인 비용
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            비용 안내
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            정확한 비용은 초진 상담 후 증상과 프로그램에 따라 안내드립니다.<br />
            부담 없이 먼저 체험해보세요.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-3xl p-8 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                plan.highlight
                  ? "border-teal-500 shadow-lg shadow-teal-100"
                  : "border-gray-100"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    가장 인기
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className={`${plan.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {plan.tag}
                  </span>
                  <h3 className="text-xl font-black text-gray-900 mt-3">{plan.name}</h3>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-2xl font-black text-teal-600 mb-1">{plan.price}</div>
                <div className="text-gray-400 text-sm">{plan.priceNote}</div>
              </div>

              <p className="text-gray-500 text-sm mb-6 leading-relaxed">{plan.desc}</p>

              <div className="space-y-3 mb-8">
                {plan.includes.map((item, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-600 text-xs">✓</span>
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <a
                href="#consult"
                className={`block text-center font-bold py-3.5 rounded-2xl transition-all duration-300 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* 결제 안내 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="bg-gray-50 rounded-2xl p-6 grid sm:grid-cols-3 gap-4 text-center"
        >
          {[
            { icon: "📋", text: "현금·카드 결제 가능" },
            { icon: "🔒", text: "체험 후 구매 결정 가능" },
            { icon: "💬", text: "전화 상담 후 방문" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
