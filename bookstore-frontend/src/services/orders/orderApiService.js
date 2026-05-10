import { requestJson } from "../apiClient";
import { buildOrderFromApi, buildOrdersFromApi } from "./orderDataService";

export async function fetchOrders(userId) {
  const orders = await requestJson(`/api/v1/orders?userId=${encodeURIComponent(userId)}`);
  return buildOrdersFromApi(orders);
}

export async function checkoutCart(userId) {
  const order = await requestJson("/api/v1/orders", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  return buildOrderFromApi(order);
}
