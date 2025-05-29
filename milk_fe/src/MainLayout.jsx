import { Routes, Route, useLocation } from "react-router-dom";

// Page
import LoginPage from "./page/LoginPage/LoginPage";
import RegisterPage from "./page/RegisterPage/RegisterPage";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Homepage from "./page/HomePage/HomePage";
import Layout from "./component/Layout/Layout";
import AdminDashboard from "./page/Admin/AdminDashboard";
import CartPage from "./page/CartPage/CartPage";

function MainLayout() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <>
      {!isDashboard && <Header />}

      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Layout>

      {!isDashboard && <Footer />}
    </>
  );
}

export default MainLayout;
