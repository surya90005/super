const topbar = document.getElementById("topbar");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    function updateTopbar() {
      topbar.classList.toggle("scrolled", window.scrollY > 24);
    }

    updateTopbar();
    window.addEventListener("scroll", updateTopbar, { passive: true });

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      }
    });

    document.getElementById("year").textContent = new Date().getFullYear();

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    } else {
      document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
    }
