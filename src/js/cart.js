import { getLocalStorage, updateCartIcon } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // if the cart is empty return immediately
  if (!cartItems || cartItems.length === 0) {
    // display a message letting the user no there are no items in the cart
    document.querySelector(".cart-empty-message").style.display = "block";
    document.querySelector(".product-list").innerHTML = "";
    document.querySelector(".cart-footer").classList.add("hide");
    return;
  }

  // iterate through the cart items adding them to the html template for displaying each item
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  // display the cart items for user to see
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // get the total amount for the items in the cart, display the total amount
  cartTotal();
}

// create inner html for a product
function cartItemTemplate(item) {
  const newItem = 
  `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

// iterate through cart items, add each item's FinalPrice to create cart total
function cartTotal() {
  const cartItems = getLocalStorage("so-cart");

  // console.log(cartItems);
  // check if the cart is empty return an empty string
  if (!cartItems || cartItems.length === 0) {
    return;
  }
  // initialize cart total to 0 || line 54 below turns off an error from our lint filter. Idk why it is an error but it totaly works
  // eslint-disable-next-line no-shadow
  let cartTotal = 0;

  // iterate over cart items, adding cost of each item
  cartItems.forEach((item) => {
    cartTotal += item.FinalPrice;
  });

  let cartTotalHtml = `<p class="cart-total">Total: $${cartTotal.toFixed(
    2
  )}</p>`;
  document.querySelector(".cart-footer").innerHTML = cartTotalHtml;

  // Ensure the cart footer is visible
  document.querySelector(".cart-footer").classList.remove("hide");

  return;
}

renderCartContents();

// Call updateCartIcon on page load to display current cart count
document.addEventListener("DOMContentLoaded", updateCartIcon);