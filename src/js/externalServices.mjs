const baseURL = import.meta.env.VITE_SERVER_URL;
// const baseURL = import.meta.env.VITE_SERVER_URL + "checkout";

async function convertToJson(res) {
  const errData = await res.json()
  if (res.ok) {
    return errData;
  } else {
    // throw new Error("Bad Response");
    throw { name: 'servicesError', message: errData };
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
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response);
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

 export async function loginRequest(creds) {
  const response = await fetch('http://server-nodejs.cit.byui.edu:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  });
  return response;
}

export async function getOrders(token) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(baseURL + "orders", options).then(convertToJson);
  return response;
}
