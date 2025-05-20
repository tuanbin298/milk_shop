import { Routes, Route, useLocation } from "react-router-dom";

// Page
import LoginPage from "./page/LoginPage/LoginPage";
import RegisterPage from "./page/RegisterPage/RegisterPage";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Homepage from "./page/HomePage/HomePage";

function MainLayout() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default MainLayout;
