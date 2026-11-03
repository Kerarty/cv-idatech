/* ============================================================
   💭 «Память» → Опыт
   Тайлы вспыхивают последовательностью — повтори её.
   3 раунда: 4 → 6 → 8 тайлов, показ 3.0 → 2.5 → 2.0 с.
   Каждый раунд открывает пункт таймлайна.
   ============================================================ */

Games.register("memory", {
  icon: "💭",
  title: "Память",
  bg: "linear-gradient(135deg,#e4e0ff,#d6e6ff)",
  note: "Кривая сложности линейная: +2 тайла и −0,5 с за раунд. Проиграть нельзя — неверный тап мягко повторяет показ. Это демонстрация difficulty progression из вакансии, а не челлендж: HR должен дойти до контента relaxed-путём.",

  start(body, onWin) {
    const rounds = [
      { tiles: 4, show: 3000 },
      { tiles: 6, show: 2500 },
      { tiles: 8, show: 2000 },
    ];
    let round = 0;
    let seq = [];
    let input = [];
    let locked = true;

    body.innerHTML =
      '<div class="game-intro"><div class="big">💭</div>' +
      "<h2>Тренировка памяти</h2>" +
      "<p>Тайлы вспыхивают последовательностью — повтори её. Три раунда, сложность растёт. Каждый раунд открывает период опыта.</p>" +
      '<button class="btn-start">Начать</button></div>' +
      '<div class="mem-board" hidden></div>' +
      '<div class="mem-status"></div>';

    const board = body.querySelector(".mem-board");
    const status = body.querySelector(".mem-status");
    body.querySelector(".btn-start").addEventListener("click", startRound);

    function startRound() {
      const intro = body.querySelector(".game-intro");
      if (intro) intro.style.display = "none";
      const r = rounds[round];
      seq = [];
      input = [];
      status.textContent = "Раунд " + (round + 1) + " из 3 · тайлов: " + r.tiles;
      board.hidden = false;
      buildBoard(r.tiles);
      locked = true;
      setTimeout(() => showSequence(r.show / r.tiles), 500);
    }

    function buildBoard(n) {
      board.innerHTML = "";
      for (let i = 0; i < n; i++) {
        const t = document.createElement("button");
        t.className = "mem-tile";
        t.dataset.i = i;
        t.addEventListener("click", () => tap(i));
        board.appendChild(t);
      }
      seq = shuffle([...Array(n).keys()]);
    }

    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    async function showSequence(step) {
      status.textContent = "Смотри…";
      await sleep(400);
      for (const i of seq) {
        flash(i);
        await sleep(step);
        await sleep(120);
      }
      locked = false;
      status.textContent = "Твой ход";
    }

    function flash(i) {
      const t = board.querySelector('[data-i="' + i + '"]');
      t.classList.add("lit");
      setTimeout(() => t.classList.remove("lit"), Math.max(260, 900 - seq.length * 70));
    }

    function tap(i) {
      if (locked) return;
      flash(i);
      if (seq[input.length] !== i) {
        locked = true;
        const t = board.querySelector('[data-i="' + i + '"]');
        t.classList.add("err");
        setTimeout(() => t.classList.remove("err"), 350);
        status.textContent = "Почти! Показываю ещё раз";
        input = [];
        setTimeout(() => showSequence(3200 / seq.length), 700);
        return;
      }
      const t = board.querySelector('[data-i="' + i + '"]');
      t.classList.add("ok");
      setTimeout(() => t.classList.remove("ok"), 300);
      input.push(i);
      if (input.length === seq.length) nextRound();
    }

    async function nextRound() {
      locked = true;
      round++;
      if (round < rounds.length) {
        status.textContent = "Раунд пройден — период опыта открыт";
        await sleep(1100);
        startRound();
      } else {
        status.textContent = "Память в форме!";
        await sleep(800);
        onWin();
      }
    }

    function sleep(ms) {
      return new Promise((r) => setTimeout(r, ms));
    }
  },
});
