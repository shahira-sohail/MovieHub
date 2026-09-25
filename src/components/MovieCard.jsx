import { useState } from "react";
import "./MovieCard.css";

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    return savedFavorites.some(
      (favorite) => favorite.id === movie.id
    );
  });
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";

  function handleFavorite(){
    const savedFavorites = 
      JSON.parse(localStorage.getItem("favorites")) || [];
    const alreadyFavorite = savedFavorites.some(
      (favorite) => favorite.id === movie.id
    );

    if(alreadyFavorite){
      const updatedFavorites = savedFavorites.filter(
        (favorite) => favorite.id !== movie.id
      );
      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );
      setIsFavorite(false);
    }else{
      localStorage.setItem(
        "favorites",
        JSON.stringify([...savedFavorites, movie])
      );
      setIsFavorite(true);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
          />
        ) : (
          <div className="poster-placeholder">
            No Image
          </div>
        )}

        <button
          className={`favorite-button ${
            isFavorite ? "active" : ""
          }`}
          onClick={handleFavorite}
          aria-label="Add to favorites"
        >
          {isFavorite ? "❤️" : "♡"}
        </button>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <div className="movie-meta">
          <span>{releaseYear}</span>
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;