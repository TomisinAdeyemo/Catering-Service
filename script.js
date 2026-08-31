document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Triggers animation once when scrolled into view
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});


// AUTOMATED MENU SLIDESHOW
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll('.carousel-slide');
  if (!slides.length) return;

  let currentIndex = 0;
  const slideInterval = 4000; // Time per slide in milliseconds (4 seconds)

  function autoRotateSlides() {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }

  // Start continuous infinite loop
  setInterval(autoRotateSlides, slideInterval);
});