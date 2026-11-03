/* ============================================================
   SVG-иконки (line, 24×24, stroke = currentColor).
   Никаких эмодзи: весь пиктографический слой рисуется кодом.
   Icons.svg(name, size) → строка <svg>.
   ============================================================ */

const Icons = (function () {
  const S = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';

  const PATHS = {
    /* плитки памяти: сетка 2×2, одна заполнена */
    memory: '<rect x="4" y="4" width="7" height="7" rx="2" ' + S + '/>' +
            '<rect x="13" y="4" width="7" height="7" rx="2" ' + S + ' fill="currentColor" stroke="none"/>' +
            '<rect x="4" y="13" width="7" height="7" rx="2" ' + S + '/>' +
            '<rect x="13" y="13" width="7" height="7" rx="2" ' + S + '/>',

    /* пазл */
    logic: '<path ' + S + ' d="M9 4h6v3.2a2 2 0 1 0 4 0V4h1v6h-3.2a2 2 0 1 0 0 4H20v6h-6v-3.2a2 2 0 1 0-4 0V20H4v-6h3.2a2 2 0 1 0 0-4H4V4h5z"/>',

    /* молния */
    reaction: '<path ' + S + ' d="M13 3 5.5 13.5H11L10 21l7.5-10.5H12L13 3z"/>',

    /* колба с пузырями */
    ablab: '<path ' + S + ' d="M10 3h4M11 3v5.5L5.8 17a3 3 0 0 0 2.6 4.5h7.2a3 3 0 0 0 2.6-4.5L13 8.5V3"/>' +
           '<path ' + S + ' d="M7.5 15h9"/>' +
           '<circle cx="10.5" cy="18" r="0.4" fill="currentColor"/><circle cx="13.5" cy="17" r="0.4" fill="currentColor"/>',

    /* солнце за облаком */
    forecast: '<circle cx="15.5" cy="8.5" r="3" ' + S + '/>' +
              '<path ' + S + ' d="M15.5 2.5v1.2M20 4l-.9.9M21.5 8.5h-1.2M19.5 12l.9.9"/>' +
              '<path ' + S + ' d="M4 17.5a4 4 0 0 1 .7-7.9 5 5 0 0 1 9.6 1.1 3.5 3.5 0 0 1 2.2 6.3"/>' +
              '<path ' + S + ' d="M3.5 21h15"/>',

    /* трубка */
    contacts: '<path ' + S + ' d="M5 4h3.5l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L16 14l4 1.5V19a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 6.2 2 2 0 0 1 5 4z"/>',

    /* кубок */
    trophy: '<path ' + S + ' d="M8 4h8v5.5a4 4 0 0 1-8 0V4z"/>' +
            '<path ' + S + ' d="M8 5.5H4.5a3.5 3.5 0 0 0 3.6 3.5M16 5.5h3.5a3.5 3.5 0 0 1-3.6 3.5"/>' +
            '<path ' + S + ' d="M12 13.5V17m-3.5 3.5h7M10 20.5l.5-2h3l.5 2"/>',

    /* ветка git */
    branch: '<circle cx="6" cy="6" r="2.2" ' + S + '/><circle cx="6" cy="18" r="2.2" ' + S + '/>' +
            '<circle cx="18" cy="8" r="2.2" ' + S + '/>' +
            '<path ' + S + ' d="M6 8.2v7.6M18 10.2c0 3.5-4 4.3-9.5 4.6"/>',

    /* код */
    code: '<path ' + S + ' d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13 5l-2.5 14"/>',

    /* бумажный самолётик */
    plane: '<path ' + S + ' d="M21 3.5 3.5 10.5l6 2.5M21 3.5 18 20.5l-8.5-7.5M21 3.5 9.5 13v5.5l3-3"/>',

    /* лампочка */
    bulb: '<path ' + S + ' d="M9 18h6M10 21h4"/>' +
          '<path ' + S + ' d="M12 3a6 6 0 0 0-3.5 10.8c.8.6 1.5 1.3 1.5 2.2h4c0-.9.7-1.6 1.5-2.2A6 6 0 0 0 12 3z"/>',

    /* стрелка назад */
    back: '<path ' + S + ' d="m14.5 5-6 7 6 7"/>',

    /* инфо */
    info: '<circle cx="12" cy="12" r="8.5" ' + S + '/>' +
          '<path ' + S + ' d="M12 11v5"/><circle cx="12" cy="8" r="0.5" fill="currentColor"/>',

    /* батарея */
    battery: '<rect x="3" y="8" width="16" height="8" rx="2" ' + S + '/>' +
             '<rect x="5" y="10" width="9" height="4" rx="1" fill="currentColor" stroke="none"/>' +
             '<path ' + S + ' d="M21 11v2"/>',

    /* солнце */
    sun: '<circle cx="12" cy="12" r="4" ' + S + '/>' +
         '<path ' + S + ' d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>',

    /* ветер */
    wind: '<path ' + S + ' d="M4 8h9a2.5 2.5 0 1 0-2.4-3.2M3 12h14a2.5 2.5 0 1 1-2.4 3.2M4 16h7a2 2 0 1 1-1.9 2.6"/>',

    /* капля */
    drop: '<path ' + S + ' d="M12 3.5s6 6.5 6 10.5a6 6 0 0 1-12 0c0-4 6-10.5 6-10.5z"/>',

    /* термометр */
    thermo: '<path ' + S + ' d="M10 4a2 2 0 1 1 4 0v9.3a4.5 4.5 0 1 1-4 0V4z"/>' +
            '<circle cx="12" cy="17" r="1.6" fill="currentColor" stroke="none"/>',

    /* радуга */
    rainbow: '<path ' + S + ' d="M4 17a8 8 0 0 1 16 0M7.5 17a4.5 4.5 0 0 1 9 0M11 17a1 1 0 0 1 2 0"/>',

    /* документ с сгибом */
    doc: '<path ' + S + ' d="M6 3.5h8L19 8.5V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z"/>' +
         '<path ' + S + ' d="M14 3.5V9h5M9 13h6M9 16.5h6"/>',

    /* перемотка: пропустить */
    ff: '<path ' + S + ' d="M5 6.5 12 12l-7 5.5v-11z"/><path ' + S + ' d="M13 6.5 20 12l-7 5.5v-11z"/>',

    /* конверт */
    mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2" ' + S + '/>' +
          '<path ' + S + ' d="m4.5 7.5 7.5 5.5 7.5-5.5"/>',
  };

  return {
    svg(name, size) {
      const body = PATHS[name] || PATHS.info;
      const s = size || 24;
      return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" aria-hidden="true">' + body + "</svg>";
    },
  };
})();
