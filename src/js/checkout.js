import { renderHeaderFooter } from "./utils.mjs";
import CheckoutForm from "./components/CheckoutForm.svelte"


renderHeaderFooter();

new CheckoutForm({
    target: document.querySelector("#checkout-form"),
  });
  
