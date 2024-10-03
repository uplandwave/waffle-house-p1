import { setLocalStorage } from "./utils.mjs";
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


// add a product and it's details to the cart
function addProductToCart(product) {

    let cart = localStorage.getItem("so-cart");
  
    try {
      cart = cart ? JSON.parse(cart) : [];
    } catch (e) {
      cart = [];
    }
  
    cart.push(product);
    setLocalStorage("so-cart", cart);
  }

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}
