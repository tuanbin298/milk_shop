import { useNavigate } from "react-router-dom";
import { formatMoney } from "../../utils/formatMoney";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleDetailClick = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
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
          onClick={handleDetailClick}
          className="text-[#F75385] text-sm font-medium border border-[#F75385] rounded-full px-3 py-1 
          hover:bg-[#F75385] hover:text-pink-50 transition-colors"
        >
          Chi tiết
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
