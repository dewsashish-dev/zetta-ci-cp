import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchLatestMovie,
  fetchLowBudgetMovie,
  fetchPopularMovies,
  fetchShortMovie,
  fetchTamilMovie,
} from "../../redux/slice/movieSlice/movieSlice";

import BackToTop from "../../components/backToTop/BackToTop";
import HeroSection from "./components/heroSection/HeroSection";
import CompSwiperSlides from "../../components/CompSwiperSlides/CompSwiperSlides";

import "./style/homeResStyle.css";

const HomeSection = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.movieData);

  const [popularMovie, setPopularMovie] = useState([]);
  const [latestMovie, setLatestMovie] = useState([]);
  const [tamilMovie, setTamilMovie] = useState([]);
  const [shortMovie, setShortMovie] = useState([]);
  const [lowBudgetMovie, setLowBudgetMovie] = useState([]);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const movies = await dispatch(fetchPopularMovies()).unwrap();

        setPopularMovie(movies.results);
      } catch (error) {
        console.log(error);
      }
    };

    getPopularMovies();
  }, [dispatch]);

  useEffect(() => {
    const getLatestMovies = async () => {
      try {
        const movies = await dispatch(fetchLatestMovie()).unwrap();

        setLatestMovie(movies.results);
      } catch (error) {
        console.log(error);
      }
    };

    getLatestMovies();
  }, [dispatch]);

  useEffect(() => {
    const getTamilMovies = async () => {
      try {
        const movies = await dispatch(fetchTamilMovie()).unwrap();

        setTamilMovie(movies.results);
      } catch (error) {
        console.log(error);
      }
    };

    getTamilMovies();
  }, [dispatch]);

  useEffect(() => {
    const getShortMovies = async () => {
      try {
        const movies = await dispatch(fetchShortMovie()).unwrap();
        console.log(movies);

        setShortMovie(movies.results);
      } catch (error) {
        console.log(error);
      }
    };

    getShortMovies();
  }, [dispatch]);

  useEffect(() => {
    const getLowBudgetMovies = async () => {
      try {
        const movies = await dispatch(fetchLowBudgetMovie()).unwrap();

        setLowBudgetMovie(movies.results);
      } catch (error) {
        console.log(error);
      }
    };

    getLowBudgetMovies();
  }, [dispatch]);

  return (
    <>
      <section className="home-section">
        <HeroSection
          isloading={loading}
          iserror={error}
          movies={popularMovie}
        />
        <div className="home-slider-wrapper">
          <div className="Tamil-slider">
            <CompSwiperSlides
              title="Tamil Content"
              isloading={loading}
              iserror={error}
              movies={tamilMovie}
            />
          </div>
          <div className="latest-slider">
            <CompSwiperSlides
              title="Latest Content"
              isloading={loading}
              iserror={error}
              movies={latestMovie}
            />
          </div>
          <div className="short-slider">
            <CompSwiperSlides
              title="Short Content"
              isloading={loading}
              iserror={error}
              movies={shortMovie}
            />
          </div>
          <div className="low-budget-slider">
            <CompSwiperSlides
              title="Low Budget Content"
              isloading={loading}
              iserror={error}
              movies={lowBudgetMovie}
            />
          </div>
        </div>
      </section>
      <BackToTop />
    </>
  );
};

export default HomeSection;
