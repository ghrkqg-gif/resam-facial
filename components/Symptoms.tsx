"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const symptoms = [
  { icon: "👁️", text: "눈 높이가 좌우 다르다" },
  { icon: "👂", text: "귀 위치가 좌우 차이난다" },
  { icon: "📸", text: "사진 찍을 때 얼굴이 항상 돌아간다" },
  { icon: "🦷", text: "치아 교합이 한쪽에만 닿는 느낌" },
  { icon: "😤", text: "광대뼈가 한쪽이 더 튀어나옴" },
  { icon: "💋", text: "입꼬리·인중이 중앙에서 벗어남" },
  { icon: "🎧", text: "한쪽 귀에 이어폰이 잘 안 꽂힘" },
  { icon: "🪞", text: "거울 속 내 얼굴이 비대칭으로 보임" },
  { icon: "🤕", text: "한쪽 턱관절에서 소리 또는 통증" },
  { icon: "😴", text: "수면 중 항상 같은 방향으로만 눈" },
  { icon: "💆", text: "한쪽 목·어깨가 더 뭉치고 통증" },
  { icon: "🦶", text: "신발 밑창이 한쪽만 더 닳는다" },
];

export default function Symptoms() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="symptoms" ref={ref} className="py-24 bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-white/10 text-teal-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            자가 체크리스트
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            안면비대칭<br />
            <span className="text-teal-300">일반적 특징 12가지</span>
          </h2>
          <p className="text-teal-200/70 max-w-xl mx-auto">
            아래 증상 중 3개 이상 해당된다면<br />
            안면비대칭 교정 상담이 필요합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {symptoms.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white/10 backdrop-blur border border-white/10 hover:border-teal-400/50 hover:bg-white/15 rounded-2xl p-5 transition-all duration-300 cursor-default group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {s.icon}
              </div>
              <p className="text-sm text-teal-100 leading-relaxed font-medium">{s.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/10 backdrop-blur border border-teal-400/30 rounded-3xl p-6">
            <div className="text-4xl">🔍</div>
            <div className="text-left">
              <p className="font-bold text-white">해당 증상이 있으신가요?</p>
              <p className="text-teal-300 text-sm">CT·X-ray 정밀 진단으로 내 비대칭 유형을 정확히 파악하세요</p>
            </div>
            <a
              href="#consult"
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-400 text-white font-bold px-6 py-3 rounded-full text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.5)]"
            >
              무료 상담 신청
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
