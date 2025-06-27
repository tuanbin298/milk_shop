import { useState } from "react";

const ProductDetailInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (qty) => {
    console.log("Thêm vào giỏ:", qty);
  };

  const handlePreOrder = (qty) => {
    console.log("Đặt trước:", qty);
  };

  return (
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
          {product.price.toLocaleString()} VND
        </p>

        <p className="mb-4 text-base">
          Trạng Thái:{" "}
          <span className={product.status ? "text-green-600" : "text-red-600"}>
            {product.status ? "Còn hàng" : "Hết hàng"}
          </span>
        </p>

        <div className="flex gap-3">
          {product.status ? (
            <>
              <button
                onClick={() => handleAddToCart(quantity)}
                className="text-base px-4 py-2 rounded-full font-semibold bg-[#F75385] hover:bg-[#FAA4BD] text-white"
              >
                Thêm Vào Giỏ
              </button>
              <button
                onClick={() => handleAddToCart(quantity)}
                className="text-base px-4 py-2 rounded-full font-semibold bg-[#F75385] hover:bg-[#FAA4BD] text-white"
              >
                Mua Ngay
              </button>
            </>
          ) : (
            <button
              onClick={() => handlePreOrder(quantity)}
              className="text-base px-4 py-2 rounded-full font-semibold bg-[#F75385] hover:bg-[#FAA4BD] text-white"
            >
              Đặt Trước
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailInfo;
