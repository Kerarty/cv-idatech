/* ============================================================
   Разделы резюме («отчёты о тренировке»): рендер из DATA.
   ============================================================ */

const Sections = {
  render(id, root) {
    const map = {
      memory: ["Опыт", () => this.experience(root)],
      logic: ["Проекты", () => this.projects(root)],
      reaction: ["Навыки", () => this.skills(root)],
      ablab: ["Подход", () => this.approach(root)],
      forecast: ["Прогноз карьеры", () => this.forecast(root)],
      contacts: ["Контакты", () => this.contacts(root)],
      summary: ["Итоги", () => this.summary(root)],
    };
    const entry = map[id];
    if (!entry) return;
    document.getElementById("section-title").textContent = entry[0];
    entry[1]();
  },

  tag(text) {
    const el = document.createElement("span");
    el.className = "report-tag";
    el.textContent = text;
    return el;
  },

  replay(appId, root) {
    const b = document.createElement("button");
    b.className = "replay";
    b.dataset.replay = appId;
    b.textContent = "↻ пройти мини-игру заново";
    root.appendChild(b);
  },

  /* ---------- 💭 Опыт ---------- */

  experience(root) {
    root.appendChild(this.tag("отчёт о тренировке памяти"));
    const tl = document.createElement("div");
    tl.className = "tl";
    DATA.experience.forEach((item) => {
      const d = document.createElement("div");
      d.className = "tl-item card";
      d.innerHTML =
        '<div class="tl-date">' + item.date + "</div>" +
        '<div class="tl-title">' + item.title + "</div>" +
        '<div class="tl-text">' + item.text + "</div>";
      tl.appendChild(d);
    });
    root.appendChild(tl);
    this.replay("memory", root);
  },

  /* ---------- 🧩 Проекты ---------- */

  projects(root) {
    root.appendChild(this.tag("архив solved-загадок"));
    DATA.projects.forEach((p) => {
      const c = document.createElement("div");
      c.className = "card proj";
      c.innerHTML =
        '<div class="proj-icon" style="background:' + (p.tint || "var(--tile-sand)") + '">' + p.mono + "</div>" +
        "<div>" +
          "<h3>" + p.name + "</h3>" +
          '<div class="card-sub">' + p.sub + "</div>" +
          "<p>" + p.text + "</p>" +
          '<div class="chips">' + p.chips.map((ch) => '<span class="chip">' + ch + "</span>").join("") + "</div>" +
          (p.href ? '<a href="' + p.href + '" target="_blank" rel="noopener">открыть на GitHub →</a>' : "") +
        "</div>";
      root.appendChild(c);
    });
    this.replay("logic", root);
  },

  /* ---------- ⚡ Навыки ---------- */

  skills(root) {
    root.appendChild(this.tag("показатели после тренировки"));
    DATA.skills.forEach((s) => {
      const d = document.createElement("div");
      d.className = "skill";
      d.innerHTML =
        '<div class="skill-row"><span>' + s.name + "</span><span>" +
        "★★★★★".slice(0, s.level) + "☆☆☆☆☆".slice(0, 5 - s.level) + "</span></div>" +
        '<div class="skill-bar"><div class="skill-fill" data-w="' + (s.level * 20) + '"></div></div>' +
        '<div class="skill-note">' + s.note + "</div>";
      root.appendChild(d);
    });
    // анимация полосок после вставки
    requestAnimationFrame(() =>
      setTimeout(() =>
        root.querySelectorAll(".skill-fill").forEach((f) => (f.style.width = f.dataset.w + "%")),
        60
      )
    );
    this.replay("reaction", root);
  },

  /* ---------- 🧪 Подход ---------- */

  approach(root) {
    root.appendChild(this.tag("сводка A/B-лаборатории"));
    const results = (window.ABLAB_RESULTS || []).filter(Boolean);

    const c = document.createElement("div");
    c.className = "card ab-summary";
    if (results.length) {
      DATA.ablab.iterations.forEach((it, i) => {
        const r = results[i] || {};
        const winner = r.choice === "b" ? it.b : it.a;
        const out = r.choice === "b" ? it.outB : it.outA;
        const row = document.createElement("div");
        row.className = "h-row";
        row.innerHTML =
          "<div><b>" + it.hypothesis + "</b><br><span class='muted'>решение: " + winner.title + "</span></div>" +
          "<div class='h-metric'>" + (out.show || out.value + "%") + "</div>";
        c.appendChild(row);
      });
    } else {
      const p = document.createElement("p");
      p.textContent = "Лаборатория ждёт решений: пройди итерации, и здесь появится сводка гипотез.";
      c.appendChild(p);
    }
    root.appendChild(c);

    const pr = document.createElement("div");
    pr.className = "card";
    pr.innerHTML = "<h3>" + DATA.ablab.principle + "</h3><p>Двенадцать игровых прототипов за месяц — этот цикл в чистом виде: двенадцать жанров, двенадцать балансов, ни одной исправленной версии чужого.</p>";
    root.appendChild(pr);

    this.replay("ablab", root);
  },

  /* ---------- 🌤 Прогноз ---------- */

  forecast(root) {
    root.appendChild(this.tag("прогноз погоды в карьере"));
    DATA.forecast.forEach((f) => {
      const c = document.createElement("div");
      c.className = "card fc";
      c.innerHTML =
        '<div class="fc-icon">' + Icons.svg(f.icon, 22) + "</div>" +
        "<div><div class='fc-title'>" + f.title + "</div><div class='fc-text'>" + f.text + "</div></div>";
      root.appendChild(c);
    });
  },

  /* ---------- 📞 Контакты ---------- */

  contacts(root) {
    root.appendChild(this.tag("куда писать, если понравилось"));
    DATA.contacts.forEach((ct) => {
      const a = document.createElement("a");
      a.className = "contact-row";
      a.href = ct.href;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML =
        '<div class="contact-icon">' + Icons.svg(ct.icon, 20) + "</div>" +
        "<div><div class='contact-label'>" + ct.label + "</div><div class='contact-value'>" + ct.value + "</div></div>";
      root.appendChild(a);
    });

    const btn = document.createElement("a");
    btn.className = "cta";
    btn.href = DATA.cta.href;
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.textContent = DATA.cta.text;
    root.appendChild(btn);
  },

  /* ---------- 🏆 Итоги ---------- */

  summary(root) {
    root.appendChild(this.tag("досье целиком"));

    const pr = document.createElement("div");
    pr.className = "card progress-ring";
    pr.innerHTML =
      '<div class="progress-num">' + App.doneCount() + "</div>" +
      '<div class="progress-label">разделов открыто.<br>Остальное — в мини-играх на домашнем экране.</div>';
    root.appendChild(pr);

    const c = document.createElement("div");
    c.className = "card";
    DATA.summary.rows.forEach((r) => {
      const row = document.createElement("div");
      row.className = "summary-row";
      row.innerHTML = "<span class='muted'>" + r.label + "</span><b>" + r.value + "</b>";
      c.appendChild(row);
    });
    root.appendChild(c);

    const btn = document.createElement("a");
    btn.className = "cta";
    btn.href = DATA.cta.href;
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.textContent = DATA.cta.text;
    root.appendChild(btn);
  },
};
