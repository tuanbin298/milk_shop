import React from "react";

const products = [
  {
    id: 1,
    name: "Sữa bột Abbott Grow",
    description: "Dinh dưỡng đầy đủ cho bé từ 1-3 tuổi",
    price: "450,000₫",
    image: "https://via.placeholder.com/150?text=Abbott+Grow",
  },
  {
    id: 2,
    name: "Sữa Meiji số 0",
    description: "Hỗ trợ phát triển trí não cho bé sơ sinh",
    price: "380,000₫",
    image: "https://via.placeholder.com/150?text=Meiji+Số+0",
  },
  {
    id: 3,
    name: "Sữa Nan Supreme",
    description: "Cung cấp hệ miễn dịch khỏe mạnh",
    price: "520,000₫",
    image: "https://via.placeholder.com/150?text=Nan+Supreme",
  },
];

const IntroPage = () => {
  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center p-6">
      <section className="bg-white max-w-3xl w-full p-10 rounded-2xl shadow-xl mb-10">
        <h1 className="text-4xl font-bold text-pink-700 mb-6 text-center">
          Giới thiệu về LunaMilk
        </h1>
        <div className="mb-6 flex justify-center">
          <img
            src="https://cdn1.concung.com/storage/data/2021/thong-tin-bo-ich/2024/12/S%E1%BB%AFa%20b%E1%BB%99t%20t%E1%BB%91t%20nh%E1%BA%A5t%20hi%E1%BB%87n%20nay.webp" 
            alt="LunaMilk"
            className="rounded-lg shadow-md max-h-64 object-cover"
          />
        </div>
        <p className="text-lg text-gray-800 mb-4 leading-relaxed">
          Chào mừng bạn đến với <strong>LunaMilk </strong> – nơi mang đến những sản phẩm
          dinh dưỡng tốt nhất cho mẹ bầu, mẹ sau sinh và bé yêu. Chúng tôi hiểu rằng sức khỏe và sự
          phát triển của bé luôn là mối quan tâm hàng đầu của các bậc cha mẹ.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Với đa dạng các loại sữa bột, sữa công thức từ các thương hiệu uy tín như Abbott, Meiji,
          Nan, Friso,... chúng tôi cam kết:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Sản phẩm chính hãng 100%</li>
          <li>Giao hàng toàn quốc nhanh chóng</li>
          <li>Tư vấn dinh dưỡng tận tâm</li>
          <li>Giá cả cạnh tranh, nhiều ưu đãi</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Hãy để <strong>LunaMilk </strong> đồng hành cùng hành trình nuôi dưỡng bé yêu khỏe
          mạnh và thông minh mỗi ngày!
        </p>
      </section>

      {/* Phần hiển thị sản phẩm */}
      <section className="max-w-3xl w-full">
        <h2 className="text-3xl font-semibold text-pink-700 mb-6 text-center">
          Sản phẩm nổi bật
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(({ id, name, description, price, image }) => (
            <div
              key={id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center"
            >
              <img
                src= "https://mediacdn1.bibomart.net/images/2025/4/18/3/origin/sua-growplus-sua-non-vang-800g-tren-1-tuoi-3-3.jpg"
                alt={name}
                className="w-32 h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-pink-700 mb-2">{name}</h3>
              <p className="text-gray-600 mb-2">{description}</p>
              <p className="text-pink-600 font-bold">{price}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default IntroPage;
