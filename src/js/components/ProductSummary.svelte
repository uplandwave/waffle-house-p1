<script>
  export let product = {};
  function getDiscountAmount(suggestedRetailPrice, finalPrice) {
    return Math.round((1 - finalPrice / suggestedRetailPrice) * 100);
  }
</script>

<a href="product_pages/index.html?product={product.Id}">
  <img src={product.Image} alt={product.Brand.Name} />
  <h3 class="card_brand">{product.Brand.Name}</h3>
  <h2 class="card_name">{product.NameWithoutBrand}</h2>
  <p class="product-card_price">
    {#if product.FinalPrice !== product.SuggestedRetailPrice}
      <span class="discount-container">
        <span class="discount-prev-price">${product.SuggestedRetailPrice}</span>
        ${product.FinalPrice}
        <span class="discount-amount-subtracted">
          ~ %{getDiscountAmount(
            product.SuggestedRetailPrice,
            product.FinalPrice,
          )} off
        </span>
      </span>
    {:else}
      ${product.FinalPrice}
    {/if}
  </p>
</a>
