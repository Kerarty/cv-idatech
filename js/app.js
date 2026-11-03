/* ============================================================
   Оболочка: домашний экран, роутер слоёв, прогресс, инспектор.
   Разделы рендерит sections.js.
   ============================================================ */

const App = {
  PROGRESS_KEY: "cv_ida_progress_v1",
  progress: {},

  init() {
    this.loadProgress();
    this.fillProfile();
    this.startClock();
    this.buildHome();
    this.bindNav();
    this.showHome();
  },

  /* ---------- профиль и часы ---------- */

  fillProfile() {
    document.querySelectorAll(".status-name").forEach((el) => (el.textContent = DATA.meta.name));
    document.querySelector(".profile-name").textContent = DATA.meta.name;
    document.querySelector(".profile-role").textContent = DATA.meta.role;
    document.querySelector(".profile-note").textContent = DATA.meta.status;
  },

  startClock() {
    const tick = () => {
      const t = new Date();
      document.getElementById("clock").textContent =
        String(t.getHours()).padStart(2, "0") + ":" + String(t.getMinutes()).padStart(2, "0");
    };
    tick();
    setInterval(tick, 15000);
  },

  /* ---------- домашний экран ---------- */

  buildHome() {
    const apps = document.getElementById("apps");
    apps.innerHTML = "";

    // мини-игры из реестра
    Games._list.forEach((g) => apps.appendChild(this.appButton(g.id, g.icon, g.title, g.bg)));

    // статичные приложения без игры
    const statics = [
      { id: "forecast", icon: "🌤", title: "Прогноз", bg: "linear-gradient(135deg,#dff0ff,#e7e2ff)" },
      { id: "contacts", icon: "📞", title: "Контакты", bg: "linear-gradient(135deg,#e6fbef,#dff0ff)" },
    ];
    statics.forEach((a) => apps.appendChild(this.appButton(a.id, a.icon, a.title, a.bg)));

    // док: итоги
    const dock = document.getElementById("dock");
    dock.innerHTML = "";
    dock.appendChild(this.appButton("summary", "🏆", "Итоги", "linear-gradient(135deg,#fff3d6,#ffe9c2)"));

    this.refreshBadges();
  },

  appButton(id, icon, title, bg) {
    const b = document.createElement("button");
    b.className = "app";
    b.dataset.app = id;
    b.innerHTML =
      '<span class="app-icon" style="--app-bg:' + (bg || "") + '">' + icon + "</span>" +
      '<span class="app-label">' + title + "</span>" +
      '<span class="app-badge">✓</span>';
    b.addEventListener("click", () => this.openApp(id));
    return b;
  },

  refreshBadges() {
    document.querySelectorAll(".app").forEach((el) => {
      el.classList.toggle("done", !!this.progress[el.dataset.app]);
    });
  },

  /* ---------- навигация ---------- */

  bindNav() {
    document.getElementById("game-back").addEventListener("click", () => this.showHome());
    document.getElementById("section-back").addEventListener("click", () => this.showHome());

    const insp = document.getElementById("game-inspect");
    insp.addEventListener("click", () => {
      const note = document.getElementById("game-note");
      const open = note.hidden;
      note.hidden = !open;
      insp.classList.toggle("on", open);
    });

    // «пройти заново» из раздела
    document.getElementById("section-body").addEventListener("click", (e) => {
      const replay = e.target.closest("[data-replay]");
      if (replay) this.startGame(replay.dataset.replay);
    });
  },

  showHome() {
    document.getElementById("scr-game").classList.remove("open");
    document.getElementById("scr-section").classList.remove("open");
    document.getElementById("game-inspect").classList.remove("on");
    document.getElementById("game-note").hidden = true;
  },

  openApp(id) {
    const game = Games.get(id);
    if (game && !this.progress[id]) this.startGame(id);
    else this.openSection(id);
  },

  startGame(id) {
    const game = Games.get(id);
    if (!game) return;

    document.getElementById("game-title").textContent = game.title;
    const note = document.getElementById("game-note");
    note.innerHTML = "<span class='note-title'>Дизайн-комментарий</span>" + game.note;
    note.hidden = true;
    document.getElementById("game-inspect").classList.remove("on");

    const body = document.getElementById("game-body");
    body.innerHTML = "";
    document.getElementById("scr-game").classList.add("open");

    game.start(body, () => {
      this.complete(id);
      this.openSection(id);
    });
  },

  openSection(id) {
    const body = document.getElementById("section-body");
    body.innerHTML = "";
    Sections.render(id, body);
    document.getElementById("scr-section").classList.add("open");
  },

  /* ---------- прогресс ---------- */

  loadProgress() {
    try {
      this.progress = JSON.parse(localStorage.getItem(this.PROGRESS_KEY)) || {};
    } catch (e) {
      this.progress = {};
    }
  },

  complete(id) {
    this.progress[id] = true;
    try {
      localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(this.progress));
    } catch (e) { /* приватный режим — прогресс просто не сохранится */ }
    this.refreshBadges();
  },

  doneCount() {
    const total = Games._list.length + 2; // + Прогноз и Контакты
    return Object.keys(this.progress).filter((k) => k !== "summary").length + "/" + total;
  },
};

document.addEventListener("DOMContentLoaded", () => App.init());
