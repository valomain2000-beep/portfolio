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
            } else {
                card.classList.add('hide');
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

// Au clic sur "Détails"
detailButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault(); 
        
        const card = btn.closest(".project-card");
        
        // Récupération des datas
        const title = card.querySelector("h3").innerText;
        const desc = card.getAttribute("data-details");
        const imageSrc = card.getAttribute("data-image");

        // Injection dans la modale
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        modalImage.src = imageSrc;

        // Affichage
        modal.style.display = "block";
    });
});

// Fermeture croix
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fermeture clic extérieur
window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});