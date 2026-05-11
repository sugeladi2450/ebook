export const USER_ROLES = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
};

export const USER_STATUS = {
  ACTIVE: "ACTIVE",
  DISABLED: "DISABLED",
};

export function isAdminUser(user) {
  return user?.role === USER_ROLES.ADMIN && user?.status !== USER_STATUS.DISABLED;
}

export function isCustomerUser(user) {
  return user?.role === USER_ROLES.CUSTOMER;
}

