export default function Footer() {
  return (
    <footer className="border-t-4 border-[#98c9e2] bg-gray-50 py-8 ">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* VỀ MẦM SỮA */}
        <div>
          <h3 className="text-lg font-bold mb-2">
            VỀ MẦM SỮA
            <div className="w-6 h-1 bg-blue-400 mt-1"></div>
          </h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Giới thiệu Mầm Sữa</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        {/* HƯỚNG DẪN */}
        <div>
          <h3 className="text-lg font-bold mb-2">
            HƯỚNG DẪN
            <div className="w-6 h-1 bg-blue-400 mt-1"></div>
          </h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Hướng dẫn mua hàng</li>
            <li>Hướng dẫn thanh toán</li>
          </ul>
        </div>

        {/* CHÍNH SÁCH */}
        <div>
          <h3 className="text-lg font-bold mb-2">
            CHÍNH SÁCH
            <div className="w-6 h-1 bg-blue-400 mt-1"></div>
          </h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Chính sách bảo mật thông tin</li>
            <li>Chính sách đổi hàng & bảo hành</li>
          </ul>
        </div>

        {/* MẦM SỮA YÊU THƯƠNG */}
        <div>
          <h3 className="text-lg font-bold mb-2">
            MẦM SỮA YÊU THƯƠNG
            <div className="w-6 h-1 bg-blue-400 mt-1"></div>
          </h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start">
              <span className="mr-2">📍</span>
              C5 C7 đường số 12, P. Hưng Phú 1, Q. Cái Răng, TP Cần Thơ.
            </li>
            <li className="flex items-center">
              <span className="mr-2">📞</span>
              Hotline: <span className="text-red-600 font-semibold ml-1">1800 6886</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✉️</span>
              Mamsuayeuthuong@gmail.com
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
