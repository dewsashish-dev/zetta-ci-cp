import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";

import flimImg from "../../../../assets/images/Home/Header/SubmittedContent_Icon.png";
import loadingGif from "../../../../assets/images/loading.gif";
import { useNavigate } from "react-router";

const HeroSection = ({ isloading, iserror, movies }) => {
  const [counts, setCounts] = useState({
    submitted: 0,
    available: 0,
    sold: 0,
  });

  const dataMovie = movies.length > 0;

  useEffect(() => {
    const targets = {
      submitted: 234,
      available: 174,
      sold: 60,
    };

    const duration = 2000;
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCounts({
        submitted: Math.floor(targets.submitted * easedProgress),
        available: Math.floor(targets.available * easedProgress),
        sold: Math.floor(targets.sold * easedProgress),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => {};
  }, []);

  const navigate = useNavigate();

  return (
    <div className="hero-banner">
      <div className="hero-text">
        <h1 className="hero-title">
          Buy and Sell <br className="line-break" />
          Movies, <br />
          <span>Movie Collection</span>
        </h1>

        <p className="hero-desc">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati
          provident deleniti libero sapiente qui, in officia fugit repellendus
          placeat culpa!
        </p>

        <button
          className="explore-btn"
          onClick={() => navigate("/productlist")}
        >
          Explore
        </button>
      </div>

      <div className="hero-images">
        <div className="hero-slider">
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

          {!isloading && !iserror && dataMovie && (
            <Swiper
              slidesPerView={1.5}
              loop={true}
              effect="cards"
              centeredSlides={true}
              modules={[EffectCards, Autoplay]}
              cardsEffect={{
                slideShadows: false,
                perSlideOffset: 8,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              className="hero-swiper-wrapper"
            >
              {movies?.map((each, index) => (
                <SwiperSlide
                  className="slide-wrapper"
                  key={`hero-swiper-${index}`}
                >
                  <div className="slide-img">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${each.poster_path}`}
                      alt={each.title || "Movie poster"}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="count">{counts.submitted}</span>

            <div className="label">
              Submitted <br />
              Content
            </div>

            <div className="image">
              <img src={flimImg} alt="Submitted Content" />
            </div>
          </div>

          <div className="stat-item green">
            <span className="count">{counts.available}</span>

            <div className="label">
              Available <br />
              Content
            </div>

            <div className="image">
              <img src={flimImg} alt="Available Content" />
            </div>
          </div>

          <div className="stat-item yellow">
            <span className="count">{counts.sold}</span>

            <div className="label">
              Sold <br />
              Content
            </div>

            <div className="image">
              <img src={flimImg} alt="Sold Content" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
