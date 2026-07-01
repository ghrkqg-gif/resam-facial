"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Location() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="location" ref={ref} className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-wide">
            오시는 길
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">리샘한의원 분당점</h2>
          <p className="text-gray-400 text-sm">경기도 성남시 분당구 성남대로 345 정자역프라자 707호</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* 지도 영역 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center relative overflow-hidden">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">📍</div>
                <p className="font-semibold text-gray-600 text-sm">정자역프라자 707호</p>
                <p className="text-xs mt-1 text-gray-400">분당선 정자역 1번 출구 도보 1분</p>
              </div>
              <div className="absolute bottom-4 right-4">
                <a
                  href="https://map.naver.com/v5/search/경기도 성남시 분당구 성남대로 345 정자역프라자 707호"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
                >
                  네이버 지도 보기
                </a>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3.5">
                <p className="text-xs text-gray-400 mb-1">🚇 지하철</p>
                <p className="text-sm font-semibold text-gray-700">분당선 정자역 1번 출구</p>
                <p className="text-xs text-gray-400">도보 1분</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3.5">
                <p className="text-xs text-gray-400 mb-1">🅿️ 주차</p>
                <p className="text-sm font-semibold text-gray-700">건물 내 주차 가능</p>
                <p className="text-xs text-gray-400">방문 시 주차 확인</p>
              </div>
            </div>
          </motion.div>

          {/* 운영 정보 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {/* 운영시간 */}
            <div className="bg-indigo-50 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">운영 시간</h3>
              <div className="space-y-2.5">
                {[
                  { day: "평일 (월~금)", time: "11:00 ~ 21:00", note: "점심 14:00~15:00", closed: false },
                  { day: "토요일", time: "09:00 ~ 15:00", note: "", closed: false },
                  { day: "일요일", time: "휴 진", note: "", closed: true },
                  { day: "공휴일", time: "11:00 ~ 18:00", note: "", closed: false },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between pb-2.5 border-b border-indigo-100 last:border-0 last:pb-0 ${item.closed ? "opacity-40" : ""}`}
                  >
                    <span className="text-sm font-medium text-gray-700">{item.day}</span>
                    <div className="text-right">
                      <span className={`text-sm font-bold ${item.closed ? "text-gray-400" : "text-indigo-700"}`}>
                        {item.time}
                      </span>
                      {item.note && <p className="text-xs text-gray-400">{item.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 연락처 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">연락처</h3>
              <div className="space-y-3">
                {[
                  { icon: "📞", label: "전화", value: "031-713-2784", href: "tel:031-713-2784" },
                  { icon: "💬", label: "문자", value: "010-9877-2784", href: "sms:010-9877-2784" },
                  { icon: "🟡", label: "카카오채널", value: "resambd", href: "https://pf.kakao.com/_resambd" },
                  { icon: "📍", label: "주소", value: "경기도 성남시 분당구 성남대로 345\n정자역프라자 707호", href: "" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors whitespace-pre-line">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-gray-700 whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
