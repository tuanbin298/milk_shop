import { useEffect, useState } from "react";
import { formatMoney } from "../../utils/formatMoney";

const ITEMS_PER_PAGE = 12;

export default function MilkProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/products/getAll");

        if (!res.ok) throw new Error("Lỗi khi lấy danh sách sản phẩm");

        const data = await res.json();

        const milkProducts = data.filter((product) =>
          product.name.toLowerCase().includes("sữa")
        );

        setProducts(milkProducts);
      } catch (err) {
        console.error("Lỗi kết nối API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="px-5 py-6 bg-white min-h-screen">
      <h2 className="text-[28px] font-semibold text-[#F75385] mb-6">
        Tất cả sản phẩm sữa mẹ và bé
      </h2>

      {loading ? (
        <p className="text-gray-500">Đang tải sản phẩm...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-600">Không tìm thấy sản phẩm phù hợp.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-full text-sm text-gray-600 hover:bg-gray-100"
              >
                Đầu
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    currentPage === page
                      ? "bg-[#F75385] text-white"
                      : "border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-full text-sm text-gray-600 hover:bg-gray-100"
              >
                Cuối
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
