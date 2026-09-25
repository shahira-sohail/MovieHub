import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(savedFavorites);
  }, []);

  return (
    <section className="favorites-section">
      <h1>My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="empty-favorites">
          You haven't added any favorite movies yet.
        </p>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Favorites;