import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "./Carousel.css";
import "swiper/css";

function Carousel() {
  const images = [1, 2, 3, 4, 5, 6].map(
    (i) => `src/assets/img/banner/banner${i}.jpg`
  );

  return (
    <Swiper
      loop={true}
      modules={[Autoplay]}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      className="carousel"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img src={src} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
