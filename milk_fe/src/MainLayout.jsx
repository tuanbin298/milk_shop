import { Routes, Route, useLocation } from "react-router-dom";

// Page
import LoginPage from "./page/LoginPage/LoginPage";
import RegisterPage from "./page/RegisterPage/RegisterPage";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Homepage from "./page/HomePage/HomePage";
import Layout from "./component/Layout/Layout";
import Dashboard from "./page/Dashboard/Dashbroard";

function MainLayout() {
  return (
    <>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
      <Footer />
    </>
  );
}

export default MainLayout;
