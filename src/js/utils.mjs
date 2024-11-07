import MainHeader from "./components/MainHeader.svelte"
import MainFooter from "./components/MainFooter.svelte"
import Breadcrumbs from "./components/Breadcrumbs.svelte"
import MessagedAlert from "./components/MessagedAlert.svelte"
import { cartCount } from "./stores.mjs"

// Call this on each page load to update cart count in the header
document.addEventListener("DOMContentLoaded", () => {
  updateCartIcon();
});

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

// New function to get the number of things in the cart | passes to stores.mjs
export function getCartCount() {
  const count = getLocalStorage("so-cart")?.length ?? 0;
  return count;
}
// Define updateCartIcon but don’t call renderHeaderFooter within it
export function updateCartIcon() {
  const cartItems = getLocalStorage("so-cart") || [];
  const totalCount = cartItems.reduce((count, item) => count + (item.quantity || 1), 0);
  cartCount.set(totalCount); // Updates the Svelte store, no direct DOM updates here
}
// this line is to clear the cart in local storage
// function clearCart() {
//   localStorage.removeItem("so-cart");
// } clearCart();

export function renderHeaderFooter(){
  new MainHeader({
    target: document.querySelector("#header")
  })

  new MainFooter({
    target: document.querySelector("#footer")
  })
}

/*
PARAM: crumbs
  type: array of objects
    object attributes:
      - text     // what is shown
      - href     // the href of the link. no link if false or left out.
*/
export function renderBreadcrumbs(crumbs){
  new Breadcrumbs({
    target: document.getElementById("breadcrumbs-container"),
    props: {
      crumbs
    }
  })
}

export function capitalize(stringValue) {
  return stringValue
    .split(" ")
    .map((word) => word
        .split("")
        .map((character, i) => {
          if (i === 0) {
            return character.toUpperCase()
          }
          return character
        })
        .join(""))
    .join(" ")
}

// takes a form element and returns an object where the key is the "name" of the form input.
export function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export function alertMessage(message, scroll=true) {
  // insert the MessagedAlert before <main>
  new MessagedAlert({
    target: document.querySelector("body"),
    // https://svelte.dev/docs/svelte/legacy-component-api#Creating-a-component
    anchor: document.querySelector("main"),
    props: {message}
  })
  // scroll to top if needed
  if (scroll) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo
    window.scrollTo(0,0)
  }
}

export function getCartTotal() {
  const cartItems = getLocalStorage("so-cart");
  return cartItems.reduce(
      (sum, item) => sum + item.FinalPrice * item.quantity,
      0,
    );
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeaderFooter(); // Call only once upon DOM load
  updateCartIcon(); // Set initial cart count after header/footer loads
});