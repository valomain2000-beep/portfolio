// ==========================================
// 1. ANIMATIONS DU PORTFOLIO (index.html)
// ==========================================

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
// 2. LOGIQUE DE L'EXPLORATEUR (notes.html)
// ==========================================

// Gérer la barre de recherche en direct
const searchInput = document.getElementById('searchInput');
const fileLinks = document.querySelectorAll('.tree-file');

if (searchInput) {
  searchInput.addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    
    fileLinks.forEach(link => {
      const text = link.textContent.toLowerCase();
      const li = link.parentElement;
      
      // Si le texte contient ce qu'on tape
      if (text.includes(term)) {
        li.style.display = 'block';
        
        // On force l'ouverture des dossiers parents
        let parentDetails = li.closest('details');
        while (parentDetails) {
          parentDetails.open = true;
          parentDetails = parentDetails.parentElement.closest('details');
        }
      } else {
        li.style.display = 'none'; // Sinon on cache le lien
      }
    });
  });
}