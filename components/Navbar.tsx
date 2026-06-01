"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "뼈교정 소개", href: "#about" },
  { label: "케이스", href: "#cases" },
  { label: "유형 분류", href: "#types" },
  { label: "프로그램", href: "#programs" },
  { label: "비용 안내", href: "#pricing" },
  { label: "왜 리샘인가", href: "#why" },
  { label: "오시는 길", href: "#location" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur shadow-lg shadow-teal-900/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* 로고 */}
          <a href="#" className={`text-xl font-black transition-colors ${scrolled ? "text-teal-700" : "text-white"}`}>
            리 샘
          </a>

          {/* PC 메뉴 */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-teal-500 ${
                  scrolled ? "text-gray-600" : "text-white/80"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#consult"
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-5 py-2 rounded-full text-sm transition-all duration-300"
            >
              상담 신청
            </a>
          </div>

          {/* 모바일 햄버거 */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 transition-colors ${
              scrolled ? "text-gray-700" : "text-white"
            }`}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-current block rounded-full"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-current block rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-current block rounded-full"
            />
          </button>
        </div>
      </motion.nav>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white shadow-xl border-t border-teal-50"
          >
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 font-medium py-2 border-b border-gray-50 hover:text-teal-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#consult"
                onClick={() => setMenuOpen(false)}
                className="bg-teal-600 text-white font-bold text-center py-3 rounded-full hover:bg-teal-500 transition-colors"
              >
                무료 상담 신청하기
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
