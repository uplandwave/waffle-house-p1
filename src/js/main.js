// main.js
import ProductList from "./components/ProductList.svelte";
import { updateCartIcon, renderHeaderFooter } from "./utils.mjs";

renderHeaderFooter();

/**
 * Create an instance of the ProductList svelte component, inserts the tent products into the home page for user to click on a product
 */
new ProductList({
  target: document.querySelector(".products"),
  props: { category: "tents" },
});

// for the cart to update properly we need to check the contence of the cart
// on the home page. If we dont, the display tag in CSS will stay on none
document.addEventListener("DOMContentLoaded", () => {
  updateCartIcon();
});
