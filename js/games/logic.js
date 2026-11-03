/* ============================================================
   🧩 «Логика» → Проекты
   Три загадки с вариантами. Верный ответ открывает карточку
   проекта; неверный подсвечивается и не двигает прогресс.
   ============================================================ */

Games.register("logic", {
  icon: "🧩",
  title: "Логика",
  bg: "linear-gradient(135deg,#d8f3e8,#d6e6ff)",
  note: "Классическая головоломка с вариантами — как в мини-играх Clever. Неверный ответ дешёвый: подсветка без штрафа. Проекты раскрываются по одному — chunking вместо длинной страницы.",

  start(body, onWin) {
    const puzzles = [
      {
        q: "Ты делаешь crowd runner для playable-креатива. Какая механика лишняя?",
        opts: ["one-tap прыжок", "свайп влево-вправо", "диалоговое дерево с выбором реплик", "удержание для ускорения"],
        answer: 2,
        explain: "Диалоговое дерево не влезает в 30 секунд креатива — остальное это язык hyper-casual.",
      },
      {
        q: "Эхо, петля, таймлайн… Продолжи ряд принципов головоломки echoloop:",
        opts: ["лутбоксы", "прошлые проходы становятся частью уровня", "рандомный дроп", "энергия на попытки"],
        answer: 1,
        explain: "Соль echoloop: твои прошлые действия — инструмент решения нынешней загадки.",
      },
      {
        q: "Креатив весит 472 КБ. Что поможет уложиться в лимит рекламной сети?",
        opts: ["спрайты в 4K", "процедурный арт и звук кодом", "двадцать шрифтов", "видеозаставка"],
        answer: 1,
        explain: "Весь арт и звук mob-rush генерируются кодом — потому файл и лёгкий.",
      },
    ];

    let idx = 0;

    body.innerHTML =
      '<div class="game-intro"><div class="big">🧩</div>' +
      "<h2>Три загадки</h2>" +
      "<p>Каждая разгадка открывает проект из архива. Ошибаться не страшно — это тоже гипотеза.</p>" +
      '<button class="btn-start">Начать</button></div>';

    body.querySelector(".btn-start").addEventListener("click", showPuzzle);

    function showPuzzle() {
      const p = puzzles[idx];
      body.innerHTML =
        '<div class="round-tag">загадка ' + (idx + 1) + " из " + puzzles.length + "</div>" +
        '<div class="quiz-q"><h3>' + p.q + "</h3></div>";

      const box = body.querySelector(".quiz-q");
      p.opts.forEach((opt, i) => {
        const b = document.createElement("button");
        b.className = "quiz-opt";
        b.textContent = opt;
        b.addEventListener("click", () => pick(b, i));
        box.appendChild(b);
      });
    }

    function pick(btn, i) {
      const p = puzzles[idx];
      const opts = body.querySelectorAll(".quiz-opt");
      opts.forEach((o) => (o.disabled = true));

      if (i === p.answer) {
        btn.classList.add("good");
        body.querySelector("h3").innerHTML = p.explain;
        setTimeout(() => {
          idx++;
          if (idx < puzzles.length) showPuzzle();
          else onWin();
        }, 1400);
      } else {
        btn.classList.add("bad");
        setTimeout(() => {
          btn.classList.remove("bad");
          opts.forEach((o) => (o.disabled = false));
        }, 650);
      }
    }
  },
});
