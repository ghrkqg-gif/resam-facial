"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

const SHEET_ID = "1AafPeCJmInBp0Few4r3JpfO201Q0jMI5IjGzqzELzbo";
const SHEET_NAME = "이벤트";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;

interface EventItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  original_price: string;
  sale_price: string;
  visible: string;
}

function parseCSV(text: string): EventItem[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map((line) => {
    const fields: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        fields.push(current); current = "";
      } else {
        current += ch;
      }
    }
    fields.push(current);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h] = fields[i]?.trim() ?? ""));
    return obj as unknown as EventItem;
  });
}

function formatPrice(raw: string): string {
  const n = parseInt(raw.replace(/[^0-9]/g, ""), 10);
  if (isNaN(n)) return raw;
  return n.toLocaleString("ko-KR") + "원";
}

function discountRate(original: string, sale: string): number | null {
  const o = parseInt(original.replace(/[^0-9]/g, ""), 10);
  const s = parseInt(sale.replace(/[^0-9]/g, ""), 10);
  if (!o || !s || s >= o) return null;
  return Math.round((1 - s / o) * 100);
}

function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-violet-100 flex flex-col items-center justify-center gap-2">
        <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>
        <span className="text-indigo-400 text-xs font-medium">이미지 준비 중</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={() => setErrored(true)}
    />
  );
}

function EventCard({ item, index }: { item: EventItem; index: number }) {
  const rate = discountRate(item.original_price, item.sale_price);
  const hasOriginal = item.original_price && item.original_price !== item.sale_price;

  return (
    <motion.div
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:shadow-indigo-100 hover:border-indigo-200 transition-all group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
    >
      {/* 이미지 영역 */}
      <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
        <ImageWithFallback src={item.image_url} alt={item.title} />
        {/* 카테고리 뱃지 */}
        {item.category && (
          <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-indigo-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-indigo-200 shadow-sm">
            {item.category}
          </span>
        )}
        {/* 할인율 뱃지 */}
        {rate !== null && (
          <span className="absolute top-2.5 right-2.5 bg-indigo-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow">
            {rate}% OFF
          </span>
        )}
      </div>

      {/* 텍스트 영역 */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-gray-800 leading-snug mb-3 line-clamp-2 group-hover:text-indigo-700 transition-colors">
          {item.title}
        </h3>
        <div className="flex items-end justify-between gap-2">
          <div>
            {hasOriginal && (
              <p className="text-xs text-gray-400 line-through mb-0.5">
                {formatPrice(item.original_price)}
              </p>
            )}
            <p className="text-base font-extrabold text-gray-900">
              {formatPrice(item.sale_price)}
            </p>
          </div>
          {rate !== null && (
            <span className="text-indigo-600 text-sm font-extrabold flex-shrink-0">
              {rate}% 할인
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function EventSection() {
  const [items, setItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState("전체");

  useEffect(() => {
    fetch(CSV_URL)
      .then((r) => { if (!r.ok) throw new Error(); return r.text(); })
      .then((text) => {
        setItems(parseCSV(text).filter((i) => i.visible?.toUpperCase() === "Y"));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map((i) => i.category).filter(Boolean)));
    return ["전체", ...cats];
  }, [items]);

  const filtered = useMemo(
    () => activeCategory === "전체" ? items : items.filter((i) => i.category === activeCategory),
    [items, activeCategory]
  );

  return (
    <section id="events" className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* 섹션 제목 */}
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900">
            이벤트
            {!loading && items.length > 0 && (
              <span className="ml-2 text-indigo-500 text-lg font-bold">{filtered.length}</span>
            )}
          </h2>
          <p className="text-gray-500 text-sm mt-1">현재 진행 중인 특가 이벤트를 확인해보세요.</p>
        </div>

        <div className="flex gap-6 items-start">
          {/* 카테고리 사이드바 */}
          {!loading && !error && categories.length > 1 && (
            <aside className="hidden sm:block w-36 flex-shrink-0 sticky top-20">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">카테고리</p>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg font-medium transition-all ${
                        activeCategory === cat
                          ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                          : "text-gray-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm"
                      }`}
                    >
                      {cat}
                      {cat === "전체" && !loading && (
                        <span className={`ml-1.5 text-xs ${activeCategory === cat ? "text-indigo-100" : "text-gray-400"}`}>
                          {items.length}
                        </span>
                      )}
                      {cat !== "전체" && !loading && (
                        <span className={`ml-1.5 text-xs ${activeCategory === cat ? "text-indigo-100" : "text-gray-400"}`}>
                          {items.filter((i) => i.category === cat).length}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* 메인 영역 */}
          <div className="flex-1 min-w-0">
            {/* 모바일 카테고리 가로 스크롤 */}
            {!loading && !error && categories.length > 1 && (
              <div className="sm:hidden flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex-shrink-0 text-sm px-4 py-2 rounded-full font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-600 border border-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* 로딩 */}
            {loading && (
              <div className="flex justify-center items-center py-24">
                <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* 에러 */}
            {error && (
              <div className="text-center py-24 text-gray-400 text-sm">
                이벤트 정보를 불러오는 중 오류가 발생했습니다.
              </div>
            )}

            {/* 빈 결과 */}
            {!loading && !error && filtered.length === 0 && (
              <div className="text-center py-24 text-gray-400 text-sm">
                {activeCategory === "전체" ? "등록된 이벤트가 없습니다." : `'${activeCategory}' 카테고리의 이벤트가 없습니다.`}
              </div>
            )}

            {/* 카드 그리드 */}
            {!loading && !error && filtered.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((item, i) => (
                  <EventCard key={item.id || i} item={item} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
