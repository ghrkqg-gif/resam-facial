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

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  안면비대칭: { bg: "bg-teal-500/20", text: "text-teal-300", border: "border-teal-500/50" },
  두상교정: { bg: "bg-cyan-500/20", text: "text-cyan-300", border: "border-cyan-500/50" },
  순수본교정: { bg: "bg-emerald-500/20", text: "text-emerald-300", border: "border-emerald-500/50" },
  연예인교정: { bg: "bg-amber-500/20", text: "text-amber-300", border: "border-amber-500/50" },
  비강벌룬추나: { bg: "bg-purple-500/20", text: "text-purple-300", border: "border-purple-500/50" },
};

function getCategoryStyle(cat: string) {
  return (
    CATEGORY_COLORS[cat] ?? {
      bg: "bg-white/10",
      text: "text-teal-300",
      border: "border-white/20",
    }
  );
}

export default function EventSection() {
  const [items, setItems] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("전체");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
    <section
      id="events"
      ref={ref}
      className="py-24 bg-gradient-to-br from-[#0f172a] via-[#0d2d2a] to-[#0f172a] relative overflow-hidden"
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl opacity-5" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-white/10 text-teal-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            진행 중인 이벤트
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            리샘 특가 이벤트
          </h2>
          <p className="text-teal-200/60 max-w-xl mx-auto">
            지금 바로 신청하면 더 저렴하게 시작할 수 있습니다.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 왼쪽 사이드바 — 카테고리 필터 */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-48 flex-shrink-0"
          >
            <div className="lg:sticky lg:top-24 bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4">
              <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-3 px-1">
                카테고리
              </p>
              <div className="flex lg:flex-col gap-2 flex-wrap">
                {loading
                  ? [1, 2, 3].map((i) => (
                      <div key={i} className="h-9 bg-white/5 rounded-xl animate-pulse w-full" />
                    ))
                  : categories.map((cat) => {
                      const style = getCategoryStyle(cat);
                      const isActive = filter === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setFilter(cat)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                            isActive
                              ? `${style.bg} ${style.text} ${style.border}`
                              : "text-white/50 border-transparent hover:text-white/80 hover:bg-white/5"
                          }`}
                        >
                          {cat}
                          {isActive && (
                            <span className="ml-1 text-xs opacity-70">
                              ({filter === "전체" ? items.length : filtered.length})
                            </span>
                          )}
                        </button>
                      );
                    })}
              </div>
            </div>
          </motion.aside>

          {/* 오른쪽 카드 그리드 */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white/5 rounded-3xl overflow-hidden animate-pulse">
                    <div className="h-44 bg-white/5" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-white/5 rounded-full w-3/4" />
                      <div className="h-3 bg-white/5 rounded-full w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-teal-300/40">
                <div className="text-5xl mb-4">🎉</div>
                <p>진행 중인 이벤트가 없습니다.</p>
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
                    const style = getCategoryStyle(event.category);
                    return (
                      <motion.div
                        key={event.id || i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        className="group bg-white/5 backdrop-blur border border-white/10 hover:border-teal-400/40 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-teal-900/40"
                      >
                        {/* 이미지 */}
                        <div className="relative h-44 bg-gradient-to-br from-teal-900/60 to-cyan-900/40 overflow-hidden">
                          {event.image_url ? (
                            <img
                              src={event.image_url}
                              alt={event.title}
                              className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-teal-400/30">
                              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-xs">이미지 없음</span>
                            </div>
                          )}

                          {/* 할인율 뱃지 */}
                          {discount !== null && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-lg">
                              {discount}% OFF
                            </div>
                          )}

                          {/* 카테고리 뱃지 */}
                          {event.category && (
                            <div
                              className={`absolute top-3 right-3 ${style.bg} ${style.text} border ${style.border} backdrop-blur text-xs font-semibold px-2.5 py-1 rounded-full`}
                            >
                              {event.category}
                            </div>
                          )}
                        </div>

                        {/* 내용 */}
                        <div className="p-5">
                          <h3 className="font-bold text-white text-sm leading-snug mb-4 line-clamp-2 group-hover:text-teal-300 transition-colors">
                            {event.title}
                          </h3>

                          <div className="flex items-end justify-between">
                            <div>
                              {event.original_price && (
                                <p className="text-white/30 text-xs line-through mb-0.5">
                                  {formatPrice(event.original_price)}
                                </p>
                              )}
                              {event.sale_price && (
                                <p className="text-teal-300 font-black text-lg">
                                  {formatPrice(event.sale_price)}
                                </p>
                              )}
                            </div>

                            <a
                              href="#consult"
                              onClick={(e) => e.stopPropagation()}
                              className="flex-shrink-0 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-teal-700/40"
                            >
                              신청하기
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
