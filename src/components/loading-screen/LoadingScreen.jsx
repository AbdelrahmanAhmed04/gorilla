import "./loading-screen.css";
import loadingGif from "../../assets/loading-screen.gif";

function LoadingScreen({ isLoading }) {
  return (
    <div className={`loading-screen ${isLoading ? "visible" : "hidden"}`}>
      <div className="loading-content">
        <img
          key={Date.now()} // Force GIF to restart each time
          src={loadingGif}
          alt="Loading..."
          className="loading-gif"
        />
      </div>
    </div>
  );
}

export default LoadingScreen;
