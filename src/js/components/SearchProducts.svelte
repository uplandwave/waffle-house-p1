<script>
  import { onMount } from "svelte";
  let searchInput = "";
  import { getProductsByCategory } from "../externalServices.mjs";

  let products = [];
  let isLoading = true;
  onMount(async () => {
    products = await getAllProducts();
    isLoading = false;
  });

  export async function getAllProducts() {
    // Array of categories to fetch
    const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
    // Use Promise.all to fetch all categories concurrently
    const allProducts = await Promise.all(
      categories.map((category) => getProductsByCategory(category)),
    );
    // Flatten the array of arrays into a single array
    return allProducts.flat();
  }

  // Reactive statement to filter products based on search input
  $: filteredProducts = products.filter(
    (product) =>
      product.Name &&
      product.Name.toLowerCase().includes(searchInput.toLowerCase()),
  );

</script>
<div class="search-container">
  <input
    id="search"
    type="text"
    bind:value={searchInput}
    placeholder="Search by product name"
  />

  {#if !isLoading && searchInput}
    <div class="overlay-results">
      {#each filteredProducts as product}
        <div class="result-item">
          <a
            href="../product_pages/index.html?product={product.Id}"
            class="result-item"
          >
            <strong>{product.Name}</strong> - {product.Category}
          </a>
        </div>
      {/each}
      {#if filteredProducts.length === 0}
        <div class="no-results">No products found</div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .search-container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 200px;
    margin: 0;
  }

  #search {
    height: 28px;
    padding: 5px;
    margin-top: 15px;
    width: 100%;
    border: 1px solid #ccc; 
    outline: none;
  }

  #search:focus {
  border-color: gray; 
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2); 
}

  .overlay-results {
    position: absolute;
    top: 80%;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background-color: white;
    border-radius: 4px;
    z-index: 1000;
  }

  .result-item {
    display: block; 
    padding: 10px;
    font-size: 13px;
    color: black;
    text-decoration: none; 
  }

  .result-item:hover {
    background-color: #f0f0f0;
  }

  .no-results {
    padding: 10px;
    color: #999;
    text-align: center;
  }
</style>
