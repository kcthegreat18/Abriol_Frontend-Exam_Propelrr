      const menuToggle = document.querySelector(".menu-toggle");
      const primaryNav = document.querySelector("#primary-navigation");

      if (menuToggle && primaryNav) {
        menuToggle.addEventListener("click", () => {
          const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

          menuToggle.setAttribute("aria-expanded", String(!isOpen));
          menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
          primaryNav.classList.toggle("is-open", !isOpen);
        });

        primaryNav.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", () => {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open menu");
            primaryNav.classList.remove("is-open");
          });
        });
      }

      const carousel = document.querySelector("[data-carousel]");

      if (carousel) {
        const track = carousel.querySelector(".testimonial-track");
        const cards = Array.from(carousel.querySelectorAll(".testimonial-card"));
        const dotsContainer = carousel.querySelector("[data-carousel-dots]");
        const prevButton = carousel.querySelector("[data-carousel-prev]");
        const nextButton = carousel.querySelector("[data-carousel-next]");
        let currentPage = 0;

        function getCardsPerPage() {
          if (window.innerWidth <= 900) {
            return 1;
          }

          return 3;
        }

        function getPageCount() {
          return Math.max(1, Math.ceil(cards.length / getCardsPerPage()));
        }

        function renderDots() {
          dotsContainer.innerHTML = "";

          for (let page = 0; page < getPageCount(); page += 1) {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.setAttribute("aria-label", `Show testimonial slide ${page + 1}`);
            dot.addEventListener("click", () => goToPage(page));
            dotsContainer.appendChild(dot);
          }
        }

        function updateCarousel() {
          const pageCount = getPageCount();
          const cardsPerPage = getCardsPerPage();

          currentPage = Math.min(currentPage, pageCount - 1);

          const firstCardOnPage = cards[currentPage * cardsPerPage];
          const offset = firstCardOnPage ? firstCardOnPage.offsetLeft : 0;

          track.style.transform = `translateX(-${offset}px)`;

          Array.from(dotsContainer.children).forEach((dot, index) => {
            dot.classList.toggle("active-dot", index === currentPage);
            dot.setAttribute(
              "aria-current",
              index === currentPage ? "true" : "false"
            );
          });

          prevButton.disabled = currentPage === 0;
          nextButton.disabled = currentPage === pageCount - 1;
        }

        function goToPage(page) {
          currentPage = Math.max(0, Math.min(page, getPageCount() - 1));
          updateCarousel();
        }

        prevButton.addEventListener("click", () => goToPage(currentPage - 1));
        nextButton.addEventListener("click", () => goToPage(currentPage + 1));

        window.addEventListener("resize", () => {
          renderDots();
          updateCarousel();
        });

        renderDots();
        updateCarousel();
      }