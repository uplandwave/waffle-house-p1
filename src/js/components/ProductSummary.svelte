<script>
    import { createEventDispatcher } from 'svelte';
    import QuickViewModal from './QuickViewModal.svelte';

export let product = {};
let showModal = false;
// Create the dispatcher for emitting custom events
const dispatch = createEventDispatcher();


  function getDiscountAmount(suggestedRetailPrice, finalPrice) {
    return Math.round((1 - finalPrice / suggestedRetailPrice) * 100);
  }

  // function truncateName(name, maxLength) {
  //   if (name.length > maxLength) {
  //     return name.slice(0, maxLength) + '...';
  //   }
  //   return name;
  // }
  function openQuickView() {
    showModal = true;
    dispatch("quickView", { detail: product });
  }

  function closeQuickView() {
    showModal = false;
  }
</script>

<div class="product-card">
  <a href="../product_pages/index.html?product={product.Id}">
    <div class="productImage">
      <img src={product.Images.PrimaryMedium} alt={product.Brand.Name} />
    </div>
    <div class="productShortText">
      <h3 class="card_brand">{product.Brand.Name}</h3>
      <h2 class="card_name">{product.NameWithoutBrand}</h2>
      <div class="priceDiv">
        <p class="product-card_price">
          {#if product.FinalPrice !== product.SuggestedRetailPrice}
            <span class="discount-container">
              <span class="discount-prev-price">${product.SuggestedRetailPrice}</span>
              ${product.FinalPrice}
            </span>
          {:else}
            ${product.FinalPrice}
          {/if}
        </p>
      </div>
    </div>
  </a>
  <button id="quick-view" on:click={openQuickView}>Quick View</button>

  <!-- Render QuickViewModal within each ProductSummary component -->
  {#if showModal}
    <QuickViewModal selectedProduct={product} on:close={closeQuickView} />
  {/if}
</div>



<style>
  .productImage {
    display: flex;
    text-align: center;
    justify-content: center;
    padding-bottom: 10px;
    padding-top: 25px;
  }

  #quick-view {
    opacity: 0.7;
    color: white;
    background-color: black;
  }
  .priceDiv{
    display: flex;
    justify-content: center;
  }
    .card_name {
      display: -webkit-box; 
      -webkit-box-orient: vertical; 
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 3em;
      line-height: 1.5em;
    }
</style>
