"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* 브랜드 */}
          <div>
            <div className="text-2xl font-black text-teal-400 mb-3">리 샘</div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              CT·X-ray·3D스캔으로 증명된<br />
              안면비대칭·두상교정 전문센터
            </p>
            <div className="text-xs text-gray-500">
              전지점 누적 교정케이스 <span className="text-teal-400 font-bold">30만+</span>
            </div>
          </div>

          {/* 운영시간 */}
          <div>
            <h4 className="font-bold text-gray-300 mb-3">운영 시간</h4>
            <div className="space-y-1.5 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>평일 (월~금)</span>
                <span className="text-gray-300">11:00 ~ 21:00</span>
              </div>
              <div className="flex justify-between">
                <span>점심 시간</span>
                <span className="text-gray-300">14:00 ~ 15:00</span>
              </div>
              <div className="flex justify-between">
                <span>토요일</span>
                <span className="text-gray-300">09:00 ~ 15:00</span>
              </div>
              <div className="flex justify-between">
                <span>일요일</span>
                <span className="text-gray-500">휴 진</span>
              </div>
              <div className="flex justify-between">
                <span>공휴일</span>
                <span className="text-gray-300">11:00 ~ 18:00</span>
              </div>
            </div>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="font-bold text-gray-300 mb-3">연락처 & 위치</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div>
                <span className="text-gray-500">전화: </span>
                <a href="tel:031-713-2784" className="text-teal-400 hover:text-teal-300">031-713-2784</a>
              </div>
              <div>
                <span className="text-gray-500">문자: </span>
                <a href="sms:010-9877-2784" className="text-teal-400 hover:text-teal-300">010-9877-2784</a>
              </div>
              <div>
                <span className="text-gray-500">카카오: </span>
                <span className="text-gray-300">resambd</span>
              </div>
              <div className="pt-1 text-gray-500 leading-relaxed">
                경기도 성남시 분당구<br />
                성남대로 345 정자역프라자 707호
              </div>
            </div>
          </div>
        </div>

        {/* 퀵 링크 */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            {[
              ["뼈교정 소개", "#about"],
              ["교정 케이스", "#cases"],
              ["비대칭 유형", "#types"],
              ["교정 프로그램", "#programs"],
              ["비용 안내", "#pricing"],
              ["왜 리샘인가", "#why"],
              ["상담 신청", "#consult"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="hover:text-teal-400 transition-colors">
                {label}
              </a>
            ))}
          </div>
          <p className="text-gray-600 text-xs">
            © 2024 리샘 안면비대칭·두상교정. All rights reserved.
          </p>
        </div>

        <div className="mt-4 text-center text-xs text-gray-700">
          * 교정 효과는 개인의 뼈 상태 및 비대칭 정도에 따라 다를 수 있습니다. 정확한 진단 및 결과는 초진 상담을 통해 안내드립니다.
        </div>
      </div>
    </footer>
  );
}
