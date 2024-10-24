<script>
  export let product = {};
  function getDiscountAmount(suggestedRetailPrice, finalPrice) {
    return Math.round((1 - finalPrice / suggestedRetailPrice) * 100);
  }
</script>

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
    </div>
  </div>
</a>

<style>
  .productImage {
    display: flex;
    text-align: center;
    justify-content: center;
    padding-bottom: 10px;
    padding-top: 25px;
  }
  .productShortText {

  }
  .priceDiv{
    display: flex;
    justify-content: center;
    /* text-align: center; */
  }

</style>
