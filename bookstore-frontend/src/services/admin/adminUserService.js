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

export function fetchAdminUsers(adminId, page = 0, size = 10) {
  return requestJson(withAdminId("/api/v1/admin/users", adminId, { page, size }));
}

export function disableAdminUser(adminId, userId) {
  return requestJson(withAdminId(`/api/v1/admin/users/${encodeURIComponent(userId)}/disable`, adminId), {
    method: "PUT",
  });
}

export function enableAdminUser(adminId, userId) {
  return requestJson(withAdminId(`/api/v1/admin/users/${encodeURIComponent(userId)}/enable`, adminId), {
    method: "PUT",
  });
}

