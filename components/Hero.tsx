export default function Hero() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* 아이콘 */}
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-200">
          <span className="text-white font-extrabold text-xl">리샘</span>
        </div>

        {/* 텍스트 */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">리샘한의원 분당점</h1>
            <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-full border border-indigo-200">
              이벤트 진행 중
            </span>
          </div>
          <p className="text-gray-500 text-base">
            안면비대칭 · 두상교정 전문 한방 클리닉 &nbsp;|&nbsp; 경기도 성남시 분당구 정자역프라자 707호
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <a
              href="tel:031-713-2784"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              031-713-2784
            </a>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500">평일 11:00–21:00 &nbsp;·&nbsp; 토요일 09:00–15:00 &nbsp;·&nbsp; 일요일 휴진</span>
          </div>
        </div>
      </div>
    </section>
  );
}
