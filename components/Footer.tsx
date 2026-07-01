"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* 브랜드 */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs">리샘</span>
              </div>
              <span className="text-white font-bold text-sm">리샘한의원 분당점</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              안면비대칭·두상교정 전문 한방 클리닉<br />
              전지점 누적 교정케이스 <span className="text-indigo-400 font-bold">30만+</span>
            </p>
          </div>

          {/* 운영시간 */}
          <div>
            <h4 className="font-bold text-gray-300 mb-3 text-sm">운영 시간</h4>
            <div className="space-y-1.5 text-sm text-gray-400">
              {[
                ["평일 (월~금)", "11:00 ~ 21:00"],
                ["점심 시간", "14:00 ~ 15:00"],
                ["토요일", "09:00 ~ 15:00"],
                ["일요일", "휴 진"],
                ["공휴일", "11:00 ~ 18:00"],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between">
                  <span>{day}</span>
                  <span className={day === "일요일" ? "text-gray-600" : "text-gray-300"}>{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="font-bold text-gray-300 mb-3 text-sm">연락처 & 위치</h4>
            <div className="space-y-1.5 text-sm text-gray-400">
              <div>
                <span className="text-gray-500">전화: </span>
                <a href="tel:031-713-2784" className="text-indigo-400 hover:text-indigo-300 transition-colors">031-713-2784</a>
              </div>
              <div>
                <span className="text-gray-500">문자: </span>
                <a href="sms:010-9877-2784" className="text-indigo-400 hover:text-indigo-300 transition-colors">010-9877-2784</a>
              </div>
              <div>
                <span className="text-gray-500">카카오: </span>
                <span className="text-gray-300">resambd</span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed pt-1">
                경기도 성남시 분당구 성남대로 345<br />
                정자역프라자 707호
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            {[["이벤트", "#events"], ["오시는 길", "#location"]].map(([label, href]) => (
              <a key={href} href={href} className="hover:text-indigo-400 transition-colors">{label}</a>
            ))}
          </div>
          <p className="text-gray-700 text-xs">© 2024 리샘한의원 분당점. All rights reserved.</p>
        </div>

        <p className="mt-4 text-center text-xs text-gray-800">
          * 교정 효과는 개인의 상태에 따라 다를 수 있습니다. 정확한 진단은 초진 상담을 통해 안내드립니다.
        </p>
      </div>
    </footer>
  );
}
