'use strict';

const header = document.querySelector(".header");
const h1 = document.querySelector("h1");
const section1 = document.getElementById("section--1");
const allSections = document.querySelectorAll(".section");
const imgTargets = document.querySelectorAll("img[data-src]");

//Navigation Bar
const nav = document.querySelector(".nav");

//Slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

//Tabbed Components
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(".btn--scroll-to");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Functions

btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener("click", () => section1.scrollIntoView({ behavior: "smooth" }));

//Page Navigation

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  const id = e.target.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

// Tab function
tabsContainer.addEventListener("click", function (e) {
  const clickedTab = e.target.closest(".operations__tab");

  // Guard Clause
  if (!clickedTab) return;

  tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
  clickedTab.classList.add("operations__tab--active");
  //Activate the Tab Content

  tabsContent.forEach(con => con.classList.remove("operations__content--active"));
  document.querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add("operations__content--active")
})

//Menu fade animation
nav.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    });
    link.style.opacity = 1;
  }
})

nav.addEventListener("mouseout", () => {
  const navLinks = nav.querySelectorAll(".nav__link");
  navLinks.forEach(el => el.style.opacity = 1);
});

//Nav Bar Sticky (Old Method)

const coords = section1.getBoundingClientRect();

window.addEventListener("scroll", () => {
  if (window.scrollY > coords.top) nav.classList.add("sticky")
  else nav.classList.remove("sticky");
});

//Nav Bar: Intersection Observer API (New Method)
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver
  (stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  });

// Reveal Sections


//This is the callback function when an observed section intersects with the root.
//It initializes all 4 sections because they are listed as not intersecting, thus we needed [entry].
//Once an intersection occurs, it will then have the function perform which is to have the section unhidden.
const revealSection = (entries, observer) => {
  const [entry] = entries;
  //guard clause.
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
//Uses a callback function when an intersection occurs based on the settings.
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

//We have created 4 different observations based on 4 sections. Each will be observed individually;
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
})


// Lazy loading images
const loadImg = (images, observer) => {
  const [image] = images;
  if (!image.isIntersecting) return;

  //Replace src with data-src
  image.target.src = image.target.dataset.src;

  //This basically make sure we don't unblur the image if the new image hasn't loaded yet.
  image.target.addEventListener("load", () => image.target.classList.remove("lazy-img"));

  observer.unobserve(image.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "80px",
});

imgTargets.forEach(image => imgObserver.observe(image));


//Sliding Function

let curSlide = 0;

const createDots = () => {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    )
  })
}

const activateDot = (slide) => {
  document.querySelectorAll(".dots__dot").forEach(dot => dot.classList.remove("dots__dot--active"));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
}

dotContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dots__dot")) {
    curSlide = e.target.dataset.slide;
    console.log(curSlide);
    slideMove(curSlide);
    activateDot(curSlide);
  }
})

const maxSlides = slides.length - 1;
const slideMove = function (slide) {
  slides.forEach((s, i) => s.style.transform = `translateX(${(i - slide) * 100}%)`);
}

slideMove(curSlide);

const prevSlide = () => {
  curSlide === 0 ? curSlide = maxSlides : curSlide--;
  slideMove(curSlide);
  activateDot(curSlide);
}
const nextSlide = () => {
  curSlide === maxSlides ? curSlide = 0 : curSlide++;
  slideMove(curSlide);
  activateDot(curSlide);
}

btnLeft.addEventListener("click", prevSlide);

btnRight.addEventListener("click", nextSlide);

document.addEventListener("keydown", (e) => {
  e.key === "ArrowLeft" ? prevSlide() : e.key === "ArrowRight" ? nextSlide() : console.log(e.key);
});

const init = () => {
  createDots();
  activateDot(0);
  slideMove(0);
}
init();

document.addEventListener("DOMContentLoaded", (e) => {

});
//Random Color Generator
// const randomInt = (min = 0, max = 255) => Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => `rgb(${randomInt()}, ${randomInt()}, ${randomInt()})`;

// document.querySelector(".nav__link").addEventListener
//   ("click", function (e) {
//     this.style.backgroundColor = randomColor()
//     console.log("LINK", e.target)
//   });

// document.querySelector(".nav__links").addEventListener
//   ("click", function (e) {
//     this.style.backgroundColor = randomColor()
//     console.log("CONTAINER", e.target)
//   });

// document.querySelector(".nav").addEventListener
//   ("click", function (e) {
//     this.style.backgroundColor = randomColor()
//     console.log("NAV", e.target)
//   });

// const message = document.createElement("div");
// message.classList.add("cookie-message");

// message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'

// header.after(message);

// document.querySelector(".btn--close-cookie").addEventListener("click", () => message.remove());