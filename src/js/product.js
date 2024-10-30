import { getParam, renderHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

renderHeaderFooter();

const productID = getParam("product");
// console.log(productID);
productDetails(productID, ".product-detail");
