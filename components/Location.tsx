"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Location() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="location" ref={ref} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal-50 text-teal-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            오시는 길
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            리샘 분당점
          </h2>
          <p className="text-gray-500">
            경기도 성남시 분당구 성남대로 345 정자역프라자 707호
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* 지도 플레이스홀더 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-100 rounded-3xl overflow-hidden h-72 flex items-center justify-center relative">
              <div className="text-center text-gray-400">
                <div className="text-5xl mb-3">📍</div>
                <p className="font-semibold text-gray-600">정자역프라자 707호</p>
                <p className="text-sm mt-1">분당선 정자역 도보 1분</p>
              </div>
              <div className="absolute bottom-4 right-4">
                <a
                  href="https://map.naver.com/v5/search/경기도 성남시 분당구 성남대로 345 정자역프라자 707호"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold px-4 py-2 rounded-full transition-colors"
                >
                  네이버 지도 보기
                </a>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <div className="flex-1 bg-gray-50 rounded-2xl p-4">
                <div className="text-xs text-gray-400 mb-1">🚇 지하철</div>
                <p className="text-sm font-semibold text-gray-700">분당선 정자역 1번 출구</p>
                <p className="text-xs text-gray-400">도보 1분</p>
              </div>
              <div className="flex-1 bg-gray-50 rounded-2xl p-4">
                <div className="text-xs text-gray-400 mb-1">🅿️ 주차</div>
                <p className="text-sm font-semibold text-gray-700">건물 내 주차 가능</p>
                <p className="text-xs text-gray-400">방문 시 주차 확인</p>
              </div>
            </div>
          </motion.div>

          {/* 운영 정보 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-5"
          >
            <div className="bg-teal-50 rounded-2xl p-6">
              <h3 className="font-black text-gray-900 mb-4 text-lg">운영 시간</h3>
              <div className="space-y-3">
                {[
                  { day: "평일 (월~금)", time: "11:00 ~ 21:00", note: "점심 14:00~15:00", highlight: false },
                  { day: "토요일", time: "09:00 ~ 15:00", note: "", highlight: false },
                  { day: "일요일", time: "휴 진", note: "", highlight: true },
                  { day: "공휴일", time: "11:00 ~ 18:00", note: "", highlight: false },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between py-2 border-b border-teal-100 last:border-0 ${
                      item.highlight ? "opacity-40" : ""
                    }`}
                  >
                    <span className="text-sm font-semibold text-gray-700">{item.day}</span>
                    <div className="text-right">
                      <span className={`text-sm font-bold ${item.highlight ? "text-gray-400" : "text-teal-700"}`}>
                        {item.time}
                      </span>
                      {item.note && (
                        <div className="text-xs text-gray-400">{item.note}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4 text-lg">연락처</h3>
              <div className="space-y-3">
                {[
                  { icon: "📞", label: "전화", value: "031-713-2784", href: "tel:031-713-2784" },
                  { icon: "💬", label: "문자", value: "010-9877-2784", href: "sms:010-9877-2784" },
                  { icon: "🟡", label: "카카오채널", value: "resambd", href: "https://pf.kakao.com/_resambd" },
                  { icon: "📍", label: "주소", value: "경기도 성남시 분당구 성남대로 345\n정자역프라자 707호", href: "" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="text-xs text-gray-400">{item.label}</div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-semibold text-teal-700 hover:text-teal-500 transition-colors whitespace-pre-line"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-gray-700 whitespace-pre-line">{item.value}</p>
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
