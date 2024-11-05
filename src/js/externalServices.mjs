const baseURL = import.meta.env.VITE_SERVER_URL;
// const baseURL = import.meta.env.VITE_SERVER_URL + "checkout";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

/**
 * Get the data for products from the category.json file
 */
// export function getData(category = "tents") {
//   return fetch(`../json/${category}.json`)
//     .then(convertToJson)
//     .then((data) => data);
// }
export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  console.log("DATA RESULT", data.Result); // for star for quick look trello card
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response);
  // console.log("DATA RESULT", data.Result)
  return data.Result;

  // const products = await getData();
  // return products.find((item) => item.Id === id);
}

export async function checkout(json) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json)
  }
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}
