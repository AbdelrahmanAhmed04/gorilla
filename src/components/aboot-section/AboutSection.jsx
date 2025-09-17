import "./about-section.css";
import { Link } from "react-router-dom";
import AboutSectionBG from "../../assets/about-bg.png";

function AboutSection() {
  return (
    <div className="about-section-container">
      <div
        className="about-bg-container"
        style={{
          backgroundImage: `url(${AboutSectionBG}) `,
        }}
      ></div>

      <div className="about-content">
        <h2>About</h2>
        <p>
          Based in Cairo and Riyadh, Gorilla is a creative production company
          telling bold, cinematic stories for brands across the Middle East and
          beyond.
        </p>
      </div>
      <div className="about-cta">
        <Link to="/about" className="glass-button">
          About Us
        </Link>
        <Link to="/contact" className="cta-2">
          Get in Touch
        </Link>
      </div>
    </div>
  );
}

export default AboutSection;
