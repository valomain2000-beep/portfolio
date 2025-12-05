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
    // 2. LOGIQUE FILTRES (Avec Slide Directionnel)
    // =========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        // On convertit la NodeList en Array pour pouvoir utiliser .indexOf() facilement
        const buttonsArray = Array.from(filterButtons);

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                
                // 1. On repère le bouton qui ÉTAIT actif avant le clic
                const currentActiveBtn = document.querySelector('.filter-btn.active');
                const oldIndex = buttonsArray.indexOf(currentActiveBtn);
                const newIndex = buttonsArray.indexOf(button);

                // 2. On détermine la direction du slide
                let animationClass = '';

                if (newIndex > oldIndex) {
                    // Si le nouveau bouton est à DROITE -> On fait venir le contenu de la droite
                    animationClass = 'slide-in-right';
                } else if (newIndex < oldIndex) {
                    // Si le nouveau bouton est à GAUCHE -> On fait venir le contenu de la gauche
                    animationClass = 'slide-in-left';
                } else {
                    // Si on reclique sur le même, on ne fait rien ou une anim par défaut
                    animationClass = 'slide-in-right'; 
                }

                // 3. Mise à jour visuelle des boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');

                // 4. Application du filtre et de l'animation
                projectCards.forEach(card => {
                    // On nettoie TOUTES les anciennes classes d'animation pour éviter les conflits
                    card.classList.remove('reveal', 'animate-card', 'slide-in-left', 'slide-in-right');
                    
                    // Petite astuce pour "redémarrer" l'animation (Reflow)
                    void card.offsetWidth; 

                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hide');
                        card.classList.add('active');
                        
                        // On ajoute la classe de direction calculée au dessus
                        card.classList.add(animationClass);
                        
                    } else {
                        card.classList.add('hide');
                        card.classList.remove('active');
                    }
                });
            });
        });
    }

   // =========================================
    // 3. MODALE PROJETS (AVEC BLOCAGE DU FOND)
    // =========================================
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const modalImagesContainer = document.getElementById("modal-images-container"); 
    const closeBtn = document.querySelector(".close-btn");
    const detailButtons = document.querySelectorAll(".btn-details");

    if (modal && detailButtons.length > 0) {
        detailButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault(); 
                
                // --- AJOUTEZ CETTE LIGNE ---
                document.body.style.overflow = 'hidden'; // Bloque le scroll du site
                // ---------------------------

                const card = btn.closest(".project-card");
                const title = card.querySelector("h3").innerText;
                const desc = card.getAttribute("data-details");
                const imageSrcs = card.getAttribute("data-image").split(',');

                modalTitle.innerText = title;
                modalDesc.innerText = desc;
                
                modalImagesContainer.innerHTML = ''; 
                imageSrcs.forEach(src => {
                    const img = document.createElement("img");
                    img.src = src.trim();
                    modalImagesContainer.appendChild(img);
                });

                modal.style.display = "block";
            });
        });

        // Fonction pour fermer et RÉACTIVER le scroll
        function closeModal() {
            modal.style.display = "none";
            // --- AJOUTEZ CETTE LIGNE ---
            document.body.style.overflow = 'auto'; // Réactive le scroll du site
            // ---------------------------
        }

        if(closeBtn) {
            closeBtn.addEventListener("click", closeModal);
        }
        window.addEventListener("click", (e) => {
            if (e.target == modal) { closeModal(); }
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
    const revealElements = document.querySelectorAll('.notes-list, h2, .folder-group, .hero-content');

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





