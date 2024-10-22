import ProductList from "./components/ProductList.svelte";
import NewsletterSignUp from "./components/NewsletterSignUp.svelte";
import { renderHeaderFooter } from "./utils.mjs";

renderHeaderFooter();

// Create an instance of the ProductList svelte component, inserts the tent products into the home page for user to click on a product 
new ProductList({
  target: document.querySelector(".products"),
  props: { category: "tents" },
});

new NewsletterSignUp({
  target: document.getElementById("newsletter-sign-up"),
});