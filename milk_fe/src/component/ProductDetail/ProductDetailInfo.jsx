// src/component/ProductDetail/ProductDetailInfo.jsx
import React from "react";

const ProductDetailInfo = ({ product }) => {
  return (
    <div className="flex gap-10">
      <div className="w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md"
        />
      </div>
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-2">
          Mã sản phẩm: <strong>{product.code}</strong>
        </p>
        <p className="text-2xl text-red-600 font-semibold mb-2">
          {product.price.toLocaleString()} VND
        </p>
        <p className="text-green-600 mb-4">Trạng Thái: {product.status}</p>
        <button className="bg-[#F75385] hover:bg-[#E195AB] text-white px-6 py-2 rounded">
          Thêm vào giỏ hàng
        </button>
        <p className="mt-4 text-sm text-gray-500">
          Text box for additional details or fine print
        </p>
      </div>
    </div>
  );
};

export default ProductDetailInfo;
