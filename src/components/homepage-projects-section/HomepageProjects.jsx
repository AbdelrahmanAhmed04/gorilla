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
    if (!homepageProjects || homepageProjects.length === 0) return;

    const titles = gsap.utils.toArray(".card-title");
    let xOffset = 0;
    const gap = 20;

    titles.forEach((title) => {
      const width = title.getBoundingClientRect().width;
      gsap.set(title, { left: xOffset });
      xOffset += width + gap;
    });

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".homepage-project-card");

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
          timeline.fromTo(
            card,
            { x: "105%" },
            { x: "0%", duration: 1, ease: "linear" },
            index - 1
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

      titles.forEach((title) => {
        const index = parseInt(title.dataset.index, 10);

        title.addEventListener("mouseenter", () => {
          const after = cards.slice(index + 1);
          const beforeAndCurrent = cards.slice(0, index + 1);

          gsap.to(after, {
            x: "105%",
            duration: 0.5,
            overwrite: "auto",
            ease: "power2.out",
          });

          gsap.to(beforeAndCurrent, {
            x: "0%",
            duration: 0.4,
            overwrite: "auto",
            ease: "power2.out",
          });
        });

        title.addEventListener("mouseleave", () => {
          // Calculate where each card should be based on timeline progress
          const progress = timeline.progress();

          cards.forEach((card, i) => {
            if (i === 0) {
              // First card is always at 0%
              gsap.to(card, {
                x: "0%",
                duration: 0.6,
                overwrite: "auto",
                ease: "power2.inOut",
              });
            } else {
              // Calculate the card's position based on timeline progress
              const cardStart = (i - 1) / (cards.length - 1);
              const cardEnd = i / (cards.length - 1);

              let targetX;
              if (progress <= cardStart) {
                targetX = "105%"; // Not started yet
              } else if (progress >= cardEnd) {
                targetX = "0%"; // Fully visible
              } else {
                // Mid-animation - interpolate between 105% and 0%
                const cardProgress =
                  (progress - cardStart) / (cardEnd - cardStart);
                targetX = `${105 - cardProgress * 105}%`;
              }

              gsap.to(card, {
                x: targetX,
                duration: 0.6,
                overwrite: "auto",
                ease: "power2.inOut",
              });
            }
          });
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [homepageProjects]);

  return (
    <section className="homepage-projects-section" ref={sectionRef}>
      {homepageProjects.length === 0 ? (
        <div className="skeleton">Loading projects...</div>
      ) : (
        homepageProjects.map((project, index) => (
          <HomepageProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))
      )}
    </section>
  );
}

export default HomepageProjects;
