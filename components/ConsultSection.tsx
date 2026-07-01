"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ConsultSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", concern: "", message: "" });

  const concerns = ["안면비대칭", "두상교정", "뼈교정", "비강벌룬추나", "기타"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="consult" ref={ref} className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1.5
                             rounded-full uppercase tracking-wide mb-3">
              빠른 상담 신청
            </span>
            <h2 className="text-2xl font-black text-gray-900 mb-1">상담 신청</h2>
            <p className="text-gray-400 text-sm">
              남겨주신 정보로 빠르게 연락드립니다. 상담은 무료입니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {submitted ? (
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-10 text-center">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-1">상담 신청 완료!</h3>
                <p className="text-gray-500 text-sm mb-5">빠른 시간 내에 연락드리겠습니다.</p>
                <a
                  href="tel:031-713-2784"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500
                             text-white font-bold px-6 py-2.5 rounded-full text-sm transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  031-713-2784
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 이름 + 연락처 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      이름 <span className="text-indigo-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="홍길동"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                                 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50
                                 transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      연락처 <span className="text-indigo-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="010-0000-0000"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                                 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50
                                 transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>

                {/* 관심 항목 */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    관심 항목
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {concerns.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setForm({ ...form, concern: c })}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                          form.concern === c
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 문의 내용 */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    문의 내용
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="현재 증상이나 궁금한 점을 자유롭게 적어주세요."
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                               focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50
                               transition-all resize-none placeholder:text-gray-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3
                             rounded-xl text-sm transition-colors duration-200"
                >
                  상담 신청하기
                </button>

                <p className="text-center text-[11px] text-gray-300">
                  개인정보는 상담 목적으로만 사용되며 완료 후 즉시 파기됩니다.
                </p>
              </form>
            )}
          </motion.div>

          {/* 빠른 연락 수단 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-6 grid grid-cols-3 gap-3"
          >
            {[
              { icon: "📞", label: "전화", value: "031-713-2784", href: "tel:031-713-2784" },
              { icon: "💬", label: "문자", value: "010-9877-2784", href: "sms:010-9877-2784" },
              { icon: "🟡", label: "카카오", value: "resambd", href: "https://pf.kakao.com/_resambd" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col items-center gap-1.5 bg-gray-50 hover:bg-indigo-50
                           border border-gray-100 hover:border-indigo-200 rounded-xl p-3
                           text-center transition-all duration-200"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-[11px] text-gray-400">{item.label}</span>
                <span className="text-xs font-semibold text-gray-700 truncate w-full text-center">
                  {item.value}
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
