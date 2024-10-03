import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productID = getParam("product");
console.log(productID);
productDetails(productID, ".product-detail");
