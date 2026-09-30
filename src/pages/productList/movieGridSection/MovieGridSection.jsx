import loadingGif from "../../../assets/images/loading.gif";
import MovieCard from "../../../components/movieCard/MovieCard";

const MovieGridSection = ({ title, isloading = true, iserror, movies }) => {
  return (
    <>
      <h1 className="title">{title}</h1>

      {isloading && (
        <div className="loading">
          <img src={loadingGif} alt="Loading" />
        </div>
      )}

      {iserror && !isloading && (
        <div className="error-cnt">
          <h1>Failed To fetch</h1>
        </div>
      )}

      {movies?.length === 0 && (
        <div className="error-cnt">
          <h1>No data</h1>
        </div>
      )}

      {!isloading && !iserror && movies?.length > 0 && (
        <div className="movies-grid-wrapper">
          {movies.map((each) => (
            <MovieCard key={each.id} value={each} />
          ))}
        </div>
      )}
    </>
  );
};

export default MovieGridSection;
