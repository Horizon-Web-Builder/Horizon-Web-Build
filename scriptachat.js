// script.js

// Fonction pour ajuster le padding du main en fonction de la hauteur du header
function adjustMainPadding() {
    const header = document.getElementById('header');
    const main = document.getElementById('main');
    const headerHeight = header.offsetHeight;
    main.style.paddingTop = headerHeight + 'px';
}

// Fonction pour ajuster la visibilité de certains éléments en fonction de la largeur de la fenêtre
function adjustElementsVisibility() {
    const windowWidth = window.innerWidth;
    const thresholdWidth = 820;
    const imageElement = document.getElementById('logo1');

    if (windowWidth < thresholdWidth) {
        imageElement.style.display = 'none';
    } else {
        imageElement.style.display = 'block';
    }
}

// Variables pour gérer le défilement de la page
let lastScrollTop = 0;
const header = document.getElementById('header');
const headerHeight = header.offsetHeight;
let isScrollingDown = false;
let isScrollingUp = false;

// Fonction pour gérer le défilement de la page
function handleScroll() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        if (!isScrollingDown) {
            header.classList.add('hidden');
            isScrollingDown = true;
            isScrollingUp = false;
        }
    } else {
        if (!isScrollingUp) {
            header.classList.remove('hidden');
            isScrollingUp = true;
            isScrollingDown = false;
        }
    }
    lastScrollTop = scrollTop;
}

// Fonction à exécuter lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    const titles = document.querySelectorAll('#titre1, #titre2, #titre3, #titre4');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view'); // Réinitialiser la classe si le titre n'est plus visible
            }
        });
    }, {
        threshold: 0.5 // Observer lorsque la moitié du titre est visible
    });

    titles.forEach(title => {
        observer.observe(title);
    });

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    // Toggle pour afficher/cacher le menu sur petit écran
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Fermer le menu au défilement
    window.addEventListener('scroll', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // Ajuster le padding du main
    adjustMainPadding();

    // Ajuster la visibilité des éléments
    adjustElementsVisibility();
});

// Écouteur d'événement pour le défilement de la page
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', adjustMainPadding);
window.addEventListener('resize', adjustElementsVisibility);
document.addEventListener('DOMContentLoaded', adjustMainPadding);
document.addEventListener('DOMContentLoaded', adjustElementsVisibility);
