import { forwardRef, useRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import "./page-transition.css";
import gifSrc from "../../assets/loading-screen2.gif";

// Exposes `cover()` and `reveal()` methods via ref. cover(): slide in and hold (used on previous page).
// reveal(): ensure GIF restarts, hold >=3s, then slide out to reveal the page (used on new page mount).
const PageTransition = forwardRef(function PageTransition(_, ref) {
  const overlayRef = useRef(null);
  const gifContainerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    cover: () => playCover(),
    reveal: () => playReveal(),
  }));

  function playCover() {
    const el = overlayRef.current;
    const gifContainer = gifContainerRef.current;
    if (!el) return Promise.resolve();

    // During cover, ensure GIF is not shown / removed to avoid seeing it on the previous page
    if (gifContainer) {
      // remove any existing children
      while (gifContainer.firstChild)
        gifContainer.removeChild(gifContainer.firstChild);
    }

    return new Promise((resolve) => {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      tl.set(el, { xPercent: 100, display: "flex" });
      // slide in to cover the page
      tl.to(el, { duration: 0.55, xPercent: 0 });
      // tiny hold to ensure cover completed
      tl.to({}, { duration: 0.05 });
      tl.call(() => {
        resolve();
      });
    });
  }

  function playReveal() {
    const el = overlayRef.current;
    const gifContainer = gifContainerRef.current;
    if (!el) return Promise.resolve();

    return new Promise((resolve) => {
      // Create a fresh Image element and preload it. We avoid cache-busting so the
      // browser can load it from cache quickly; replacing the DOM node with a
      // already-loaded image restarts the GIF without visible flicker.
      const img = new Image();
      // Cache-bust to force a fresh animation start from frame 0.
      img.src = `${gifSrc}?_=${Date.now()}`;
      // prefer eager loading so it decodes as soon as possible
      img.loading = "eager";
      img.decoding = "sync";
      img.className = "pt-gif";
      img.alt = "transition";
      img.style.opacity = "0";
      img.style.transform = "scale(0.98)";

      const onImageReady = () => {
        // remove previous children and insert this image instantly
        if (gifContainer) {
          while (gifContainer.firstChild)
            gifContainer.removeChild(gifContainer.firstChild);
          gifContainer.appendChild(img);
        }

        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        // ensure overlay is covering when reveal starts
        tl.set(el, { xPercent: 0, display: "flex" });
        // fade-in GIF quickly
        tl.to(img, { duration: 0.15, opacity: 1, scale: 1 }, "+=0.05");
        // hold for at least 3 seconds while GIF plays on the new page
        tl.to({}, { duration: 3 });
        // slide out to right to reveal page
        tl.to(el, {
          duration: 0.55,
          xPercent: 100,
          onComplete: () => {
            gsap.set(el, { display: "none" });
            tl.kill();
            resolve();
          },
        });
      };

      // If already cached, onload may have fired. Use complete flag as fallback.
      if (img.complete) {
        onImageReady();
      } else {
        img.onload = onImageReady;
        // also handle error by proceeding without GIF
        img.onerror = () => onImageReady();
      }
    });
  }

  return (
    <div ref={overlayRef} className="page-transition-overlay" aria-hidden>
      <div ref={gifContainerRef} className="pt-gif-container" />
    </div>
  );
});

export default PageTransition;
