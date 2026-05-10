import { requestJson } from "../apiClient";

function buildAddressPayload(values) {
  const [province, city, district] = values.region ?? [];

  return {
    receiver: values.receiver?.trim(),
    phone: values.phone?.trim(),
    province,
    city,
    district,
    detail: values.detail?.trim(),
    defaultAddress: Boolean(values.defaultAddress),
  };
}

export async function fetchAddresses(userId) {
  return requestJson(`/api/v1/users/${encodeURIComponent(userId)}/addresses`);
}

export async function createAddress(userId, values) {
  return requestJson(`/api/v1/users/${encodeURIComponent(userId)}/addresses`, {
    method: "POST",
    body: JSON.stringify(buildAddressPayload(values)),
  });
}

export async function updateAddress(userId, addressId, values) {
  return requestJson(
    `/api/v1/users/${encodeURIComponent(userId)}/addresses/${encodeURIComponent(addressId)}`,
    {
      method: "PUT",
      body: JSON.stringify(buildAddressPayload(values)),
    },
  );
}

export async function deleteAddress(userId, addressId) {
  return requestJson(
    `/api/v1/users/${encodeURIComponent(userId)}/addresses/${encodeURIComponent(addressId)}`,
    {
      method: "DELETE",
    },
  );
}
