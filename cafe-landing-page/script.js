// Morning Haus — small interactions

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.classList.toggle("open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Smooth scroll with sticky navbar offset
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();

    const navHeight = document.getElementById("nav")?.offsetHeight || 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 14;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth"
    });

    history.pushState(null, "", href);
  });
});

// Reveal sections on scroll
const revealItems = document.querySelectorAll(".section, .menu-card, .info-card, .story-card, .reservation-inner");

revealItems.forEach((item) => item.classList.add("reveal"));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealItems.forEach((item) => revealObserver.observe(item));

// Netlify form visual feedback
const reservationForm = document.querySelector(".form");
const formNote = document.getElementById("formNote");

if (reservationForm && formNote) {
  reservationForm.addEventListener("submit", () => {
    formNote.textContent = "Sending request...";
    formNote.style.color = "var(--accent)";
  });
}
