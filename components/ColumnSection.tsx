"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface Column {
  id: string;
  title: string;
  content: string;
  youtube_url: string;
  date: string;
  visible: string;
}

function parseCSV(text: string): Column[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map((line) => {
    // CSV 파싱: 큰따옴표로 감싼 필드(쉼표 포함) 처리
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
    return obj as unknown as Column;
  });
}

function getYoutubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export default function ColumnSection() {
  const [items, setItems] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Column | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const SHEET_ID = "1AafPeCJmInBp0Few4r3JpfO201Q0jMI5IjGzqzELzbo";
    const SHEET_NAME = encodeURIComponent("칼럼");
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

  return (
    <section id="columns" ref={ref} className="py-24 bg-gradient-to-br from-[#0f172a] via-[#134e4a] to-[#0f172a]">
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-0 w-72 h-72 bg-teal-400 rounded-full blur-3xl opacity-5" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl opacity-5" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-white/10 text-teal-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            리샘 전문 칼럼
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            안면비대칭·뼈교정<br />
            <span className="text-teal-300">전문 칼럼</span>
          </h2>
          <p className="text-teal-200/60 max-w-xl mx-auto">
            안면비대칭과 두상교정에 대한 전문 정보를 영상과 함께 전달합니다.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 rounded-3xl h-56 animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center text-teal-300/50 py-20">등록된 칼럼이 없습니다.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => {
              const ytId = getYoutubeId(item.youtube_url);
              return (
                <motion.div
                  key={item.id || i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => setSelected(item)}
                  className="group cursor-pointer bg-white/5 backdrop-blur border border-white/10 hover:border-teal-400/50 hover:bg-white/10 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/30"
                >
                  {/* 썸네일 */}
                  <div className="relative h-40 bg-teal-900/40 overflow-hidden">
                    {ytId ? (
                      <img
                        src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-teal-400/40">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                    {ytId && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-red-600/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur text-white text-xs px-2 py-1 rounded-full">
                      {item.date}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-white text-sm leading-snug mb-2 line-clamp-2 group-hover:text-teal-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-teal-200/50 text-xs leading-relaxed line-clamp-3">{item.content}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* 모달 */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f172a] border border-teal-500/30 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-teal-900/50"
            >
              {/* 유튜브 영상 */}
              {getYoutubeId(selected.youtube_url) && (
                <div className="relative pt-[56.25%] bg-black rounded-t-3xl overflow-hidden">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${getYoutubeId(selected.youtube_url)}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-black text-white mb-1">{selected.title}</h3>
                    <span className="text-teal-400/60 text-xs">{selected.date}</span>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all flex-shrink-0 ml-4"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-teal-100/70 text-sm leading-relaxed whitespace-pre-line">
                  {selected.content}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
