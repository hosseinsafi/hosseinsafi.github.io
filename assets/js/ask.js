(() => {
  const tabs = document.querySelectorAll('.ask-tab');
  const panels = document.querySelectorAll('.ask-panel');
  const queryText = document.getElementById('askQueryText');
  if (!tabs.length || !queryText) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setQuery(text, { typewriter }) {
    if (!typewriter || prefersReduced) {
      queryText.textContent = text;
      return;
    }
    queryText.textContent = '';
    const chars = Array.from(text);
    let i = 0;
    const tick = () => {
      if (i >= chars.length) return;
      queryText.textContent += chars[i];
      i += 1;
      setTimeout(tick, 22 + Math.random() * 26);
    };
    tick();
  }

  function activate(tab, opts) {
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
    panels.forEach((p) => { p.hidden = p.id !== tab.getAttribute('aria-controls'); });
    setQuery(tab.dataset.q, opts);
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activate(tab, { typewriter: false }));
  });

  // Type out the initially selected question once, on load.
  const initial = document.querySelector('.ask-tab[aria-selected="true"]') || tabs[0];
  activate(initial, { typewriter: true });
})();
