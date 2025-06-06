import {
  EnvironmentOutlined,
  SearchOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router";
import "./Header.css";
import { useEffect, useState } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import ListAltIcon from "@mui/icons-material/ListAlt";

export default function Header() {
  const role = localStorage.getItem("roles");

  // State
  const [anchorEl, setAnchorEl] = useState(null); //State for close menu
  const [loggedIn, setLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  // Check status of login
  const checkLoginStatus = () => {
    const sessionToken = localStorage.getItem("sessionToken");
    const fullname = localStorage.getItem("fullName");
    console.log(fullName);

    if (sessionToken) {
      setLoggedIn(true);
      setFullName(fullname);
    } else {
      setLoggedIn(false);
    }
  };

  // Run when component reload
  useEffect(() => {
    checkLoginStatus();

    // Listen event in storage of another tab
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  // Logic open/close menu
  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("fullName");
    localStorage.removeItem("roles");
    localStorage.removeItem("address");
    localStorage.removeItem("phone");

    setLoggedIn(false);
    setAnchorEl(null);

    toast.success("Đăng xuất thành công");

    navigate("/login");
  };

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

          {/* Login / Register */}
          <div className="flex items-center space-x-1 ">
            {loggedIn ? (
              <>
                <button
                  onClick={handleMenuClick}
                  className="flex items-center space-x-2 px-3 py-1 rounded-full hover:bg-gray-300 transition"
                >
                  {" "}
                  <Avatar
                    alt="Default avatar"
                    src="src/assets/img/user/avatar.png"
                  />
                  <span className="text-base text-[16px]">{fullName}</span>
                </button>

                {/* Menu of user */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => navigate("/profile")}>
                    <div className="flex items-center">
                      <AssignmentIndIcon className="mr-2" />
                      Thông tin cá nhân
                    </div>
                  </MenuItem>
                  {(role === "ADMIN" || role === "STAFF") && (
                    <MenuItem onClick={() => navigate("/dashboard")}>
                      <div className="flex items-center">
                        <ManageAccountsIcon className="mr-2" />
                        Trang quản lý
                      </div>
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <div className="flex items-center">
                      <LogoutIcon className="mr-2" />
                      Đăng xuất
                    </div>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <PersonOutlineOutlinedIcon />
                <span className="text-base text-[16px]">
                  <Link to="/login" className="hover:underline">
                    Đăng nhập
                  </Link>{" "}
                  |{" "}
                  <Link to="/register" className="hover:underline">
                    Đăng ký
                  </Link>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between px-16 py-2 bg-white shadow">
          {/* Header Logo */}
          <div className="flex items-center header_mid-logo">
            <Link to="/">
              <img src="./src/assets/logo/web logo.png" alt="Milk Logo" />
            </Link>

            <h2 className="header_mid-logo-title">LunaMilk</h2>
          </div>

          {/* Search bar */}
          <div className="header_seach-container">
            <input type="text" placeholder="Ba mẹ muốn tìm mua gì hôm nay ?" />

            <button>
              <SearchOutlined />
            </button>
          </div>

          {/* Cart and login */}
          <div className="flex items-center text-[20px]">
            <button>
              <Link to="/cart">
                <img
                  src="src/assets/img/icon/cart-icon.png"
                  alt="Giỏ hàng"
                  className="w-[30px] h-[30px] mr-[9px]"
                />
                Giỏ hàng
              </Link>
            </button>
          </div>

          {/* Cart and login */}
          <div className="flex items-center  text-[20px] mr-[98px]">
            <button>
              <Link to="/">
                <img
                  src="src/assets/img/icon/order-icon.png"
                  alt="Giỏ hàng"
                  className="w-[30px] h-[32px] mr-[9px]"
                />
                Đơn hàng
              </Link>
            </button>
          </div>
        </div>

        {/* Bottom bar header */}
        <div className="bg-[#EF608C] text-white text-sm flex justify-between px-40 py-3">
          <div className="flex items-center space-x-1">
            <Link href="/">
              <span className="text-base">TRANG CHỦ</span>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            <Link href="/">
              <span className="text-base">GIỚI THIỆU</span>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            <Link href="/">
              <span className="text-base">SỮA CHO TRẺ NHỎ</span>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            <Link href="/">
              <span className="text-base">SỮA CHO MẸ BẦU & SAU SINH</span>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            <Link href="/">
              <span className="text-base">LIÊN HỆ</span>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
