/* ============================================================
   🧪 «A/B-лаборатория» → Подход
   Три итерации: гипотеза → выбор варианта A/B → смоделированные
   метрики → факт о кандидате. Выбор влияет на показанный график.
   Результаты копятся в window.ABLAB_RESULTS для сводки.
   ============================================================ */

window.ABLAB_RESULTS = [];

Games.register("ablab", {
  icon: "ablab",
  title: "A/B Lab",
  bg: "linear-gradient(135deg,#e0fbf0,#e4e0ff)",
  note: "Ядро геймплея — рутина из бенефитов вакансии: гипотезы, A/B, метрики. Оба варианта «работают», метрики смоделированы и подписаны как симуляция — честность важнее эффекта. Выбор HR реально меняет график.",

  start(body, onWin) {
    const cfg = DATA.ablab;
    let idx = 0;

    body.innerHTML =
      '<div class="game-intro"><div class="big">' + Icons.svg("ablab", 46) + "</div>" +
      "<h2>A/B-лаборатория</h2>" +
      "<p>Три гипотезы, шесть вариантов. Твоё решение — метрика на графике. Так я работаю с каждой механикой.</p>" +
      '<button class="btn-start">Запустить итерацию 1</button></div>';

    body.querySelector(".btn-start").addEventListener("click", showIteration);

    function showIteration() {
      const it = cfg.iterations[idx];
      body.innerHTML =
        '<div class="ab-iter">итерация ' + (idx + 1) + " / " + cfg.iterations.length + "</div>" +
        '<div class="ab-hypo"><b>Гипотеза.</b> ' + it.hypothesis + "</div>" +
        '<div class="ab-variants">' +
          '<button class="ab-var" data-v="a"><span class="tag">Вариант A</span><h4>' + it.a.title + "</h4><p>" + it.a.text + "</p></button>" +
          '<button class="ab-var" data-v="b"><span class="tag">Вариант B</span><h4>' + it.b.title + "</h4><p>" + it.b.text + "</p></button>" +
        "</div>" +
        '<div class="ab-result"></div>';

      body.querySelectorAll(".ab-var").forEach((b) =>
        b.addEventListener("click", () => choose(b.dataset.v))
      );
    }

    function choose(choice) {
      const it = cfg.iterations[idx];
      const out = choice === "b" ? it.outB : it.outA;
      window.ABLAB_RESULTS[idx] = { choice };

      body.querySelectorAll(".ab-var").forEach((b) => {
        b.disabled = true;
        if (b.dataset.v === choice) b.style.borderColor = "#6a5ae8";
      });

      const res = body.querySelector(".ab-result");
      res.innerHTML =
        '<div class="ab-metric">' +
          '<div class="m-row"><span>' + out.metric + " (" + out.show + ")</span><span>" + out.peak + "</span></div>" +
          '<div class="m-bar"><div class="m-fill" data-w="' + out.value + '"></div></div>' +
        "</div>" +
        '<div class="ab-conclusion">' + out.conclusion + "</div>" +
        '<div class="ab-fact"><b>Из практики.</b> ' + it.fact + "</div>" +
        '<div class="ab-note">' + cfg.disclaimer + "</div>" +
        '<button class="btn-start">' + (idx + 1 < cfg.iterations.length ? "Итерация " + (idx + 2) : "Собрать сводку") + "</button>";

      requestAnimationFrame(() =>
        setTimeout(() => (res.querySelector(".m-fill").style.width = out.value + "%"), 60)
      );

      res.querySelector(".btn-start").addEventListener("click", () => {
        idx++;
        if (idx < cfg.iterations.length) showIteration();
        else onWin();
      });
    }
  },
});
