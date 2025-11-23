// --- LOGIQUE FILTRE ---
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.classList.remove('hide');
                // Petit fix pour le Scroll Reveal quand on filtre :
                card.classList.add('active'); 
            } else {
                card.classList.add('hide');
                card.classList.remove('active');
            }
        });
    });
});

// --- LOGIQUE MODALE ---
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalImage = document.getElementById("modal-image");
const closeBtn = document.querySelector(".close-btn");
const detailButtons = document.querySelectorAll(".btn-details");

detailButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault(); 
        const card = btn.closest(".project-card");
        const title = card.querySelector("h3").innerText;
        const desc = card.getAttribute("data-details");
        const imageSrc = card.getAttribute("data-image");

        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        modalImage.src = imageSrc;
        modal.style.display = "block";
    });
});

if(closeBtn){
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

// --- NOUVEAU : SCROLL REVEAL (Animation d'apparition) ---
const revealElements = document.querySelectorAll('.project-card, .notes-list, h2, .folder-group, .hero-content');

function reveal() {
    const windowHeight = window.innerHeight;
    const elementVisible = 50; // Distance avant que ça apparaisse

    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        
        // On ajoute la classe pour l'animation si elle n'y est pas
        if (!element.classList.contains('reveal')) {
            element.classList.add('reveal');
        }

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Écoute l'événement de scroll
window.addEventListener('scroll', reveal);
// Lance une fois au chargement
reveal();
