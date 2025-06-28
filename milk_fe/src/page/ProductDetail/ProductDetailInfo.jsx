import { toast } from "react-toastify";

const ProductDetailInfo = ({ product }) => {
  const token = localStorage.getItem("sessionToken");

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
          quantity: 1,
          note: "",
        }),
      });

      if (createCart.ok) {
        toast.success("Thêm sản phẩm vào giõ hàng thành công!");
      } else {
        toast.error("Lỗi khi thêm sản phẩm vào giõ hàng!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giõ hàng", error);
    }
  };

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
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className=" mb-4 mt-4 text-lg text-gray-500">
          {product.description}
        </p>
        <p className="text-gray-600 mb-2">
          Mã sản phẩm: <strong>{product.id}</strong>
        </p>
        <p className="text-2xl text-red-600 font-semibold mb-2">
          {product.price.toLocaleString()} VND
        </p>
        <p className="text-green-600 mb-4">
          Trạng Thái: {product.status ? "Còn hàng" : "Hết hàng"}
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            className="bg-[#F75385] hover:bg-[#f990cd] text-white px-6 py-2 rounded"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailInfo;
