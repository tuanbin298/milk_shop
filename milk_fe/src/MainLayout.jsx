import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

// Page
import LoginPage from "./page/LoginPage/LoginPage";
import RegisterPage from "./page/RegisterPage/RegisterPage";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Homepage from "./page/HomePage/HomePage";
import LayoutPage from "./component/Layout/LayoutPage";
import AdminDashboard from "./page/Admin/AdminDashboard";
import CartPage from "./page/CartPage/CartPage";
import ResetPasswordPage from "./page/ResetPasswordPage/ResetPasswordPage";
import UserTable from "./page/Admin/Tables/UserTable";
import LayoutAdmin from "./component/Layout/LayoutAdmin";

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check dashboard access
  const token = localStorage.getItem("sessionToken");
  const role = localStorage.getItem("roles");
  const isDashboard = location.pathname.startsWith("/dashboard");
  const hasDashboardAccess = token && (role === "ADMIN" || role === "STAFF");

  // If customer try to access /dashboard will sent error msg
  useEffect(() => {
    if (isDashboard && !hasDashboardAccess) {
      toast.error("Bạn không có quyền truy cập trang quản lý!");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    }
  }, [isDashboard, hasDashboardAccess, navigate]);

  return (
    <>
      {/* Dashboard will not have header, footer and layout */}
      {!isDashboard && <Header />}

      {isDashboard ? (
        hasDashboardAccess ? (
          <LayoutAdmin>
            <Routes>
              <Route path="/dashboard" element={<AdminDashboard />}>
                <Route path="userlist" element={<UserTable />} />
              </Route>
            </Routes>
          </LayoutAdmin>
        ) : (
          <></>
        )
      ) : (
        <LayoutPage>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Routes>
        </LayoutPage>
      )}

      {!isDashboard && <Footer />}
    </>
  );
}

export default MainLayout;
