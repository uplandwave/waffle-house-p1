// import { getLocalStorage, setLocalStorage, getCartCount } from "./utils.mjs";
import { renderHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";
import { cartCount } from "./stores.mjs";

import ShoppingCart from "./components/ShoppingCart.svelte";

// renderHeaderFooter();


// Function to update the cart count in the cartCount store
export function updateCartIcon() {
  const cartItems = getLocalStorage("so-cart") || [];
  const totalCount = cartItems.reduce((count, item) => count + (item.quantity || 1), 0);
  cartCount.set(totalCount); // Update the Svelte store
}

document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector(".product-list");

  if (target) {
    console.log("Product list found, initializing ShoppingCart component.");
    new ShoppingCart({
      target
    });
  } else {
    console.error("Target element '.product-list' not found.");
  }

  // Call updateCartIcon on page load to display current cart count
  updateCartIcon();
  cartTotal();
});


// function to remove or decrease quantity of an item in the cart
function removeFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart");

  // find the index of the first item with the specified id
  const index = cartItems.findIndex((item) => item.Id === itemId);

  // if the item is found, decrease quantity or remove item
  if (index !== -1) {
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity -= 1;
    } else {
      cartItems.splice(index, 1);
    }
  }

  // update local storage
  setLocalStorage("so-cart", cartItems);

  // re-render the cart items
  renderCartContents();

  // update the cart count
  updateCartIcon();
}

// function to increase quantity of an item in the cart
function increaseQuantity(itemId) {
  let cartItems = getLocalStorage("so-cart");

  // find the index of the first item with the specified id
  const index = cartItems.findIndex((item) => item.Id === itemId);

  // if the item is found, increase quantity
  if (index !== -1) {
    cartItems[index].quantity += 1;
  }

  // update local storage
  setLocalStorage("so-cart", cartItems);

  // re-render the cart items
  renderCartContents();

  // update the cart count
  updateCartIcon();
}

// function to render the contents of the cart
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // if the cart is empty there is nothing to render so exit the function
  if (!cartItems || cartItems.length === 0) {
    // display a message letting the user no there are no items in the cart
    document.querySelector(".cart-empty-message").style.display = "block";
    document.querySelector(".product-list").innerHTML = "";
    // hide the "Total" element when the cart is empty
    document.querySelector(".cart-footer").classList.add("hide");
    // set the html for the cart-footer to empty
    document.querySelector(".cart-footer").innerHTML = "";
    return;
  }

  // iterate through the cart items adding them to the html template for displaying each item
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  // display the cart items for user to see
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // attach event listener to the delete item button, for when a user removes an item from the cart
  document.querySelectorAll("#delete-cart-item").forEach((button) => {
    button.addEventListener("click", function () {
      // get the id of the item the user clicked to delete from the cart
      const itemId = this.getAttribute("data-id");
      removeFromCart(itemId);
    });
  });
  // attach event listener to the increase quantity button
  document.querySelectorAll("#increase-quantity").forEach((button) => {
    button.addEventListener("click", function () {
      // get the id of the item the user clicked to increase quantity
      const itemId = this.getAttribute("data-id");
      increaseQuantity(itemId);
    });
  });
  // get the total amount for the items in the cart, display the total amount
  cartTotal();

  // update the cart count
  updateCartIcon();
}

// function to create inner html for a product
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
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button id="delete-cart-item" data-id="${item.Id}">Decrease Quantity</button>
  <button id="increase-quantity" data-id="${item.Id}">Increase Quantity</button>
</li>`;
  return newItem;
}

// /**
//  * Iterate through cart items, add each item's FinalPrice to create cart total
//  * */
// Function to calculate and display the total amount for items in the cart
// Calculate and display the cart total
function cartTotal() {
  const cartItems = getLocalStorage("so-cart");
  let total = cartItems.reduce((sum, item) => sum + item.FinalPrice * item.quantity, 0);

  // Add the total and checkout button HTML
  document.querySelector(".cart-footer").innerHTML = `
    <p class="cart-total">Total: $${total.toFixed(2)}</p>
    <button class="checkout-button" onclick="location.href='/checkout/index.html'">Proceed to Checkout</button>
  `;
  document.querySelector(".cart-footer").classList.remove("hide");

}

