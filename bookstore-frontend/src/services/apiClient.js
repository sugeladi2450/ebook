export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"
).replace(/\/$/, "");

export async function requestJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const text = await response.text();
      if (text) {
        try {
          const errorBody = JSON.parse(text);
          const details = errorBody.details ? Object.values(errorBody.details) : [];
          message = details[0] ?? errorBody.message ?? message;
        } catch {
          message = text;
        }
      }
    } catch {
      // Keep the status-based message when the backend does not return JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
