document.addEventListener("DOMContentLoaded", () => {
  initProducts();
  updateCart();
});

const products = [
  { id: 1, name: "Product 1", price: 29.99, image: "images/chair1.jpeg" },
  { id: 2, name: "Product 2", price: 39.99, image: "images/chair2.jpeg" },
  { id: 3, name: "Product 3", price: 49.99, image: "images/chair3.jpeg" },
  { id: 4, name: "Product 4", price: 59.99, image: "images/chair4.jpeg" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function initProducts() {
  const grid = document.querySelector(".products-grid");
  products.forEach((product) => {
    grid.innerHTML += `
          <div class="product-card">
              <img src="${product.image}" class="product-image" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>$${product.price}</p>
              <button onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
      `;
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  saveCart();
}

function updateCart() {
  const cartItems = document.querySelector(".cart-items");
  const totalPrice = document.querySelector(".total-price");
  const cartCountElements = document.querySelectorAll(
    ".cart-count, #cart-count"
  ); // Fix selector

  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    count += item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div>
              <h4>${item.name}</h4>
              <p>$${item.price} x ${item.quantity}</p>
              <div class="quantity-controls">
                  <button onclick="updateQuantity(${item.id}, -1)">-</button>
                  <button onclick="updateQuantity(${item.id}, 1)">+</button>
                  <button onclick="removeItem(${item.id})">Remove</button>
              </div>
          </div>
      `;
    cartItems.appendChild(cartItem);
  });

  totalPrice.textContent = total.toFixed(2);
  cartCountElements.forEach((el) => (el.textContent = count)); // Now updates both `.cart-count` and `#cart-count`
}

function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity < 1) {
      cart = cart.filter((item) => item.id !== productId);
    }
    updateCart();
    saveCart();
  }
}

function removeItem(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function toggleCart() {
  const cartSidebar = document.querySelector(".cart-slidebar");
  if (cartSidebar) {
    cartSidebar.classList.toggle("active");
  }
}

function checkout() {
  alert("Thank you for your purchase!");
  cart = [];
  updateCart();
  saveCart();
  toggleCart();
}
