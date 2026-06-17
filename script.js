document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. HOME & SHOWROOM DISPLAY SWITCHBOARD ---
    const oryxItemCard = document.getElementById("oryx-cardholder-item");
    const storefrontView = document.getElementById("storefront-view");
    const detailView = document.getElementById("detail-view");
    const backToCatalog = document.getElementById("backToCatalog");

    if (oryxItemCard && storefrontView && detailView) {
        oryxItemCard.addEventListener("click", () => {
            storefrontView.style.display = "none";
            detailView.style.display = "block";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (backToCatalog && storefrontView && detailView) {
        backToCatalog.addEventListener("click", () => {
            detailView.style.display = "none";
            storefrontView.style.display = "block";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 2. GALLERY INTERACTIVE CATEGORY FILTERS ---
    const tabs = document.querySelectorAll(".filter-tabs .tab");
    const cards = document.querySelectorAll(".grid .product-card");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const categoryFilter = tab.getAttribute("data-filter");
            cards.forEach(card => {
                if (categoryFilter === "all" || card.getAttribute("data-category") === categoryFilter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // --- 3. COMMITTING ITEM TO STORAGE BASKET ---
    const inquireBtn = document.getElementById("inquireBtn");
    if (inquireBtn) {
        inquireBtn.addEventListener("click", () => {
            const productPayload = [
                {
                    name: "Oryx Cardholder Slim Tan",
                    price: 990,
                    img: "Oryx Cardholder Slim Tan 1.jpg",
                    quantity: 1
                }
            ];
            localStorage.setItem("oryx_checkout_basket", JSON.stringify(productPayload));
            window.location.href = "checkout.html";
        });
    }

    // --- 4. CHECKOUT BASKET CONSOLE CALCULATION ---
    const container = document.getElementById("dynamic-item-target");
    if (container) {
        let checkoutBasket = JSON.parse(localStorage.getItem("oryx_checkout_basket")) || [];

        // Fallback structural safety default
        if (checkoutBasket.length === 0) {
            checkoutBasket.push({
                name: "Oryx Cardholder Slim Tan",
                price: 990,
                img: "Oryx Cardholder Slim Tan 1.jpg",
                quantity: 1
            });
        }

        const subtotalEl = document.getElementById("subtotal-display");
        const totalEl = document.getElementById("total-display");
        const totalHiddenInput = document.getElementById("hidden_order_total");
        const itemHiddenInput = document.getElementById("hidden_ordered_item");

        container.innerHTML = "";
        let computedTotal = 0;
        let itemNamesSummary = [];

        checkoutBasket.forEach(item => {
            computedTotal += item.price * item.quantity;
            itemNamesSummary.push(`${item.name} (Qty: ${item.quantity})`);

            const row = document.createElement("div");
            row.className = "summary-item-row";
            row.innerHTML = `
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <div class="summary-card-thumb"><img src="${item.img}" alt="${item.name}"></div>
                    <div>
                        <h4 style="font-size: 0.95rem; font-weight: 600; color: #e6e1da;">${item.name}</h4>
                        <p style="color: #8e877e; font-size: 0.85rem;">Qty: ${item.quantity}</p>
                    </div>
                </div>
                <div style="font-weight: 600; color: #c5a880;">NT$ ${item.price * item.quantity}</div>
            `;
            container.appendChild(row);
        });

        subtotalEl.textContent = `NT$ ${computedTotal}`;
        totalEl.textContent = `NT$ ${computedTotal}`;
        
        totalHiddenInput.value = `NT$ ${computedTotal}`;
        itemHiddenInput.value = itemNamesSummary.join(", ");
    }
});
