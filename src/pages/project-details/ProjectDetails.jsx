import "./project-details.css";
import {
  useEffect,
  useState,
  useContext,
  useMemo,
  useLayoutEffect,
  useRef,
} from "react";
import { ProjectsContext } from "../../components/projects-context/ProjectsContext";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import VideoLogo from "../../assets/logo-transparent-red-outlined.svg";
import FacebookLogo from "../../assets/icons/facebook.svg";
import LinkedinLogo from "../../assets/icons/linkedin.svg";
import Footer from "../../components/footer/Footer";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function ProjectDetails() {
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

  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const { projects } = useContext(ProjectsContext);
  const currentUrl = window.location.href;

  useEffect(() => {
    const found = projects.find((p) => p.id === projectId);
    if (found) setProject(found);
  }, [projects, projectId]);
  const moreWork = useMemo(() => {
    const others = projects.filter((p) => p.id !== projectId);
    return [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [projects, projectId]);

  return (
    <div className="smooth-wrapper" ref={wrapperRef}>
      <div className="smooth-container" ref={containerRef}>
        <div className="project-page">
          <Navbar variant="transparent" />
          {!project ? (
            <p>Loading project...</p>
          ) : (
            <>
              <div className="video-player-container">
                <img src={VideoLogo} alt="Gorilla Logo" />
                <iframe
                  title="vimeo-player"
                  src={project.videoUrl + "&autoplay=1&muted=1"}
                  frameBorder="0"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                  autoPlay
                ></iframe>
              </div>
              <div className="project-details-container">
                <h2>{project.title}</h2>
                <div className="details-container">
                  <p>Client: {project.client}</p>
                  <p>Agency: {project.agency}</p>
                  <p>Director: {project.director}</p>
                </div>
                <div className="share-to-container">
                  <h4>Share to</h4>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      currentUrl
                    )}`}
                    target="_blank"
                    rel="noOpener noReferrer"
                  >
                    <img src={FacebookLogo} alt="Facebook Logo" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      currentUrl
                    )}`}
                    target="_blank"
                    rel="noOpener noReferrer"
                  >
                    <img src={LinkedinLogo} alt="LinkedIn Logo" />
                  </a>
                </div>
                <div className="horizontal-break"></div>
              </div>
              <div className="more-work-container">
                <h2 className="uppercase">
                  more <span className="underlined">work</span>
                  <span className="red-colored">.</span>
                </h2>

                <div className="more-projects-container">
                  {moreWork.map((p) => (
                    <Link
                      to={`/projects/${p.id}`}
                      key={p.id}
                      className="project-card"
                      style={{
                        backgroundImage: `url(${
                          new URL(
                            `../../assets/${p.image}.webp`,
                            import.meta.url
                          ).href
                        })`,
                      }}
                    >
                      <h3>Client {p.title}</h3>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default ProjectDetails;
