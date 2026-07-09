const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".bar-top .bar-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

const isHoverCapable = window.matchMedia("(hover: hover)").matches;

// Render the work list.
// Data source priority: what the editor saved in localStorage → else the
// defaults in works.js. This way edits made in editor.html appear on the site
// instantly (same browser) and an empty/broken works.js can't blank the list.
const WORKS_STORAGE_KEY = "MAX_WORKS";

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function getWorks() {
  try {
    const saved = localStorage.getItem(WORKS_STORAGE_KEY);
    if (saved) {
      const arr = JSON.parse(saved);
      if (Array.isArray(arr) && arr.length) return arr;
    }
  } catch (_) { /* ignore malformed storage */ }
  return Array.isArray(window.WORKS) ? window.WORKS : [];
}

const workList = document.getElementById("workList");
if (workList) {
  workList.innerHTML = getWorks().map((w) => {
    const pos = w.pos || "50% 50%";
    const size = w.size || "cover";
    const link = w.link || "#";
    return `
      <li class="work-item">
        <a href="${escapeHtml(link)}">
          <span class="work-preview" style="background-image:url('${escapeHtml(w.image)}'); --preview-pos: ${escapeHtml(pos)}; --preview-size: ${escapeHtml(size)};"></span>
          <span class="work-title">${escapeHtml(w.title)}</span>
          <span class="work-meta">${escapeHtml(w.type)} — ${escapeHtml(w.year)}</span>
        </a>
      </li>`;
  }).join("");
}

// Full-screen hero carousel (auto-rotate only)
const heroSlides = document.querySelectorAll(".hero-slide");

if (heroSlides.length > 1) {
  let current = 0;
  const INTERVAL = 4500;

  setInterval(() => {
    current = (current + 1) % heroSlides.length;
    heroSlides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
  }, INTERVAL);
}

// Inverted circular cursor that follows the pointer (desktop only)
const cursorDot = document.getElementById("cursorDot");

if (isHoverCapable && cursorDot) {
  document.body.classList.add("has-custom-cursor");

  document.addEventListener("mousemove", (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    cursorDot.classList.add("visible");
  });

  document.addEventListener("mouseleave", () => {
    cursorDot.classList.remove("visible");
  });

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => cursorDot.classList.add("grow"));
    el.addEventListener("mouseleave", () => cursorDot.classList.remove("grow"));
  });
}
