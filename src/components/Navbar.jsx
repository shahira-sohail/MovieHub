import {Link} from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          MovieHub
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </div>

        <button className="search-button">
          🔍
        </button>

      </div>
    </nav>
  );
}

export default Navbar;