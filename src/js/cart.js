import { renderHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";
import { cartCount } from "./stores.mjs";
import ShoppingCart from "./components/ShoppingCart.svelte";

// Function to update the cart count in the cartCount store
export function updateCartIcon() {
  const cartItems = getLocalStorage("so-cart") || [];
  const totalCount = cartItems.reduce((count, item) => count + (item.quantity || 1), 0);
  cartCount.set(totalCount); // Update the Svelte store
}

document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector(".product-list");

  if (target) {
    new ShoppingCart({
      target
    });
  } else {
    console.error("Target element '.product-list' not found.");
  }

  // Call updateCartIcon on page load to display current cart count
  updateCartIcon();
});