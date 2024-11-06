import { renderHeaderFooter, getParam } from "./utils.mjs";
import ProductList from "./components/ProductList.svelte";

// renderHeaderFooter();
new ProductList({
  target: document.querySelector(".products"),
  props: { category: getParam("category") },
});
