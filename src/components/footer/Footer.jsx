import "./footer.css";
import { Link } from "react-router-dom";
import InstagramLogo from "../../assets/icons/instagram.svg";
import TiktokLogo from "../../assets/icons/tiktok.svg";
import VimeoLogo from "../../assets/icons/vimeo.svg";
import YoutubeLogo from "../../assets/icons/youtube.svg";
import FooterBg from "../../assets/footer-bg.webp";
import { CountryContext } from "../../country-context/CountryContext";
import { useContext } from "react";

function Footer() {
  const { setCountry } = useContext(CountryContext);
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-cta">
          <h2>Have a Cool Idea?</h2>
          <h2>
            Let's <span className="underlined uppercase">Collaborate</span>
            <span className="red-colored">.</span>
          </h2>
          <Link
            to="/contact"
            className="glass-button"
            id="glass-button-extended"
          >
            Get in Touch
          </Link>
        </div>
        <div className="footer-contacts">
          <div className="social-media">
            <div className="locations-container">
              <h3>General</h3>
              <Link to="/projects" onClick={() => setCountry("eg")}>
                EG
              </Link>
              <Link to="/projects" onClick={() => setCountry("ksa")}>
                KSA
              </Link>
            </div>
            <div className="social-container">
              <h3>Follow us on</h3>
              <div className="social-links-continer">
                <a className="social-link" href="https://youtube.com">
                  <img src={YoutubeLogo} alt="YouTube" /> <p>YouTube</p>
                </a>
                <a className="social-link" href="https://vimeo.com">
                  <img src={VimeoLogo} alt="Vimeo" /> <p>Vimeo</p>
                </a>
                <a className="social-link" href="https://instagram.com">
                  <img src={InstagramLogo} alt="Instagram" /> <p>Instagram</p>
                </a>
                <a className="social-link" href="https://tiktok.com">
                  <img src={TiktokLogo} alt="Tiktok" /> <p>Tiktok</p>
                </a>
              </div>
            </div>
          </div>
          <div className="contact-info">
            <div className="contact-details">
              <h3>Contact</h3>
              <p>+02524664466</p>
              <a href="mailto:info@gorilla.com">info@gorilla.com</a>
            </div>
            <div className="footer-nav">
              <h3>Helpful links</h3>
              <div className="links-container">
                <Link to="/about">About</Link>
                <span className="red-colored">.</span>
                <Link to="/contact">Contact</Link>
                <span className="red-colored">.</span>
                <Link to="/projects">Projects</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="productions-subfooter"
        style={{ backgroundImage: `url(${FooterBg})` }}
      >
        <p>productions</p>
      </div>
      <div className="copyrights-container">
        <p>© 2025 Gorilla. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
