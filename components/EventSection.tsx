"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface Event {
  id: string;
  title: string;
  category: string;
  image_url: string;
  original_price: string;
  sale_price: string;
  visible: string;
}

function parseCSV(text: string): Event[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map((line) => {
    const fields: string[] = [];
    let cur = "";
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuote = !inQuote;
      } else if (ch === "," && !inQuote) {
        fields.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
    fields.push(cur.trim());
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h] = fields[i] ?? ""));
    return obj as unknown as Event;
  });
}

function formatPrice(price: string): string {
  const num = parseInt(price.replace(/[^0-9]/g, ""), 10);
  if (isNaN(num)) return price;
  return num.toLocaleString("ko-KR") + "원";
}

function calcDiscount(original: string, sale: string): number | null {
  const o = parseInt(original.replace(/[^0-9]/g, ""), 10);
  const s = parseInt(sale.replace(/[^0-9]/g, ""), 10);
  if (!o || !s || s >= o) return null;
  return Math.round(((o - s) / o) * 100);
}

export default function EventSection() {
  const [items, setItems] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("전체");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    const SHEET_ID = "1AafPeCJmInBp0Few4r3JpfO201Q0jMI5IjGzqzELzbo";
    const SHEET_NAME = encodeURIComponent("이벤트");
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
    fetch(url)
      .then((r) => r.text())
      .then((text) => {
        const data = parseCSV(text).filter((d) => d.visible?.toUpperCase() === "Y");
        setItems(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = ["전체", ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))];
  const filtered = filter === "전체" ? items : items.filter((i) => i.category === filter);

  return (
    <section id="events" ref={ref} className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* 왼쪽 사이드바 */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="lg:w-44 flex-shrink-0"
          >
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">카테고리</p>
              <div className="flex lg:flex-col gap-2 flex-wrap">
                {loading
                  ? [1, 2, 3].map((i) => (
                      <div key={i} className="h-9 bg-gray-200 rounded-xl animate-pulse w-24 lg:w-full" />
                    ))
                  : categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                          filter === cat
                            ? "bg-teal-600 text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-800 hover:bg-white"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
              </div>
            </div>
          </motion.aside>

          {/* 오른쪽 카드 그리드 */}
          <div className="flex-1 min-w-0">
            {/* 헤더 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-lg font-bold text-gray-800">
                {filter === "전체" ? "전체 이벤트" : filter}
                <span className="ml-2 text-sm font-normal text-gray-400">
                  {loading ? "" : `${filtered.length}개`}
                </span>
              </h2>
            </motion.div>

            {/* 카드 */}
            {loading ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-100" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-100 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                      <div className="h-5 bg-gray-100 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-gray-300">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">진행 중인 이벤트가 없습니다.</p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={filter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  {filtered.map((event, i) => {
                    const discount = calcDiscount(event.original_price, event.sale_price);
                    return (
                      <motion.div
                        key={event.id || i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
                      >
                        {/* 이미지 */}
                        <div className="relative h-48 overflow-hidden bg-teal-50">
                          {event.image_url ? (
                            <img
                              src={event.image_url}
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-teal-50 to-cyan-50">
                              <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center">
                                <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <span className="text-teal-300 text-xs">이미지 준비 중</span>
                            </div>
                          )}
                          {/* 할인율 뱃지 */}
                          {discount !== null && (
                            <div className="absolute top-3 left-3 bg-teal-600 text-white text-xs font-black px-2.5 py-1 rounded-lg">
                              {discount}% 할인
                            </div>
                          )}
                          {/* 카테고리 뱃지 */}
                          {event.category && (
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-gray-600 text-xs font-medium px-2.5 py-1 rounded-lg">
                              {event.category}
                            </div>
                          )}
                        </div>

                        {/* 내용 */}
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-3 line-clamp-2">
                            {event.title}
                          </h3>
                          <div className="flex items-end justify-between">
                            <div>
                              {event.original_price && (
                                <p className="text-gray-300 text-xs line-through mb-0.5">
                                  {formatPrice(event.original_price)}
                                </p>
                              )}
                              {event.sale_price && (
                                <p className="text-gray-900 font-black text-base">
                                  {formatPrice(event.sale_price)}
                                </p>
                              )}
                              {discount !== null && (
                                <p className="text-teal-600 text-xs font-semibold mt-0.5">
                                  {discount}% 절약
                                </p>
                              )}
                            </div>
                            <a
                              href="tel:031-713-2784"
                              className="flex-shrink-0 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors duration-200"
                            >
                              전화 신청
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
