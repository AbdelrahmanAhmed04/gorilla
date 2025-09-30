import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./navbar.css";
import LightNavLogo from "../../assets/logo-black-red.svg";
import DarkNavLogo from "../../assets/logo-transparent-red-outlined.svg";
import { CountryContext } from "../../country-context/CountryContext";
import { useContext } from "react";

function Navbar(props) {
  const { setCountry } = useContext(CountryContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔒 Prevent scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <nav
      className={
        props.variant === "dark"
          ? "dark-nav navbar-container"
          : props.variant === "transparent"
          ? "transparent-nav navbar-container"
          : "light-nav navbar-container"
      }
    >
      {/* Logo */}
      <img
        src={props.variant === "dark" ? DarkNavLogo : LightNavLogo}
        alt="Gorilla logo"
      />

      {/* Hamburger */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className="nav-links">
        <NavLink to="/">home</NavLink>
        <NavLink to="/projects">projects</NavLink>
        <NavLink to="/about">about</NavLink>
        <NavLink to="/contact">contact</NavLink>
      </div>

      {/* Mobile overlay */}
      <div className={`mobile-nav ${menuOpen ? "show" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          home
        </NavLink>
        <NavLink to="/projects" onClick={() => setMenuOpen(false)}>
          projects
        </NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>
          about
        </NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
          contact
        </NavLink>
        <div className="counries">
          <Link to="/projects" onClick={() => setCountry("eg")}>
            eg
          </Link>
          <Link to="/projects" onClick={() => setCountry("ksa")}>
            ksa
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
