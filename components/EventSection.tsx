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
      if (ch === '"') { inQuote = !inQuote; }
      else if (ch === "," && !inQuote) { fields.push(cur.trim()); cur = ""; }
      else { cur += ch; }
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
  const countOf = (cat: string) =>
    cat === "전체" ? items.length : items.filter((i) => i.category === cat).length;

  return (
    <section id="events" ref={ref} className="bg-gray-50 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── 왼쪽 사이드바 ── */}
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="lg:w-44 flex-shrink-0"
          >
            <div className="lg:sticky lg:top-24">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 px-1">
                카테고리
              </p>
              <div className="flex lg:flex-col gap-2 flex-wrap">
                {loading
                  ? [1, 2, 3].map((i) => (
                      <div key={i} className="h-9 bg-gray-200 rounded-xl animate-pulse w-24 lg:w-full" />
                    ))
                  : categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                          filter === cat
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-800 hover:bg-white"
                        }`}
                      >
                        <span>{cat}</span>
                        <span
                          className={`text-[11px] rounded-full px-1.5 py-0.5 font-bold min-w-[20px] text-center ${
                            filter === cat
                              ? "bg-white/20 text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {countOf(cat)}
                        </span>
                      </button>
                    ))}
              </div>
            </div>
          </motion.aside>

          {/* ── 오른쪽 카드 그리드 ── */}
          <div className="flex-1 min-w-0">
            {/* 헤더 */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-between mb-5"
            >
              <h2 className="text-base font-bold text-gray-800">
                {filter === "전체" ? "전체 이벤트" : filter}
                {!loading && (
                  <span className="ml-1.5 text-sm font-normal text-gray-400">
                    {filtered.length}개
                  </span>
                )}
              </h2>
            </motion.div>

            {/* 로딩 스켈레톤 */}
            {loading ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-44 bg-gray-100" />
                    <div className="p-4 space-y-2.5">
                      <div className="h-3.5 bg-gray-100 rounded-full w-3/4" />
                      <div className="h-3 bg-gray-100 rounded-full w-1/2" />
                      <div className="h-4 bg-gray-100 rounded-full w-1/3 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-28 text-gray-300">
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                  transition={{ duration: 0.15 }}
                  className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4"
                >
                  {filtered.map((event, i) => {
                    const discount = calcDiscount(event.original_price, event.sale_price);
                    return (
                      <motion.article
                        key={event.id || i}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.04 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md
                                   transition-all duration-300 hover:-translate-y-0.5 group flex flex-col"
                      >
                        {/* ── 이미지 (위) ── */}
                        <div className="relative h-44 overflow-hidden bg-indigo-50 flex-shrink-0">
                          {event.image_url ? (
                            <img
                              src={event.image_url}
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-[1.03]
                                         transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2
                                            bg-gradient-to-br from-indigo-50 to-violet-50">
                              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <span className="text-indigo-300 text-xs">이미지 준비 중</span>
                            </div>
                          )}

                          {/* 카테고리 뱃지 — 좌상단 */}
                          {event.category && (
                            <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm
                                             text-gray-600 text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-sm">
                              {event.category}
                            </span>
                          )}

                          {/* 할인 뱃지 — 우상단 */}
                          {discount !== null && (
                            <span className="absolute top-2.5 right-2.5 bg-indigo-600 text-white
                                             text-[11px] font-black px-2 py-0.5 rounded-md shadow-sm tracking-tight">
                              {discount}% OFF
                            </span>
                          )}
                        </div>

                        {/* ── 정보 (아래) ── */}
                        <div className="p-4 flex flex-col flex-1">
                          {/* 제목 */}
                          <h3 className="text-sm font-semibold text-gray-800 leading-snug
                                         line-clamp-2 mb-3 flex-1">
                            {event.title}
                          </h3>

                          {/* 가격 + 버튼 */}
                          <div className="flex items-end justify-between gap-2 mt-auto">
                            <div className="min-w-0">
                              {event.original_price && (
                                <p className="text-[11px] text-gray-300 line-through leading-none mb-0.5">
                                  {formatPrice(event.original_price)}
                                </p>
                              )}
                              {event.sale_price && (
                                <p className="text-base font-black text-gray-900 leading-none">
                                  {formatPrice(event.sale_price)}
                                </p>
                              )}
                              {discount !== null && (
                                <p className="text-[11px] text-indigo-500 font-semibold mt-1 leading-none">
                                  {discount}% 할인 적용
                                </p>
                              )}
                            </div>
                            <a
                              href="tel:031-713-2784"
                              className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white
                                         text-xs font-bold px-3.5 py-2 rounded-xl transition-colors duration-200"
                            >
                              전화 신청
                            </a>
                          </div>
                        </div>
                      </motion.article>
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
