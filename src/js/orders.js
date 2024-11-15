// Normally we have been creating a separate js file to hold this. I put it here to show that you can...the next question is should you?
// Advantages to putting it here: one less file to request and download.
// Disadvantages: it breaks the pattern we have established with our other pages, and the separation of concerns...
import { checkLogin } from "../js/auth.mjs";
import OrdersList from "../js/components/OrdersList.svelte";
import { renderHeaderFooter } from "./utils.mjs";


// currentOrders will need to send the token to the server with the request or it will be denied. if checkLogin will return the token upon success
const token = checkLogin();
new OrdersList({
  target: document.querySelector("#orderList"),
  props: { token },
});
// currentOrders("#orders", token);