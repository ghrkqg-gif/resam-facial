"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "이벤트", href: "#events" },
  { label: "오시는 길", href: "#location" },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
          scrolled ? "shadow-sm border-b border-gray-100" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* 로고 */}
          <a href="/" className="text-xl font-black text-teal-700 tracking-tight">
            리샘
          </a>

          {/* PC 메뉴 */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-500 hover:text-teal-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:031-713-2784"
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-5 py-2 rounded-full text-sm transition-all duration-200"
            >
              📞 031-713-2784
            </a>
          </div>

          {/* 모바일 햄버거 */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 text-gray-600"
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
                  className="text-gray-700 font-medium py-3 border-b border-gray-50 hover:text-teal-600 transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:031-713-2784"
                onClick={() => setMenuOpen(false)}
                className="mt-2 bg-teal-600 text-white font-bold text-center py-3 rounded-full hover:bg-teal-500 transition-colors text-sm"
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
