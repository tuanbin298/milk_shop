import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Typography } from "@mui/material";

const ProfileUser = () => {
  const token = localStorage.getItem("sessionToken");
  const fullName = localStorage.getItem("fullName");
  const username = localStorage.getItem("username");
  const phone = localStorage.getItem("phone");
  const customerId = localStorage.getItem("id");
  const userRole = localStorage.getItem("roles");

  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [originalUser, setOriginalUser] = useState({});
  const [errors, setErrors] = useState({});
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (!token) {
      toast.error("Vui lòng đăng nhập để xem thông tin!");
      navigate("/login");
      return;
    }

    setUserInfo({ fullName, username, phone, userRole });
  }, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInfo((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    let newErrors = { ...errors };
    if (name === "phone") {
      const phoneRegex = /^(84|0[3|5|7|8|9])\d{8}$/;
      newErrors.phone = phoneRegex.test(value)
        ? ""
        : "Số điện thoại không hợp lệ!";
    }

    setErrors(newErrors);
  };

  // Handle btn edit
  const handleEditToggle = () => {
    //First time click btn: If click in update go into edit mode (save data berfore changes)
    if (!isEditing) {
      setOriginalUser({ fullName, phone });
    } else {
      // Second time click btn:
      handleSaveUpdate();
    }

    setIsEditing(!isEditing);
  };

  const handleSaveUpdate = async (e) => {
    const updates = {};

    // Check user data change or not
    if (userInfo.fullName !== originalUser.fullName) {
      updates.fullName = userInfo.fullName;
    }
    if (userInfo.phone !== originalUser.phone) {
      updates.fullName = userInfo.phone;
    }

    if (Object.keys(updates).length > 0) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/customer/${customerId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              fullName: userInfo.fullName,
              roles: "CUSTOMER",
              phone: userInfo.phone,
              status: true,
            }),
          }
        );

        if (response.ok) {
          toast.success("Cập nhật thành công");
          localStorage.setItem("fullName", userInfo.fullName);
          localStorage.setItem("phone", userInfo.phone);

          setOriginalUser({
            fullName: userInfo.fullName,
            phone: userInfo.phone,
          });
        }
      } catch (err) {
        toast.error("Lỗi cập nhật người dùng: ", err);
      }
    } else {
      toast.info("Không có gì thay đổi");
    }
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
            <span className="text-pink-600 font-bold">{fullName}</span>!
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
                    <p>
                      👤 <strong>Tên tài khoản:</strong> {fullName}
                    </p>
                    <p>
                      📧 <strong>Gmail:</strong> {username}
                    </p>
                    <p>
                      📴 <strong>Điện thoại:</strong> {phone}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3 text-sm">
                    <p>
                      👤 <strong>Tên tài khoản:</strong>
                      <input
                        type="text"
                        value={userInfo.fullName}
                        name="fullName"
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                      />
                    </p>

                    <p>
                      📧 <strong>Gmail:</strong>{" "}
                      {userInfo.username || "Chưa cập nhật"}
                    </p>
                    <div>
                      <label className="block mb-1">
                        📴 <strong>Điện thoại:</strong>
                      </label>
                      <input
                        type="text"
                        value={userInfo.phone}
                        name="phone"
                        onChange={handleChange}
                        className={`border p-2 w-full rounded ${
                          errors.phone ? "border-red-500" : ""
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-2 mt-3">
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleEditToggle}
                >
                  {isEditing ? "Lưu" : " Cập nhật thông tin"}
                </Button>
                {isEditing && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => setIsEditing(false)}
                  >
                    Hủy
                  </Button>
                )}
              </div>
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
