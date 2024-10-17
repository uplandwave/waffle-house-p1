import MainHeader from "./components/MainHeader.svelte"
import MainFooter from "./components/MainFooter.svelte"

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage, change from JSON to Javascript object
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// gets the param from the URL
export function getParam(param) {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const paramValue = urlParams.get(param)
  return paramValue
}

export function updateCartIcon() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartItemCount = document.querySelector(".cart-item-count");
  const cartIcon = document.querySelector(".cart");

  // If the cart is empty, hide the cart item count
  if (cartItems.length === 0) {
    cartItemCount.style.display = "none";
  } else {
    cartItemCount.style.display = "block";
    cartItemCount.textContent = cartItems.length;
    
  // animation trigger for our cart
  cartIcon.classList.remove("cart-animation");
    void cartIcon.offsetWidth;
    cartIcon.classList.add("cart-animation");
  }
}

// this line is to clear the cart in local storage
function clearCart() {
  localStorage.removeItem("so-cart");
}

export function renderHeaderFooter(){
  new MainHeader({
    target: document.querySelector("#header")
  })

  new MainFooter({
    target: document.querySelector("#footer")
  })
}




// clearCart();

