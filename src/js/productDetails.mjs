/* eslint-disable no-unused-vars */
import { setLocalStorage, getLocalStorage, getCartCount, renderBreadcrumbs, capitalize } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { cartCount } from "./stores.mjs";

let productData = {}

export default async function productDetails(productId, selector) {
  productData = await findProductById(productId)
  const template = productDetailsTemplate(productData)
  document.querySelector(".product-detail").innerHTML = template
  // add listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCartHandler);
  // add the breadcrumbs
  renderBreadcrumbs([{
    text: capitalize(productData.Category.replace("-", " ")),
    href: `http://localhost:5173/product-list/index.html?category=${productData.Category}`
  }])
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

        <img class="divider" src="${product.Images.PrimaryExtraLarge}" alt="${product.Name}"/>

        <p class="product-card__price" id="productFinalPrice">${discountAndPriceTemplate(product)}</p>
        
        <p class="product__color" id="productColorName">${product.Colors[0].ColorName}</p>

        <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>

        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
  `
}

// add a product and its details to the cart
function addProductToCart(product) {
    let cart = getLocalStorage("so-cart");
    if (!cart) {
      cart = [];
    }
    cart.push(product);
    setLocalStorage("so-cart", cart);
    cartCount.set(cart.length);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  const cartIcon = document.querySelector(".cart-counter");
  cartIcon.classList.add("animate");
}