import { useState } from "react";

import loadingGif from "../../../../assets/images/loading.gif";
import noImg from "../../../../assets/images/Home/no-image.jpg";
import playImg from "../../../../assets/images/DetailPage/Plybutton_Icon.png";
import closeImg from "../../../../assets/images/DetailPage/PopupVideo/Close_Icon.png";

const MovieDetailSlide = ({ isloading, iserror, movies, trailer }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isModealOpen, setModealOpen] = useState(false);

  const movieImage = (path) =>
    path ? `https://image.tmdb.org/t/p/original${path}` : noImg;

  const thumbnails = [
    {
      image: movies?.poster_path,
      hasPlayButton: false,
    },
    {
      image: movies?.backdrop_path,
      hasPlayButton: false,
    },
    {
      image: movies?.poster_path,
      hasPlayButton: true,
    },
  ];

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
          <div className="movie-images-small">
            {thumbnails.map((item, index) => (
              <div
                key={index}
                className={`movie-img ${selectedTab === index ? "active" : ""}`}
                onClick={() => setSelectedTab(index)}
              >
                <img
                  src={movieImage(item.image)}
                  alt={movies?.title || "Movie"}
                />

                {item.hasPlayButton && (
                  <div className="play-btn">
                    <img src={playImg} alt="Play" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="movie-images-preview">
            <img
              src={movieImage(thumbnails[selectedTab].image)}
              alt={movies?.title || "Movie preview"}
            />

            {thumbnails[selectedTab].hasPlayButton && (
              <div className="preview-play-btn">
                <img
                  src={playImg}
                  alt="Play"
                  onClick={() => setModealOpen(true)}
                />
              </div>
            )}
          </div>
        </>
      )}
      {isModealOpen && (
        <div className="tralier-popup" onClick={() => setModealOpen(false)}>
          <div className="trailer-wrapper" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${trailer?.key}`}
              width="100%"
              height="100%"
              title="Movie Trailer"
              allow="autoplay; accelerometer; encrypted-media; clipboard-write;"
              allowFullScreen
            ></iframe>
            <button type="button" className="popup-close">
              <img
                src={closeImg}
                alt="closeImg"
                onClick={() => setModealOpen(false)}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetailSlide;
