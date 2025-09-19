import "./projects.css";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import ContactCta from "../../components/contact-cta/ContactCta";
import Footer from "../../components/footer/Footer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [updatedProjects, setUpdatedProjects] = useState([]);
  const [filter, setFilter] = useState("");

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

  return (
    <>
      <Navbar variant="dark" />
      <div className="projects-hero">
        <h2>Our Work</h2>
        <p>
          Commercials, branded content, and films produced with passion and
          precision.
        </p>
      </div>
      <div className="categories-filter-container">
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
                  new URL(`../../assets/${project.image}.jpg`, import.meta.url)
                    .href
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
    </>
  );
}

export default Projects;
