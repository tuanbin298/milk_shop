import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FeedbackSection() {
  const feedbacks = Array(10)
    .fill(null)
    .map((_, i) => ({
      quote: [
        "“Sản phẩm rất tuyệt vời, bé nhà mình dùng hợp lắm!”",
        "“Dịch vụ giao hàng nhanh chóng, đóng gói cẩn thận!”",
        "“Tư vấn nhiệt tình, giá cả hợp lý!”",
      ][i % 3],
      name: `Người dùng ${i + 1}`,
      description: "Khách hàng thân thiết",
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
    }));

  const visibleCount = 3;
  const [pageIndex, setPageIndex] = useState(0);

  const maxIndex = feedbacks.length - visibleCount;

  const prevSlide = () => {
    setPageIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setPageIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <div className="px-5 py-5 bg-white">
      <h2 className="text-[32px] font-bold text-[#F75385] mb-8 ">
        Feedback của khách hàng
      </h2>

      <div className="relative flex items-center justify-center">
        <button
          onClick={prevSlide}
          className="z-10 bg-white border border-gray-300 rounded-full p-3 shadow hover:bg-pink-100 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Track container */}
        <div className="w-[960px] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${(feedbacks.length * 100) / visibleCount}%`,
              transform: `translateX(-${
                (100 / feedbacks.length) * pageIndex
              }%)`,
            }}
          >
            {feedbacks.map((fb, idx) => (
              <div key={idx} className="w-[320px] flex-shrink-0 px-3">
                <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between h-full">
                  <p className="text-center text-black text-lg font-medium mb-6">
                    {fb.quote}
                  </p>

                  <div className="flex items-center">
                    <div className="basis-1/3 flex justify-center">
                      <img
                        src={fb.avatar}
                        alt={fb.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                    <div className="basis-2/3 pl-3">
                      <p className="text-sm font-semibold text-black truncate">
                        {fb.name}
                      </p>
                      <p className="text-sm text-gray-500">{fb.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="z-10 bg-white border border-gray-300 rounded-full p-3 shadow hover:bg-pink-100 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
