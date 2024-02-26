const STORAGE_TOKEN_KEY_ADMIN = import.meta.env.VITE_STORAGE_TOKEN_KEY_ADMIN;
const STORAGE_USER_ADMIN = import.meta.env.VITE_STORAGE_USER_ADMIN;
const STORAGE_USER_ID_ADMIN = import.meta.env.VITE_STORAGE_USER_ID_ADMIN;

function setTokenAdmin(value) {
  if (value == null) {
    localStorage.removeItem(STORAGE_TOKEN_KEY_ADMIN);
  } else {
    localStorage.setItem(STORAGE_TOKEN_KEY_ADMIN, value);
  }
}

function getTokenAdmin() {
  return localStorage.getItem(STORAGE_TOKEN_KEY_ADMIN);
}

function isTokenAdmin() {
  let token = localStorage.getItem(STORAGE_TOKEN_KEY_ADMIN);
  let authen = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return authen;
}

function setUserAdmin(value) {
  if (value == null) {
    localStorage.removeItem(STORAGE_USER_ADMIN);
  } else {
    localStorage.setItem(STORAGE_USER_ADMIN, JSON.stringify(value));
  }
}
function setUserIdAdmin(value) {
  if (value == null) {
    localStorage.removeItem(STORAGE_USER_ID_ADMIN);
  } else {
    localStorage.setItem(STORAGE_USER_ID_ADMIN, JSON.stringify(value));
  }
}
function getUserAdmin() {
  return JSON.parse(localStorage.getItem(STORAGE_USER_ADMIN));
}
function getUserIdAdmin() {
  return JSON.parse(localStorage.getItem(STORAGE_USER_ID_ADMIN));
}

export {
  STORAGE_TOKEN_KEY_ADMIN,
  STORAGE_USER_ADMIN,
  isTokenAdmin,
  getTokenAdmin,
  setTokenAdmin,
  setUserAdmin,
  getUserAdmin,
  setUserIdAdmin,
  getUserIdAdmin,
};
