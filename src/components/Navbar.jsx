import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <a href="/" className="logo">
          MovieHub
        </a>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/favorites">Favorites</a>
        </div>

        <button className="search-button">
          🔍
        </button>

      </div>
    </nav>
  );
}

export default Navbar;