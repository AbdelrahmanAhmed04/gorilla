import { NavLink } from "react-router-dom";
import "./navbar.css";
import LightNavLogo from "../../assets/logo-black-red.svg";
import DarkNavLogo from "../../assets/logo-transparent-red-outlined.svg";
function Navbar(props) {
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
      <img
        src={props.variant == "dark" ? DarkNavLogo : LightNavLogo}
        alt="Gorilla logo"
      />
      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active navlink" : "navlink"
          }
        >
          home
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "active navlink" : "navlink"
          }
        >
          projects
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "active navlink" : "navlink"
          }
        >
          about
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "active navlink" : "navlink"
          }
        >
          contact
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
