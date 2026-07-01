export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">리샘</span>
              </div>
              <span className="text-white font-bold text-lg">리샘한의원 분당점</span>
            </div>
            <p className="text-sm leading-relaxed">
              안면비대칭·두상교정 전문<br />
              한방 클리닉
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">진료 안내</h4>
            <ul className="space-y-1 text-sm">
              <li>평일: 11:00 ~ 21:00 (점심 14~15시)</li>
              <li>토요일: 09:00 ~ 15:00</li>
              <li className="text-red-400">일요일: 휴진</li>
              <li>공휴일: 11:00 ~ 18:00</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">연락처</h4>
            <ul className="space-y-1 text-sm">
              <li>📞 031-713-2784</li>
              <li>💬 010-9877-2784 (문자)</li>
              <li>🟡 카카오: resambd</li>
              <li className="mt-2">
                경기도 성남시 분당구 성남대로 345<br />
                정자역프라자 707호
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2024 리샘한의원 분당점. All rights reserved.</p>
          <p className="text-center">
            본 웹사이트의 내용은 의료 광고 심의를 받은 내용입니다.
            교정 효과는 개인에 따라 다를 수 있습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
