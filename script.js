'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnScroolTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const allSections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');


// ------------------------------------------------------------------


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// learn more button
btnScroolTo.addEventListener('click', function (e) {

  section1.scrollIntoView({ behavior: 'smooth' });
});

// page navigation by using event delegation method

document.querySelector('.nav__links').addEventListener('click', function (e) {

  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  };
});

// tabbed components

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  if (!clicked) return;

  // remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');
  document.querySelector
    (`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu Fade Animation======

const handleHover = function (e) {
  // console.log(this);
  const link = e.target;

  if (link.classList.contains('nav__link')) {
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  };
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


// sticky nav using intersection observer API
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickeyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickeyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// REVEALING ELEMENTS=============

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});


// LAZY LOADING IMAGES==========

// console.log(imgTargets);

// const loadImg = function (entries, observer) {
//   const [entry] = entries;
//   // console.log(entry);

//   if (!entry.isIntersecting) return;
//   // entry.target.src = entry.target.dataset.src;

//   entry.target.addEventListener('load', function () {
//     entry.target.classList.remove('lazy-img');
//   });
//   observer.unobserve(entry.target);
// };

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  rootMargin: '200px',
  threshold: 0,
});
imgTargets.forEach(img => imgObserver.observe(img));


// slider
const slider = function () {
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  //functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML('beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      )
    });
  };
  // createDots();

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // activateDot(0);

  const goToSlides = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  // slider.style.transform = 'scale(0.3) translateX(-1000px)';
  // slider.style.overflow = 'visible';
  const nextSlide = function () {
    if (curSlide === maxSlide - 1)
      curSlide = 0;
    else
      curSlide++;
    goToSlides(curSlide);
    activateDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0)
      curSlide = maxSlide - 1;
    else
      curSlide--;
    goToSlides(curSlide);
    activateDot(curSlide);

  };

  const init = function () {
    goToSlides(0);
    createDots();

    activateDot(0);
  };
  init();

  // EVENT HANDLERS ======
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key === 'ArrowRight')
      nextSlide();
    if (e.key === 'ArrowLeft')
      prevSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    console.log(e);
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlides(slide);
      activateDot(slide);
    };
  });
};
slider();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// console.log(document);
// console.log(document.documentElement);
// console.log(document.body);
// console.log(document.head);
// console.log(document.querySelector('.header'));
// const allSection = document.querySelectorAll('.section');
// console.log(allSection);

// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// // creating and inserting elements

// //1. using insertAdjacentHTML
// //2. .createElement

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = "We use cookies for improved functionalities and analytics";
// //   OR
// message.innerHTML = "We use cookies for improved functionalities and analytics. <button class = 'btn btn--close-cookie'> Got it ! </button>";



// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));

// // header.before(message);
// // header.after(message);

// const btnC = document.querySelector('.btn--close-cookie').addEventListener('click', function () {
//   message.remove();
//   // message.parentElement.removeChild(message)
// });

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.height);
// console.log(message.style.backgroundColor);
// console.log(message.style.color);
// console.log(getComputedStyle(message).color);
// // console.log(getComputedStyle(message));

// console.log(getComputedStyle(message).height);

// // increasing the height
// // now the height we get is a string
// // message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// // document.documentElement.style.setProperty(
// //   '--color-primary', 'orangered'
// // );

// const logo = document.querySelector('.nav__logo');

// console.log(logo);
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';
// console.log(logo.alt);

// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('Company', 'Bankist');
// console.log(logo.getAttribute('company'));

// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.twitter-link');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // const links = document.querySelector('.nav--link--btn');
// // console.log(links.href);
// // console.log(links.getAttribute('href'));

// console.log(logo.dataset.versionNumber);


// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListner : currently you are reading the heading');

//   h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// event propagation - bubbling, target, capturing===

// rgb(255, 255, 255)

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// // console.log(randomInt(0, 255));

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// // console.log(randomColor());

// document.querySelector('.nav__link').addEventListener
//   ('click', function (e) {

//     this.style.backgroundColor = randomColor();
//     console.log(e.target);
//     // e.stopPropagation();
//   });

// document.querySelector('.nav__links').addEventListener
//   ('click', function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log(e.target);

//   });

// document.querySelector('.nav').addEventListener
//   ('click', function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log(e.target);

//   });



// page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });


//   });
// });

// const s1coods = section1.getBoundingClientRect();
// console.log(s1coods);
// console.log(window.pageYOffset);

// console.log(e.target.getBoundingClientRect());

// window.scrollTo({
//   left: s1coods.left + window.pageXOffset,
//   top: s1coods.top + window.pageYOffset,
//   behavior: "smooth",
// });


//   // THE INTERSECTION OBSERVER API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {

//     console.log(entry);
//   })
// };
// const obsOptions = {
//   root: null,
//   threshold: [0.05, 0.1, 0.2, 0.3],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions); observer.observe(section1);

// // Sticky Navigation============
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (this.window.scrollY > initialCoords.top) {
//     navPlace.classList.add('sticky');
//   }
//   else {
//     navPlace.classList.remove('sticky');
//   }
// });

// // LIFECYCLE DOM EVENTS==========

// // 1.
// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML passed amd DOM tree built!', e);
// });

// // 2.

// window.addEventListener('load', function (e) {
//   console.log('page fully loaded', e);
// });

// // 3.
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// })

