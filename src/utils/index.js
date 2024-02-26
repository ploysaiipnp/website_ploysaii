const API_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
// const API_PROD = import.meta.env.VITE_API_URL_PROD;
// const MODE = import.meta.env.MODE;
// const URL_API = MODE === "production" ? API_PROD : API_LOCAL; // -- for deploy --
const URL_API = API_LOCAL; // -- for deploy --

const STORAGE_TOKEN_KEY = import.meta.env.VITE_STORAGE_TOKEN_KEY;
const STORAGE_USER = import.meta.env.VITE_STORAGE_USER;
const STORAGE_USER_ID = import.meta.env.VITE_STORAGE_USER_ID;
const STORAGE_CART = import.meta.env.VITE_STORAGE_CART;

const GET_IMG_PATH = "fs/file/get";
const URL_IMAGE = `${URL_API}/${GET_IMG_PATH}`;

function setToken(value) {
  if (value == null) {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
  } else {
    localStorage.setItem(STORAGE_TOKEN_KEY, value);
  }
}

function getToken() {
  return localStorage.getItem(STORAGE_TOKEN_KEY);
}

function isToken() {
  let token = localStorage.getItem(STORAGE_TOKEN_KEY);
  let authen = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return authen;
}

function setUser(value) {
  if (value == null) {
    localStorage.removeItem(STORAGE_USER);
  } else {
    localStorage.setItem(STORAGE_USER, JSON.stringify(value));
  }
}
function setUserId(value) {
  if (value == null) {
    localStorage.removeItem(STORAGE_USER_ID);
  } else {
    localStorage.setItem(STORAGE_USER_ID, JSON.stringify(value));
  }
}
function getUser() {
  return JSON.parse(localStorage.getItem(STORAGE_USER));
}
function getUserId() {
  return JSON.parse(localStorage.getItem(STORAGE_USER_ID));
}

function setCartUser(value) {
  if (value == null) {
    localStorage.removeItem(STORAGE_CART);
  } else {
    localStorage.setItem(STORAGE_CART, JSON.stringify(value));
  }
}
function getCartUser() {
  return JSON.parse(localStorage.getItem(STORAGE_CART));
}

function setRoleUser(value) {
  if (value == null) {
    localStorage.removeItem("ROLE_USER");
  } else {
    localStorage.setItem("ROLE_USER", JSON.stringify(value));
  }
}
function getRoleUser() {
  return JSON.parse(localStorage.getItem("ROLE_USER"));
}

export {
  STORAGE_TOKEN_KEY,
  STORAGE_USER,
  URL_API,
  GET_IMG_PATH,
  URL_IMAGE,
  isToken,
  getToken,
  setToken,
  setUser,
  getUser,
  setCartUser,
  getCartUser,
  setUserId,
  getUserId,
  setRoleUser,
  getRoleUser,
};
