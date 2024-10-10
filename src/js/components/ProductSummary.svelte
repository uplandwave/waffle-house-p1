<script>
    export let product = {};
</script>

  <a href="product_pages/index.html?product={product.Id}">
    <img src={product.Image} alt={ product.Brand.Name } />
    <h3 class="card_brand">{product.Brand.Name}</h3>
    <h2 class="card_name">{product.NameWithoutBrand}</h2>
    <p class="product-card_price">{product.FinalPrice}</p>
  </a>