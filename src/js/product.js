import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { addToCart } from "./cart";

const productID = getParam("product");
console.log(productID);
productDetails(productID, ".product-detail", addToCart);
