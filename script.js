const nav = document.getElementById("navMenu");
const menuToggle = document.getElementById("menuToggle");
const themeToggle = document.getElementById("themeToggle");
const backTop = document.getElementById("backTop");
const progressBar = document.getElementById("progressBar");
const toast = document.getElementById("toast");
const cursorHeart = document.querySelector(".cursor-heart");

// Mobile menu
menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuToggle.textContent = nav.classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

// Dark mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  themeToggle.textContent = dark ? "☀" : "☾";
  localStorage.setItem("kim-theme", dark ? "dark" : "light");
  showToast(dark ? "Dark mode activated ✦" : "Light mode activated ☀");
});

if (localStorage.getItem("kim-theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀";
}

// Scroll progress + back-to-top
function updateScrollUI() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${docHeight > 0 ? (scrollTop / docHeight) * 100 : 0}%`;

  if (scrollTop > 500) backTop.classList.add("show");
  else backTop.classList.remove("show");

  // Active navigation
  const sections = document.querySelectorAll("main section[id]");
  let current = "home";
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (scrollTop >= top) current = section.id;
  });

  document.querySelectorAll("nav a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", updateScrollUI);
updateScrollUI();

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Tiny cursor heart trail
let heartTimer;
document.addEventListener("mousemove", e => {
  cursorHeart.style.left = `${e.clientX + 12}px`;
  cursorHeart.style.top = `${e.clientY + 12}px`;
  cursorHeart.style.opacity = "1";

  clearTimeout(heartTimer);
  heartTimer = setTimeout(() => cursorHeart.style.opacity = "0", 500);
});

// Welcome toast
window.addEventListener("load", () => {
  setTimeout(() => showToast("Welcome to Kim's little corner! ♡"), 900);
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => toast.classList.remove("show"), 2200);
}

// Add a subtle click sparkle effect
document.addEventListener("click", e => {
  const sparkle = document.createElement("span");
  sparkle.textContent = "✦";
  sparkle.style.position = "fixed";
  sparkle.style.left = `${e.clientX}px`;
  sparkle.style.top = `${e.clientY}px`;
  sparkle.style.pointerEvents = "none";
  sparkle.style.zIndex = "4000";
  sparkle.style.color = "#d895a7";
  sparkle.style.fontSize = "18px";
  sparkle.style.transition = "all .7s ease";
  document.body.appendChild(sparkle);

  requestAnimationFrame(() => {
    sparkle.style.transform = "translateY(-28px) scale(1.6)";
    sparkle.style.opacity = "0";
  });

  setTimeout(() => sparkle.remove(), 750);
});
