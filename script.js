document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE MENU FUNCTIONALITY ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

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


    // --- PREMIUM DYNAMIC INTERACTIVE GALLERY MODAL SYSTEM ---
    const productModal = document.getElementById('productModal');
    const modalClose = document.querySelector('.modal-close');
    const cardTrigger = document.querySelector('.product-card-trigger');
    
    const modalMainDisplay = document.getElementById('modalMainDisplay');
    const thumbnails = document.querySelectorAll('.thumb-item');
    const modalInquireBtn = document.getElementById('modalInquireBtn');

    // Open Showcase Modal View
    if (cardTrigger) {
        cardTrigger.addEventListener('click', () => {
            productModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Stop viewport background scroll bleed
        });
    }

    // Close Modal View Actions
    const closeShowcase = () => {
        productModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    if (modalClose) {
        modalClose.addEventListener('click', closeShowcase);
    }

    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeShowcase();
        }
    });

    // Close modal if user clicks the anchor inquiry button inside it
    if (modalInquireBtn) {
        modalInquireBtn.addEventListener('click', () => {
            closeShowcase();
        });
    }

    // Interactive Thumbnail Selection Engine
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Drop current active class layouts
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Highlight targeted asset card
            thumb.classList.add('active');
            
            // Execute sleek image transition swap
            modalMainDisplay.style.opacity = '0';
            setTimeout(() => {
                modalMainDisplay.src = thumb.src;
                modalMainDisplay.style.opacity = '1';
            }, 150);
        });
    });


    // --- ACTIVE NAVIGATION TRACKER ON SCROLL ---
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
            alert(`Thank you, ${name}! Your request has been simulated successfully. We will get back to you at ${email}.`);
            contactForm.reset();
        });
    }
});
