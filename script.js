/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {

  const open = nav.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    open
  );

});


/* Close mobile menu when a link is clicked */

nav.querySelectorAll("a").forEach((link) => {

  link.addEventListener("click", () => {

    nav.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});



/* =========================================
   SCROLL REVEAL
========================================= */

const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );


document
  .querySelectorAll(".reveal")
  .forEach((element) => {

    revealObserver.observe(element);

  });



/* =========================================
   GALLERY
========================================= */

const slides =
  [...document.querySelectorAll(".slide")];

const counter =
  document.querySelector(".counter");

const caption =
  document.querySelector(".caption");

const progress =
  document.querySelector(".progress span");

const next =
  document.querySelector(".next");

const prev =
  document.querySelector(".prev");


const captions = [

  "The dining room",

  "The tasting table",

  "Chef's selection",

  "Wine service"

];


let current = 0;

let timer;



/* Show selected slide */

function showSlide(index) {

  current =
    (index + slides.length)
    % slides.length;


  slides.forEach((slide, index) => {

    slide.classList.toggle(
      "active",
      index === current
    );

  });


  counter.textContent =
    `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;


  caption.textContent =
    captions[current];


  progress.style.width =
    `${((current + 1) / slides.length) * 100}%`;

}



/* Restart automatic slideshow */

function restartAuto() {

  clearInterval(timer);

  timer = setInterval(() => {

    showSlide(current + 1);

  }, 5200);

}



/* Next */

next.addEventListener("click", () => {

  showSlide(current + 1);

  restartAuto();

});



/* Previous */

prev.addEventListener("click", () => {

  showSlide(current - 1);

  restartAuto();

});



/* Start */

showSlide(0);

restartAuto();



/* =========================================
   PAUSE SLIDER WHEN OFF SCREEN
========================================= */

const gallery =
  document.querySelector(".gallery");


const galleryObserver =
  new IntersectionObserver(
    (entries) => {

      const visible =
        entries[0].isIntersecting;


      clearInterval(timer);


      if (visible) {

        timer = setInterval(() => {

          showSlide(current + 1);

        }, 5200);

      }

    },
    {
      threshold: 0.2
    }
  );


galleryObserver.observe(gallery);
