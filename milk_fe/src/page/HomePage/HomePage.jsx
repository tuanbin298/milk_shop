import CarouselImage from "../../component/Carousel/Carousel";
import HotProductSection from "../../component/HotProductSection/HotProductSection";

export default function Homepage() {
  return (
    <div>
      {/* Carousel */}
      <CarouselImage></CarouselImage>

      {/* Sản phẩm hot */}
      <HotProductSection />
    </div>
  );
}
