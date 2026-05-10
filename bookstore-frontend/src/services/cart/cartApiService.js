import { requestJson } from "../apiClient";
import { buildCartItemFromApi, buildCartItemsFromApi } from "./cartDataService";

export async function fetchCartItems(userId) {
  const items = await requestJson(`/api/v1/cart?userId=${encodeURIComponent(userId)}`);
  return buildCartItemsFromApi(items);
}

export async function addCartItem(userId, bookId, number = 1) {
  const item = await requestJson("/api/v1/cart/items", {
    method: "POST",
    body: JSON.stringify({ userId, bookId, number }),
  });
  return buildCartItemFromApi(item);
}

export async function deleteCartItem(userId, cartItemId) {
  return requestJson(
    `/api/v1/cart/items/${encodeURIComponent(cartItemId)}?userId=${encodeURIComponent(userId)}`,
    {
      method: "DELETE",
    },
  );
}
