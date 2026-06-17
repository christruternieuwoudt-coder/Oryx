document.addEventListener("DOMContentLoaded", () => {
    // 1. Storage and state configuration logic
    let checkoutBasket = JSON.parse(localStorage.getItem("oryx_checkout_basket")) || [];

    // Fallback item configuration matching the live product page specs
    if (checkoutBasket.length === 0) {
        checkoutBasket.push({
            name: "Oryx Slim Cardholder",
            price: 65.00,
            img: "Oryx Cardholder Slim Tan 1.jpg",
            quantity: 1
        });
    }

    // 2. Component references
    const container = document.getElementById("dynamic-item-target");
    const subtotalEl = document.getElementById("subtotal-display");
    const totalEl = document.getElementById("total-display");
    const totalHiddenInput = document.getElementById("hidden_order_total");
    const itemHiddenInput = document.getElementById("hidden_ordered_item");

    // 3. Document rendering calculations
    if (container) {
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

        // Update UI panels with uniform USD formatting
        subtotalEl.textContent = `$ ${computedTotal.toFixed(2)}`;
        totalEl.textContent = `$ ${computedTotal.toFixed(2)}`;
        
        // Populate hidden system inputs for clean Web3Forms formatting
        totalHiddenInput.value = `$ ${computedTotal.toFixed(2)}`;
        itemHiddenInput.value = itemNamesSummary.join(", ");
    }

    // 4. Global helper hook for product detail page click event binding
    const addToBasketBtn = document.querySelector(".inquire-btn, .custom-build-btn");
    if (addToBasketBtn) {
        addToBasketBtn.addEventListener("click", () => {
            const productPayload = [
                {
                    name: "Oryx Slim Cardholder",
                    price: 65.00,
                    img: "Oryx Cardholder Slim Tan 1.jpg",
                    quantity: 1
                }
            ];
            localStorage.setItem("oryx_checkout_basket", JSON.stringify(productPayload));
        });
    }
});
