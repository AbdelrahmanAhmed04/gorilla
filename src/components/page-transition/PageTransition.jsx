import { forwardRef, useRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import "./page-transition.css";
import gifSrc from "../../assets/loading-screen2.gif";

// Exposes `cover()` and `reveal()` methods via ref.
// cover(): slide in and hold (used on previous page).
// reveal(showGif): ensure GIF restarts if showGif=true, hold >=3s, then slide out to reveal the page.
const PageTransition = forwardRef(function PageTransition(_, ref) {
  const overlayRef = useRef(null);
  const gifContainerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    cover: () => playCover(),
    reveal: (showGif = false) => playReveal(showGif),
  }));

  function playCover() {
    const el = overlayRef.current;
    const gifContainer = gifContainerRef.current;
    if (!el) return Promise.resolve();

    // During cover, remove GIF
    if (gifContainer) {
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

  function playReveal(showGif = false) {
    const el = overlayRef.current;
    const gifContainer = gifContainerRef.current;
    if (!el) return Promise.resolve();

    return new Promise((resolve) => {
      // Only load and show GIF if showGif is true (initial load)
      if (showGif) {
        const img = new Image();
        img.src = `${gifSrc}?_=${Date.now()}`;
        img.loading = "eager";
        img.decoding = "sync";
        img.className = "pt-gif";
        img.alt = "transition";
        img.style.opacity = "0";
        img.style.transform = "scale(0.98)";

        const onImageReady = () => {
          if (gifContainer) {
            while (gifContainer.firstChild)
              gifContainer.removeChild(gifContainer.firstChild);
            gifContainer.appendChild(img);
          }

          const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
          tl.set(el, { xPercent: 0, display: "flex" });
          tl.to(img, { duration: 0.15, opacity: 1, scale: 1 }, "+=0.05");
          tl.to({}, { duration: 4.5 });
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

        if (img.complete) {
          onImageReady();
        } else {
          img.onload = onImageReady;
          img.onerror = () => onImageReady();
        }
      } else {
        // No GIF - just quick reveal
        if (gifContainer) {
          while (gifContainer.firstChild)
            gifContainer.removeChild(gifContainer.firstChild);
        }

        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.set(el, { xPercent: 0, display: "flex" });
        // Much shorter hold since no GIF to watch
        tl.to({}, { duration: 0.2 });
        tl.to(el, {
          duration: 0.55,
          xPercent: 100,
          onComplete: () => {
            gsap.set(el, { display: "none" });
            tl.kill();
            resolve();
          },
        });
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
