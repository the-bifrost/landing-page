// Registrar plugins GSAP
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
ScrollSmoother.create({
  smooth: 1.5, // how long (in seconds) it takes to "catch up" to the native scroll position
  effects: true, // looks for data-speed and data-lag attributes on elements
  smoothTouch: 0.5, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
});
// Funções de animação GSAP

function animateFromLeft(elementClass) {
  gsap.from(elementClass, {
    x: -200,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: elementClass,
      start: "top 80%",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });
}

function animateFadeIn(elementClass) {
  gsap.from(elementClass, {
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: elementClass,
      start: "top 80%",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });
}

function animateFadeInSlow(elementClass) {
  gsap.to(elementClass, {
    opacity: 1,
    duration: 1,
    delay: 2,
    ease: "power3.out",
  });
}

function animateScaleIncrease(elementClass) {
  gsap.from(elementClass, {
    scale: 0.9,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: elementClass,
      start: "top 80%",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });
}

function animateStaggeredFromRight(selector, delay = 0.2) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    gsap.from(el, {
      x: 200,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: index * delay,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

function animateStaggeredFadeIn(elementClass, delay = 0.2) {
  gsap.from(elementClass, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: delay,
    ease: "power2.out",
    scrollTrigger: {
      trigger: elementClass,
      start: "top 85%",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });
}

function initTypingEffect(
  elementId,
  words,
  typingSpeed = 100,
  deleteSpeed = 40,
  pauseDuration = 2000
) {
  const animatedTextElement = document.getElementById(elementId);
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    animatedTextElement.innerHTML = currentWord.substring(0, charIndex);

    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), pauseDuration);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    const speed = isDeleting ? deleteSpeed : typingSpeed;
    setTimeout(typeEffect, speed);
  }

  typeEffect();
}

function setupMenuBurger() {
  const burger = document.getElementById("burger");
  const nav = document.querySelector("nav");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    nav.classList.toggle("active");
  });
}

function animateBackgroundElements() {
  gsap.to(".bg-1", {
    x: -100,
    y: -100,
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".bg-2", {
    x: 100,
    y: 100,
    duration: 20,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

function animateTimelineProgress() {
  const timeline = document.querySelector(".timeline");
  const progressDot = document.querySelector(".timeline-progress-dot");
  const milestones = document.querySelectorAll(".milestone");

  if (!timeline || !progressDot || milestones.length < 2) return;

  gsap.set(progressDot, {
    top: milestones[0].offsetTop + milestones[0].offsetHeight / 2,
  });

  const targetMilestone = milestones[milestones.length - 2];
  const finalY = targetMilestone.offsetTop + targetMilestone.offsetHeight / 2;

  gsap.to(progressDot, {
    top: finalY,
    ease: "none",
    scrollTrigger: {
      trigger: timeline,
      start: "top 30%",
      end: `+=${timeline.offsetHeight * 0.4}`,
      scrub: 1,
      onUpdate: (self) => {
        if (self.progress > 1) {
          gsap.set(progressDot, { top: finalY });
        }
      },
    },
  });
}

function setupCardGlowEffect() {
  document.querySelectorAll(".card__protocol").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 50;
      const y = ((e.clientY - rect.top) / rect.height) * 50;
      card.style.setProperty("--mouse-x", `${x}%`);
      card.style.setProperty("--mouse-y", `${y}%`);
    });
  });

  document.querySelectorAll(".container__hero").forEach((card) => {
    let mouseX = 50;
    let mouseY = 50;
    let targetX = 50;
    let targetY = 50;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
    });

    function animate() {
      mouseX += (targetX - mouseX) * 0.09;
      mouseY += (targetY - mouseY) * 0.09;

      card.style.setProperty("--mouse-x", `${mouseX}%`);
      card.style.setProperty("--mouse-y", `${mouseY}%`);

      requestAnimationFrame(animate);
    }

    animate();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Setup menu burger
  setupMenuBurger();

  // Scroll + menu-open blur handling for header
  const header = document.querySelector("header");
  const burger = document.getElementById("burger");
  const nav = header.querySelector("nav");

  function handleScroll() {
    const scrolled = window.scrollY > 10;
    const menuOpen = header.classList.contains("menu-open");
    header.classList.toggle("scrolled", scrolled && !menuOpen);
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  burger.addEventListener("click", () => {
    const opened = !header.classList.contains("menu-open");
    burger.classList.toggle("open", opened);
    nav.classList.toggle("open", opened);
    header.classList.toggle("menu-open", opened);
    handleScroll();
  });

  // Iniciar animações do site
  initTypingEffect("animated-text", [
    "Solutions",
    "Possibilities",
    "Devices",
    "Worlds",
  ]);

  animateScaleIncrease(".content__hero");
  animateFadeIn(".text__hero");
  animateFadeInSlow("header");
  animateFadeInSlow(".mouse");
  animateFadeIn(".btn__hero");
  animateFromLeft(".vision");
  animateStaggeredFromRight(".milestone", 0.3);
  animateFadeIn(".protocols__title");
  animateStaggeredFadeIn(".card__protocol", 0.2);
  animateFadeIn(".footer__inner");
  animateBackgroundElements();
  animateTimelineProgress();
  setupCardGlowEffect();

  window.addEventListener("resize", animateTimelineProgress);
});
