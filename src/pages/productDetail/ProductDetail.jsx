import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import {
  fetchMovieReleaseDates,
  fetchMovieVideos,
  fetchRecommendedMovies,
  fetchSingleCreditMovie,
  fetchSingleMovie,
} from "../../redux/slice/movieSlice/movieSlice";

import MovieDetailSlide from "./components/movieDetailSlide/MovieDetailSlide";
import MovieCreditDetail from "./components/movieCreditDetail/MovieCreditDetail";
import CompSwiperSlides from "../../components/CompSwiperSlides/CompSwiperSlides";

import breadArrowImg from "../../assets/images/DetailPage/Breadcrumb_Icon.png";

import "./style/ProductDetailResStyle.css";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error } = useSelector((state) => state.movieData);

  const [singleMovie, setSingleMovie] = useState(null);
  const [creditMovie, setCreditMovie] = useState(null);
  const [recommendedMovie, setRecommendedMovie] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [extraDetail, setExtraDetail] = useState(null);

  useEffect(() => {
    const getSingleMovie = async () => {
      try {
        const movies = await dispatch(fetchSingleMovie(id)).unwrap();

        setSingleMovie(movies);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleMovie();
  }, [dispatch, id]);

  useEffect(() => {
    const getSingleCreditMovie = async () => {
      try {
        const movies = await dispatch(fetchSingleCreditMovie(id)).unwrap();

        setCreditMovie(movies);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleCreditMovie();
  }, [dispatch, id]);

  useEffect(() => {
    const getRecommendedMovies = async () => {
      try {
        const movies = await dispatch(fetchRecommendedMovies(id)).unwrap();

        setRecommendedMovie(movies);
      } catch (error) {
        console.log(error);
      }
    };

    getRecommendedMovies();
  }, [dispatch, id]);

  useEffect(() => {
    const getMovieTrailer = async () => {
      try {
        const videos = await dispatch(fetchMovieVideos(id)).unwrap();

        const movieTrailer =
          videos.find(
            (video) =>
              video.site === "YouTube" &&
              video.type === "Trailer" &&
              video.official,
          ) ||
          videos.find(
            (video) => video.site === "YouTube" && video.type === "Trailer",
          ) ||
          videos.find(
            (video) => video.site === "YouTube" && video.type === "Teaser",
          );

        setMovieTrailer(movieTrailer || null);
      } catch (error) {
        console.log(error);
      }
    };

    getMovieTrailer();
  }, [dispatch, id]);

  useEffect(() => {
    const getExtraDetailMovies = async () => {
      try {
        const movies = await dispatch(fetchMovieReleaseDates(id)).unwrap();

        setExtraDetail(movies);
      } catch (error) {
        console.log(error);
      }
    };

    getExtraDetailMovies();
  }, [dispatch, id]);

  return (
    <section className="product-detail-section">
      <div className="top-nav">
        <h1 className="movie-name">
          {singleMovie?.original_title ? singleMovie.original_title : "loading"}
        </h1>
        <div className="breadcrumbs">
          <div className="prev-page">
            <Link to={"/"} className="current-page">
              <p>Home</p>
            </Link>
          </div>
          <span>
            <img src={breadArrowImg} alt="breadArrowImg" />
          </span>
          <div className="current-page">
            {singleMovie?.original_title
              ? singleMovie.original_title
              : "loading"}
          </div>
        </div>
      </div>
      <div className="movie-details-container">
        <div className="movie-images-container">
          <MovieDetailSlide
            isloading={loading}
            iserror={error}
            movies={singleMovie}
            trailer={movieTrailer}
          />
        </div>
        <div className="movie-description-container">
          <MovieCreditDetail
            isloading={loading}
            iserror={error}
            movies={singleMovie}
            credit={creditMovie}
            extra={extraDetail}
          />
        </div>
      </div>
      <div className="related-slider">
        <CompSwiperSlides
          title="Related Items"
          isloading={loading}
          iserror={error}
          movies={recommendedMovie}
        />
      </div>
    </section>
  );
};

export default ProductDetail;
