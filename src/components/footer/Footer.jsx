import "./footer.css";
import { Link } from "react-router-dom";
import InstagramLogo from "../../assets/icons/instagram.svg";
import TiktokLogo from "../../assets/icons/tiktok.svg";
import VimeoLogo from "../../assets/icons/vimeo.svg";
import YoutubeLogo from "../../assets/icons/youtube.svg";
import FooterBg from "../../assets/footer-bg.webp";
import { CountryContext } from "../../country-context/CountryContext";
import { useContext, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RedCircle from "../../assets/red-circle.png";
gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const { setCountry } = useContext(CountryContext);
  const productionsRef = useRef(null);
  const footerContainerRef = useRef(null);
  const getInTouchRef = useRef(null);
  const leftContact = useRef(null);
  const rightContact = useRef(null);
  const sentenceRef = useRef(null);

  // Split the sentence into words for animation
  const sentenceWords = [
    "Have",
    "a",
    "Cool",
    "Idea?",
    "Let's",
    "Collaborate",
    ".",
  ];
  const sentenceSpans = sentenceWords.map((word, i) => (
    <span className="footer-sentence-word" key={i}>
      {word + (i < sentenceWords.length - 1 ? " " : "")}
    </span>
  ));

  // Split "productions" into spans for animation
  const productionsText = "productions";
  const productionsSpans = productionsText.split("").map((char, i) => (
    <span className="production-char" key={i}>
      {char}
    </span>
  ));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the sentence word by word
      if (sentenceRef.current) {
        const words = sentenceRef.current.querySelectorAll(
          ".footer-sentence-word"
        );
        gsap.fromTo(
          words,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: footerContainerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Animate Get in Touch button from the left, after the sentence
      if (getInTouchRef.current) {
        gsap.fromTo(
          getInTouchRef.current,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: "power1.out",
            delay: 0.1,
            scrollTrigger: {
              trigger: footerContainerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Animate both contact blocks from the bottom, after button
      const blocks = [leftContact.current, rightContact.current].filter(
        Boolean
      );
      if (blocks.length) {
        gsap.fromTo(
          blocks,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power1.out",
            stagger: 0,
            delay: 0.5,
            scrollTrigger: {
              trigger: footerContainerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Productions text is now handled by CSS animation
    }, footerContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer>
      <div
        className="productions-subfooter"
        style={{ backgroundImage: `url(${FooterBg})` }}
        ref={productionsRef}
      >
        <p>
          PRODUCTIONS - PRODUCTIONS - PRODUCTIONS - PRODUCTIONS - PRODUCTIONS -
          PRODUCTIONS - PRODUCTIONS - PRODUCTIONS - PRODUCTIONS - PRODUCTIONS -
          PRODUCTIONS - PRODUCTIONS
        </p>
      </div>
      <div className="copyrights-container">
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
        <p>© 2025 Powered by In Mind.</p>
      </div>
    </footer>
  );
}

export default Footer;
