import { requestJson } from "../apiClient";

const CURRENT_USER_KEY = "bookstore.currentUser";
let passwordPublicKeyPromise;

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

export async function updateUserProfile(userId, values) {
  return requestJson(`/api/v1/users/${encodeURIComponent(userId)}`, {
    method: "PUT",
    body: JSON.stringify({
      username: values.username?.trim(),
      nickname: values.nickname?.trim(),
      phone: values.phone?.trim() || null,
      email: values.email?.trim() || null,
    }),
  });
}

export async function changePassword(userId, values) {
  const [encryptedCurrentPassword, encryptedNewPassword, encryptedConfirmPassword] = await Promise.all([
    encryptPassword(values.currentPassword),
    encryptPassword(values.newPassword),
    encryptPassword(values.confirmPassword),
  ]);

  return requestJson(`/api/v1/users/${encodeURIComponent(userId)}/password`, {
    method: "PUT",
    body: JSON.stringify({
      encryptedCurrentPassword,
      encryptedNewPassword,
      encryptedConfirmPassword,
    }),
  });
}

async function encryptPassword(password) {
  const publicKey = await getPasswordPublicKey();
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    new TextEncoder().encode(password),
  );
  return arrayBufferToBase64(encryptedBuffer);
}

async function getPasswordPublicKey() {
  if (!window.crypto?.subtle) {
    throw new Error("当前浏览器不支持密码加密传输");
  }

  if (!passwordPublicKeyPromise) {
    passwordPublicKeyPromise = requestJson("/api/v1/security/password-public-key")
      .then(({ publicKey }) => window.crypto.subtle.importKey(
        "spki",
        base64ToArrayBuffer(publicKey),
        { name: "RSA-OAEP", hash: "SHA-256" },
        false,
        ["encrypt"],
      ));
  }

  return passwordPublicKeyPromise;
}

function base64ToArrayBuffer(base64Text) {
  const binaryText = window.atob(base64Text);
  const bytes = new Uint8Array(binaryText.length);
  for (let index = 0; index < binaryText.length; index += 1) {
    bytes[index] = binaryText.charCodeAt(index);
  }
  return bytes.buffer;
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binaryText = "";
  for (let index = 0; index < bytes.length; index += 1) {
    binaryText += String.fromCharCode(bytes[index]);
  }
  return window.btoa(binaryText);
}
