import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPopularMovies,
  fetchTopRatedMovie,
  fetchFilteredMovies,
} from "../../redux/slice/movieSlice/movieSlice";

import FilterSection from "./filterSection/FilterSection";
import MovieGridSection from "./movieGridSection/MovieGridSection";
import PaginationSection from "./paginationSection/PaginationSection";
import CompSwiperSlides from "../../components/CompSwiperSlides/CompSwiperSlides";

import arrowImg from "../../assets/images/Login/Breadcrumb_Arrow.png";

import "./style/productListResStyle.css";

const initialFilters = {
  genre: [],
  contentType: [],
  language: [],
  format: [],
  sortBy: [],
  year: [],
  search: "",
};

const ProductList = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.movieData);

  const [popularMovie, setPopularMovie] = useState([]);
  const [topRatedMovie, setTopRatedMovie] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [filters, setFilters] = useState(initialFilters);

  const [page, setPage] = useState(1);

  const isFiltering = Object.entries(filters).some(([key, value]) => {
    if (key === "search") {
      return value.trim() !== "";
    }

    return Array.isArray(value) && value.length > 0;
  });

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const movies = await dispatch(fetchPopularMovies()).unwrap();

        setPopularMovie(movies.results || []);
      } catch (error) {
        console.log(error);
      }
    };

    getPopularMovies();
  }, [dispatch]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        if (isFiltering) {
          const movies = await dispatch(
            fetchFilteredMovies({
              ...filters,
              page,
            }),
          ).unwrap();

          setFilteredMovies(movies.results || []);
        } else {
          const movies = await dispatch(fetchTopRatedMovie(page)).unwrap();

          setTopRatedMovie(movies.results || movies || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMovies();
  }, [dispatch, filters, page, isFiltering]);

  const handleFilterChange = (name, value) => {
    setPage(1);

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemoveFilter = (name) => {
    setPage(1);

    setFilters((prev) => ({
      ...prev,
      [name]: Array.isArray(prev[name]) ? [] : "",
    }));
  };

  const handleClearFilters = () => {
    setPage(1);

    setFilters({
      ...initialFilters,
    });
  };

  const handleApplyFilters = (newFilters) => {
    setPage(1);

    setFilters({
      ...newFilters,
    });
  };

  return (
    <section className="main-content">
      <div className="top-bar">
        <h1 className="page-title">Explore</h1>

        <div className="breadcrumbs">
          <Link to="/">Home</Link>

          <img src={arrowImg} alt="arrowImg" />

          <span>Explore</span>
        </div>
      </div>

      <FilterSection
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        onRemoveFilter={handleRemoveFilter}
        onClearFilters={handleClearFilters}
      />

      {!isFiltering && (
        <div className="recent-search-slider">
          <CompSwiperSlides
            title="Recent Search"
            isloading={loading}
            iserror={error}
            movies={popularMovie}
          />
        </div>
      )}

      <div className="movies-grid">
        <MovieGridSection
          title={isFiltering ? "Filtered Result" : "Top Rated"}
          isloading={loading}
          iserror={error}
          movies={isFiltering ? filteredMovies : topRatedMovie}
        />
      </div>

      {filteredMovies.length === 0 || topRatedMovie.length === 0 ? (
        <></>
      ) : (
        <PaginationSection page={page} setPage={setPage} />
      )}
    </section>
  );
};

export default ProductList;
