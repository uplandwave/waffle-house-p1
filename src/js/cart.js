import {
  getLocalStorage,
  setLocalStorage,
  updateCartIcon,
  renderHeaderFooter,
} from "./utils.mjs";
import ShoppingCart from "./components/ShoppingCart.svelte";

// /**
//  * get the cart items from local storage, find the index of the item with the item id, if it doesn't exist (it should be there because it was displayed for the user on the cart page) then set the index to -1, use the index and
//  * the splice method to remove just one item with the item id and the index it was found at from the cart, currently the user can add as many items to the cart as he/she wants, but they appear as separate items instead of
//  * updating a quantity for that specific item
//  */
// function removeFromCart(itemId) {
//   let cartItems = getLocalStorage("so-cart");

//   // find the index of the first item with the specified id
//   const index = cartItems.findIndex((item) => item.Id === itemId);

//   // if the item is found, remove only that instance
//   if (index !== -1) {
//     cartItems.splice(index, 1);
//   }

//   // update local storage
//   setLocalStorage("so-cart", cartItems);

//   // re-render the cart items
//   renderCartContents();
// }

// /** There are a lot of things that need to be done to render the contents of the cart, first get the cart items from local storage, if the cart is empty then display a cart empty message for the user, make sure the html for the products in the cart is set to empty, also make sure not to display a total since there is nothing in the cart then exit the function, if items are in the cart iterate through them using the html in the cartItemTemplate to display each item for the user, but make sure to also add a delete button for each cart item so the item can be deleted, if the button is clicked remove the item from the cart and then update the backpack cart icon, if the button is not clicked then the function executes finding a cart total and displaying it */
// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");

//   // if the cart is empty there is nothing to render so exit the function
//   if (!cartItems || cartItems.length === 0) {
//     // display a message letting the user no there are no items in the cart
//     document.querySelector(".cart-empty-message").style.display = "block";
//     document.querySelector(".product-list").innerHTML = "";
//     // hide the "Total" element when the cart is empty
//     document.querySelector(".cart-footer").classList.add("hide");
//     // set the html for the cart-footer to empty
//     document.querySelector(".cart-footer").innerHTML = "";
//     return;
//   }

//   // iterate through the cart items adding them to the html template for displaying each item
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   // display the cart items for user to see
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
//   // attach event listener to the delete item button, for when a user removes an item from the cart
//   document.querySelectorAll("#delete-cart-item").forEach((button) => {
//     button.addEventListener("click", function () {
//       // get the id of the item the user clicked to delete from the cart
//       const itemId = this.getAttribute("data-id");
//       removeFromCart(itemId);
//       updateCartIcon();
//     });
//   });
//   // get the total amount for the items in the cart, display the total amount
//   cartTotal();
// }

// /**
//  * Create inner html for a product
//  * */
// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
//   <button id="delete-cart-item" data-id="${item.Id}">Delete Item</button>
// </li>`;
//   return newItem;
// }

// /**
//  * Iterate through cart items, add each item's FinalPrice to create cart total
//  * */
// function cartTotal() {
//   const cartItems = getLocalStorage("so-cart");
//   // if the cart is empty return immediately
//   if (!cartItems || cartItems.length === 0) {
//     // display a message letting the user no there are no items in the cart
//     document.querySelector(".cart-footer").classList.add("hide");
//     document.querySelector(".cart-footer").innerHTML = "";
//     return;
//   }
//   // initialize cart total to 0 || line 54 below turns off an error from our lint filter. Idk why it is an error but it totaly works
//   // eslint-disable-next-line no-shadow
//   let cartTotal = 0;
//   // iterate over cart items, adding cost of each item
//   cartItems.forEach((item) => {
//     cartTotal += item.FinalPrice;
//   });
//   let cartTotalHtml = `<p class="cart-total">Total: $${cartTotal.toFixed(
//     2
//   )}</p>`;
//   document.querySelector(".cart-footer").innerHTML = cartTotalHtml;
//   // Ensure the cart footer is visible
//   document.querySelector(".cart-footer").classList.remove("hide");
// }

// renderCartContents();
renderHeaderFooter();
new ShoppingCart({
  target: document.querySelector(".product-list"),
});

// Call updateCartIcon on page load to display current cart count
document.addEventListener("DOMContentLoaded", updateCartIcon);

export{addToCart};