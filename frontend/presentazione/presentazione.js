(() => {
  "use strict";

  const slides = Array.from(document.querySelectorAll(".slide"));
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const counter = document.getElementById("slideCounter");
  const percent = document.getElementById("progressPercent");
  const progressFill = document.getElementById("progressFill");
  const progressTrack = document.getElementById("progressTrack");
  const homeButton = document.getElementById("homeButton");

  let currentSlide = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  function showSlide(index) {
    currentSlide = Math.max(0, Math.min(index, slides.length - 1));

    slides.forEach((slide, i) => {
      const isActive = i === currentSlide;
      slide.classList.toggle("active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      if (isActive) slide.scrollTop = 0;
    });

    const current = currentSlide + 1;
    const progress = (current / slides.length) * 100;
    counter.textContent = `SLIDE ${current} / ${slides.length}`;
    percent.textContent = `${Math.round(progress)}%`;
    progressFill.style.width = `${progress}%`;
    progressTrack.setAttribute("aria-valuenow", String(current));
    prevButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide === slides.length - 1;
    document.title = `${slides[currentSlide].dataset.title || "Presentazione"} | Smart Campus`;
  }

  function next() { if (currentSlide < slides.length - 1) showSlide(currentSlide + 1); }
  function previous() { if (currentSlide > 0) showSlide(currentSlide - 1); }

  prevButton.addEventListener("click", previous);
  nextButton.addEventListener("click", next);
  homeButton.addEventListener("click", (event) => {
    event.preventDefault();
    showSlide(0);
  });

  document.addEventListener("keydown", (event) => {
    // Non intercettare la barra spaziatrice se l'utente sta usando un controllo.
    const target = event.target;
    const isInteractive = target && (
      target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(target.tagName)
    );
    if (isInteractive) return;

    if (event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      previous();
    } else if (event.code === "Space") {
      event.preventDefault();
      next();
    } else if (event.key === "Home") {
      event.preventDefault();
      showSlide(0);
    } else if (event.key === "End") {
      event.preventDefault();
      showSlide(slides.length - 1);
    }
  });

  // Supporto swipe su dispositivi touch.
  const slideContainer = document.getElementById("slides");
  slideContainer.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
  }, { passive: true });

  slideContainer.addEventListener("touchend", (event) => {
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    const deltaY = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      deltaX < 0 ? next() : previous();
    }
  }, { passive: true });

  showSlide(0);
})();
