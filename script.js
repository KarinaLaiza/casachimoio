(function () {
  "use strict";

  /* =========================================================
     NAVBAR — fundo ao rolar
  ========================================================= */
  const navbar = document.getElementById("navbar");
  const onScrollNav = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  };
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });

  /* =========================================================
     MENU HAMBURGER (mobile)
  ========================================================= */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  function openMenu() {
    navMenu.classList.add("is-open");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Fechar menu");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    navMenu.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Abrir menu");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    const isOpen = navMenu.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* =========================================================
     REVEAL ON SCROLL
     (o CSS mostra tudo por defeito; só depois de confirmarmos que
     o IntersectionObserver está disponível é que escondemos os
     elementos para os animar — assim nunca há conteúdo bloqueado)
  ========================================================= */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    document.documentElement.classList.add("js-armed");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));

    // Rede de segurança: se algo impedir o observer de disparar
    // (ex. elemento já visível no load mas sem scroll), garante
    // que tudo aparece pouco depois do carregamento.
    window.setTimeout(() => {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }, 2500);
  }

  /* =========================================================
     GALERIA / LIGHTBOX
  ========================================================= */
  const galleryItems = Array.from(document.querySelectorAll(".gallery__item"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const btnClose = document.getElementById("lightboxClose");
  const btnPrev = document.getElementById("lightboxPrev");
  const btnNext = document.getElementById("lightboxNext");

  const images = galleryItems.map((item) => {
    const img = item.querySelector("img");
    return { src: img.getAttribute("src"), alt: img.getAttribute("alt") };
  });

  let currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    const data = images[currentIndex];
    lightboxImg.setAttribute("src", data.src);
    lightboxImg.setAttribute("alt", data.alt);
    lightboxCounter.textContent = (currentIndex + 1) + " / " + images.length;
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  btnClose.addEventListener("click", closeLightbox);
  btnNext.addEventListener("click", () => showImage(currentIndex + 1));
  btnPrev.addEventListener("click", () => showImage(currentIndex - 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
  });

})();
