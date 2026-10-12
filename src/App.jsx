import { useEffect, useRef, useState } from "react";
import { getPosts } from "./services/dataHub";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieCard from "./components/MovieCard";
import Loader from "./components/Loader";
import { getPopularMovies, searchMovies } from "./services/tmdb";
import useDebounce from "./hooks/useDebounce";
import Favorites from "./pages/Favorites";
import CreatePost from "./components/CreatePost";
import API_BASE_URL from "./config";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const[posts, setPosts] = useState([]);
  const[postsLoading, setPostsLoading] = useState(true);
  const [deletingPostId, setDeletingPostId] = useState(null);
  const[deleteError, setDeleteError] = useState("");
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
    async function fetchPosts(){
      try{
        setPostsLoading(true);
        const data = await getPosts();
        setPosts(data);
      }catch(error){
        console.error("Posts Error:", error);
      }finally{
        setPostsLoading(false);
      }
    }
    fetchPosts();
  }, []);

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

  async function handleDeletePost(postId){
    setDeletingPostId(postId);
    setDeleteError("");
    try{
      const response = await fetch(
        `${API_BASE_URL}/posts/${postId}`,
        {
          method: "DELETE",
        }
      );
      if(!response.ok){
        throw new Error("Failed to delete post");
      }
      setPosts((previousPosts) => 
        previousPosts.filter((post) => post._id !== postId)
    );
    }catch(error){
      console.error("Delete Post Error:", error);
      setDeleteError("Failed to delete post. Please try again.");
    }finally{
      setDeletingPostId(null);b  
    }
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
              <CreatePost onPostCreated={(newPost) => setPosts((previousPosts) => [newPost, ...previousPosts])}/>
              <section className="posts-section">
                <h2>Posts from The Data Hub</h2>
                {postsLoading && <p>Loading posts...</p>}
                {!postsLoading && posts.length === 0 && (
                  <p>No posts found</p>
                )}
                {!postsLoading && posts.length > 0 && (
                  <div>
                    {deleteError && <p>{deleteError}</p>}
                    {posts.map((post) => (
                      <article key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <button
                         onClick={() => handleDeletePost(post._id)}
                         disabled={deletingPostId === post._id}
                         >
                          {deletingPostId === post._id ? "Deleting..." : "Delete"}
                        </button>
                      </article>
                    ))}
                  </div>
                )}
              </section>
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