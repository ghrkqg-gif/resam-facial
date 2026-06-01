"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal-50 text-teal-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            얼굴뼈 교정이 정말 가능한가요?
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
            안면비대칭·뼈교정 소개
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            많은 분들이 "뼈는 수술 없이는 바꿀 수 없다"고 생각하십니다.<br />
            리샘은 그 상식을 뒤집습니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 왼쪽 설명 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              {
                icon: "🦴",
                title: "두개골은 움직입니다",
                desc: "두개골은 하나의 단단한 뼈가 아닌 22개의 뼈가 봉합선으로 연결된 구조입니다. 이 봉합선에는 미세한 유동성이 있어 전문적인 교정으로 위치를 변화시킬 수 있습니다.",
              },
              {
                icon: "🔬",
                title: "CT·X-ray로 변화를 확인",
                desc: "교정 전후 CT, X-ray, 3D 스캔 데이터를 통해 실제 골격 변화를 수치로 확인합니다. 느낌이 아닌 데이터로 증명합니다.",
              },
              {
                icon: "⚕️",
                title: "수술 없는 비침습적 교정",
                desc: "칼을 대지 않고, 전신마취 없이 안면·두개골을 직접 교정합니다. 부작용 걱정 없이 안전하게 진행됩니다.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 오른쪽 카드 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-3xl p-8 text-white"
          >
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-2xl font-black mb-4">뼈교정의 원리</h3>
            <div className="space-y-4 text-teal-100">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                <p className="text-sm leading-relaxed">두개골 봉합선의 미세 유동성을 이용해 틀어진 뼈 위치를 정상화합니다</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                <p className="text-sm leading-relaxed">안면골격의 비틀림·비대칭 패턴을 정밀 분석 후 맞춤 교정</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                <p className="text-sm leading-relaxed">전신척추-골반-두개골 연결고리를 함께 교정해 재발을 방지</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-teal-200 text-xs">
                * 교정 효과와 기간은 개인의 뼈 상태·비대칭 정도에 따라 다를 수 있습니다
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
