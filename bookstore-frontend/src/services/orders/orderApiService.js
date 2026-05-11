import { requestJson } from "../apiClient";
import { buildOrderFromApi, buildOrdersFromApi } from "./orderDataService";

function buildOrderQuery(params) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });
  return searchParams.toString();
}

export async function fetchOrders(userId, filters = {}) {
  const query = buildOrderQuery({
    userId,
    startDate: filters.startDate,
    endDate: filters.endDate,
    bookName: filters.bookName,
  });
  const orders = await requestJson(`/api/v1/orders?${query}`);
  return buildOrdersFromApi(orders);
}

export async function fetchAdminOrders(adminId, filters = {}) {
  const query = buildOrderQuery({
    adminId,
    startDate: filters.startDate,
    endDate: filters.endDate,
    bookName: filters.bookName,
  });
  const orders = await requestJson(`/api/v1/admin/orders?${query}`);
  return buildOrdersFromApi(orders);
}

export async function checkoutCart(userId, cartItemIds = []) {
  const order = await requestJson("/api/v1/orders", {
    method: "POST",
    body: JSON.stringify({ userId, cartItemIds }),
  });
  return buildOrderFromApi(order);
}

export async function directCheckout(userId, bookId, number = 1) {
  const order = await requestJson("/api/v1/orders/direct", {
    method: "POST",
    body: JSON.stringify({ userId, bookId, number }),
  });
  return buildOrderFromApi(order);
}
