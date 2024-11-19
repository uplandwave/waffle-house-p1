/* eslint-disable no-unused-vars */
import {
  setLocalStorage,
  getLocalStorage,
  getCartCount,
  renderBreadcrumbs,
  capitalize,
} from "./utils.mjs";
import { findProductById, getProductsByCategory } from "./externalServices.mjs";
import { cartCount } from "./stores.mjs";

let productData = {};

// Helper function to randomly pick items
function getRandomProducts(products, count) {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, products.length));
}

// Template for a single recommendation
function recommendationTemplate(product) {
  return `
    <div class="recommendation-card">
      <a href="../product-details/index.html?productId=${product.Id}">
        <img src="${product.Images.PrimarySmall}" alt="${product.Name}" />
        <h4>${product.Name}</h4>
        <p class="recommendation-price">$${product.FinalPrice}</p>
      </a>
    </div>
  `;
}

// Show recommendations function
async function showRecommendations(currentProductId, category) {
  try {
    // Fetch all products in the same category
    const allProducts = await getProductsByCategory(category);
    
    // Filter out the current product
    const filteredProducts = allProducts.filter(product => product.Id !== currentProductId);

    // Randomly select 2-3 products (let's use 3)
    const recommendations = getRandomProducts(filteredProducts, 3);

    // Generate the HTML for recommendations
    const recommendationsHtml = `
      <div class="recommendations-container">
        <h3>Other Gear You May Like</h3>
        <div class="recommendations-grid">
          ${recommendations.map(product => recommendationTemplate(product)).join("")}
        </div>
      </div>
    `;

    // Insert the recommendations into the page
    const recommendationsContainer = document.querySelector(".recommendations");
    if (recommendationsContainer) {
      recommendationsContainer.innerHTML = recommendationsHtml;
    } else {
      console.error("Recommendations container not found");
    }
  } catch (error) {
    console.error("Error loading recommendations:", error);
  }
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
    <img class="divider" src="${product.Images.PrimaryExtraLarge}" alt="${product.Name}"/>
    <p class="product-card__price" id="productFinalPrice">${discountAndPriceTemplate(product)}</p>
    <p class="product__color" id="productColorName">${product.Colors[0].ColorName}</p>
    <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__quantity">
      <input type="number" id="quantity" value="1" min="1" class="quantity-input">
    </div>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  `;
}

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

  // Fetch and display product recommendations
  await showRecommendations(productId, productData.Category);
}