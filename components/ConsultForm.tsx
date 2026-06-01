"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function ConsultForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    concern: "",
    time: "",
    message: "",
  });

  const concerns = [
    "안면비대칭",
    "두상교정",
    "얼굴뼈 교정",
    "비강벌룬추나",
    "기타",
  ];

  const times = [
    "평일 오전 (11:00~14:00)",
    "평일 오후 (15:00~21:00)",
    "토요일 (09:00~15:00)",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="consult" ref={ref} className="py-24 bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-900">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 text-white"
        >
          <span className="inline-block bg-white/10 text-teal-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            빠른 상담 신청
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            상담 신청
          </h2>
          <p className="text-teal-200/70 max-w-xl mx-auto">
            남겨주신 정보로 빠르게 연락드리겠습니다.<br />
            상담은 완전 무료입니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl"
        >
          {submitted ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">
                상담 신청이 완료되었습니다!
              </h3>
              <p className="text-gray-500 mb-6">
                빠른 시간 내에 연락드리겠습니다.<br />
                급하신 분은 전화로 연락 주세요.
              </p>
              <a
                href="tel:031-713-2784"
                className="inline-flex items-center gap-2 bg-teal-600 text-white font-bold px-8 py-3 rounded-full"
              >
                📞 031-713-2784
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    이름 <span className="text-teal-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="홍길동"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    연락처 <span className="text-teal-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="010-0000-0000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  관심 프로그램 <span className="text-teal-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {concerns.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setForm({ ...form, concern: c })}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                        form.concern === c
                          ? "bg-teal-500 border-teal-500 text-white"
                          : "border-gray-200 text-gray-600 hover:border-teal-400"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  상담 가능 시간
                </label>
                <div className="flex flex-wrap gap-2">
                  {times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, time: t })}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                        form.time === t
                          ? "bg-teal-500 border-teal-500 text-white"
                          : "border-gray-200 text-gray-600 hover:border-teal-400"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  증상 / 추가 문의사항
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="현재 증상이나 궁금한 점을 자유롭게 적어주세요"
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-500 text-white font-black py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                무료 상담 신청하기 →
              </button>

              <p className="text-gray-400 text-xs text-center">
                개인정보는 상담 목적으로만 사용되며, 상담 완료 후 즉시 파기됩니다.
              </p>
            </form>
          )}
        </motion.div>

        {/* 빠른 연락 수단 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 grid sm:grid-cols-3 gap-4"
        >
          {[
            { icon: "📞", label: "전화 상담", value: "031-713-2784", href: "tel:031-713-2784" },
            { icon: "💬", label: "문자 상담", value: "010-9877-2784", href: "sms:010-9877-2784" },
            { icon: "🟡", label: "카카오 상담", value: "resambd", href: "https://pf.kakao.com/_resambd" },
          ].map((contact, i) => (
            <a
              key={i}
              href={contact.href}
              className="bg-white/10 backdrop-blur border border-white/20 hover:border-teal-400/50 hover:bg-white/20 rounded-2xl p-4 text-center text-white transition-all duration-300"
            >
              <div className="text-2xl mb-1">{contact.icon}</div>
              <div className="text-teal-300 text-xs mb-1">{contact.label}</div>
              <div className="font-bold text-sm">{contact.value}</div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
