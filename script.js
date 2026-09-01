/**
 * CLÍNICA MÉDICA NOVASALUD - LÓGICA INTERACTIVA EN JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
    initClinicStatus();
    initMobileMenu();
    initServiceSearch();
    initCopyButtons();
    initScrollToTop();
    initNavbarActiveState();
});

/* -------------------------------------------------------------
   1. HORARIO EN VIVO (Detecta si la clínica está abierta)
   ------------------------------------------------------------- */
function initClinicStatus() {
    const statusElement = document.getElementById('live-status');
    if (!statusElement) return;

    const now = new Date();
    const currentDay = now.getDay(); // 0 = Domingo, 6 = Sábado
    const currentHour = now.getHours();

    // Lun (1) a Sáb (6) de 08:00 a 20:00 hs
    const isOpen = currentDay >= 1 && currentDay <= 6 && currentHour >= 8 && currentHour < 20;

    if (isOpen) {
        statusElement.innerHTML = `<span class="status-dot online"></span> Clínica Abierta (Turnos)`;
    } else {
        statusElement.innerHTML = `<span class="status-dot offline"></span> Guardia de Urgencias 24h`;
    }
}

/* -------------------------------------------------------------
   2. MENÚ RESPONSIVO MÓVIL
   ------------------------------------------------------------- */
function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('show')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Cerrar menú al hacer clic en cualquier enlace
    document.querySelectorAll('.nav-link, .btn-nav').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            const icon = menuBtn.querySelector('i');
            if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
        });
    });
}

/* -------------------------------------------------------------
   3. BUSCADOR Y FILTRADO DE SERVICIOS EN TIEMPO REAL
   ------------------------------------------------------------- */
function initServiceSearch() {
    const searchInput = document.getElementById('service-search');
    const serviceCards = document.querySelectorAll('.service-card');
    const noResults = document.getElementById('no-results');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        let visibleCount = 0;

        serviceCards.forEach(card => {
            const dataTitle = card.getAttribute('data-title') || '';
            const cardText = card.innerText.toLowerCase();

            if (dataTitle.includes(query) || cardText.includes(query)) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Mostrar aviso si no hay coincidencias
        if (visibleCount === 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
        }
    });
}

/* -------------------------------------------------------------
   4. COPIAR DATOS DE CONTACTO CON NOTIFICACIÓN TOAST
   ------------------------------------------------------------- */
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.btn-copy');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Copiado: "${textToCopy}"`);
            }).catch(() => {
                showToast(`No se pudo copiar el texto`);
            });
        });
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

/* -------------------------------------------------------------
   5. BOTÓN FLOTANTE "VOLVER ARRIBA"
   ------------------------------------------------------------- */
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* -------------------------------------------------------------
   6. RESALTAR ENLACE ACTIVO DEL NAVBAR SEGÚN EL SCROLL
   ------------------------------------------------------------- */
function initNavbarActiveState() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}