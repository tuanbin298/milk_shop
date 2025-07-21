import { useState } from "react";
import { formatMoney } from "../../utils/formatMoney";
import toast, { Toaster } from "react-hot-toast";

const ProductDetailInfo = ({ product }) => {
  const token = localStorage.getItem("sessionToken");
  const [isPreOrderOpen, setIsPreOrderOpen] = useState(false);
  const [preOrderQty, setPreOrderQty] = useState(1);

  const handleAddToCart = async (e) => {
    try {
      const createCart = await fetch(`http://localhost:8080/api/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: preOrderQty,
        }),
      });

      if (createCart.ok) {
        toast.success("Đã thêm vào giỏ hàng!", {
          icon: "🛒",
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#982B1C",
          },
          iconTheme: {
            primary: "#982B1C",
            secondary: "#FFFAEE",
          },
        });

        window.dispatchEvent(new Event("cart-updated"));
      } else {
        console.error("Lỗi khi thêm sản phẩm vào giõ hàng!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giõ hàng", error);
    }
  };

  const handlePreOrderSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/preorders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: preOrderQty,
        }),
      });
      console.log(preOrderQty);
      if (response.ok) {
        toast.success("Yêu cầu đặt trước đã được gửi!");
        setIsPreOrderOpen(false);
        setPreOrderQty(1);
      } else {
        const errorText = await response.text();
        console.error("Lỗi đặt trước:", errorText);
        toast.error("Đặt trước thất bại. Vui lòng thử lại!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex gap-10 flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="w-full max-w-md aspect-[4/3] overflow-hidden border-2 border-gray-300 rounded">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="mb-2 text-lg text-gray-500">{product.description}</p>

          <p className="mb-2 text-lg text-gray-500">
            Thương hiệu: {product.brandName}
          </p>
          <p className="mb-2 text-lg text-gray-500">
            Phân loại: {product.categoryName}
          </p>

          <p className="text-2xl text-red-600 font-semibold mb-2">
            {formatMoney(product.price)}
          </p>

          <p className="mb-4 text-base">
            Trạng Thái:{" "}
            <span
              className={product.status ? "text-green-600" : "text-red-600"}
            >
              {product.status ? "Còn hàng" : "Hết hàng"}
            </span>
          </p>

          <div className="flex gap-3">
            {product.status ? (
              <>
                <button
                  onClick={() => handleAddToCart()}
                  className="text-base px-4 py-2 rounded-full font-semibold bg-[#F75385] hover:bg-[#FAA4BD] text-white"
                >
                  Thêm Vào Giỏ
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsPreOrderOpen(true)}
                className="text-base px-4 py-2 rounded-full font-semibold bg-[#F75385] hover:bg-[#FAA4BD] text-white"
              >
                Đặt Trước
              </button>
            )}
          </div>
        </div>
      </div>
      {isPreOrderOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Đặt Trước Sản Phẩm</h2>

            <label className="block mb-2 font-medium">Số lượng</label>
            <input
              type="number"
              min={1}
              value={preOrderQty}
              onChange={(e) => setPreOrderQty(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsPreOrderOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handlePreOrderSubmit}
                className="px-4 py-2 bg-[#F75385] text-white rounded hover:bg-[#FAA4BD]"
              >
                Gửi yêu cầu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailInfo;
