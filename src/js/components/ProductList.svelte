<!-- <p>My new product list componenent!</p> -->

<script>
  import ProductSummary from "./ProductSummary.svelte";
  import { getData } from "../productData.mjs";

  // this is how we make a prop in svelte
  export let category;

  // if you are looking at this thinking that's strange to just stop with a promise
  // you would be right.  This will make more sense in a bit...stay tuned.
  let promise = getData(category);

  function showFourProducts(product) {
    return product.slice(0, 4);
  }

  function formatCategory(category) {
    return category.toUpperCase().replace("-", " ");
  }
</script>

<!-- <p>Top products: {category}</p> -->

<h2>{formatCategory(category)}</h2>
{#await promise}
  Loading
{:then products}
  <ul class="product-list">
    {#each products as product}
      <li class="product-card"><ProductSummary {product} /></li>
    {/each}
  </ul>
{/await}
