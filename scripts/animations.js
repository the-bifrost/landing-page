gsap.registerPlugin(ScrollSmoother);

// === HEADER =========================
gsap.from("header", {
  duration: 1,
  opacity: 1,
  ease: "power2.in",
  delay: 0.3,
});
// === BOTÃO CRESCENDO COM MOLA ========
gsap.fromTo(
  ".btn__hero",
  { scale: 0.4, opacity: 0 },
  {
    scale: 1,
    opacity: 1,
    duration: 1,
    ease: "power2.out(1, 0.5)",
    delay: 0.5,
  }
);
