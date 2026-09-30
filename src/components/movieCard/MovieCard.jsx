import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { toggleLike } from "../../redux/slice/movieLikeSlice/movieLikeSlice";

import noImg from "../../assets/images/Home/no-image.jpg";
import likeImg from "../../assets/images/Home/LatestContent/Like_Icon.png";
import timeImg from "../../assets/images/Home/LatestContent/Time_Icon.png";
import noLikeImg from "../../assets/images/Home/LatestContent/UnFilledLiike_Img.png";
import startFilledImg from "../../assets/images/Home/LatestContent/StarFilled_Icon.png";
import startOutlineImg from "../../assets/images/Home/LatestContent/StarOutline_Icon.png";

import "./style/MovieCardStyle.css";

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const MovieCard = ({ value }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLikedMovie = useSelector((state) => state.likedMovie);
  const userLoginStatus = useSelector((state) => state.userAuthState);
  const genres = value.genre_ids?.map((id) => genreMap[id]).filter(Boolean);

  const visibleGenres = genres?.slice(0, 2);
  const extraGenres = genres?.length - 2;

  const rating = Math.round(value.vote_average / 2);

  const HandleOffer = (e, valueId) => {
    e.stopPropagation();

    navigate(`/makeaoffer/${valueId}`);
  };

  const addLikeMovie = (e, valueId) => {
    e.stopPropagation();

    if (userLoginStatus.isLoggedIn) {
      dispatch(toggleLike(valueId));
    } else {
      navigate("/auth");
    }
  };

  const HandleProductDetail = (e, valueId) => {
    e.stopPropagation();

    navigate(`/productdetail/${valueId}`);
  };

  return (
    <div
      className="slider-item"
      onClick={(e) => HandleProductDetail(e, value.id)}
    >
      <div className="movie-img">
        <img
          src={
            value.poster_path
              ? `https://image.tmdb.org/t/p/w500${value.poster_path}`
              : noImg
          }
          alt={value.title || "Movie poster"}
        />

        <div className="like-btn">
          <img
            src={userLikedMovie.includes(value.id) ? likeImg : noLikeImg}
            className="liked"
            onClick={(e) => addLikeMovie(e, value.id)}
          />
        </div>

        <button
          type="button"
          className="make-offer"
          onClick={(e) => HandleOffer(e, value.id)}
        >
          Make an Offer
        </button>
      </div>

      <h3 className="movie-title">{value.title}</h3>

      <p className="movie-desc">
        {value.overview
          ? value.overview
          : "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati provident deleniti libero sapiente qui, in officia fugit repellendus placeat culpa!"}
      </p>

      <div className="movie-top-wrapper">
        <div className="movie-duration">
          <img src={timeImg} />
          <p>2h 49m</p>
        </div>

        <div className="movie-genres">
          {visibleGenres?.map((genre) => (
            <div className="genre-item" key={genre}>
              {genre}
            </div>
          ))}

          {extraGenres > 0 && (
            <div className="genre-item-exrta">+{extraGenres}</div>
          )}
          {visibleGenres.length <= 0 && (
            <div className="genre-item">No genre provided</div>
          )}
        </div>
      </div>

      <div className="movie-rating">
        <div className="reviews">
          {[1, 2, 3, 4, 5].map((star) => (
            <img
              key={star}
              src={star <= rating ? startFilledImg : startOutlineImg}
              alt="star"
            />
          ))}
        </div>

        <p>({value.vote_average?.toFixed(1)})</p>

        <div className="review-count">{value.vote_count} Reviews</div>
      </div>
    </div>
  );
};

export default MovieCard;
