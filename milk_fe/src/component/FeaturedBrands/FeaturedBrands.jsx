export default function FeaturedBrands() {
  const brands = [
    { name: "Abbott", image: "src/assets/img/brand/Abbott.jpg" },
    { name: "BiomilPlus", image: "src/assets/img/brand/BiomilPlus.jpg" },
    { name: "BlemilPlus", image: "src/assets/img/brand/BlemilPlus.jpg" },
    { name: "DutchLady", image: "src/assets/img/brand/DutchLady.jpg" },
    { name: "Ensure", image: "src/assets/img/brand/Ensure.jpg" },
    { name: "Nestle NAN", image: "src/assets/img/brand/NestleNAN.jpg" },
    { name: "Optimum GOLD", image: "src/assets/img/brand/OptimumGOLD.jpg" },
    { name: "PediaSure", image: "src/assets/img/brand/PediaSure.jpg" },
    { name: "Rontamil", image: "src/assets/img/brand/rontamil.jpg" },
    {
      name: "Optimum Mama GOLD",
      image: "src/assets/img/brand/OptimumMamaGOLD.jpg",
    },
  ];

  return (
    <div className="px-5 py-5 bg-white">
      {/* Title */}
      <h2 className="text-[28px] font-semibold text-[#F75385] ml-[10px] text-left">
        Thương hiệu nổi bật
      </h2>

      {/* Brand Logos Grid */}
      <div className="grid grid-cols-5 gap-6 mt-6">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="flex justify-center items-center p-2 hover:scale-105 transition-transform"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="max-h-14 object-contain"
            />
          </div>
        ))}
      </div>

      {/* Banner Section */}
      <div className="mt-10">
        <img
          src="src/assets/img/banner/banner5.jpg"
          alt="Bottom Banner"
          className="w-full object-cover shadow-md"
        />
      </div>
    </div>
  );
}
