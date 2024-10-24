import ProductList from "./components/ProductList.svelte";
import NewsletterSignUp from "./components/NewsletterSignUp.svelte";
import { renderHeaderFooter } from "./utils.mjs";
import { isFirstVisit, setFirstVisit } from "./alerts.js";

renderHeaderFooter();

function showBanner() {
  const banner = document.getElementById("banner");
  if (banner) {
    {
      banner.style.display = "block";
    }
  }
}

function hideBanner() {
  const banner = document.getElementById("banner");
  if (banner) {
    banner.style.display = "none";
  }
}

// for the cart to update properly we need to check the contence of the cart
// on the home page. If we dont, the display tag in CSS will stay on none
document.addEventListener("DOMContentLoaded", () => {
  // Check if the user is visiting for the first time and show the banner
  if (isFirstVisit()) {
    showBanner();
    setFirstVisit();
  }

  // Add event listener to close the banner when "X" is clicked
  const closeBannerButton = document.getElementById("close-banner");
  if (closeBannerButton) {
    closeBannerButton.addEventListener("click", hideBanner);
  }
});

/**
 * Create an instance of the ProductList svelte component, inserts the tent products into the home page for user to click on a product
 */
new ProductList({
  target: document.querySelector(".products"),
  props: { category: "tents" },
});


new NewsletterSignUp({
  target: document.getElementById("newsletter-sign-up"),
});
