import {
  EnvironmentOutlined,
  SearchOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import "@fontsource/luckiest-guy";
import { Link } from "react-router";
import "./Header.css";

export default function Header() {
  return (
    <div>
      <header className="w-full">
        {/* Top bar header */}
        <div className="bg-[#EF608C] text-white text-sm flex justify-between px-38 py-3">
          <div className="flex items-center space-x-1">
            <EnvironmentOutlined className="text-lg" />

            <span className="text-base">
              Hệ thống cửa hàng sữa cho mẹ và bé | Giao hàng toàn quốc
            </span>
          </div>

          <div className="flex items-center">
            <PhoneOutlined className="text-lg" />
            <span className="text-base">Hotline: 1800 6886</span>
          </div>

          <button className="flex items-center space-x-1">
            <PersonOutlineOutlinedIcon />
            <span className="text-base">
              <Link to="/login" className="hover:underline">
                Đăng nhập
              </Link>{" "}
              |{" "}
              <Link to="/register" className="hover:underline">
                Đăng ký
              </Link>
            </span>
          </button>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between px-40 py-3 bg-white shadow">
          {/* Header Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img
                src="./src/assets/logo/logoluna.png"
                alt="Milk Logo"
                className="h-30 w-auto object-contain"
              />
            </Link>
            <h2 className="text-[40px] font-fredoka font-bold ml-4 leading-none flex">
              <span className="text-white [text-shadow:-2px_-2px_0_#9F3C60,2px_-2px_0_#9F3C60,-2px_2px_0_#9F3C60,2px_2px_0_#9F3C60]">
                Luna
              </span>
              <span className="text-[#F5D6D6] [text-shadow:-2px_-2px_0_#9F3C60,2px_-2px_0_#9F3C60,-2px_2px_0_#9F3C60,2px_2px_0_#9F3C60]">
                Milk
              </span>
            </h2>
          </div>

          {/* Search bar */}
          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-[400px] h-[42px]">
            <input
              type="text"
              placeholder="Tìm sản phẩm ..."
              className="flex-grow px-4 py-2 text-sm outline-none"
            />
            <button className="bg-[#F5D1DE] text-[#EF608C] px-4 h-full flex items-center justify-center">
              <SearchOutlined />
            </button>
          </div>

          {/* Cart */}
          <div className="flex items-center border border-[#EF608C] rounded-md px-3 py-2 space-x-1">
            <ShoppingCartOutlined className="text-[20px] text-[#EF608C]" />
            <span className="text-black text-sm">Giỏ hàng</span>
            <span className="bg-[#F5D1DE] text-black text-xs font-semibold px-2 py-[1px] rounded-sm border border-[#EF608C]">
              0
            </span>
          </div>
        </div>

        {/* Bottom bar header */}
        <div className="bg-[#EF608C] text-white text-sm flex justify-between px-40 py-3">
          <div className="flex items-center space-x-1">
            <Link href="/">
              <span className="text-base font-semibold">TRANG CHỦ</span>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            <Link to="/gioi-thieu" className="text-base font-semibold">
              GIỚI THIỆU
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            <Link href="/">
              <span className="text-base font-semibold">SỮA CHO BÉ</span>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            <Link href="/">
              <span className="text-base font-semibold">SỮA CHO MẸ</span>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            <Link href="/">
              <span className="text-base font-semibold">LIÊN HỆ</span>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
