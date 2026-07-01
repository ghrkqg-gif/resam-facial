"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "이벤트", href: "#events" },
  { label: "상담신청", href: "#consult" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? "shadow-sm border-b border-gray-100" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* 로고 */}
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-sm">리샘</span>
            </div>
            <span className="text-gray-800 font-bold text-sm leading-tight hidden sm:block">
              리샘한의원 <span className="text-gray-400 font-normal">분당점</span>
            </span>
          </a>

          {/* PC 메뉴 */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors px-4 py-2 rounded-lg hover:bg-indigo-50"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:031-713-2784"
              className="ml-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2 rounded-full text-sm transition-all duration-200 flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              031-713-2784
            </a>
          </div>

          {/* 모바일 햄버거 */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 text-gray-600"
            aria-label="메뉴"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-current block rounded-full" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-0.5 bg-current block rounded-full" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-current block rounded-full" />
          </button>
        </div>
      </motion.nav>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white shadow-lg border-t border-gray-100"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 font-medium py-3 border-b border-gray-50 hover:text-indigo-600 transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:031-713-2784"
                onClick={() => setMenuOpen(false)}
                className="mt-2 bg-indigo-600 text-white font-bold text-center py-3 rounded-full hover:bg-indigo-500 transition-colors text-sm"
              >
                📞 031-713-2784
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
