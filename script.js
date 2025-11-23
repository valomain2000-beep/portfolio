document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. ANIMATION FLUIDE ACCORDÉON (OUVERTURE & FERMETURE)
    // =========================================
    const accordions = document.querySelectorAll("details.folder-group");

    accordions.forEach((acc) => {
        const summary = acc.querySelector("summary");

        summary.addEventListener("click", (e) => {
            e.preventDefault(); // On empêche l'ouverture instantanée

            if (acc.open) {
                // --- SI OUVERT : ON FERME EN DOUCEUR ---
                const startHeight = `${acc.offsetHeight}px`;
                const endHeight = `${summary.offsetHeight}px`;

                const animation = acc.animate({ height: [startHeight, endHeight] }, {
                    duration: 300, // 0.3s
                    easing: 'ease-out'
                });

                animation.onfinish = () => {
                    acc.open = false; // On ferme la balise à la fin de l'animation
                };

            } else {
                // --- SI FERMÉ : ON OUVRE EN DOUCEUR ---
                const startHeight = `${acc.offsetHeight}px`;
                acc.open = true; // On ouvre pour calculer la taille du contenu
                const endHeight = `${acc.offsetHeight}px`;

                acc.animate({ height: [startHeight, endHeight] }, {
                    duration: 300,
                    easing: 'ease-out'
                });
            }
        });
    });

    // =========================================
    // 2. LOGIQUE FILTRES (Index)
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
                        card.classList.add('active');
                    } else {
                        card.classList.add('hide');
                        card.classList.remove('active');
                    }
                });
            });
        });
    }

    // =========================================
    // 3. MODALE PROJETS
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
            closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
        }
        window.addEventListener("click", (e) => {
            if (e.target == modal) { modal.style.display = "none"; }
        });
    }

    // =========================================
    // 4. VISIONNEUSE PDF
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
                pdfFrame.src = "";
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
    // 5. SCROLL REVEAL
    // =========================================
    const revealElements = document.querySelectorAll('.project-card, .notes-list, h2, .folder-group, .hero-content');

    function reveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 50; 
        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (!element.classList.contains('reveal')) { element.classList.add('reveal'); }
            if (elementTop < windowHeight - elementVisible) { element.classList.add('active'); }
        });
    }
    window.addEventListener('scroll', reveal);
    reveal(); 
});
