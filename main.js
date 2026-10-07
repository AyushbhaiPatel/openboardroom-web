document.documentElement.classList.add('js');
document.getElementById('year').textContent = new Date().getFullYear();

const targets = document.querySelectorAll('.section-head, .cards article, .spec > div, .grid-3 > div, .table-wrap, .facts li, .timeline li, .people a, .episode');
targets.forEach(el => el.classList.add('reveal'));

const bars = document.querySelectorAll('.bar');
bars.forEach(b => b.style.setProperty('--v', b.dataset.v));

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  targets.forEach(el => io.observe(el));
  bars.forEach(el => io.observe(el));
} else {
  targets.forEach(el => el.classList.add('in'));
  bars.forEach(el => el.classList.add('in'));
}

const copy = document.getElementById('copy');
const hint = document.getElementById('copy-hint');
copy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copy.dataset.copy);
    hint.textContent = 'Copied.';
  } catch {
    hint.textContent = copy.dataset.copy;
  }
  setTimeout(() => (hint.textContent = ''), 2500);
});
