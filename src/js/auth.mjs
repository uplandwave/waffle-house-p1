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
