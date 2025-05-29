import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

const products = [
  {
    id: 1,
    name: "Sữa bột Vinamilk Optimum Gold",
    price: 420000,
    image: "src/assets/img/product/product1.png",
    quantity: 1,
  },
  {
    id: 2,
    name: "Sữa Nan Supreme Pro HMO",
    price: 495000,
    image: "src/assets/img/product/product1.png",
    quantity: 1,
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(products);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [street, setStreet] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("sessionToken");

  const [visible, setVisible] = useState(false); // ConfirmDialog hiển thị
  const primeToast = useRef(null);

  const accept = () => {
    navigate("/login"); // Điều hướng tới login khi xác nhận
  };

  const reject = () => {
    primeToast.current?.show({
      severity: "info",
      summary: "Đã hủy",
      detail: "Bạn đã chọn không đăng nhập.",
      life: 3000,
    });
  };
  useEffect(() => {
    const savedName = localStorage.getItem("fullName");
    const savedPhone = localStorage.getItem("phone");

    if (savedName) setRecipientName(savedName);
    if (savedPhone) setPhoneNumber(savedPhone);
  }, []);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((res) => res.json())
        .then((data) => setWards(data.wards));
    }
  }, [selectedDistrict]);

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmAddress = () => {
    const newErrors = {};
    if (!recipientName) newErrors.recipientName = true;
    if (!phoneNumber) newErrors.phoneNumber = true;
    if (!street) newErrors.street = true;
    if (!selectedProvince) newErrors.selectedProvince = true;
    if (!selectedDistrict) newErrors.selectedDistrict = true;
    if (!selectedWard) newErrors.selectedWard = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Lưu lại vào localStorage
    localStorage.setItem("recipientName", recipientName);
    localStorage.setItem("phone", phoneNumber);

    const provinceName =
      provinces.find((p) => p.code === parseInt(selectedProvince))?.name || "";
    const districtName =
      districts.find((d) => d.code === parseInt(selectedDistrict))?.name || "";
    const wardName =
      wards.find((w) => w.code === parseInt(selectedWard))?.name || "";

    setShippingAddress(
      `${recipientName}\n${phoneNumber}\n${street}, ${wardName}, ${districtName}, ${provinceName}`
    );
    setShowAddressModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Giỏ hàng của bạn</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.01 }}
              className="grid grid-cols-[auto_1fr_auto] items-center bg-white p-4 rounded-xl shadow gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold line-clamp-2 break-words max-w-[300px]">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Giá: {item.price.toLocaleString()}₫
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-right font-medium text-blue-600">
                {(item.price * item.quantity).toLocaleString()}₫
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Địa chỉ giao hàng</h4>
            {shippingAddress ? (
              <p className="text-gray-700 whitespace-pre-line">
                {shippingAddress}
              </p>
            ) : (
              <p className="text-gray-500">Chưa có địa chỉ giao hàng</p>
            )}
            <Toast ref={primeToast} />

            <ConfirmDialog
              group="declarative"
              visible={visible}
              onHide={() => setVisible(false)}
              message="Bạn cần đăng nhập để nhập địa chỉ. Bạn có muốn đăng nhập không?"
              header="Yêu cầu đăng nhập"
              icon="pi pi-question-circle"
              accept={accept}
              reject={reject}
              style={{ width: "50vw" }}
              breakpoints={{ "1100px": "75vw", "960px": "100vw" }}
            />

            <Button
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={() => {
                if (!isLoggedIn) {
                  setVisible(true); // Mở ConfirmDialog nếu chưa đăng nhập
                } else {
                  setShowAddressModal(true); // Nếu đã đăng nhập thì mở form địa chỉ
                }
              }}
              label="Nhập địa chỉ"
            />
          </div>
          <h3 className="text-xl font-bold mb-4">Tổng cộng</h3>
          <p className="text-lg text-gray-700 mb-2">
            Tổng đơn hàng:{" "}
            <span className="font-semibold text-blue-600">
              {total.toLocaleString()}₫
            </span>
          </p>
          <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Thanh toán ngay
          </button>
        </motion.div>
      </div>

      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow w-96">
            <h3 className="text-xl font-bold mb-4">Nhập địa chỉ giao hàng</h3>
            <input
              type="text"
              placeholder="Họ tên người nhận"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full mb-1 p-2 border rounded"
            />
            {errors.recipientName && (
              <p className="text-sm text-red-500 mb-1">
                Vui lòng nhập họ tên người nhận
              </p>
            )}
            <input
              type="text"
              placeholder=""
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full mb-1 p-2 border rounded"
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500 mb-1">
                Vui lòng nhập số điện thoại
              </p>
            )}
            <input
              type="text"
              placeholder="Số nhà, tên đường"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full mb-1 p-2 border rounded"
            />
            {errors.street && (
              <p className="text-sm text-red-500 mb-1">
                Vui lòng nhập địa chỉ cụ thể
              </p>
            )}
            <select
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setSelectedDistrict("");
                setSelectedWard("");
              }}
              className="w-full mb-1 p-2 border rounded"
            >
              <option value="">Chọn tỉnh/thành phố</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
            {errors.selectedProvince && (
              <p className="text-sm text-red-500 mb-1">
                Vui lòng chọn tỉnh/thành
              </p>
            )}
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedWard("");
              }}
              disabled={!selectedProvince}
              className="w-full mb-1 p-2 border rounded"
            >
              <option value="">Chọn quận/huyện</option>
              {districts.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.selectedDistrict && (
              <p className="text-sm text-red-500 mb-1">
                Vui lòng chọn quận/huyện
              </p>
            )}
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              disabled={!selectedDistrict}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="">Chọn phường/xã</option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
            {errors.selectedWard && (
              <p className="text-sm text-red-500 mb-4">
                Vui lòng chọn phường/xã
              </p>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddressModal(false)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmAddress}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
