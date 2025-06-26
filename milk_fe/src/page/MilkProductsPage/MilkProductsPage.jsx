import { useEffect, useState } from "react";
import { formatMoney } from "../../utils/formatMoney";

const ITEMS_PER_PAGE = 12;

export default function MilkProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/products/getAll");

        if (res.ok) {
          const data = await res.json();

          // Lọc sản phẩm chứa từ khóa "sữa"
          const milkProducts = data.filter((product) =>
            product.name.toLowerCase().includes("sữa")
          );

          setProducts(milkProducts);
          setFilteredProducts(milkProducts);
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

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="px-5 py-5 bg-white">
      <h2 className="text-[28px] font-semibold text-[#F75385] mb-4">
        Tất cả sản phẩm sữa
      </h2>

      {loading ? (
        <p className="text-gray-500">Đang tải sản phẩm...</p>
      ) : (
        <>
          {paginatedProducts.length === 0 ? (
            <p className="text-gray-600">Không có sản phẩm sữa nào.</p>
          ) : (
            <div className="grid grid-cols-4 gap-4 place-items-center">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-[220px] text-center rounded-lg p-3 bg-white border border-gray-300 
                  hover:shadow-md hover:scale-105 transition-transform"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[160px] object-cover mb-2 rounded"
                  />
                  <p className="text-sm font-medium mb-1 h-[40px] line-clamp-2">
                    {product.name}
                  </p>
                  <p className="text-red-600 font-bold text-sm mb-2">
                    {formatMoney(product.price)}
                  </p>
                  <button className="text-[#F75385] border border-[#F75385] rounded-full px-3 py-1 text-sm hover:bg-[#F75385] hover:text-white">
                    Chi tiết
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-full border ${
                    currentPage === i + 1
                      ? "bg-[#F75385] text-white"
                      : "border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
