let membershipType = "Regular";

function setMembership(type) {
    membershipType = type;
    alert(`Membership Set: ${type}`);
}

function calculateTotal() {
    let coffeeType = document.getElementById("coffeeType").value;
    let coffeeSize = document.getElementById("coffeeSize").value;
    let quantity = parseInt(document.getElementById("quantity").value);

    let basePrices = { 
        latte: 3, 
        cappuccino: 3.5, 
        espresso: 2.5, 
        mocha: 4, 
        americano: 2.75, 
        macchiato: 3.25, 
        flatWhite: 3.75 
    };
    let sizePrices = { small: 0, medium: 1, large: 2 };

    let basePrice = basePrices[coffeeType] + sizePrices[coffeeSize];
    let addOnCost = 0;

    if (document.getElementById("whippedCream").checked) addOnCost += 0.5;
    if (document.getElementById("extraShot").checked) addOnCost += 1;
    if (document.getElementById("syrup").checked) addOnCost += 0.75;

    let subtotal = (basePrice + addOnCost) * quantity;
    let discount = 0;

    // Membership Discount
    if (membershipType === "Gold") discount = subtotal * 0.15;
    if (membershipType === "Silver") discount = subtotal * 0.10;

    // Promo Code Discount
    if (document.getElementById("promoCode").value === "BREWHUB10") {
        discount += subtotal * 0.10;
    }

    let tax = (subtotal - discount) * 0.08;
    let total = (subtotal - discount + tax).toFixed(2);

    document.getElementById("summaryDetails").innerHTML = `
        Coffee: ${coffeeType.toUpperCase()} (${coffeeSize})<br>
        Quantity: ${quantity}<br>
        Add-ons: $${addOnCost.toFixed(2)}<br>
        Subtotal: $${subtotal.toFixed(2)}<br>
        Discount: $${discount.toFixed(2)}<br>
        Tax: $${tax.toFixed(2)}<br>
        <strong>Total: $${total}</strong>
    `;

    document.getElementById("orderSummary").classList.remove("hidden");
}

function printInvoice() {
    window.print();
}
