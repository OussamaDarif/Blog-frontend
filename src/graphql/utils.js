import {
  ACCESS_TOKEN_KEY,
  AUTH_EMAIL,
  AUTH_FIRSTNAME,
  AUTH_LASTNAME,
} from "./queries";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getAuthUser() {
  return {
    email: localStorage.getItem(AUTH_EMAIL),
    firstname: localStorage.getItem(AUTH_FIRSTNAME),
    lastname: localStorage.getItem(AUTH_LASTNAME),
    token: localStorage.getItem(ACCESS_TOKEN_KEY),
  };
}

export function isLoggedIn() {
  return Boolean(localStorage.getItem(ACCESS_TOKEN_KEY));
}

