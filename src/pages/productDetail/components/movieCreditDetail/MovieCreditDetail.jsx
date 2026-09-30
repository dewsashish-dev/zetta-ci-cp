import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { toggleLike } from "../../../../redux/slice/movieLikeSlice/movieLikeSlice";

import loadingGif from "../../../../assets/images/loading.gif";
import fbImg from "../../../../assets/images/DetailPage/Fb_1.png";
import xImg from "../../../../assets/images/DetailPage/Twitter_1.png";
import ytImg from "../../../../assets/images/DetailPage/Youtube_1.png";
import instaImg from "../../../../assets/images/DetailPage/Insta_1.png";
import shareImg from "../../../../assets/images/DetailPage/shareIcon.png";
import heartImg from "../../../../assets/images/DetailPage/Heart_Icon.png";
import commentImg from "../../../../assets/images/DetailPage/Comment_Icon.png";
import timeImg from "../../../../assets/images/Home/LatestContent/Time_Icon.png";
import startFilledImg from "../../../../assets/images/Home/LatestContent/StarFilled_Icon.png";
import startOutlineImg from "../../../../assets/images/Home/LatestContent/StarOutline_Icon.png";
import PeopleSlider from "../../../../components/peopleSlider/PeopleSlider";

const MovieCreditDetail = ({ isloading, iserror, movies, credit }) => {
  const [tabActive, setTabActive] = useState("casts");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLikedMovie = useSelector((state) => state.likedMovie);
  const userLoginStatus = useSelector((state) => state.userAuthState);

  const addLikeMovie = (e, valueId) => {
    e.stopPropagation();
    if (userLoginStatus.isLoggedIn) {
      dispatch(toggleLike(valueId));
    } else {
      navigate("/auth");
    }
  };

  const formatRuntime = (runtime) => {
    if (!runtime) return "2h 30m";

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return `${hours}h ${minutes}m`;
  };

  const rating = Math.round(movies?.vote_average / 2);

  const formatVoteCount = (count) => {
    if (!count) return "0";

    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }

    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }

    return count.toString();
  };

  const HandleOffer = (valueId) => {
    navigate(`/makeaoffer/${valueId}`);
  };

  return (
    <>
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
        <>
          <h2 className="desc-title">
            About <span className="movie-name">{movies?.original_title}</span>
          </h2>
          <p className="about-movie">
            <span className="about-text">{movies?.overview}</span>
            <span className="read-more">Read More</span>
          </p>
          <div className="more-info">
            <ul className="time-item">
              <li className="duration">
                <img className="will-invert" src={timeImg} alt="Time" />
                <span>{formatRuntime(movies?.runtime)}</span>
              </li>
              {movies?.genres.map((each, index) => (
                <li className="genre-wrapper">
                  <div key={`genre-${each.id}-${index}`} className="genre-item">
                    {each.name}
                  </div>
                </li>
              ))}
              {/* <div className="genre-wrapper">
                {movies?.genres.map((each, index) => (
                  <div key={`genre-${each.id}-${index}`} className="genre-item">
                    {each.name}
                  </div>
                ))}
              </div> */}
            </ul>
            <div className="start-item">
              <div className="review-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    src={star <= rating ? startFilledImg : startOutlineImg}
                    alt="star"
                  />
                ))}
              </div>
              <div className="review-info">
                <span className="stars-count">({rating})</span>
                <span className="reviews-count">
                  {formatVoteCount(movies?.vote_count)} Reviews
                </span>
              </div>
            </div>
            <div className="info-item">
              <img className="will-invert" src={commentImg} alt="commentImg" />

              <span className="comments-count">
                Comments ({formatVoteCount(movies?.vote_count)})
              </span>
            </div>
          </div>
          <div className="bnt-wrapper">
            <button
              className="make-offer-btn"
              onClick={() => HandleOffer(movies?.id)}
            >
              Make an Offer
            </button>
            <button
              className={`likes-btn ${userLikedMovie.includes(movies?.id) ? "liked-active" : ""}`}
              onClick={(e) => addLikeMovie(e, movies?.id)}
            >
              <img src={heartImg} alt="Heart" />
              <span>5.5K+</span>
            </button>
            <div className="social-btn">
              <div className="share-btn">
                <img className="will-invert" src={shareImg} alt="shareImg" />
              </div>
              <div className="social-links">
                <div className="link-item">
                  <img className="will-invert" src={fbImg} alt="fbImg" />
                </div>
                <div className="link-item">
                  <img className="will-invert" src={instaImg} alt="instaImg" />
                </div>
                <div className="link-item">
                  <img className="will-invert" src={xImg} alt="xImg" />
                </div>
                <div className="link-item">
                  <img className="will-invert" src={ytImg} alt="ytImg" />
                </div>
              </div>
            </div>
          </div>
          <div className="tabs-container">
            <div
              className={`tabs-slider ${
                tabActive === "casts"
                  ? "slider-casts"
                  : tabActive === "crew"
                    ? "slider-crew"
                    : "slider-rights"
              }`}
            ></div>
            <div
              className={`tab-item ${tabActive === "casts" ? "active" : ""}`}
              onClick={() => setTabActive("casts")}
            >
              Casts
            </div>
            <div
              className={`tab-item ${tabActive === "crew" ? "active" : ""}`}
              onClick={() => setTabActive("crew")}
            >
              Crew
            </div>
            <div
              className={`tab-item ${tabActive === "rights" ? "active" : ""}`}
              onClick={() => setTabActive("rights")}
            >
              Rights
            </div>
          </div>
          {tabActive === "casts" && (
            <div className="casts">
              <PeopleSlider people={credit?.cast} type="cast" />
            </div>
          )}
          {tabActive === "crew" && (
            <div className="crew">
              <PeopleSlider people={credit?.crew} type="crew" />
            </div>
          )}
          {tabActive === "rights" && (
            <div className="rights">
              <div className="available-region">
                <div className="title">Available Region</div>
                <div className="region-chips">
                  <div className="region-item active">India</div>
                  <div className="region-item">United States of America</div>
                </div>
              </div>
              <div className="right-types">
                <div className="title">Right Types</div>
                <div className="right-chips">
                  <div className="right-item active">SVOD</div>
                  <div className="right-item active">Theoterical Rights</div>
                  <div className="right-item">Satellite</div>
                </div>
              </div>
            </div>
          )}
          <div className="make-offer-btn-wrapper">
            <button
              className="make-offer-btn"
              onClick={() => HandleOffer(movies?.id)}
            >
              Make an Offer
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default MovieCreditDetail;
