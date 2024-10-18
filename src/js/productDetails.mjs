import { updateCartIcon } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { addToCart } from "./cart";
let productData = {}

export default async function productDetails(productId, selector) {
  productData = await findProductById(productId)
  const template = productDetailsTemplate(productData)
  document.querySelector(".product-detail").innerHTML = template
  // add listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCartHandler);
}

function discountAndPriceTemplate(product){
  if (product.FinalPrice === product.SuggestedRetailPrice) {
    // simply give the price, if there is no discount
    return `$${product.FinalPrice}`
  } else {
    const discountAmount = Math.round((1 - (product.FinalPrice / product.SuggestedRetailPrice)) * 100)
    return `
      <span class="discount-container">
        <span class="discount-prev-price">$${product.SuggestedRetailPrice}</span>
        $${product.FinalPrice}
        <span class="discount-amount-subtracted"> ~ %${discountAmount} off </span>
      </span>
    `
  }
}

function productDetailsTemplate(product) {
  return `
        <h3 id="productName">${product.Brand.Name}</h3>

        <h2 class="divider">${product.NameWithoutBrand}</h2>

        <img class="divider" src="${product.Image}" alt="${product.Name}"/>

        <p class="product-card__price" id="productFinalPrice">${discountAndPriceTemplate(product)}</p>
        
        <p class="product__color" id="productColorName">${product.Colors[0].ColorName}</p>

        <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>

        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
  `
}

// this line is to clear local storage

// localStorage.removeItem("so-cart");



// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addToCart(product);
}

// Call updateCartIcon on page load to display current cart count
document.addEventListener("DOMContentLoaded", updateCartIcon);