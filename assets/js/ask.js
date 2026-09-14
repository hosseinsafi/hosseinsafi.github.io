(() => {
  const tabs = document.querySelectorAll('.ask-tab');
  const panels = document.querySelectorAll('.ask-panel');
  const queryText = document.getElementById('askQueryText');
  if (!tabs.length || !queryText) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function typeQuery(text) {
    return new Promise((resolve) => {
      if (prefersReduced) {
        queryText.textContent = text;
        resolve();
        return;
      }
      queryText.textContent = '';
      const chars = Array.from(text);
      let i = 0;
      const tick = () => {
        if (i >= chars.length) { resolve(); return; }
        queryText.textContent += chars[i];
        i += 1;
        setTimeout(tick, 16 + Math.random() * 18);
      };
      tick();
    });
  }

  async function activate(tab) {
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));

    const targetId = tab.getAttribute('aria-controls');
    await typeQuery(tab.dataset.q);

    panels.forEach((p) => {
      if (p.id !== targetId) { p.hidden = true; return; }
      p.hidden = false;
      if (prefersReduced) return;
      p.classList.remove('is-in');
      void p.offsetWidth; // restart the animation each time
      p.classList.add('is-in');
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.getAttribute('aria-selected') === 'true') return;
      activate(tab);
    });
  });

  const initial = document.querySelector('.ask-tab[aria-selected="true"]') || tabs[0];
  activate(initial);
})();
