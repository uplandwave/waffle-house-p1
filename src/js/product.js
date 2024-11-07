import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productID = getParam("product");
productDetails(productID, ".product-detail");
