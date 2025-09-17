import "./hero.css";
import { Link } from "react-router-dom";
import HeroBg from "../../assets/hero-bg.jpg";
import HeroLogo from "../../assets/logo-black-outlined.svg";

function Hero() {
  return (
    <div
      className="hero-container"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      <div className="countries-container">
        <p>eg</p> <p>ksa</p>
      </div>
      <div className="logo-container">
        <img src={HeroLogo} alt="Gorilla Logo" />
      </div>
      <div className="hero-navigation">
        <Link to="/projects" className="glass-button">
          projects
        </Link>
        <Link to="/about" className="glass-button">
          about
        </Link>
        <Link to="/contact" className="glass-button">
          contact
        </Link>
      </div>
    </div>
  );
}

export default Hero;
