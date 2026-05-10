import { requestJson } from "./apiClient";

export async function fetchAppData() {
  const appData = await requestJson("/api/v1/app-data");

  return {
    ...appData,
    books: [],
    cartItems: [],
    orders: [],
  };
}
