import "./projects.css";
import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useContext,
} from "react";
import { ProjectsContext } from "../../components/projects-context/ProjectsContext";
import { CountryContext } from "../../country-context/CountryContext";
import Navbar from "../../components/navbar/Navbar";
import ContactCta from "../../components/contact-cta/ContactCta";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const images = import.meta.glob("./assets/*.{jpg,png,webp}", { eager: true });

function usePreloadAssets() {
  useEffect(() => {
    Object.values(images).forEach((module) => {
      const img = new Image();
      img.src = module.default; // module.default is the URL
    });
  }, []);
}

function Projects() {
  var wrapperRef = useRef();
  var containerRef = useRef();
  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: containerRef.current,
      smooth: 0.8,
      speed: 1.4,
      effects: true,
    });

    return () => smoother.kill();
  }, []);

  const { projects } = useContext(ProjectsContext);
  const { country, setCountry } = useContext(CountryContext);
  const [updatedProjects, setUpdatedProjects] = useState([]);
  const [filter, setFilter] = useState("all");

  const filterProjects = (project) => {
    if (filter !== "all") {
      return (
        project.genra.includes(filter) && project.country.includes(country)
      );
    } else if (filter === "all") {
      return project.country.includes(country);
    }
  };

  useEffect(() => {
    const filtered = projects.filter(filterProjects);
    setUpdatedProjects(filtered);
    console.log(filter);
  }, [filter, projects, country]);
  usePreloadAssets();
  return (
    <>
      <div className="smooth-wrapper" ref={wrapperRef}>
        <div className="smooth-container" ref={containerRef}>
          <Navbar variant="dark" />
          <div className="projects-hero">
            <h2>Our Work</h2>
            <p>
              Commercials, branded content, and films produced with passion and
              precision.
            </p>
            <div className="filters-container">
              <div className="categories-filters glass-button-no-hover">
                <button
                  className={`${filter === "all" ? "active" : ""}`}
                  onClick={() => {
                    setFilter("all");
                  }}
                >
                  All
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="7"
                  viewBox="0 0 7 7"
                  fill="none"
                >
                  <circle
                    cx="3"
                    cy="3"
                    r="3"
                    transform="matrix(-1 0 0 1 6.7998 0.407578)"
                    fill="#CC3333"
                  />
                </svg>{" "}
                <button
                  className={`${filter === "commercials" ? "active" : ""}`}
                  onClick={() => {
                    setFilter("commercials");
                  }}
                >
                  Commercials
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="7"
                  viewBox="0 0 7 7"
                  fill="none"
                >
                  <circle
                    cx="3"
                    cy="3"
                    r="3"
                    transform="matrix(-1 0 0 1 6.7998 0.407578)"
                    fill="#CC3333"
                  />
                </svg>{" "}
                <button
                  className={`${filter === "music" ? "active" : ""}`}
                  onClick={() => {
                    setFilter("music");
                  }}
                >
                  Music Video
                </button>
              </div>
              <div className="categories-filters glass-button-no-hover">
                <button
                  className={`${country === "eg" ? "active" : ""}`}
                  onClick={() => {
                    setCountry("eg");
                  }}
                >
                  EG
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="7"
                  viewBox="0 0 7 7"
                  fill="none"
                >
                  <circle
                    cx="3"
                    cy="3"
                    r="3"
                    transform="matrix(-1 0 0 1 6.7998 0.407578)"
                    fill="#CC3333"
                  />
                </svg>
                <button
                  className={`${country === "ksa" ? "active" : ""}`}
                  onClick={() => {
                    setCountry("ksa");
                  }}
                >
                  KSA
                </button>
              </div>
            </div>
          </div>

          <div className="projects-container">
            {updatedProjects.length === 0 ? (
              <div className="skeleton">Loading projects...</div>
            ) : (
              updatedProjects.map((project) => (
                <Link
                  to={`/projects/${project.id}`}
                  key={project.id}
                  style={{
                    backgroundImage: `url(${
                      new URL(
                        `../../assets/${project.image}.webp`,
                        import.meta.url
                      ).href
                    })`,
                  }}
                  className="project-card"
                >
                  <div className="background-overlay"></div>
                  <h3>Client: {project.client}</h3>
                </Link>
              ))
            )}

            {updatedProjects.length % 2 !== 0 && (
              <div className="project-card placeholder"></div>
            )}
          </div>
          <ContactCta variant="2" />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Projects;
