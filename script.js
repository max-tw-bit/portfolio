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

/* ═════════════════════════════════════════════
   Site Config (name, intro, role, contact, hero)
   ═════════════════════════════════════════════ */
const CONFIG_KEY = "MAX_SITE_CONFIG";

function getConfig() {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (saved) {
      const obj = JSON.parse(saved);
      if (obj && obj.site) return obj;
    }
  } catch (_) {}
  return window.SITE_CONFIG || { site: {}, contact: {}, hero: [] };
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

// ── Render hero carousel ──
const heroSlides = document.getElementById("heroSlides");
if (heroSlides) {
  const config = getConfig();
  const images = config.hero && config.hero.length ? config.hero : ["images/EVA/eva-hero.jpg"];
  heroSlides.innerHTML = images.map((url, i) =>
    `<div class="hero-slide${i === 0 ? " is-active" : ""}" style="background-image:url('${escapeHtml(url)}')"></div>`
  ).join("");

  // Auto-rotate
  const slides = heroSlides.querySelectorAll(".hero-slide");
  if (slides.length > 1) {
    let current = 0;
    setInterval(() => {
      current = (current + 1) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
    }, 4500);
  }
}

// ── Render intro text ──
const introEl = document.getElementById("introText");
if (introEl) {
  const config = getConfig();
  const intro = config.site && config.site.intro
    ? config.site.intro
    : "我是一位設計師。相信簡潔、有節奏的排版與細節，能讓作品更有說服力。目前接受合作與委託專案。";
  // Split into spans at each sentence boundary for styling flexibility
  const parts = intro.split(/(?<=[。！？])/).filter(Boolean);
  introEl.innerHTML = parts.map((p) => `<span>${escapeHtml(p.trim())}</span>`).join(" ");
}

// ── Render role ──
const roleEl = document.getElementById("roleText");
if (roleEl) {
  const config = getConfig();
  roleEl.textContent = (config.site && config.site.role) || "Frontend Engineer / Visual Design";
}

// ── Render contact list ──
const contactList = document.getElementById("contactList");
if (contactList) {
  const config = getConfig();
  const c = config.contact || {};
  const items = [];
  if (c.email) {
    items.push(`<li><a href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a></li>`);
  }
  if (c.github) {
    const url = c.github.includes("github.com") ? c.github : `https://github.com/${c.github}`;
    items.push(`<li><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">GitHub</a></li>`);
  }
  if (c.linkedin) {
    const url = c.linkedin.includes("linkedin.com") ? c.linkedin : `https://www.linkedin.com/in/${c.linkedin}`;
    items.push(`<li><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>`);
  }
  contactList.innerHTML = items.join("");
}

/* ═════════════════════════════════════════════
   Work List
   ═════════════════════════════════════════════ */
const WORKS_STORAGE_KEY = "MAX_WORKS";

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

/* ═════════════════════════════════════════════
   Custom cursor (desktop only)
   ═════════════════════════════════════════════ */
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
