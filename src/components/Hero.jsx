import { useState } from "react";
import "./Hero.css";

function Hero({ onSearchChange }) {
  const [query, setQuery] = useState("");

  function handleChange(event) {
    const value = event.target.value;

    setQuery(value);
    onSearchChange(value);
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Discover Your Next Favorite Movie</h1>

        <p>
          Explore popular movies and find something you'll love.
        </p>

        <div className="search-box">
          <span className="search-icon">🔍</span>

          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={handleChange}
          />

          <button type="button">Search</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;