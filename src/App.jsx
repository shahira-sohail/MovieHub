import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieCard from "./components/MovieCard";
import Loader from "./components/Loader";
import { getPopularMovies, searchMovies } from "./services/tmdb";
import useDebounce from "./hooks/useDebounce";
import Favorites from "./pages/Favorites";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && hasMore) {
          const nextPage = page + 1;
          console.log("Loading page:", nextPage);
          setPage(nextPage);
        }
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading, page, hasMore]);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if(page === 1){
      return;
    }
    async function fetchNextPage() {
      try{
        setLoading(true);
        const data = debouncedSearchQuery.trim()
          ? await searchMovies(debouncedSearchQuery, page)
          : await getPopularMovies(page);
        setMovies((previousMovies) => [
          ...previousMovies,
          ...data.results,
        ]);
        setHasMore(page < data.total_pages);
        setLoading(false);
      }catch(error){
        console.error("Next page error:", error);
        setError("Failed to load more movies.");
        setLoading(false);
      }
    }
    fetchNextPage();
  },[page]);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        setLoading(true);
        setError("");

        if(!debouncedSearchQuery.trim()){
          const data = await getPopularMovies(1);
          setMovies(data.results);
          setPage(1);
          setHasMore(1 < data.total_pages);
          setLoading(false);
          return;
        }

        const data = await searchMovies(debouncedSearchQuery, 1);

        setMovies(data.results);
        setPage(1);
        setHasMore(1 < data.total_pages);
        setLoading(false);
      } catch (error) {
        console.error("Search Error:", error);
        setError("Failed to search movies. Please try again.");
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [debouncedSearchQuery]);

  async function handleSearch(query){
      setSearchQuery(query);
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero onSearchChange={setSearchQuery} />
              <section className="movies-section">
                <h2>
                  {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : "Popular Movies"}
                </h2>

                {error && <p>{error}</p>}

                {!error && (
                  <>
                    <div className="movies-grid">
                      {movies.map((movie, index) => (
                        <MovieCard
                          key={`${movie.id}-${index}`}
                          movie={movie}
                        />
                      ))}
                    </div>
                    {loading && <Loader/>}
                    {hasMore && (
                      <div
                        ref={loadMoreRef}
                        className="load-more-trigger"></div>
                    )}
                  </>
                )}
              </section>
            </main>
          }
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;