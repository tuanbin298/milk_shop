import {
  EnvironmentOutlined,
  SearchOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import "@fontsource/luckiest-guy";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router";
import "./Header.css";
import { useEffect, useState } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { toast } from "react-toastify";

export default function Header() {
  const role = localStorage.getItem("roles");

  // State
  const [anchorEl, setAnchorEl] = useState(null); //State for close menu
  const [loggedIn, setLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [momCategories, setMomCategories] = useState([]);
  const [babyCategories, setBabyCategories] = useState([]);

  const navigate = useNavigate();

  // Check status of login
  const checkLoginStatus = () => {
    const sessionToken = localStorage.getItem("sessionToken");
    const fullname = localStorage.getItem("fullName");

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/categories/getAll");
        if (res.ok) {
          const data = await res.json();
          const momCats = data.filter((cat) =>
            cat.name.toLowerCase().includes("women")
          );
          const babyCats = data.filter((cat) =>
            cat.name.toLowerCase().includes("baby")
          );
          setMomCategories(momCats);
          console.log("Mẹ:", momCats); // để biết có lấy được không
          setBabyCategories(babyCats);
        }
      } catch (error) {
        console.error("Lỗi gọi API category:", error);
      }
    };

    fetchCategories();
  }, []);

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
                  <MenuItem onClick={() => navigate("/profile-user")}>
                    <div className="flex items-center gap-2">
                      <AssignmentIndIcon />
                      <span>Thông tin cá nhân</span>
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

          {/* Order */}
          <div className="flex items-center  text-[20px] ">
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
            <Link to="/">
              <span className="text-base font-semibold">TRANG CHỦ</span>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            <Link to="/intro-page" className="text-base font-semibold">
              GIỚI THIỆU
            </Link>
          </div>

          <div className="relative group">
            <Link to="/baby">
              <span className="text-base font-semibold cursor-pointer">
                SỮA CHO BÉ
              </span>
            </Link>
            <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded z-10 min-w-[200px] py-2">
              {babyCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-pink-100"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative group">
            <Link to="/mom">
              <div className="text-base font-semibold cursor-pointer">
                SỮA CHO MẸ
              </div>
            </Link>
            <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded z-10 min-w-[200px] py-2">
              {momCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-pink-100"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Link to="/">
              <span className="text-base font-semibold">LIÊN HỆ</span>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
