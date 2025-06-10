import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Typography } from "@mui/material";

const ProfileUser = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    username: "",
    phone: "",
    address: "",
    roles: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("sessionToken");

    if (!token) {
      toast.error("Vui lòng đăng nhập để xem thông tin!");
      navigate("/login");
      return;
    }

    const fullName = localStorage.getItem("fullName") || "";
    const username = localStorage.getItem("username") || "";
    const phone = localStorage.getItem("phone") || "";
    const address = localStorage.getItem("address") || "";
    const roles = localStorage.getItem("roles") || "";

    setUserInfo({ fullName, username, phone, address, roles });
    setEditedAddress(address);
    setEditedPhone(phone);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Đăng xuất thành công!");
    navigate("/login");
  };

  const handleSave = () => {
    const updatedUserInfo = {
      ...userInfo,
      address: editedAddress,
      phone: editedPhone,
    };

    localStorage.setItem("address", editedAddress);
    localStorage.setItem("phone", editedPhone);

    setUserInfo(updatedUserInfo);
    setIsEditing(false);
    toast.success("Cập nhật thông tin thành công!");
  };

  return (
    <div className="min-h-screen bg-white p-8 text-gray-800">
      <div className="flex gap-10 max-w-6xl mx-auto">
        {/* Sidebar */}
        <div className="w-1/4 border-r pr-6">
          <Typography variant="h6" gutterBottom>
            TRANG TÀI KHOẢN
          </Typography>
          <p className="font-semibold text-sm">
            Xin chào,{" "}
            <span className="text-pink-600 font-bold">{userInfo.fullName}</span>!
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <button
              onClick={() => setSelectedTab("account")}
              className={`block text-left w-full ${
                selectedTab === "account" ? "text-pink-500 font-semibold" : ""
              }`}
            >
              Thông tin tài khoản
            </button>
            <button
              onClick={() => setSelectedTab("orders")}
              className={`block text-left w-full ${
                selectedTab === "orders" ? "text-pink-500 font-semibold" : ""
              }`}
            >
              Đơn hàng
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {selectedTab === "account" && (
            <div className="space-y-4">
              <Typography variant="h6" gutterBottom>
                TÀI KHOẢN
              </Typography>

              {!isEditing ? (
                <>
                  <div className="space-y-2 text-sm">
                    <p>👤 <strong>Tên tài khoản:</strong> {userInfo.fullName}</p>
                    <p>📧 <strong>Gmail:</strong> {userInfo.username || "Chưa cập nhật"}</p>
                    <p>📴 <strong>Điện thoại:</strong> {userInfo.phone || "Chưa cập nhật"}</p>
                  </div>
                  <Button variant="contained" size="small" onClick={() => setIsEditing(true)}>
                    Sửa số điện thoại
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-3 text-sm">
                    <p>👤 <strong>Tên tài khoản:</strong> {userInfo.fullName}</p>
                    <p>📧 <strong>Gmail:</strong> {userInfo.username || "Chưa cập nhật"}</p>
                    <div>
                      <label className="block mb-1">📴 <strong>Điện thoại:</strong></label>
                      <input
                        type="text"
                        value={editedPhone}
                        onChange={(e) => setEditedPhone(e.target.value)}
                        className="border p-2 w-full rounded"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button variant="contained" color="primary" size="small" onClick={handleSave}>
                      Lưu
                    </Button>
                    <Button variant="outlined" color="secondary" size="small" onClick={() => setIsEditing(false)}>
                      Hủy
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

          {selectedTab === "orders" && (
            <div>
              <Typography variant="h6">ĐƠN HÀNG CỦA BẠN</Typography>
              <table className="w-full mt-2 border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-2 border-b">Mã đơn hàng</th>
                    <th className="text-left p-2 border-b">Ngày đặt</th>
                    <th className="text-left p-2 border-b">Thành tiền</th>
                    <th className="text-left p-2 border-b">TT thanh toán</th>
                    <th className="text-left p-2 border-b">TT vận chuyển</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="5" className="p-4 text-gray-600 text-sm">
                      Không có đơn hàng nào.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
