// Animation des barres de compétences
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        const w = fill.style.getPropertyValue('--w');
        fill.style.transform = `scaleX(${w})`;
        fill.classList.add('animated');
      });
    }
  });
}, { threshold: 0.2 });

const aboutSection = document.querySelector('#about');
if (aboutSection) observer.observe(aboutSection);

// Nav active state on scroll (Met en surbrillance le menu)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length > 0) {
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
    });
  });
}

// Apparition fluide au défilement
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

const cardsToReveal = document.querySelectorAll('.project-card, .veille-card, .frise-item');
cardsToReveal.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// ==========================================
// 3. FLUX RSS AUTOMATIQUE (CERT-FR)
// ==========================================

const conteneurRss = document.getElementById('flux-rss');

if (conteneurRss) {
  // L'URL du flux RSS du CERT-FR (via le convertisseur rss2json pour contourner les blocages de sécurité du navigateur)
  const rssUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.cert.ssi.gouv.fr/feed/';

  fetch(rssUrl)
    .then(response => response.json())
    .then(data => {
      // On vide le texte "Chargement..."
      conteneurRss.innerHTML = '';

      // On prend seulement les 3 premiers articles pour ne pas surcharger la page
      const articles = data.items.slice(0, 3);

      articles.forEach(article => {
        // Formater la date (ex: 2026-05-24 14:00:00 -> 24/05/2026)
        const dateObj = new Date(article.pubDate);
        const datePropre = dateObj.toLocaleDateString('fr-FR');

        // Créer la carte HTML avec le même design que tes autres notes
        const carteHTML = `
          <article class="note-card">
            <div class="note-header">
              <span class="note-badge type-passive" style="background: rgba(255, 85, 85, 0.1); color: #ff5555; border: 1px solid rgba(255, 85, 85, 0.2);">Alerte CERT-FR</span>
              <span class="note-date">${datePropre}</span>
            </div>
            <h3 class="note-title">${article.title}</h3>
            <p class="note-excerpt">Alerte de sécurité officielle publiée par l'ANSSI.</p>
            <a href="${article.link}" target="_blank" class="note-link">Lire l'alerte officielle →</a>
          </article>
        `;
        
        conteneurRss.innerHTML += carteHTML;
      });
    })
    .catch(error => {
      conteneurRss.innerHTML = '<p style="color: #ff5555;">Impossible de charger le flux RSS pour le moment.</p>';
      console.error('Erreur RSS :', error);
    });
}