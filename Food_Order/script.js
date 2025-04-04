let menuData = [];

function fetchMenu() {
    fetch("menu.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        menuData = data.items || data;
        displayMenu();
      })
      .catch((error) => console.error("Error fetching menu:", error));
  }
  

  function displayMenu() {
    const foodCards = document.getElementById("foodCards");
    let cardsHtml = "";
    menuData.forEach((food) => {
      cardsHtml += `
        <div class="card">
          <img src="${food.image}" alt="${food.name}" />
          <h3>${food.name}</h3>
          <p>$${food.price.toFixed(2)}</p>
          <button onclick="addToOrder(${food.id})">Add to Cart</button>
        </div>`;
    });
    foodCards.innerHTML = cardsHtml;
  }
  

function addToOrder(id) {
  const selectedItem = menuData.find((item) => item.id === id);
  if (selectedItem) {
    Order.addItem(selectedItem);
  }
  updateCart();
}

const Order = {
  items: [],
  addItem: function (item) {
    const existingItem = this.items.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem = { ...item, quantity: 1 };
      this.items.push(newItem);
    }
    updateCart();
  },

  increaseQuantity: function (id) {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.quantity++;
      updateCart();
    }
  },
  decreaseQuantity: function (id) {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.items = this.items.filter((i) => i.id !== id);
      }
      updateCart();
    }
  },
  calculateTotal: function () {
    let total = 0;
    this.items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  },
};

function updateCart() {
  const orderDisplay = document.getElementById("orderDisplay");
  if (Order.items.length === 0) {
    orderDisplay.innerHTML = " Your cart is Empty";
  } else {
    let orderHtml = "";
    Order.items.forEach((item) => {
      orderHtml += `
      <li>
      <div class="order-item-info">
      ${item.name} <br>
        $${(item.price * item.quantity).toFixed(2)} (x ${item.quantity})
      </div>
      <div class="order-item-buttons">
          <button onclick="Order.decreaseQuantity(${item.id})">-</button>
<span>${item.quantity}</span>
<button onclick="Order.increaseQuantity(${item.id})">+</button>

      </div>
      </li>
      `;
    });
    orderDisplay.innerHTML = orderHtml;
  }
  document.getElementById("totalPrice").textContent = Order.calculateTotal();
}
document.addEventListener("DOMContentLoaded", fetchMenu);
// function increaseQuantity(id){
//     Order.increasingItem(id);
//     updateCart();
// }
