import "./hero.css";
import { Link } from "react-router-dom";
import HeroBg from "../../assets/hero-bg.webp";
import HeroLogo from "../../assets/logo-black-outlined.svg";
import { CountryContext } from "../../country-context/CountryContext";
import { useContext } from "react";

function Hero() {
  const { setCountry } = useContext(CountryContext);

  return (
    <div
      className="hero-container"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      <div className="countries-container">
        <Link to="/projects" onClick={() => setCountry("eg")}>
          eg
        </Link>
        <Link to="/projects" onClick={() => setCountry("ksa")}>
          ksa
        </Link>
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
