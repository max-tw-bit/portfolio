// 網站設定「預設值 / 種子資料」。
// 網站會優先讀取瀏覽器裡（localStorage）由管理後台儲存的版本；
// 若沒有，才用這裡的預設值。
window.SITE_CONFIG = {
  site: {
    name: "Max",
    intro: "我是一位設計師。相信簡潔、有節奏的排版與細節，能讓作品更有說服力。目前接受合作與委託專案。",
    role: "Frontend Engineer / Visual Design"
  },
  contact: {
    email: "you@example.com",
    github: "yourname",
    linkedin: "yourname"
  },
  hero: [
    "images/EVA/eva-hero.jpg",
    "images/EVA/eva-plane.jpg",
    "images/EVA/eva-van.jpg",
    "images/EVA/eva-signage.jpg"
  ]
};
