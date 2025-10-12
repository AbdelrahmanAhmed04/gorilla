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
import {
  LoadingProvider,
  useLoading,
} from "./components/loading-context/LoadingContext.jsx";
import LoadingScreen from "./components/loading-screen/LoadingScreen.jsx";
import RouteLoadingHandler from "./components/route-loading-handler/RouteLoadingHandler.jsx";
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

function AppWithLoading() {
  const { isLoading } = useLoading();

  return (
    <>
      <ScrollToTop />
      <RouteLoadingHandler />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
      </Routes>
      <LoadingScreen isLoading={isLoading} />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <ProjectsProvider>
        <CountryProvider>
          <BrowserRouter>
            <AppWithLoading />
          </BrowserRouter>
        </CountryProvider>
      </ProjectsProvider>
    </LoadingProvider>
  </StrictMode>
);
