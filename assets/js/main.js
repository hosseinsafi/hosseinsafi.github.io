(() => {
  const btn = document.getElementById('emailBtn');
  if (!btn) return;

  // Reversed string keeps the address off crawlers without a build step.
  const encoded = 'moc.liamg@10niessoh.ifas';

  btn.addEventListener('click', async () => {
    const email = encoded.split('').reverse().join('');
    const original = btn.textContent;
    try {
      await navigator.clipboard.writeText(email);
      btn.textContent = 'Copied';
      setTimeout(() => { btn.textContent = original; }, 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });
})();
