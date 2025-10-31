import "./homepage-projects.css";
import HomepageProjectCard from "../homepage-project-card/HomepageProjectCard";
import { ProjectsContext } from "../../components/projects-context/ProjectsContext";
import { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HomepageProjects() {
  const { projects } = useContext(ProjectsContext);
  const homepageProjects = projects.filter((p) => p.homepage);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!projects || projects.length === 0) return;
    const titles = gsap.utils.toArray(".card-title");
    let xOffset = 0;
    const gap = 20; // Adjust this for spacing between titles

    titles.forEach((title) => {
      const width = title.getBoundingClientRect().width;
      gsap.set(title, { left: xOffset });
      xOffset += width + gap;
    });
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".homepage-project-card");
      gsap.set(cards, { y: "3%" });

      gsap.set(cards, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      });

      const timeline = gsap.timeline();
      timeline.totalDuration(cards.length);
      cards.forEach((card, index) => {
        gsap.set(card, { zIndex: index });
        if (index > 0) {
          const fromDirection = index % 2 === 0 ? "-105%" : "105%"; // even = from left, odd = from right
          timeline.fromTo(
            card,
            { x: fromDirection },
            { x: "0%", duration: 1, ease: "linear" },
            index - 1 // <- start the reveal for card #2 at time 0
          );
        }
      });

      ScrollTrigger.create({
        animation: timeline,
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${cards.length * window.innerHeight}`,
        scrub: true,
        pin: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section className="homepage-projects-section" ref={sectionRef}>
      {projects.length === 0 ? (
        <div className="skeleton">Loading projects...</div>
      ) : (
        homepageProjects.map((project) => (
          <HomepageProjectCard key={project.id} project={project} />
        ))
      )}
    </section>
  );
}

export default HomepageProjects;
