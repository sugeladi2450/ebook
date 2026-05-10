import { requestJson } from "../apiClient";

const CURRENT_USER_KEY = "bookstore.currentUser";

export function getCurrentUser() {
  const rawUser = window.localStorage.getItem(CURRENT_USER_KEY);
  return rawUser ? JSON.parse(rawUser) : null;
}

export function saveCurrentUser(user) {
  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  window.localStorage.removeItem(CURRENT_USER_KEY);
}

export async function loginUser(username, password) {
  return requestJson("/api/v1/users/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function registerUser(username, password) {
  return requestJson("/api/v1/users/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}
