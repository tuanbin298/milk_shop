import {
  EnvironmentOutlined,
  SearchOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link } from "react-router";
import "./Header.css";

export default function Header() {
  return (
    <div>
      <header className="w-full">
        {/* Top bar header */}
        <div className="bg-sky-600 text-white text-sm flex justify-between px-38 py-3">
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
        <div className="flex items-center justify-between px-16 py-2 bg-white shadow">
          {/* Header Logo */}
          <div className="flex items-center header_mid-logo">
            <Link to="/">
              <img src="./src/assets/logo/web logo.png" alt="Milk Logo" />
            </Link>

            <h2 className="header_mid-logo-title">
              Mầm Sữa
              <br />
              Yêu Thương
            </h2>
          </div>

          {/* Search bar */}
          <div className="header_seach-container">
            <input type="text" placeholder="Ba mẹ muốn tìm mua gì hôm nay ?" />

            <button>
              <SearchOutlined className="header_search-icon" />
            </button>
          </div>

          {/* Cart and login */}
          <div className="header_cart-container">
            <button>
              <ShoppingCartOutlined className="header_cart-icon" />
              <Link to="/cart">Giỏ hàng</Link>
            </button>
          </div>
        </div>

        {/* Bottom bar header */}
        <div className="bg-sky-600 text-white text-sm flex justify-between px-40 py-3">
          <div className="flex items-center space-x-1">
            <Link href="/">
              <span className="text-base">TRANG CHỦ</span>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-base">GIỚI THIỆU</span>
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-base">SỮA CHO TRẺ NHỎ</span>
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-base">SỮA CHO MẸ BẦU & SAU SINH</span>
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-base">LIÊN HỆ</span>
          </div>
        </div>
      </header>
    </div>
  );
}
