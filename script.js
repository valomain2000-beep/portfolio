/* --- SCRIPT CENTRALISÉ POUR LE PORTFOLIO --- */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. LOGIQUE FILTRES (Page Accueil)
    // =========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hide');
                        card.classList.add('active'); // Pour Scroll Reveal
                    } else {
                        card.classList.add('hide');
                        card.classList.remove('active');
                    }
                });
            });
        });
    }

    // =========================================
    // 2. MODALE PROJETS (Page Accueil)
    // =========================================
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const modalImage = document.getElementById("modal-image");
    const closeBtn = document.querySelector(".close-btn");
    const detailButtons = document.querySelectorAll(".btn-details");

    if (modal && detailButtons.length > 0) {
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

        if(closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }

        window.addEventListener("click", (e) => {
            if (e.target == modal) {
                modal.style.display = "none";
            }
        });
    }

    // =========================================
    // 3. MODALE VISIONNEUSE PDF (Page Notes)
    // =========================================
    const pdfLinks = document.querySelectorAll('.view-pdf');
    const pdfModal = document.getElementById('pdf-modal');
    const pdfFrame = document.getElementById('pdf-frame');
    const pdfTitle = document.getElementById('pdf-title');
    const closePdfBtn = document.querySelector('.close-pdf');

    if (pdfModal && pdfLinks.length > 0) {
        pdfLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); 
                const fileUrl = link.getAttribute('href');
                const title = link.getAttribute('data-title') || "Document PDF";
                
                pdfFrame.src = fileUrl;
                pdfTitle.innerText = title;
                pdfModal.style.display = "block";
            });
        });

        if (closePdfBtn) {
            closePdfBtn.addEventListener('click', () => {
                pdfModal.style.display = "none";
                pdfFrame.src = ""; // Arrêter le chargement
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target == pdfModal) {
                pdfModal.style.display = "none";
                pdfFrame.src = "";
            }
        });
    }

    // =========================================
    // 4. SCROLL REVEAL (Animation d'apparition)
    // =========================================
    const revealElements = document.querySelectorAll('.project-card, .notes-list, h2, .folder-group, .hero-content');

    function reveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 50; 

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (!element.classList.contains('reveal')) {
                element.classList.add('reveal');
            }

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Lancer une fois au démarrage
});
