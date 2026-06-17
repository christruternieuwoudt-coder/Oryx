document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE MENU FUNCTIONALITY ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    // --- PORTFOLIO / GALLERY FILTER ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });


    // --- PRODUCT MODAL LIGHTBOX ENGINE ---
    const productModal = document.getElementById('productModal');
    const modalClose = document.querySelector('.modal-close');
    const clickableCard = document.querySelector('.product-card-clickable');
    
    const modalMainDisplay = document.getElementById('modalMainDisplay');
    const thumbnails = document.querySelectorAll('.thumb-item');
    const modalInquireBtn = document.getElementById('modalInquireBtn');

    // Open Modal when clicking the product card listing
    if (clickableCard && productModal) {
        clickableCard.addEventListener('click', () => {
            productModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Lock background window scroll
        });
    }

    // Close Modal actions
    const closeShowcase = () => {
        if (productModal) {
            productModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable background scrolling
        }
    };

    if (modalClose) {
        modalClose.addEventListener('click', closeShowcase);
    }

    if (productModal) {
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) {
                closeShowcase();
            }
        });
    }

    if (modalInquireBtn) {
        modalInquireBtn.addEventListener('click', () => {
            closeShowcase();
        });
    }

    // Dynamic Thumbnail Image Swapper Engine
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid execution bubbling conflicts
            
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            
            if (modalMainDisplay) {
                modalMainDisplay.style.opacity = '0';
                setTimeout(() => {
                    modalMainDisplay.src = thumb.src;
                    modalMainDisplay.style.opacity = '1';
                }, 120);
            }
        });
    });


    // --- ACTIVE LINK ON SCROLL ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    // --- BASIC CONTACT FORM SUBMISSION ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            alert(`Thank you, ${name}! Your custom inquiry has been recorded. We will contact you back at ${email}.`);
            contactForm.reset();
        });
    }
});
