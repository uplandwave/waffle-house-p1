import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

let productData = {}

export default async function productDetails(productId, selector) {
  productData = await findProductById(productId)
  const template = productDetailsTemplate(productData)
  document.querySelector(".product-detail").innerHTML = template
  // add listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCartHandler);
}

function productDetailsTemplate(product) {
  return `
        <h3 id="productName">${product.Brand.Name}</h3>

        <h2 class="divider">${product.NameWithoutBrand}</h2>

        <img class="divider" src="${product.Image}" alt="${product.Name}"/>

        <p class="product-card__price" id="productFinalPrice">${product.FinalPrice}</p>
        
        <p class="product__color" id="productColorName">${product.Colors[0].ColorName}</p>

        <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>

        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
  `
}

// add a product and its details to the cart
function addProductToCart(product) {
    let cart = getLocalStorage("so-cart") || [];
    cart.push(product);
    setLocalStorage("so-cart", cart);
    updateCartIcon();
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// New function to update cart icon
function updateCartIcon() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartItemCount = document.querySelector(".cart-item-count");
  const cartIcon = document.querySelector(".cart");

  cartItemCount.textContent = cartItems.length;

  // Trigger animation
  cartIcon.classList.remove("cart-animation");
  void cartIcon.offsetWidth; // Trigger reflow
  cartIcon.classList.add("cart-animation");
}

// Call updateCartIcon on page load to display current cart count
document.addEventListener("DOMContentLoaded", updateCartIcon);