import "./homepage-project-card.css";
import { Link } from "react-router-dom";

function HomepageProjectCard({ project, index }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="homepage-project-card"
      style={{
        backgroundImage: `url(${
          new URL(`../../assets/${project.image}.webp`, import.meta.url).href
        })`,
      }}
    >
      <div className="card-title" data-index={index}>
        <p>{project.title}</p>
      </div>
    </Link>
  );
}

export default HomepageProjectCard;
