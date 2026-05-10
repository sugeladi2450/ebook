import { redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/auth/authService";
import { fetchCartItems } from "../../services/cart/cartApiService";
import { fetchOrders } from "../../services/orders/orderApiService";

function requireCurrentUser() {
  const user = getCurrentUser();

  if (!user) {
    throw redirect("/login");
  }

  return user;
}

export function createCartLoader() {
  return async function cartLoader() {
    const user = requireCurrentUser();

    try {
      return {
        user,
        cartItems: await fetchCartItems(user.id),
      };
    } catch (error) {
      console.warn("Failed to load cart from backend.", error);
      return {
        user,
        cartItems: [],
      };
    }
  };
}

export function createOrdersLoader() {
  return async function ordersLoader() {
    const user = requireCurrentUser();

    try {
      return {
        user,
        orders: await fetchOrders(user.id),
      };
    } catch (error) {
      console.warn("Failed to load orders from backend.", error);
      return {
        user,
        orders: [],
      };
    }
  };
}

export function createProfileLoader() {
  return function profileLoader() {
    return {
      user: requireCurrentUser(),
    };
  };
}
