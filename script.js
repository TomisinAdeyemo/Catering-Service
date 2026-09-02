document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     SCROLL REVEAL ANIMATIONS
  ========================================= */

  const fadeElements = document.querySelectorAll(".fade-up");

  if (fadeElements.length) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.1
      }
    );

    fadeElements.forEach((element) => {
      observer.observe(element);
    });
  }


  /* =========================================
     MENU SLIDESHOW
  ========================================= */

  const slides = document.querySelectorAll(".carousel-slide");

  if (slides.length > 1) {
    let currentIndex = 0;
    let slideTimer;

    const changeSlide = () => {
      slides[currentIndex].classList.remove("active");

      currentIndex = (currentIndex + 1) % slides.length;

      slides[currentIndex].classList.add("active");
    };

    const startSlideshow = () => {
      slideTimer = setInterval(changeSlide, 5000);
    };

    const stopSlideshow = () => {
      clearInterval(slideTimer);
    };

    startSlideshow();

    // Pause slideshow when the page/tab isn't visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopSlideshow();
      } else {
        startSlideshow();
      }
    });
  }


  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });


    // Close menu after clicking a link

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });
    });

  }

});
