"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Review {
  id: string;
  name: string;
  category: string;
  content: string;
  rating: string;
  visible: string;
}

function parseCSV(text: string): Review[] {
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
    return obj as unknown as Review;
  });
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-4 h-4 ${s <= rating ? "text-amber-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  안면비대칭: "bg-teal-100 text-teal-700",
  두상교정: "bg-cyan-100 text-cyan-700",
  순수본교정: "bg-emerald-100 text-emerald-700",
  연예인교정: "bg-amber-100 text-amber-700",
  비강벌룬추나: "bg-purple-100 text-purple-700",
};

export default function ReviewSection() {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("전체");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const SHEET_ID = "1AafPeCJmInBp0Few4r3JpfO201Q0jMI5IjGzqzELzbo";
    const SHEET_NAME = encodeURIComponent("후기");
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

  // 평균 별점
  const avgRating =
    items.length > 0
      ? (items.reduce((sum, i) => sum + (parseFloat(i.rating) || 0), 0) / items.length).toFixed(1)
      : "0";

  return (
    <section id="reviews" ref={ref} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-teal-50 text-teal-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            실제 고객 후기
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            리샘을 경험한<br />
            <span className="text-teal-600">고객들의 이야기</span>
          </h2>

          {/* 요약 통계 */}
          {!loading && items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 bg-teal-50 border border-teal-100 rounded-2xl px-6 py-3 mt-4"
            >
              <div className="text-3xl font-black text-teal-700">{avgRating}</div>
              <div>
                <StarRating rating={Math.round(parseFloat(avgRating))} />
                <div className="text-gray-400 text-xs mt-0.5">총 {items.length}개 후기</div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* 카테고리 필터 */}
        {!loading && categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 justify-center mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  filter === cat
                    ? "bg-teal-600 border-teal-600 text-white shadow-md"
                    : "border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* 후기 그리드 */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-3xl h-48 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-400 py-20">등록된 후기가 없습니다.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((review, i) => {
              const rating = parseFloat(review.rating) || 0;
              const catColor = CATEGORY_COLORS[review.category] ?? "bg-gray-100 text-gray-600";
              return (
                <motion.div
                  key={review.id || i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.07, 0.5) }}
                  className="bg-white border border-gray-100 hover:border-teal-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4"
                >
                  {/* 상단: 별점 + 카테고리 */}
                  <div className="flex items-start justify-between">
                    <StarRating rating={rating} />
                    {review.category && (
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catColor}`}>
                        {review.category}
                      </span>
                    )}
                  </div>

                  {/* 내용 */}
                  <p className="text-gray-700 text-sm leading-relaxed flex-1 line-clamp-5">
                    &ldquo;{review.content}&rdquo;
                  </p>

                  {/* 하단: 이름 */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                    <div className="w-7 h-7 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-xs">
                      {review.name?.charAt(0) ?? "?"}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{review.name}</span>
                    <span className="ml-auto text-xs text-amber-500 font-bold">
                      {"★".repeat(Math.round(rating))}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <a
            href="#consult"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1"
          >
            나도 시작하기 →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
