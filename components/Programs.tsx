"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const programs = [
  {
    name: "순수본교정",
    icon: "🌿",
    color: "from-teal-500 to-teal-700",
    badge: "기본 프로그램",
    badgeColor: "bg-teal-100 text-teal-700",
    desc: "두개골·안면골격의 비틀림을 근본부터 교정하는 리샘의 핵심 프로그램입니다.",
    features: [
      "두개골 22개 봉합선 정밀 교정",
      "안면 골격 비틀림 해소",
      "척추-골반-두개골 연결 교정",
      "교정 전후 CT·X-ray 비교",
    ],
    target: "안면비대칭, 두상 비대칭, 좌우 얼굴뼈 불균형",
  },
  {
    name: "두상교정",
    icon: "💫",
    color: "from-cyan-500 to-cyan-700",
    badge: "두상 전문",
    badgeColor: "bg-cyan-100 text-cyan-700",
    desc: "편측 납작함, 앞뒤 두상 돌출, 장두·단두 등 두상 형태를 입체적으로 교정합니다.",
    features: [
      "두개골 형태 정밀 교정",
      "후두부 납작한 부위 개선",
      "이마·측두부 균형 조정",
      "3D 스캔으로 변화량 측정",
    ],
    target: "두상 납작함, 두상 비대칭, 헬멧 대신 원하는 분",
  },
  {
    name: "연예인교정",
    icon: "⭐",
    color: "from-amber-500 to-teal-600",
    badge: "프리미엄",
    badgeColor: "bg-amber-100 text-amber-700",
    desc: "완성도 높은 얼굴 대칭과 황금비율에 맞는 이상적인 골격 라인을 만드는 프리미엄 프로그램.",
    features: [
      "순수본교정 + 미세 정밀 튜닝",
      "황금비율 기반 맞춤 교정",
      "연예인·모델 고객 전담 케어",
      "진도 체크 정기 모니터링",
    ],
    target: "높은 완성도, 디테일한 라인 개선, 촬영·방송 활동",
  },
  {
    name: "비강벌룬추나",
    icon: "🫧",
    color: "from-emerald-500 to-teal-600",
    badge: "특수 교정",
    badgeColor: "bg-emerald-100 text-emerald-700",
    desc: "비강을 통해 안면골 내부에서 교정력을 전달하는 특수 기법. 외부 교정이 어려운 부위에 효과적.",
    features: [
      "비강 내부에서 안면골 직접 교정",
      "사골·접형골 등 내부 뼈 교정",
      "코 막힘·비중격 교정 효과",
      "두개골 내 압력 밸런스 조정",
    ],
    target: "비중격만곡, 코 비대칭, 내부 안면골 교정",
  },
];

export default function Programs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="programs" ref={ref} className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal-50 text-teal-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            맞춤 교정 솔루션
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            교정 프로그램
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            증상과 목적에 따라 최적의 프로그램을 선택합니다.<br />
            초진 상담 후 맞춤 프로그램을 안내드립니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* 헤더 */}
              <div className={`bg-gradient-to-r ${p.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`${p.badgeColor} text-xs font-bold px-3 py-1 rounded-full`}>
                    {p.badge}
                  </span>
                  <span className="text-3xl">{p.icon}</span>
                </div>
                <h3 className="text-2xl font-black">{p.name}</h3>
              </div>

              {/* 내용 */}
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{p.desc}</p>

                <div className="space-y-2 mb-5">
                  {p.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-teal-500">✓</span>
                      {f}
                    </div>
                  ))}
                </div>

                <div className="bg-teal-50 rounded-xl p-3">
                  <span className="text-teal-600 text-xs font-bold">추천 대상: </span>
                  <span className="text-gray-600 text-xs">{p.target}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-10"
        >
          <p className="text-gray-400 text-sm mb-4">어떤 프로그램이 맞는지 모르겠다면?</p>
          <a
            href="#consult"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1"
          >
            무료 초진 상담으로 확인하기 →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
