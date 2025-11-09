import "./homepage-projects.css";
import HomepageProjectCard from "../homepage-project-card/HomepageProjectCard";
import { ProjectsContext } from "../../components/projects-context/ProjectsContext";
import { useContext, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HomepageProjects() {
  const { projects } = useContext(ProjectsContext);
  const homepageProjects = projects.filter((p) => p.homepage);
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

      // Use fixed pixel height instead of vh to avoid mobile browser issues
      const viewportHeight = window.innerHeight;

      gsap.set(cards, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: viewportHeight,
        willChange: "transform", // Optimize for animations
      });

      const timeline = gsap.timeline();
      timeline.totalDuration(cards.length);

      cards.forEach((card, index) => {
        gsap.set(card, { zIndex: index });
        if (index > 0) {
          timeline.fromTo(
            card,
            { x: "150%" },
            {
              x: "0%",
              duration: 1,
              ease: "linear",
              force3D: true, // Hardware acceleration
            },
            index - 1
          );
        }
      });

      const scrollTrigger = ScrollTrigger.create({
        animation: timeline,
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${cards.length * viewportHeight}`,
        scrub: isMobile ? 0.5 : 1, // Faster scrub on mobile for better performance
        pin: true,
        anticipatePin: 1, // Prevents flashing on mobile
      });

      // Only add hover interactions on non-mobile devices
      if (!isMobile) {
        titles.forEach((title) => {
          const index = parseInt(title.dataset.index, 10);
          let isHovering = false;

          const handleEnter = () => {
            isHovering = true;
            const after = cards.slice(index + 1);
            const beforeAndCurrent = cards.slice(0, index + 1);

            gsap.to(after, {
              x: "105%",
              duration: 0.5,
              overwrite: "auto",
              ease: "power2.out",
              force3D: true,
            });

            gsap.to(beforeAndCurrent, {
              x: "0%",
              duration: 0.4,
              overwrite: "auto",
              ease: "power2.out",
              force3D: true,
            });
          };

          const handleLeave = () => {
            if (!isHovering) return;
            isHovering = false;

            // Throttled/debounced reset to scroll position
            requestAnimationFrame(() => {
              const progress = timeline.progress();

              cards.forEach((card, i) => {
                if (i === 0) {
                  gsap.to(card, {
                    x: "0%",
                    duration: 0.6,
                    overwrite: "auto",
                    ease: "power2.inOut",
                    force3D: true,
                  });
                } else {
                  const cardStart = (i - 1) / (cards.length - 1);
                  const cardEnd = i / (cards.length - 1);

                  let targetX;
                  if (progress <= cardStart) {
                    targetX = "105%";
                  } else if (progress >= cardEnd) {
                    targetX = "0%";
                  } else {
                    const cardProgress =
                      (progress - cardStart) / (cardEnd - cardStart);
                    targetX = `${105 - cardProgress * 105}%`;
                  }

                  gsap.to(card, {
                    x: targetX,
                    duration: 0.6,
                    overwrite: "auto",
                    ease: "power2.inOut",
                    force3D: true,
                  });
                }
              });
            });
          };

          title.addEventListener("mouseenter", handleEnter);
          title.addEventListener("mouseleave", handleLeave);
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [homepageProjects, isMobile]);

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
