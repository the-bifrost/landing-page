// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Função para animar elementos vindo da esquerda
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

// Função para animação de fade-in
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

// Função para animação de escala
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

// Função para animar elementos vindo da direita
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

// Função para animação de entrada com delay para cada item
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

// Função para o efeito de digitação
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

    // Lógica de digitação e apagamento
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    animatedTextElement.innerHTML = currentWord.substring(0, charIndex);

    // Transição entre escrever e apagar
    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), pauseDuration); // Pausa antes de apagar
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; // Próxima palavra
    }

    // Controle da velocidade
    const speed = isDeleting ? deleteSpeed : typingSpeed;
    setTimeout(typeEffect, speed);
  }

  typeEffect(); // Iniciar a animação
}

// Menu Burger
function setupMenuBurger() {
  const burger = document.getElementById("burger");
  const nav = document.querySelector("nav");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    nav.classList.toggle("active");
  });
}

// Animação de background elements
function animateBackgroundElements() {
  gsap.to(".bg-1", {
    x: 50,
    y: 50,
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".bg-2", {
    x: -50,
    y: -50,
    duration: 20,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

// Inicializar todas as animações quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  // Menu burger
  setupMenuBurger();

  // Efeito de digitação no hero
  initTypingEffect("animated-text", [
    "Solutions",
    "Possibilities",
    "Devices",
    "Worlds",
  ]);

  // Hero section
  animateScaleIncrease(".content__hero");
  animateFadeIn(".text__hero");
  animateFadeIn(".btn__hero");

  // Vision section
  animateFromLeft(".vision");

  // Timeline: milestones
  animateStaggeredFromRight(".milestone", 0.3);
  // Protocols section
  animateFadeIn(".protocols__title");
  animateStaggeredFadeIn(".card__protocol", 0.2);

  // Footer
  animateFadeIn(".footer__inner");

  // Background animations
  animateBackgroundElements();
});
