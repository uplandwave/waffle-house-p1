/* eslint-disable no-unused-vars */
import {
  setLocalStorage,
  getLocalStorage,
  getCartCount,
  renderBreadcrumbs,
  capitalize,
} from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { cartCount } from "./stores.mjs";

let productData = {};

export default async function productDetails(productId, selector) {
  productData = await findProductById(productId);
  const template = productDetailsTemplate(productData);
  document.querySelector(".product-detail").innerHTML = template;

  // add listener to Add to Cart button
  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);

  //  Quantity Feature: Add event listener for quantity input validation
  document
    .getElementById("quantity")
    .addEventListener("change", validateQuantity);

  // add the breadcrumbs
  renderBreadcrumbs([
    {
      text: capitalize(productData.Category.replace("-", " ")),
      href: `http://localhost:5173/product-list/index.html?category=${productData.Category}`,
    },
  ]);
}

//  Quantity Feature: Function to validate quantity input
function validateQuantity(e) {
  let value = parseInt(e.target.value);
  if (isNaN(value) || value < 1) {
    value = 1;
  }
  e.target.value = value;
}

function discountAndPriceTemplate(product) {
  if (product.FinalPrice === product.SuggestedRetailPrice) {
    return `$${product.FinalPrice}`;
  } else {
    const discountAmount = Math.round(
      (1 - product.FinalPrice / product.SuggestedRetailPrice) * 100
    );
    return `
      <span class="discount-container">
        <span class="discount-prev-price">$${product.SuggestedRetailPrice}</span>
        $${product.FinalPrice}
        <span class="discount-amount-subtracted"> ~ %${discountAmount} off </span>
      </span>
    `;
  }
}

function productDetailsTemplate(product) {
  return `
        <h3 id="productName">${product.Brand.Name}</h3>

        <h2 class="divider">${product.NameWithoutBrand}</h2>

        <img class="divider" src="${product.Images.PrimaryExtraLarge}" alt="${
    product.Name
  }"/>

        <p class="product-card__price" id="productFinalPrice">${discountAndPriceTemplate(
          product
        )}</p>
        
        <p class="product__color" id="productColorName">${
          product.Colors[0].ColorName
        }</p>

        <p class="product__description" id="productDescriptionHtmlSimple">${
          product.DescriptionHtmlSimple
        }</p>

        <!--  Quantity Feature: Simplified quantity input -->
        <div class="product-detail__quantity">
            <input type="number" id="quantity" value="1" min="1" class="quantity-input">
        </div>

        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
  `;
}

//  Quantity Feature: Fixed addProductToCart function to properly handle initial quantities
function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");
  if (!cart) {
    cart = [];
  }

  const quantityInput = document.getElementById("quantity");
  const quantity = parseInt(quantityInput.value) || 1;

  const productToAdd = JSON.parse(JSON.stringify(product));

  const existingProductIndex = cart.findIndex((item) => item.Id === product.Id);

  if (existingProductIndex >= 0) {
    cart[existingProductIndex].quantity =
      (cart[existingProductIndex].quantity || 1) + quantity;
  } else {
    productToAdd.quantity = quantity;
    cart.push(productToAdd);
  }

  setLocalStorage("so-cart", cart);
  cartCount.set(cart.reduce((total, item) => total + (item.quantity || 1), 0));
}

async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  const cartIcon = document.querySelector(".cart-counter");
  cartIcon.classList.add("animate");
}
