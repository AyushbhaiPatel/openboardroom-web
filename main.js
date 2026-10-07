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


const form = document.getElementById('access-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('form-msg');
    const d = Object.fromEntries(new FormData(form));
    if (!d.name || !/^\S+@\S+\.\S+$/.test(d.email || '')) {
      msg.textContent = 'Please add your name and a valid email.';
      msg.className = 'form-msg err';
      return;
    }
    const body = `Name: ${d.name}\nEmail: ${d.email}\nCompany: ${d.org || '-'}\nBuilding: ${d.use}\n\n${d.note || ''}`;
    window.location.href = 'mailto:hello@openboardroom.tech?subject=' + encodeURIComponent('Early access request') + '&body=' + encodeURIComponent(body);
    msg.textContent = 'Your email app should open with the request ready to send.';
    msg.className = 'form-msg';
  });
}
