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
import IntroPage from "./page/IntroPage/IntroPage";
import CartPage from "./page/CartPage/CartPage";
import ResetPasswordPage from "./page/ResetPasswordPage/ResetPasswordPage";
import UserTable from "./page/Admin/Tables/UserTable";
import LayoutAdmin from "./component/Layout/LayoutAdmin";
import ProductTable from "./page/Admin/Tables/ProductTable";
import CategoryTable from "./page/Admin/Tables/CategoryTable";
import BrandTable from "./page/Admin/Tables/BrandTable";
import ProfileUser from "./page/ProfilePage/ProfileUser";
import ArticleTable from "./page/Admin/Tables/ArticleTable";
import AdminProfile from "./page/Admin/AdminProfile";
import BrandList from "./page/BrandListPage/BrandList";
import MomMilkPage from "./page/ProductPage/MomMilkPage";
import BabyMilkPage from "./page/ProductPage/BabyMilkPage";
import ProductDetailPage from "./page/ProductPage/ProductDetailPage";
import AllMilkPage from "./page/ProductPage/AllMilkPage";
import FeedbackTable from "./page/Admin/Tables/FeedbackTable";
import CategoryProductPage from "./page/ProductPage/CategoryProductPage";
import AllArticle from "./page/NewArticle/AllArticlePage";
import CheckoutPage from "./page/CheckoutPage/CheckoutPage";

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
      {!isDashboard && <Header />}
      {/* Dashboard will not have header, footer and layout */}
      {isDashboard ? (
        hasDashboardAccess ? (
          <LayoutAdmin>
            <Routes>
              <Route path="/dashboard" element={<AdminDashboard />}>
                <Route path="userlist" element={<UserTable />} />
                <Route path="productlist" element={<ProductTable />} />
                <Route path="categorylist" element={<CategoryTable />} />
                <Route path="brandlist" element={<BrandTable />} />
                <Route path="articlelist" element={<ArticleTable />} />
                <Route path="admin-profile" element={<AdminProfile />} />
                <Route path="feedbacklist" element={<FeedbackTable />} />
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
            <Route path="/intro-page" element={<IntroPage />} />
            <Route path="/profile-user" element={<ProfileUser />} />
            <Route path="/branddetail/:name" element={<BrandList />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/mom" element={<MomMilkPage />} />
            <Route path="/baby" element={<BabyMilkPage />} />
            <Route path="/product-list" element={<AllMilkPage />} />
            <Route path="/all-article" element={<AllArticle />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/category/:categoryId"
              element={<CategoryProductPage />}
            />
          </Routes>
        </LayoutPage>
      )}

      {!isDashboard && <Footer />}
    </>
  );
}

export default MainLayout;
