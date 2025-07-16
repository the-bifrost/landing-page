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
