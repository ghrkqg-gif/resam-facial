"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const hours = [
  { day: "평일", time: "11:00 ~ 21:00", note: "점심 14:00 ~ 15:00" },
  { day: "토요일", time: "09:00 ~ 15:00", note: "" },
  { day: "일요일", time: "휴진", note: "" },
  { day: "공휴일", time: "11:00 ~ 18:00", note: "" },
];

export default function ConsultSection() {
  const [form, setForm] = useState({ name: "", phone: "", concern: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="consult" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-indigo-50 text-indigo-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            상담 신청
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
            지금 바로 <span className="text-indigo-600">무료 상담</span>을 신청하세요
          </h2>
          <p className="text-gray-600">
            전문 한의사가 직접 상담해 드립니다. 개인 정보는 상담 목적으로만 사용됩니다.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* 상담 폼 */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="text-center py-10">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">상담 신청이 완료되었습니다!</h3>
                <p className="text-gray-600 text-sm">
                  빠른 시간 내에 연락드리겠습니다.<br />
                  급하신 경우 <strong>031-713-2784</strong>로 전화 주세요.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-6">온라인 상담 신청</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">이름 *</label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">연락처 *</label>
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">관심 항목</label>
                  <select
                    value={form.concern}
                    onChange={(e) => setForm({ ...form, concern: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent bg-white"
                  >
                    <option value="">선택해 주세요</option>
                    <option value="asymmetry">안면비대칭</option>
                    <option value="head">두상교정</option>
                    <option value="bone">뼈교정</option>
                    <option value="balloon">비강벌룬추나</option>
                    <option value="etc">기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">문의 내용 (선택)</label>
                  <textarea
                    rows={3}
                    placeholder="현재 증상이나 궁금한 점을 자유롭게 작성해 주세요."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-base hover:bg-indigo-500 transition-all hover:scale-[1.02]"
                >
                  무료 상담 신청하기 →
                </button>
                <p className="text-xs text-gray-400 text-center">
                  개인정보는 상담 목적으로만 사용하며 제3자에 제공하지 않습니다.
                </p>
              </form>
            )}
          </motion.div>

          {/* 연락처 + 오시는 길 */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* 연락처 */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-5 text-lg">📞 연락처</h3>
              <div className="space-y-3">
                {[
                  { icon: "📱", label: "전화", value: "031-713-2784", href: "tel:031-713-2784" },
                  { icon: "💬", label: "문자", value: "010-9877-2784", href: "sms:010-9877-2784" },
                  { icon: "🟡", label: "카카오", value: "resambd", href: "https://pf.kakao.com/_resambd" },
                ].map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 transition-colors"
                  >
                    <span className="text-xl">{contact.icon}</span>
                    <div>
                      <div className="text-xs text-gray-400">{contact.label}</div>
                      <div className="font-semibold text-gray-800">{contact.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* 진료 시간 */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">🕐 진료 시간</h3>
              <div className="space-y-2">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm font-semibold text-gray-700 w-20">{h.day}</span>
                    <span className={`text-sm font-bold ${h.time === "휴진" ? "text-red-400" : "text-indigo-600"}`}>
                      {h.time}
                    </span>
                    {h.note && <span className="text-xs text-gray-400">{h.note}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* 오시는 길 */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">📍 오시는 길</h3>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                경기도 성남시 분당구 성남대로 345<br />
                <strong>정자역프라자 707호</strong>
              </p>
              <p className="text-xs text-gray-500 mb-4">
                🚇 분당선 정자역 1번 출구 도보 1분<br />
                🚗 정자역프라자 건물 내 주차 가능
              </p>
              {/* 지도 placeholder */}
              <div className="w-full h-36 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-xl flex items-center justify-center text-sm text-indigo-400 font-medium">
                🗺️ 지도 (정자역프라자 707호)
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
