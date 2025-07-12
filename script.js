document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const burger = document.getElementById("burger");
  const nav = header.querySelector("nav");

  // Função para verificar o estado do scroll
  function handleScroll() {
    const scrolled = window.scrollY > 10;
    const menuOpen = header.classList.contains("menu-open");

    // Aplica scrolled apenas se não estiver com menu aberto
    header.classList.toggle("scrolled", scrolled && !menuOpen);
  }

  // Evento de scroll
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Evento de clique no burger - APLICA BLUR SEMPRE QUE ABRIR
  burger.addEventListener("click", () => {
    const opened = !header.classList.contains("menu-open");

    // Toggle classes
    burger.classList.toggle("open", opened);
    nav.classList.toggle("open", opened);
    header.classList.toggle("menu-open", opened); // Classe que aplica o blur

    // Atualiza o estado do scroll
    handleScroll();
  });
});
// --- typing effect ---
function initTypingEffect(
  elementId,
  words,
  typingSpeed = 100,
  deleteSpeed = 40,
  pauseDuration = 2000
) {
  const el = document.getElementById(elementId);
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const word = words[wordIndex];
    charIndex += isDeleting ? -1 : 1;
    el.textContent = word.slice(0, charIndex);

    if (!isDeleting && charIndex === word.length) {
      // terminou de escrever, espera e começa a apagar
      setTimeout(() => (isDeleting = true), pauseDuration);
    } else if (isDeleting && charIndex === 0) {
      // apagou tudo, passa para a próxima palavra
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(type, isDeleting ? deleteSpeed : typingSpeed);
  }

  type();
}

document.addEventListener("DOMContentLoaded", () => {
  initTypingEffect("animated-text", [
    "Devices", // substitui Connections
    "Protocols",
    "Possibilities",
  ]);
});
