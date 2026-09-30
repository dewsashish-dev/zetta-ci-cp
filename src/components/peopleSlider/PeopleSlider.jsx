import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

import noImg from "../../assets/images/Home/no-image.jpg";

const PeopleSlider = ({ people, type }) => {
  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={20}
      freeMode={{
        enabled: true,
        sticky: true,
      }}
      modules={[FreeMode]}
      className="cast-slider"
    >
      {people?.slice(0, 9).map((each, index) => (
        <SwiperSlide key={`${type}-${index}`} className="cast-item-wrapper">
          <div className="cast-item">
            <div className="cast-img">
              <img
                src={
                  each.profile_path
                    ? `https://image.tmdb.org/t/p/original${each.profile_path}`
                    : noImg
                }
                alt={each.name}
              />
            </div>

            <span className="char-name">{each.name}</span>

            <span className="cast-name">{each.character || each.job}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PeopleSlider;
