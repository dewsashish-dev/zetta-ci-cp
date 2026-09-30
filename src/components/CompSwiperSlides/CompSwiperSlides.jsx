import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import MovieCard from "../movieCard/MovieCard";

import "swiper/css";
import "swiper/css/navigation";

import loadingGif from "../../assets/images/loading.gif";
import leftArrow from "../../assets/images/Home/LatestContent/Leftarrow_Icon.png";
import rightArrow from "../../assets/images/Home/LatestContent/RightArrow_Icon.png";

import "./style/CompSwiperSlidesStyle.css";

const CompSwiperSlides = ({ title, isloading, iserror, movies }) => {
  const keyName = title.replace(/\s+/g, "-").toLowerCase();

  const prevClass = `nav-left-${keyName}`;
  const nextClass = `nav-right-${keyName}`;

  return (
    <>
      <div className="slider-headers">
        <h2 className="section-title">{title}</h2>
        <div className="slider-nav">
          <div className={`nav-left ${prevClass}`}>
            <img src={leftArrow} alt="leftArrow" />
          </div>
          <div className={`nav-right ${nextClass}`}>
            <img src={rightArrow} alt="rightArrow" />
          </div>
        </div>
      </div>
      <div className="slider-cnt">
        {isloading && (
          <div className="loading">
            <img src={loadingGif} alt="Loading" />
          </div>
        )}

        {iserror && (
          <div className="error-cnt">
            <h1>Failed To fetch</h1>
          </div>
        )}
        {!isloading && !iserror && (
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            autoHeight={true}
            rewind={true}
            navigation={{
              nextEl: `.${nextClass}`,
              prevEl: `.${prevClass}`,
            }}
            modules={[Navigation]}
            breakpoints={{
              340: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              400: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              576: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              992: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1400: {
                slidesPerView: 5,
                spaceBetween: 35,
              },
            }}
            className="all-slider-wrapper"
          >
            {movies.map((each, index) => (
              <SwiperSlide key={`swiper-${keyName[0]}-${index}`}>
                <MovieCard value={each} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};

export default CompSwiperSlides;
