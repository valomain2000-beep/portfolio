/* ── PRELOADER ── */
const msgs = ['CHARGEMENT DES MODULES...','CONNEXION AU RÉSEAU...','AUTHENTIFICATION...','BIENVENUE'];
let pct = 0, msgIdx = 0;
const bar = document.getElementById('pre-bar');
const pctEl = document.getElementById('pre-pct');
const msgEl = document.getElementById('pre-msg');
const pre = document.getElementById('preloader');

const pInt = setInterval(() => {
  pct += Math.random() * 4 + 1;
  if(pct >= 100) { pct = 100; clearInterval(pInt); }
  bar.style.width = pct + '%';
  pctEl.textContent = Math.floor(pct) + '%';
  const mi = Math.floor(pct / 25);
  if(mi !== msgIdx && mi < msgs.length) { msgIdx = mi; msgEl.textContent = msgs[msgIdx]; }
  if(pct >= 100) {
    setTimeout(() => {
      pre.classList.add('done');
      document.getElementById('nav').classList.add('show');
    }, 400);
  }
}, 35);

/* ── SCROLL REVEAL ── */
const rObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: .1 });
document.querySelectorAll('.rv').forEach(el => rObs.observe(el));

/* ── SKILL BARS ── */
const skObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.querySelectorAll('.sk-fill').forEach((f, i) => {
        setTimeout(() => f.classList.add('on'), i * 100);
      });
      skObs.unobserve(e.target);
    }
  });
}, { threshold: .3 });
document.querySelectorAll('.skill-list').forEach(el => skObs.observe(el));

/* ── TIMELINE STAGGER ── */
const tlObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.querySelectorAll('.tl-row').forEach((r, i) => {
        setTimeout(() => r.classList.add('on'), i * 150);
      });
      tlObs.unobserve(e.target);
    }
  });
}, { threshold: .2 });
document.querySelectorAll('.tl').forEach(el => tlObs.observe(el));
