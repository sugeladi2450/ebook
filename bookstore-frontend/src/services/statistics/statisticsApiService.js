import { requestJson } from "../apiClient";

function buildQuery(params) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });
  return searchParams.toString();
}

function normalizeCentAmount(amount) {
  const numericAmount = Number(amount ?? 0);
  if (!Number.isFinite(numericAmount)) {
    return 0;
  }
  return numericAmount / 100;
}

function normalizeBookSalesStat(item) {
  return {
    bookId: String(item.bookId),
    title: item.title ?? "",
    isbn: item.isbn ?? "",
    cover: item.cover ?? "",
    totalQuantity: Number(item.totalQuantity ?? 0),
    totalAmount: normalizeCentAmount(item.totalAmount),
  };
}

function normalizeUserConsumptionStat(item) {
  return {
    userId: String(item.userId),
    username: item.username ?? "",
    nickname: item.nickname ?? "",
    email: item.email ?? "",
    totalBooks: Number(item.totalBooks ?? 0),
    totalAmount: normalizeCentAmount(item.totalAmount),
  };
}

export async function fetchUserPurchaseStats(userId, filters = {}) {
  const query = buildQuery({
    userId,
    startDate: filters.startDate,
    endDate: filters.endDate,
  });
  const data = await requestJson(`/api/v1/statistics/me?${query}`);
  return {
    books: (data.books ?? []).map(normalizeBookSalesStat),
    totalBooks: Number(data.totalBooks ?? 0),
    totalAmount: normalizeCentAmount(data.totalAmount),
  };
}

export async function fetchAdminBookSalesStats(adminId, filters = {}) {
  const query = buildQuery({
    adminId,
    startDate: filters.startDate,
    endDate: filters.endDate,
  });
  const data = await requestJson(`/api/v1/admin/statistics/books?${query}`);
  return (data ?? []).map(normalizeBookSalesStat);
}

export async function fetchAdminUserConsumptionStats(adminId, filters = {}) {
  const query = buildQuery({
    adminId,
    startDate: filters.startDate,
    endDate: filters.endDate,
  });
  const data = await requestJson(`/api/v1/admin/statistics/users?${query}`);
  return (data ?? []).map(normalizeUserConsumptionStat);
}

