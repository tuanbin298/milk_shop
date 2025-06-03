export default function HotProductSection() {
  const products = Array(20).fill({
    name: "Sữa Primavita 2 400g (Dành cho bé từ 6 -12 tháng )",
    code: "Primavita004",
    price: "390.000 ₫",
    image: "src/assets/img/product/product1.png",
  });

  return (
    <div className="px-5 py-5 bg-white">
      {/* Title */}
      <h2 className="text-[28px] font-semibold text-[#F75385] ml-[10px] text-left ">
        Các sản phẩm của shop
      </h2>

      {/* Grid */}
      <div className="flex justify-center ">
        <div className="grid grid-cols-5 gap-4 mt-4 place-items-center">
          {products.map((product, index) => (
            <div
              key={index}
              className="w-[200px] text-center rounded-lg p-3 bg-white hover:scale-105 transition-transform"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto mb-3"
              />
              <p className="text-sm mb-1">{product.name}</p>

              {/* Giá + Nút Chi tiết */}
              <div className="flex justify-between items-center">
                <p className="text-red-600 font-bold text-sm">
                  {product.price}
                </p>
                <button className="text-[#F75385] text-sm font-medium border border-[#F75385] rounded-full px-3 py-1 hover:bg-[#F75385] hover:text-pink-50 transition-colors">
                  Chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <button className="text-[#F75385] border border-pink-300 rounded-full px-6 py-2 text-base font-medium hover:bg-[#F75385] hover:text-pink-50 transition-colors">
          Xem tất cả <span className="ml-1">➤</span>
        </button>
      </div>
    </div>
  );
}
