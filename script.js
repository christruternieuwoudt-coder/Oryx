document.addEventListener('DOMContentLoaded', () => {

    // --- BASKET STATE CONTROLLER ENGINE ---
    let basket = JSON.parse(localStorage.getItem('oryx_basket')) || [];

    const basketToggleBtn = document.getElementById('basketToggleBtn');
    const basketDrawerClose = document.getElementById('basketDrawerClose');
    const basketDrawerOverlay = document.getElementById('basketDrawerOverlay');
    const basketDrawerSide = document.getElementById('basketDrawerSide');
    
    const basketCounterBadge = document.getElementById('basketCounterBadge');
    const basketItemsContainer = document.getElementById('basketItemsContainer');
    const basketComputedSubtotal = document.getElementById('basketComputedSubtotal');
    const addToBasketBtn = document.getElementById('addToBasketBtn');

    // UI Drawer Interactions
    const openBasketDrawer = () => {
        if(basketDrawerSide && basketDrawerOverlay) {
            basketDrawerOverlay.style.display = 'block';
            setTimeout(() => basketDrawerSide.classList.add('open'), 10);
        }
    };

    const closeBasketDrawer = () => {
        if(basketDrawerSide && basketDrawerOverlay) {
            basketDrawerSide.classList.remove('open');
            setTimeout(() => basketDrawerOverlay.style.display = 'none', 300);
        }
    };

    if (basketToggleBtn) basketToggleBtn.addEventListener('click', openBasketDrawer);
    if (basketDrawerClose) basketDrawerClose.addEventListener('click', closeBasketDrawer);
    if (basketDrawerOverlay) basketDrawerOverlay.addEventListener('click', closeBasketDrawer);

    // Refresh Basket Counter and Sidebar Content
    const refreshBasketDOM = () => {
        // Calculate dynamic total quantity count
        const totalItemsCount = basket.reduce((sum, item) => sum + item.quantity, 0);
        if (basketCounterBadge) basketCounterBadge.textContent = totalItemsCount;

        if (!basketItemsContainer || !basketComputedSubtotal) return;

        if (basket.length === 0) {
            basketItemsContainer.innerHTML = `<p style="text-align:center; padding:3rem 0; color:var(--text-muted); font-size:0.95rem;">Your reservation basket is empty.</p>`;
            basketComputedSubtotal.textContent = "NT$ 0";
            return;
        }

        basketItemsContainer.innerHTML = "";
        let runningTotalCost = 0;

        basket.forEach((item, index) => {
            runningTotalCost += (item.price * item.quantity);
            
            const cardRow = document.createElement('div');
            cardRow.className = 'basket-item-card';
            cardRow.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="basket-item-thumb">
                <div class="basket-item-details">
                    <h4>${item.name}</h4>
                    <p>NT$ ${item.price.toLocaleString()} x ${item.quantity}</p>
                </div>
                <button class="basket-item-remove-btn" data-index="${index}">&times; Remove</button>
            `;
            basketItemsContainer.appendChild(cardRow);
        });

        basketComputedSubtotal.textContent = `NT$ ${runningTotalCost.toLocaleString()}`;

        // Bind contextual event handlers to individual tracking delete buttons
        document.querySelectorAll('.basket-item-remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetIdx = parseInt(e.target.getAttribute('data-index'));
                basket.splice(targetIdx, 1);
                localStorage.setItem('oryx_basket', JSON.stringify(basket));
                refreshBasketDOM();
            });
        });
    };

    // Add Item to Basket
    if (addToBasketBtn) {
        addToBasketBtn.addEventListener('click', () => {
            const productPayload = {
                name: "Oryx Cardholder Slim Tan",
                price: 990,
                img: "Oryx Cardholder Slim Tan 1.jpg",
                quantity: 1
            };

            // Avoid double item stacking entries; increment counter tracking metric instead
            const match = basket.find(item => item.name === productPayload.name);
            if(match) {
                match.quantity += 1;
            } else {
                basket.push(productPayload);
            }

            localStorage.setItem('oryx_basket', JSON.stringify(basket));
            refreshBasketDOM();
            
            // Close details layout and instantly prompt basket tracking visualization drawer
            closeShowcase();
            openBasketDrawer();
        });
    }

    // Initialize display on load
    refreshBasketDOM();


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
            if(hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
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

    // Open Modal when clicking the product card listing
    if (clickableCard && productModal) {
        clickableCard.addEventListener('click', () => {
            productModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
        });
    }

    // Close Modal actions
    const closeShowcase = () => {
        if (productModal) {
            productModal.style.display = 'none';
            document.body.style.overflow = 'auto'; 
        }
    };

    if (modalClose) modalClose.addEventListener('click', closeShowcase);
    
    if (productModal) {
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) {
                closeShowcase();
            }
        });
    }

    // Dynamic Thumbnail Image Swapper Engine
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            e.stopPropagation(); 
            
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
            if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
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
