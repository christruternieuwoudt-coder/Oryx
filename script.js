document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. PRODUCT DETAIL PAGE LOGIC ---
    // Look for the checkout injection button on the item view screen
    const inquireBtn = document.getElementById("inquireBtn");
    
    if (inquireBtn) {
        inquireBtn.addEventListener("click", () => {
            // Package the Oryx Slim Cardholder design configuration payload
            const productPayload = [
                {
                    name: "Oryx Slim Cardholder",
                    price: 65.00,
                    img: "Oryx Cardholder Slim Tan 1.jpg",
                    quantity: 1
                }
            ];
            // Save payload details to browser storage and route straight to checkout
            localStorage.setItem("oryx_checkout_basket", JSON.stringify(productPayload));
            window.location.href = "checkout.html";
        });
    }

    // --- 2. CHECKOUT DASHBOARD RENDERING LOGIC ---
    const container = document.getElementById("dynamic-item-target");
    if (container) {
        // Retrieve selections out of browser storage memory
        let checkoutBasket = JSON.parse(localStorage.getItem("oryx_checkout_basket")) || [];

        // Setup automated fallback entry if visitor bypassed direct basket routing path
        if (checkoutBasket.length === 0) {
            checkoutBasket.push({
                name: "Oryx Slim Cardholder",
                price: 65.00,
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
                <div style="font-weight: 600; color: #c5a880;">$ ${(item.price * item.quantity).toFixed(2)}</div>
            `;
            container.appendChild(row);
        });

        // Set the UI indicators with uniform premium currency tags
        subtotalEl.textContent = `$ ${computedTotal.toFixed(2)}`;
        totalEl.textContent = `$ ${computedTotal.toFixed(2)}`;
        
        // Pass complete structural parameters down into Web3Forms hidden tags
        totalHiddenInput.value = `$ ${computedTotal.toFixed(2)}`;
        itemHiddenInput.value = itemNamesSummary.join(", ");
    }
});
