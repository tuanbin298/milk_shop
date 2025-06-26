import { useEffect, useState } from "react";
import { formatMoney } from "../../utils/formatMoney";

export default function HotProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/products/getAll", {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        });

        if (res.ok) {
          const data = await res.json();

          // Shuffle mảng và lấy 20 sản phẩm đầu
          const shuffled = data.sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, 20);

          setProducts(selected);
        } else {
          console.error("Lỗi khi lấy danh sách sản phẩm");
        }
      } catch (err) {
        console.error("Lỗi kết nối API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-5 py-5 bg-white">
      {/* Title */}
      <h2 className="text-[28px] font-semibold text-[#F75385] ml-[10px] text-left">
        Các sản phẩm của shop
      </h2>

      {/* Loading */}
      {loading ? (
        <div className="text-center mt-6 text-gray-500">
          Đang tải sản phẩm...
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="flex justify-center">
            <div className="grid grid-cols-5 gap-4 mt-4 place-items-center">
              {products.map((product, index) => (
                <div
                  key={product.id || index}
                  className="w-[200px] text-center rounded-lg p-3 bg-white border-2 border-[#D2D2D2] 
                  hover:scale-105 transition-transform shadow-sm cursor-pointer"
                >
                  <div className="w-full h-[160px] flex items-center justify-center overflow-hidden mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="text-sm font-medium mb-1 h-[40px] line-clamp-2">
                    {product.name}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-red-600 font-bold text-sm">
                      {formatMoney(product.price)}
                    </p>
                    <button
                      className="text-[#F75385] text-sm font-medium border border-[#F75385] rounded-full px-3 py-1 
                    hover:bg-[#F75385] hover:text-pink-50 transition-colors"
                    >
                      Chi tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/milk-products")}
              className="text-[#F75385] border border-pink-300 rounded-full px-6 py-2 text-base 
              font-medium hover:bg-[#F75385] hover:text-pink-50 transition-colors"
            >
              Xem tất cả <span className="ml-1">➤</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
