export default function NewsSection() {
  const newsItems = [
    {
      id: 1,
      title: "Top 8 sữa bột tốt nhất hiện nay tại Việt Nam giúp bé khỏe mạnh",
      image: "src/assets/img/news/news-thumbnail.jpg",
    },
    {
      id: 2,
      title: "Top 8 sữa bột tốt nhất hiện nay tại Việt Nam giúp bé khỏe mạnh",
      image: "src/assets/img/news/news-thumbnail.jpg",
    },
    {
      id: 3,
      title: "Top 8 sữa bột tốt nhất hiện nay tại Việt Nam giúp bé khỏe mạnh",
      image: "src/assets/img/news/news-thumbnail.jpg",
    },
  ];

  return (
    <div className="px-5 py-5 bg-white">
      {/* Title */}
      <h2 className="text-[28px] font-semibold text-[#F75385] ml-[10px] text-left mb-6">
        Tin tức
      </h2>

      {/* News Grid */}
      <div className="grid grid-cols-3 gap-8">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="space-y-2 hover:scale-105 transition-transform"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full rounded-lg object-cover"
            />
            <p className="text-sm text-black font-medium leading-5">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-10">
        <button className="text-[#F75385] border border-pink-300 rounded-full px-6 py-2 text-base font-medium hover:bg-[#F75385] hover:text-pink-50 transition-colors">
          Xem tất cả <span className="ml-1">➤</span>
        </button>
      </div>
    </div>
  );
}
