import { getLocalStorage, setLocalStorage, updateCartIcon } from "./utils.mjs";

/**
 * get the cart items from local storage, find the index of the item with the item id, if it doesn't exist (it should be there because it was displayed for the user on the cart page) then set the index to -1, use the index and
 * the splice method to remove just one item with the item id and the index it was found at from the cart, currently the user can add as many items to the cart as he/she wants, but they appear as separate items instead of
 * updating a quantity for that specific item
 */

// This function checks if the item already exists in the cart
// if it DOMParser, it increments the quantity of the item.
// If it does not exist, it adds the item to the cart with quantity 1.
function addToCart(product){
  let cart = getLocalStorage("so-cart") || [];
  const existingItem = cart.find(item => item.Id === product.Id);

  if (existingItem) {
    existingItem.Quantity = (existingItem.Quantity || 1) + 1;
  } else {
    product.Quantity = 1;
    cart.push(product);
  }
  setLocalStorage("so-cart", cart);
  updateCartIcon();
}
// This function now uses the filter method to remove the item from the cart.
// It then updates the cart icon and re-renders the cart contents.
function removeFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart");
  cartItems = cartItems.filter(item => item.Id !== itemId);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
  // update local storage
  setLocalStorage("so-cart", cartItems);

  // re-render the cart items
  renderCartContents();
}

//Updates the quantity of an item in the cart
//if the new quantity is 0 or less, it removes the item from the cart.
//Otherwise, it updates the quantity and re-renders the cart contents.
function updateQuantity(itemId, newQuantity){
  let cartItems = getLocalStorage("so-cart");
  const item = cartItems.find(item => item.Id === itemId);
  if(item <= 0){
    removeFromCart(itemId);
  }else{
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
  }
}




/** There are a lot of things that need to be done to render the contents of the cart, first get the cart items from local storage, if the cart is empty then display a cart empty message for the user, make sure the html for the products in the cart is set to empty, also make sure not to display a total since there is nothing in the cart then exit the function, if items are in the cart iterate through them using the html in the cartItemTemplate to display each item for the user, but make sure to also add a delete button for each cart item so the item can be deleted, if the button is clicked remove the item from the cart and then update the backpack cart icon, if the button is not clicked then the function executes finding a cart total and displaying it */
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // if the cart is empty there is nothing to render so exit the function
  if (!cartItems || cartItems.length === 0) {
    // display a message letting the user no there are no items in the cart
    document.querySelector(".cart-empty-message").style.display = "block";
    document.querySelector(".product-list").innerHTML = "";
    // hide the "Total" element when the cart is empty
    document.querySelector(".cart-footer").classList.add("hide");
    // set the html for the cart-footer to empty
    document.querySelector(".cart-footer").innerHTML = "";
    return;
  }

  // iterate through the cart items adding them to the html template for displaying each item
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  // display the cart items for user to see
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // attach event listener to the delete item button, for when a user removes an item from the cart
  document.querySelectorAll("#delete-cart-item").forEach((button) => {
    button.addEventListener("click", function () {
      // get the id of the item the user clicked to delete from the cart
      const itemId = this.getAttribute("data-id");
      removeFromCart(itemId);
      updateCartIcon();
    });
  });
  // get the total amount for the items in the cart, display the total amount
  cartTotal();
}

/**
 * Create inner html for a product
 * */
//This function incudes an input field for the quantity.
//It also multiplies the item price by the quantity to show the total price for that item.
function cartItemTemplate(item) {
  return `<li class="cart-card divider">
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
  <p class="cart-card__quantity">
  <input type="number" class="quantity-output" data-id=${item.Id}" value="${item.Quantity}" min="1">
  </p>
  <p class="cart-card__price">$${(item.FinalPrice * item.Quantity).toFixed(2)}</p>
  <button class="delete-cart-item" data-id="${item.Id}">Delete Item</button>
</li>`;
}

/**
 * Iterate through cart items, add each item's FinalPrice to create cart total
 * */
//This function now takes into account the quantity of each item when calculating the total price.
function cartTotal() {
  const cartItems = getLocalStorage("so-cart");
  // if the cart is empty return immediately
  if (!cartItems || cartItems.length === 0) {
    // display a message letting the user no there are no items in the cart
    document.querySelector(".cart-footer").classList.add("hide");
    document.querySelector(".cart-footer").innerHTML = "";
    return;
  }
  // calculate the total cost of the items in the cart
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice * item.Quantity, 0);
  const cartTotalHtml = `<p class="cart-total:">Total: $${total.toFixed(2)}</p>`;
  document.querySelector(".cart-footer").innerHTML = cartTotalHtml;
  // Ensure the cart footer is visible
  document.querySelector(".cart-footer").classList.remove("hide");
}

renderCartContents();

// Call updateCartIcon on page load to display current cart count
document.addEventListener("DOMContentLoaded", updateCartIcon);

export{addToCart};