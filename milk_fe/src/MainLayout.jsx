import { Routes, Route, useLocation } from "react-router-dom";

// Page
import LoginPage from "./page/LoginPage/LoginPage";
import RegisterPage from "./page/RegisterPage/RegisterPage";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Homepage from "./page/HomePage/HomePage";
import LayoutPage from "./component/Layout/LayoutPage";
import AdminDashboard from "./page/Admin/AdminDashboard";
import UserTable from "./page/Admin/Tables/UserTable";
import LayoutAdmin from "./component/Layout/LayoutAdmin";

function MainLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {/* Dashboard will not have header, footer and layout */}
      {!isDashboard && <Header />}

      {isDashboard ? (
        <LayoutAdmin>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<AdminDashboard />}>
              <Route path="userlist" element={<UserTable />} />
            </Route>
          </Routes>
        </LayoutAdmin>
      ) : (
        <LayoutPage>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<AdminDashboard />}>
              <Route path="userlist" element={<UserTable />} />
            </Route>
          </Routes>
        </LayoutPage>
      )}

      {!isDashboard && <Footer />}
    </>
  );
}

export default MainLayout;
