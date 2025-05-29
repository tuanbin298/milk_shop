// Import necessary dependencies
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Define the RegisterPage component
const RegisterPage = () => {
  const navigate = useNavigate();

  // State to store user input values and errors
  const [input, setInput] = useState({
    username: "",
    address: "",
    fullName: "",
    password: "",
    phone: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change and validate data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });

    // Validate fields
    let newErrors = { ...errors };

    if (name === "username") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      newErrors.username = emailRegex.test(value) ? "" : "Email không hợp lệ!";
    }

    if (name === "phone") {
      const phoneRegex = /^(84|0[3|5|7|8|9])\d{8}$/;
      newErrors.phone = phoneRegex.test(value)
        ? ""
        : "Số điện thoại không hợp lệ!";
    }

    if (name === "password") {
      newErrors.password =
        value.length >= 6 ? "" : "Mật khẩu phải có ít nhất 6 ký tự!";
    }

    if (name === "confirmPassword") {
      newErrors.confirmPassword =
        value === input.password ? "" : "Mật khẩu không khớp!";
    }

    setErrors(newErrors);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for validation errors
    if (Object.values(errors).some((error) => error)) {
      toast.error("Vui lòng kiểm tra lại thông tin!");
      return;
    }

    const { confirmPassword, ...payload } = input;

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Đăng ký thành công!");
        navigate("/login");
      } else {
        const error = await response.json();
        toast.error(error.message || "Lỗi khi đăng ký!");
      }
    } catch (err) {
      toast.error("Lỗi kết nối server!");
    }
  };

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="w-full max-w-md">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-8 mt-10">
          Đăng ký tài khoản
        </h2>

        {/* Registration Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Họ và tên"
            name="fullName"
            type="text"
            value={input.fullName}
            onChange={handleInputChange}
            placeholder="Nhập họ và tên"
            error={errors.fullName}
          />
          <InputField
            label="Email"
            name="username"
            type="email"
            value={input.username}
            onChange={handleInputChange}
            placeholder="Nhập email"
            error={errors.username}
          />
          <InputField
            label="Số điện thoại"
            name="phone"
            type="text"
            value={input.phone}
            onChange={handleInputChange}
            placeholder="Nhập số điện thoại"
            error={errors.phone}
          />
          <InputField
            label="Địa chỉ"
            name="address"
            type="text"
            value={input.address}
            onChange={handleInputChange}
            placeholder="Nhập địa chỉ"
          />
          <InputField
            label="Mật khẩu"
            name="password"
            type="password"
            value={input.password}
            onChange={handleInputChange}
            placeholder="Nhập mật khẩu"
            error={errors.password}
          />
          <InputField
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            type="password"
            value={input.confirmPassword}
            onChange={handleInputChange}
            placeholder="Xác nhận mật khẩu"
            error={errors.confirmPassword}
          />

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-80 mt-5 bg-sky-400 hover:bg-sky-500 text-white py-2 px-4 rounded transition"
            >
              Đăng ký
            </button>
          </div>

          {/* Link to login */}
          <p className="text-sm text-center mt-2">
            Bạn đã có tài khoản?{" "}
            <a href="/login" className="text-red-500 hover:underline">
              Đăng nhập tại đây
            </a>
          </p>
        </form>
        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-400 text-sm">
            Hoặc đăng nhập bằng
          </span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google login */}
        <button className="w-full flex items-center justify-center border border-blue-500 rounded py-2 hover:bg-blue-50 transition">
          <span className="flex items-center">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Google
          </span>
        </button>
      </div>
    </div>
  );
};

// Reusable InputField component with error handling
const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  error,
}) => (
  <div className="flex items-center space-x-4">
    <label className="font-medium min-w-[150px]">{label}:</label>
    <div className="w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  </div>
);
export default RegisterPage;
