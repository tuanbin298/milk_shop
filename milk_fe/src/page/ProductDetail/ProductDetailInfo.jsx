import { useState } from "react";
import { Box, IconButton, TextField, Typography, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const ProductDetailInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (qty) => {
    console.log("Thêm vào giỏ:", qty);
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

        <p className="mb-4 mt-4 text-lg text-gray-500">{product.description}</p>

        <p className="text-2xl text-red-600 font-semibold mb-2">
          {product.price.toLocaleString()} VND
        </p>

        <p className="text-green-600 mb-4">
          Trạng Thái: {product.status ? "Còn hàng" : "Hết hàng"}
        </p>

        <div className="flex gap-3">
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetailInfo;
