// src/page/ProductPage/ProductDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetailInfo from "../../component/ProductDetail/ProductDetailInfo";
import RelatedProducts from "../../component/ProductDetail/RelatedProducts";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Lấy chi tiết sản phẩm
  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("sessionToken");
      try {
        const res = await fetch(`http://localhost:8080/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setProduct(data);

          if (data.categoryId) {
            fetchRelatedProducts(data.categoryId, data.id);
          } else {
            console.warn("❗ Sản phẩm không có categoryId");
          }
        } else {
          console.error("Không lấy được thông tin sản phẩm");
        }
      } catch (err) {
        console.error("Lỗi kết nối đến API:", err);
      }
    };

    fetchProduct();
  }, [id]);

  // Lấy sản phẩm liên quan
  const fetchRelatedProducts = async (categoryId, productId) => {
    const token = localStorage.getItem("sessionToken");
    try {
      const res = await fetch("http://localhost:8080/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();

        // Lọc sản phẩm cùng categoryId, khác sản phẩm hiện tại
        const related = data.filter(
          (item) => item.id !== productId && item.categoryId === categoryId
        );

        const shuffled = related.sort(() => 0.5 - Math.random());
        setRelatedProducts(shuffled); // không slice ở đây, sẽ slice trong render
      } else {
        console.error("Không thể lấy danh sách sản phẩm liên quan");
      }
    } catch (err) {
      console.error("Lỗi kết nối API:", err);
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
    <div className="p-8 max-w-screen-xl mx-auto">
      <ProductDetailInfo product={product} />

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Các sản phẩm cùng loại</h2>
        {relatedProducts.length > 0 ? (
          <>
            <RelatedProducts products={relatedProducts.slice(0, 5)} />

            {relatedProducts.length > 5 && (
              <div className="text-right mt-3">
                <button
                  onClick={() =>
                    navigate(`/products?category=${product.categoryId}`)
                  }
                  className="text-sm text-[#F75385] hover:underline"
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
    </div>
  );
};

export default ProductDetailPage;
