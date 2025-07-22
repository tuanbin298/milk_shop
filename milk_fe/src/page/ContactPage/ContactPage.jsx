import React from "react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white px-5 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Liên hệ với chúng tôi</h1>

      <p className="mb-6 text-gray-700 text-base">
        Nếu bạn có bất kỳ câu hỏi, phản hồi, hoặc cần hỗ trợ, vui lòng liên hệ qua thông tin sau:
      </p>

      <div className="space-y-4 text-gray-800 text-base">
        <p>
          <span className="font-semibold">📞 Hotline:</span> 1800 6886
        </p>
        <p>
          <span className="font-semibold">✉️ Email:</span> Mamsuayeuthuong@gmail.com
        </p>
        <p>
          <span className="font-semibold">📍 Địa chỉ:</span> C5 C7 đường số 12, P. Hưng Phú 1, Q. Cái Răng, TP Cần Thơ
        </p>
      </div>
    </div>
  );
}
