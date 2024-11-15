// import { renderHeaderFooter, alertMessage } from "./utils.mjs";
// import { getLocalStorage, setLocalStorage } from "./utils.mjs";
// import { loginRequest } from "./externalServices.mjs";
// // import  jwt_decode  from "jwt-decode";
// import { decode as jwt_decode } from "jwt-decode";


// const tokenKey = "so-token";

// // check to see if there is a valid token stored in localStorage
// // if there is no token or token is expired redirect user to login page. Make sure to keep track of the page they were trying to access so we can send them back again after login
// export function isTokenValid (token) {
//     // check to make sure a token was actually passed in.
//     if (token) {
//         const decoded = jwt_decode(token);
//         let currentDateTime = new Date().getTime();
        
//       if (decoded.exp * 1000 < currentDateTime) {
//         alertMessage("You are trash. You have no token.")
//         console.log("Token expired.");
//         return false;
//       } else {
//         console.log("Valid token");
//         return true;
//       }
//     } else return false;
// }
    
// // check to see if a user is logged in
// // check to see if valid token stored in localStorage
// // if no token or it is expired redirect user to login page
// export function checkLogin() {
//     // get the token from localStorage
//     const token = getLocalStorage(tokenKey);
//     // use the isTokenValid function to check the validity of our token
//     const valid = isTokenValid(token);
//     // if the token is NOT valid
//     if (!valid) {
//       //remove stored token
//       localStorage.removeItem(tokenKey);
//       // redirect to login while sending the current URL along as a parameter
//       // grab the current location from the browser
//       const location = window.location;
//       // check out what location contains
//       console.log(location);
//       // redirect by updating window.location =
//       window.location = `/login/index.html?redirect=${location.pathname}`;
//     } else return token; //if they are logged in then just return the token.
//   }

//   // sending credentials to the authentication server
// // if successful store authentication token that is sent back into local storage
// // redirect user to whatever page they were trying to access
// export async function login (creds, redirect) {
//   try {
//     let response = await loginRequest(creds);
  
//       if (!response.ok) throw new Error('Login failed');
      
//       const data = await response.json();
//       const token = data.accessToken;
//       if (token) {
//         setLocalStorage('so_token', token)
        
//         // Redirect to the intended page if provided, else to a default page
//         window.location.href = redirect || '/';
//       }
//     } catch (error) {
//       alertMessage(error.message)
//     }
//   }
import { renderHeaderFooter, alertMessage } from "./utils.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loginRequest } from "./externalServices.mjs";
import { jwtDecode } from "jwt-decode";

const tokenKey = "so-token";

export function isTokenValid(token) {
  if (token) {
    const decoded = jwtDecode(token);
    let currentDateTime = new Date().getTime();

    if (decoded.exp * 1000 < currentDateTime) {
      alertMessage("Your session has expired.");
      console.log("Token expired.");
      return false;
    } else {
      console.log("Valid token.");
      return true;
    }
  } else {
    return false;
  }
}

export function checkLogin() {
  const token = getLocalStorage(tokenKey);
  const valid = isTokenValid(token);

  if (!valid) {
    localStorage.removeItem(tokenKey);
    const location = window.location;
    window.location = `/login/index.html?redirect=${location.pathname}`;
  } else {
    return token;
  }
}

export async function login(creds, redirect) {
  try {
    let response = await loginRequest(creds);

    if (!response.ok) throw new Error("Login failed");

    const data = await response.json();
    const token = data.accessToken;

    if (token) {
      setLocalStorage(tokenKey, token);
      window.location.href = redirect || "/";
    }
  } catch (error) {
    alertMessage(error.message);
  }
}
