/* ============================================================
   ⚡ «Реакция» → Навыки
   One-tap: маркер бежит по полосе, тап когда он в зелёной зоне.
   5 попаданий. Зона сужается, маркер ускоряется с каждым
   попаданием. Промах не откатывает счёт.
   ============================================================ */

Games.register("reaction", {
  icon: "⚡",
  title: "Реакция",
  bg: "linear-gradient(135deg,#fff1d6,#ffe0e0)",
  note: "Чистый hyper-casual: один тап, ноль обучения. Кривая обратная к скорости — первое попадание гарантированно, дальше азарт. Промах без штрафа: фрустрация убивает путь к контенту быстрее, чем сложность.",

  start(body, onWin) {
    const HITS_TO_WIN = 5;

    body.innerHTML =
      '<div class="game-intro"><div class="big">⚡</div>' +
      "<h2>Один тап</h2>" +
      "<p>Тапай (или жми пробел), когда маркер в зелёной зоне. Пять попаданий — и показатели навыков твои.</p>" +
      '<button class="btn-start">Погнали</button></div>' +
      '<div class="react-track" hidden>' +
        '<div class="react-zone"></div>' +
        '<div class="react-marker"></div>' +
      "</div>" +
      '<div class="react-stats" hidden><span class="hits">🎯 0</span><span class="miss">💨 0</span></div>' +
      '<div class="react-msg"></div>';

    const track = body.querySelector(".react-track");
    const zone = body.querySelector(".react-zone");
    const marker = body.querySelector(".react-marker");
    const stats = body.querySelector(".react-stats");
    const hitsEl = body.querySelector(".hits");
    const missEl = body.querySelector(".miss");
    const msg = body.querySelector(".react-msg");

    let pos = 0;          // 0..100
    let dir = 1;
    let speed = 0.55;     // % ширины за мс
    let zoneLeft = 40;
    let zoneWidth = 22;
    let hits = 0;
    let misses = 0;
    let running = false;
    let raf = 0;
    let last = 0;

    body.querySelector(".btn-start").addEventListener("click", start);
    track.addEventListener("pointerdown", tap);
    document.addEventListener("keydown", spaceTap);

    function start() {
      body.querySelector(".game-intro").style.display = "none";
      track.hidden = false;
      stats.hidden = false;
      layoutZone();
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(step);
      msg.textContent = "Жди зелёную…";
    }

    function layoutZone() {
      zone.style.left = zoneLeft + "%";
      zone.style.width = zoneWidth + "%";
    }

    function step(now) {
      if (!running) return;
      const dt = Math.min(now - last, 50);
      last = now;
      pos += dir * speed * dt;
      if (pos >= 100) { pos = 100; dir = -1; }
      if (pos <= 0) { pos = 0; dir = 1; }
      marker.style.left = "calc(" + pos + "% - 5px)";
      raf = requestAnimationFrame(step);
    }

    function inZone() {
      return pos >= zoneLeft && pos <= zoneLeft + zoneWidth;
    }

    function tap() {
      if (!running) return;
      if (inZone()) {
        hits++;
        hitsEl.textContent = "🎯 " + hits;
        msg.textContent = ["Есть!", "Чётко!", "В яблочко!", "Реакция топ!", "Последний — хлёсткий!"][hits - 1] || "Есть!";
        if (hits >= HITS_TO_WIN) return finish();
        // сужаем зону и ускоряемся — прогрессия сложности
        zoneWidth = Math.max(11, zoneWidth * 0.78);
        zoneLeft = 12 + Math.random() * (76 - zoneWidth);
        speed = Math.min(1.15, speed * 1.16);
        layoutZone();
      } else {
        misses++;
        missEl.textContent = "💨 " + misses;
        msg.textContent = "Мимо — счёт на месте, бей дальше";
      }
    }

    function spaceTap(e) {
      if (e.code === "Space" && !track.hidden) {
        e.preventDefault();
        tap();
      }
    }

    function finish() {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", spaceTap);
      msg.textContent = "Навыки прокачаны!";
      setTimeout(onWin, 700);
    }
  },
});
