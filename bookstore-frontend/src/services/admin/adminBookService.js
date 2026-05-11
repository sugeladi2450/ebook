import { requestJson } from "../apiClient";

function withAdminId(path, adminId, params = {}) {
  const searchParams = new URLSearchParams({
    adminId: String(adminId),
    ...Object.fromEntries(
      Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null && value !== "")
        .map(([key, value]) => [key, String(value)]),
    ),
  });

  return `${path}?${searchParams.toString()}`;
}

function normalizeBookPayload(values) {
  return {
    title: values.title?.trim(),
    author: values.author?.trim(),
    cover: values.cover?.trim() || null,
    isbn: values.isbn?.trim() || null,
    stock: Number(values.stock ?? 0),
    price: Number(values.price ?? 0),
    tag: values.tag?.trim() || null,
  };
}

export function fetchAdminBooks(adminId, keyword = "") {
  return requestJson(withAdminId("/api/v1/admin/books", adminId, { keyword }));
}

export function createAdminBook(adminId, values) {
  return requestJson(withAdminId("/api/v1/admin/books", adminId), {
    method: "POST",
    body: JSON.stringify(normalizeBookPayload(values)),
  });
}

export function updateAdminBook(adminId, bookId, values) {
  return requestJson(withAdminId(`/api/v1/admin/books/${encodeURIComponent(bookId)}`, adminId), {
    method: "PUT",
    body: JSON.stringify(normalizeBookPayload(values)),
  });
}

export function deleteAdminBook(adminId, bookId) {
  return requestJson(withAdminId(`/api/v1/admin/books/${encodeURIComponent(bookId)}`, adminId), {
    method: "DELETE",
  });
}

