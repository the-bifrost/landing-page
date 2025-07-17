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
// Função para animação de fade-in do header
function animateFadeInHeader() {
  gsap.to("header", {
    opacity: 1,
    duration: 1,
    delay: 2,
    ease: "power3.out",
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
  animateFadeInHeader("header");
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
  animateTimelineProgress();

  // Atualizar posições quando a janela for redimensionada
  window.addEventListener("resize", animateTimelineProgress);

  // Glow Effect
  setupCardGlowEffect();
});

//ANIMACAO DA BOLINHA DAS TIMELINE
function animateTimelineProgress() {
  const timeline = document.querySelector(".timeline");
  const progressDot = document.querySelector(".timeline-progress-dot");
  const milestones = document.querySelectorAll(".milestone");

  if (!timeline || !progressDot || milestones.length < 2) return;

  // Configurar posição inicial
  gsap.set(progressDot, {
    top: milestones[0].offsetTop + milestones[0].offsetHeight / 2,
  });

  // Calcular posição final (penúltimo milestone)
  const targetMilestone = milestones[milestones.length - 2];
  const finalY = targetMilestone.offsetTop + targetMilestone.offsetHeight / 2;

  // Criar animação principal
  gsap.to(progressDot, {
    top: finalY,
    ease: "none",
    scrollTrigger: {
      trigger: timeline,
      start: "top 30%",
      end: `+=${timeline.offsetHeight * 0.4}`,
      scrub: 1,
      onUpdate: (self) => {
        // Parar no penúltimo item
        if (self.progress > 1) {
          gsap.set(progressDot, { top: finalY });
        }
      },
    },
  });
}

//Protocols Glow Cursor Tracker
document.querySelectorAll(".card__protocol").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 50;
    const y = ((e.clientY - rect.top) / rect.height) * 50;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  });
});

//Hero Glow Cursor Tracker
document.querySelectorAll(".container__hero").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  });
});

//ANIMACAO BOLAS HERO
// Anima a primeira bola
gsap.to(".bg-1", {
  x: 500,
  y: 900,
  duration: 6,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

// Anima a segunda bola
gsap.to(".bg-2", {
  x: -300,
  y: -120,
  duration: 9,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});
