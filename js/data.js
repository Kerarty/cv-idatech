/* ============================================================
   Контент резюме — единственное место, где правят тексты.
   Источник фактов: github.com/Kerarty (репозитории и их даты),
   вакансия Game Designer (Casual/Hyper Casual), idatech.dev.
   ============================================================ */

const DATA = {

  meta: {
    name: "Kerarty",
    role: "Геймдизайнер · casual / hyper-casual",
    status: "Играет вместо сопроводительного письма",
  },

  contacts: [
    {
      icon: "mail",
      label: "Почта — самый быстрый ответ",
      value: "kukar.yar@gmail.com",
      href: "mailto:kukar.yar@gmail.com?subject=Вакансия Game Designer (Casual/Hyper Casual), IDA TECH",
    },
    {
      icon: "contacts",
      label: "Телефон / мессенджеры",
      value: "+375 44 783 84 89",
      href: "tel:+375447838489",
    },
    {
      icon: "branch",
      label: "GitHub — проекты и код",
      value: "github.com/Kerarty",
      href: "https://github.com/Kerarty",
    },
    {
      icon: "code",
      label: "Это резюме (исходники)",
      value: "github.com/Kerarty/cv-idatech",
      href: "https://github.com/Kerarty/cv-idatech",
    },
  ],

  cta: {
    text: "Hire me — написать на почту",
    href: "mailto:kukar.yar@gmail.com?subject=Вакансия Game Designer (Casual/Hyper Casual), IDA TECH",
  },

  /* --- 💭 Память → Опыт (таймлайн из репозиториев) --- */
  experience: [
    {
      date: "фев 2026",
      title: "Первые HTML5-игры",
      text: "Браузерные прототипы: понял, что веб — самый быстрый способ донести механику до игрока.",
    },
    {
      date: "окт 2026",
      title: "Unity 6 + URP — головоломка echoloop",
      text: "Головоломка о времени: петля, эхо прошлых проходов, 8 уровней. Левел-дизайн и кривая сложности с нуля.",
    },
    {
      date: "окт 2026",
      title: "Playable-реклама",
      text: "Движко-независимый SDK для HTML5 playable (TypeScript, адаптеры под рекламные сети). Crowd runner в одном HTML-файле на 472 КБ с процедурным артом и звуком, MRAID. Splash Kitty: «нарисуй линию — спаси кота».",
    },
    {
      date: "окт 2026",
      title: "Игровая практика: 12 прототипов в 12 жанрах",
      text: "За месяц собрал дюжину мини-игр под вселенные разных студий: босс-файт с баланс-инспектором, смена в пункте выдачи, платформер, лайвопс-тюнер, баланс-лаборатория merge-автобатлера. Каждая с нуля: механика, баланс, кривая сложности, целевая метрика.",
    },
  ],

  /* --- 🧩 Логика → Проекты --- */
  projects: [
    {
      mono: "e",
      tint: "var(--tile-sage)",
      name: "echoloop",
      sub: "Unity 6 + URP · C#",
      text: "Головоломка о времени: твои прошлые проходы — эхо в петле. 8 уровней с нарастающей сложностью.",
      chips: ["Unity 6", "URP", "level design"],
      href: "https://github.com/Kerarty/echoloop-playble",
    },
    {
      mono: "m",
      tint: "var(--tile-clay)",
      name: "playable-ad-mob-rush",
      sub: "PixiJS · один HTML-файл",
      text: "Crowd runner: вся игра в одном файле 472 КБ. Процедурный арт и звук, поддержка MRAID.",
      chips: ["PixiJS", "472 КБ", "MRAID", "процедурный арт"],
      href: "https://github.com/Kerarty/playable-ad-mob-rush",
    },
    {
      mono: "s",
      tint: "var(--tile-sky)",
      name: "playble-ads — SDK",
      sub: "TypeScript · движко-независимый",
      text: "SDK для HTML5 playable-рекламы с адаптерами под основные рекламные сети: один билд — везде.",
      chips: ["TypeScript", "SDK", "ad networks"],
      href: "https://github.com/Kerarty/playble-ads",
    },
    {
      mono: "k",
      tint: "var(--tile-blush)",
      name: "Splash Kitty!",
      sub: "PixiJS · playable-креатив",
      text: "Нарисуй линию и направь капли дождя в кота-стакана. Один HTML5-файл.",
      chips: ["draw-a-line", " playable"],
      href: "https://github.com/Kerarty/splash-kitty-playable-ad",
    },
    {
      mono: "cv",
      tint: "var(--tile-sand)",
      name: "cv-серия — 12 игровых прототипов",
      sub: "ванильный JS · 12 жанров за месяц",
      text: "Дюжина мини-игр под вселенные конкретных студий: босс-файт с баланс-инспектором для Highcore, смена в пункте выдачи для Playstrom, платформер про уровни карьеры для БелХард, экономика внимания для OpenMyGame. Каждый прототип — новая механика, свой баланс и цель по удержанию.",
      chips: ["12 жанров", "механики", "баланс", "1 месяц"],
      href: "https://github.com/Kerarty?tab=repositories",
    },
  ],

  /* --- ⚡ Реакция → Навыки --- */
  skills: [
    { name: "HTML5 / JS / TS", level: 5, note: "PixiJS, Three.js, ванильный JS — вся графика кодом" },
    { name: "Playable ads", level: 5, note: "MRAID, SDK с адаптерами, креатив < 500 КБ" },
    { name: "Прототипирование", level: 5, note: "12 игровых прототипов за месяц — каждый в новом жанре" },
    { name: "Unity / C#", level: 4, note: "Unity 6 + URP: головоломка echoloop" },
    { name: "Левел-дизайн", level: 4, note: "8 уровней echoloop, кривая сложности" },
    { name: "Баланс и экономика", level: 4, note: "баланс-лаборатория merge-автобатлера, тюнер лайвопс-событий" },
  ],

  /* --- 🧪 A/B-лаборатория → Подход ---
     outA/outB — смоделированные метрики для честной демонстрации метода. */
  ablab: {
    disclaimer: "метрики смоделированы для демонстрации метода",
    principle: "Гипотеза → прототип → метрика → итерация",
    iterations: [
      {
        hypothesis: "Игрок должен сделать первый тап до того, как дочитает обучение.",
        a: { title: "Обучение текстом", text: "3 строки правил перед первым уровнем" },
        b: { title: "Обучение жестом", text: "подсветка пальца: куда тапнуть, прямо в геймплее" },
        outA: { metric: "D1 retention", value: 38, show: "38%", peak: "CTR 7,2%", conclusion: "Работает, но нетерпеливые уходят до первого тапа." },
        outB: { metric: "D1 retention", value: 46, show: "46%", peak: "CTR 9,1%", conclusion: "Жест читается быстрее текста: тап случается на 4-й секунде." },
        fact: "12 игровых прототипов в 12 жанрах — итерация дешевле обсуждения.",
      },
      {
        hypothesis: "Первый уровень должен успеть до потери внимания.",
        a: { title: "15 секунд", text: "короткий уровень, вау-момент сразу" },
        b: { title: "40 секунд", text: "полноценный туториал всех механик" },
        outA: { metric: "Прохождение первого уровня", value: 91, show: "91%", peak: "сессия 3,4 мин", conclusion: "Вау-момент отдаю сразу — механики игрок изучит по ходу." },
        outB: { metric: "Прохождение первого уровня", value: 74, show: "74%", peak: "сессия 2,1 мин", conclusion: "Туториал съел вау-момент: интерес кончился раньше геймплея." },
        fact: "Весь арт и звук — процедурные: ноль ассетов, файл 472 КБ.",
      },
      {
        hypothesis: "Креатив должен выжить в ленте: зацепить за пару секунд и весить мало.",
        a: { title: "Ассетный арт", text: "нарисованные спрайты, «дорогой» вид" },
        b: { title: "Процедурный минимализм", text: "графика кодом, стиль = чистота" },
        outA: { metric: "CTR креатива", value: 68, show: "6,8%", peak: "вес 3,1 МБ", conclusion: "Смотрится дорого, но вес душит загрузку в ленте." },
        outB: { metric: "CTR креатива", value: 84, show: "8,4%", peak: "вес 472 КБ", conclusion: "Чистый стиль грузится мгновенно — и цепляет не хуже." },
        fact: "SDK для playable: один билд проходит во все рекламные сети.",
      },
    ],
  },

  /* --- 🌤 Прогноз → О себе --- */
  forecast: [
    {
      icon: "sun",
      title: "Сегодня ясно. Гипотезы сходятся.",
      text: "Предпочитаю сделать прототип вместо того, чтобы спорить о нём.",
    },
    {
      icon: "wind",
      title: "Ветер перемен: 12 прототипов в месяц.",
      text: "Если идея сомнительна — дешевле проверить, чем доказать.",
    },
    {
      icon: "drop",
      title: "Влажность: 0% бюрократии.",
      text: "Работаю напрямую с разработкой, артом и аналитикой.",
    },
    {
      icon: "thermo",
      title: "Дедлайн-индекс: высокий. Переношу комфортно.",
      text: "Hyper-casual — это много маленьких дедлайнов вместо одного большого.",
    },
    {
      icon: "rainbow",
      title: "На неделю: Unity, HTML5, баланс.",
      text: "И одна головоломка про петли времени — зашла слишком сильно, чтобы бросить.",
    },
  ],

  /* --- 🏆 Итоги --- */
  summary: {
    rows: [
      { label: "Специализация", value: "GD casual / hyper-casual" },
      { label: "Unity", value: "echoloop: Unity 6 + URP" },
      { label: "Playable ads", value: "SDK + 3 креатива" },
      { label: "Итерации", value: "12 игровых прототипов / мес" },
      { label: "Сборка и зависимости", value: "нет — и это фича" },
    ],
  },
};
