const LoginPage = () => {
  return (
    <div className="flex items-center justify-center bg-white">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8 mt-10">
          Đăng nhập tài khoản
        </h2>

        {/* Form */}
        <form className="space-y-4">
          {/* Email */}
          <div className="flex items-center">
            <label className="font-medium mr-5 min-w-[100px]">Email: </label>
            <input
              type="email"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập email"
            />
          </div>

          {/* Password */}
          <div className="flex items-center">
            <label className="font-medium mr-5 min-w-[100px]">Mật khẩu: </label>
            <input
              type="password"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập mật khẩu"
            />
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-80 mt-5 bg-sky-400 hover:bg-sky-500 text-white py-2 px-4 rounded transition"
            >
              Đăng nhập
            </button>
          </div>

          {/* Forgot password */}
          <p className="text-sm text-center mt-2">
            Bạn chưa có tài khoản?{" "}
            <a href="/register" className="text-red-500 hover:underline">
              Tại đây
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

export default LoginPage;
