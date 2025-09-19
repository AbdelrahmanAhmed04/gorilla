import "./projects.css";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import ContactCta from "../../components/contact-cta/ContactCta";
import Footer from "../../components/footer/Footer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useRef, useLayoutEffect } from "react";
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

  const [projects, setProjects] = useState([]);
  const [updatedProjects, setUpdatedProjects] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchProjects() {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(data);
      setUpdatedProjects(data);
    }
    fetchProjects();
  }, []);
  const filterProjects = (project) => {
    if (filter === "all") return true;
    return project.genra.includes(filter);
  };
  useEffect(() => {
    setUpdatedProjects(projects.filter(filterProjects));
  }, [filter]);
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
            <div id="" className="categories-filters glass-button-no-hover">
              <button
                className={`${filter === "all" ? "active" : ""}`}
                onClick={() => {
                  setFilter("all");
                }}
              >
                All
              </button>
              <p className="red-colored">.</p>
              <button
                className={`${filter === "commercials" ? "active" : ""}`}
                onClick={() => {
                  setFilter("commercials");
                }}
              >
                Commercials
              </button>
              <p className="red-colored">.</p>
              <button
                className={`${filter === "music" ? "active" : ""}`}
                onClick={() => {
                  setFilter("music");
                }}
              >
                Music Video
              </button>
            </div>
          </div>

          <div className="projects-container">
            {updatedProjects.length === 0 ? (
              <div className="skeleton">Loading projects...</div>
            ) : (
              updatedProjects.map((project) => (
                <div
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
                </div>
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
