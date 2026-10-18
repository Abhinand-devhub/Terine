(() => {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector("#nav-links");
  const year = document.querySelector("#year");

  if (year) year.textContent = new Date().getFullYear();

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      links.classList.toggle("is-open", !isOpen);
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // ----- Species carousel -----
  const track = document.querySelector("#species-track");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");

  if (track && prevBtn && nextBtn) {
    const cards = track.querySelectorAll(".species-card");
    let index = 0;

    const perView = () => {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 760) return 2;
      return 3;
    };

    const update = () => {
      const maxIndex = Math.max(0, cards.length - perView());
      index = Math.max(0, Math.min(index, maxIndex));

      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const step = cards[0].offsetWidth + gap;
      track.style.transform = `translateX(${-index * step}px)`;

      prevBtn.disabled = index === 0;
      nextBtn.disabled = index >= maxIndex;
    };

    nextBtn.addEventListener("click", () => { index += 1; update(); });
    prevBtn.addEventListener("click", () => { index -= 1; update(); });
    window.addEventListener("resize", update);
    update();
  }
})();
