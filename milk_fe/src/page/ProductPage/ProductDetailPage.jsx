import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetailInfo from "../ProductDetail/ProductDetailInfo";
import RelatedProducts from "../ProductDetail/RelatedProducts";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productFeedbacks, setProductFeedbacks] = useState([]); // ✅ thêm state feedback

  // fetch product detail
  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("sessionToken");
      try {
        const res = await fetch(
          `http://localhost:8080/api/products/get/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setProduct(data);

          if (data.categoryId) {
            fetchRelatedProducts(data.categoryId, data.id);
          } else {
            console.warn("❗ Sản phẩm không có categoryId");
          }

          fetchProductFeedbacks(data.id); // ✅ gọi API feedback
        } else {
          console.error("Không lấy được thông tin sản phẩm");
        }
      } catch (err) {
        console.error("Lỗi kết nối đến API:", err);
      }
    };

    fetchProduct();
  }, [id]);

  // fetch related product
  const fetchRelatedProducts = async (categoryId, productId) => {
    const token = localStorage.getItem("sessionToken");
    try {
      const res = await fetch("http://localhost:8080/api/products/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();

        // filter by categoryId
        const related = data.filter(
          (item) => item.id !== productId && item.categoryId === categoryId
        );

        const shuffled = related.sort(() => 0.5 - Math.random());
        setRelatedProducts(shuffled);
      } else {
        console.error("Không thể lấy danh sách sản phẩm liên quan");
      }
    } catch (err) {
      console.error("Lỗi kết nối API:", err);
    }
  };

  // ✅ fetch product feedbacks
  const fetchProductFeedbacks = async (productId) => {
    const token = localStorage.getItem("sessionToken");
    try {
      const res = await fetch(
        `http://localhost:8080/api/feedbacks/product/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setProductFeedbacks(data);
      } else {
        console.error("Không lấy được feedback sản phẩm");
      }
    } catch (err) {
      console.error("Lỗi khi gọi API feedback:", err);
    }
  };

  if (!product) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Đang tải thông tin sản phẩm...
      </p>
    );
  }

  return (
    <div className="p-8 max-w-screen-xl mx-auto bg-white">
      <ProductDetailInfo product={product} />

      <div className="mt-12">
        <h2 className="text-4xl font-semibold mb-8">Các sản phẩm cùng loại</h2>
        {relatedProducts.length > 0 ? (
          <>
            <RelatedProducts products={relatedProducts.slice(0, 5)} />

            {relatedProducts.length > 5 && (
              <div className="text-right mt-3">
                <button
                  onClick={() => {
                    const category = product.categoryName?.toLowerCase() || "";
                    if (category.includes("baby")) {
                      navigate("/baby");
                    } else if (
                      category.includes("women") ||
                      category.includes("mom")
                    ) {
                      navigate("/mom");
                    } else {
                      alert("Không xác định được loại sản phẩm.");
                    }
                  }}
                  className="pt-4 text-sm text-[#F75385] hover:underline"
                >
                  Xem tất cả sản phẩm cùng loại ➤
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500">Không có sản phẩm liên quan.</p>
        )}
      </div>

      {/* ✅ Hiển thị feedback */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-6">Phản hồi từ khách hàng</h2>

        {productFeedbacks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productFeedbacks.slice(0, 3).map((fb) => (
              <div
                key={fb.id}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm flex flex-col justify-between text-center"
              >
                <p className="font-semibold text-gray-800 mb-2">
                  {fb.username || "Ẩn danh"}
                </p>
                <p className="text-gray-700 text-sm mb-4">{fb.comment}</p>

                <div className="flex justify-center items-center">
                  <div className="flex space-x-1 text-yellow-500 text-lg">
                    {"⭐".repeat(fb.rating)}
                  </div>
                  <span className="text-gray-500 text-sm ml-1">
                    ({fb.rating}/5)
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            Chưa có phản hồi nào cho sản phẩm này.
          </p>
        )}

        {productFeedbacks.length > 3 && (
          <div className="text-right mt-4">
            <button
              onClick={() =>
                alert("Chức năng xem thêm phản hồi sẽ được bổ sung sau.")
              }
              className="text-sm text-[#F75385] hover:underline"
            >
              Xem thêm phản hồi ➤
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
