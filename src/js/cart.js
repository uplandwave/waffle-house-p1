import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // if the cart is empty return immediately
  if (!cartItems || cartItems.length === 0) {
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();






// Cart icon update

import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function updateCartIcon() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartItemCount = document.querySelector(".cart-item-count");
  const cartIcon = document.querySelector(".cart");

  cartItemCount.textContent = cartItems.length;

  // Trigger animation
  cartIcon.classList.remove("cart-animation");
  void cartIcon.offsetWidth; // Trigger reflow
  cartIcon.classList.add("cart-animation");
}

// Function to add item to cart
function addToCart(item) {
  const cart = getLocalStorage("so-cart") || [];
  cart.push(item);
  setLocalStorage("so-cart", cart);
  updateCartIcon();
}

// Example usage:
// addToCart(productItem);

// Call updateCartIcon on page load to display current cart count
document.addEventListener("DOMContentLoaded", updateCartIcon);