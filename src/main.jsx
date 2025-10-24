import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import "./index.css";
import App from "./App.jsx";
import AboutPage from "./pages/about/About.jsx";
import ContactPage from "./pages/contact/Contact.jsx";
import ProjectsPage from "./pages/projects/Projects.jsx";
import ProjectDetails from "./pages/project-details/ProjectDetails.jsx";
import { ProjectsProvider } from "./components/projects-context/ProjectsContext.jsx";
import { CountryProvider } from "./country-context/CountryContext.jsx";
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProjectsProvider>
      <CountryProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
          </Routes>
        </BrowserRouter>
      </CountryProvider>
    </ProjectsProvider>
  </StrictMode>
);
