import "./projects-carousel.css";
import { useLayoutEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectsContext } from "../../components/projects-context/ProjectsContext";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const images = import.meta.glob("./assets/*.{jpg,png,webp}", { eager: true });

function ProjectsCarousel() {
  const trackRef = useRef(null);
  const trackSectionRef = useRef(null);
  const { projects } = useContext(ProjectsContext);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const section = trackSectionRef.current;

    if (!track || !section || projects.length === 0) return;

    // Kill previous triggers if component re-renders
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // Total scrollable width
    const totalScroll = track.scrollWidth - window.innerWidth;

    // Create the horizontal scroll animation
    gsap.to(track, {
      x: () => -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalScroll}`,
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Refresh on resize to adapt to new widths
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [projects]);

  return (
    <section className="scroll-section" ref={trackSectionRef}>
      <div className="scroll-track" ref={trackRef}>
        {projects.length === 0 ? (
          <div className="skeleton">Loading projects...</div>
        ) : (
          projects.map((project) => (
            <Link
              to={`/projects/${project.id}`}
              key={project.id}
              className="project-card"
              style={{
                backgroundImage: `url(${
                  new URL(`../../assets/${project.image}.webp`, import.meta.url)
                    .href
                })`,
              }}
            >
              <div className="background-overlay"></div>
              <h3>Client: {project.client}</h3>
            </Link>
          ))
        )}
        {projects.length % 2 !== 0 && (
          <div className="project-card placeholder"></div>
        )}
      </div>
    </section>
  );
}

export default ProjectsCarousel;
