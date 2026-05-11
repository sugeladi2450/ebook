import { redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/auth/authService";
import { fetchCartItems } from "../../services/cart/cartApiService";
import { fetchAdminOrders, fetchOrders } from "../../services/orders/orderApiService";
import { fetchAddresses } from "../../services/profile/addressApiService";
import {
  fetchAdminBookSalesStats,
  fetchAdminUserConsumptionStats,
  fetchUserPurchaseStats,
} from "../../services/statistics/statisticsApiService";
import { isAdminUser } from "../../utils/userRole";

export function requireCurrentUser() {
  const user = getCurrentUser();

  if (!user) {
    throw redirect("/login");
  }

  return user;
}

export function requireAdminUser() {
  const user = requireCurrentUser();

  if (!isAdminUser(user)) {
    throw redirect("/");
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
  return async function ordersLoader({ request }) {
    const user = requireCurrentUser();
    const filters = getOrderFilters(request);

    try {
      return {
        user,
        filters,
        orders: await fetchOrders(user.id, filters),
      };
    } catch (error) {
      console.warn("Failed to load orders from backend.", error);
      return {
        user,
        filters,
        orders: [],
      };
    }
  };
}

export function createProfileLoader() {
  return async function profileLoader() {
    const user = requireCurrentUser();

    try {
      return {
        user,
        addresses: await fetchAddresses(user.id),
      };
    } catch (error) {
      console.warn("Failed to load addresses from backend.", error);
      return {
        user,
        addresses: [],
      };
    }
  };
}

export function createAdminLoader() {
  return function adminLoader() {
    return {
      user: requireAdminUser(),
    };
  };
}

export function createAdminOrdersLoader() {
  return async function adminOrdersLoader({ request }) {
    const user = requireAdminUser();
    const filters = getOrderFilters(request);

    try {
      return {
        user,
        filters,
        orders: await fetchAdminOrders(user.id, filters),
      };
    } catch (error) {
      console.warn("Failed to load admin orders from backend.", error);
      return {
        user,
        filters,
        orders: [],
      };
    }
  };
}

export function createUserStatisticsLoader() {
  return async function userStatisticsLoader({ request }) {
    const user = requireCurrentUser();
    const filters = getDateFilters(request);

    try {
      return {
        user,
        filters,
        stats: await fetchUserPurchaseStats(user.id, filters),
      };
    } catch (error) {
      console.warn("Failed to load user statistics from backend.", error);
      return {
        user,
        filters,
        errorMessage: error.message || "统计数据加载失败",
        stats: {
          books: [],
          totalBooks: 0,
          totalAmount: 0,
        },
      };
    }
  };
}

export function createAdminStatisticsLoader() {
  return async function adminStatisticsLoader({ request }) {
    const user = requireAdminUser();
    const filters = getDateFilters(request);

    try {
      const [bookSales, userConsumption] = await Promise.all([
        fetchAdminBookSalesStats(user.id, filters),
        fetchAdminUserConsumptionStats(user.id, filters),
      ]);
      return {
        user,
        filters,
        bookSales,
        userConsumption,
      };
    } catch (error) {
      console.warn("Failed to load admin statistics from backend.", error);
      return {
        user,
        filters,
        errorMessage: error.message || "统计数据加载失败",
        bookSales: [],
        userConsumption: [],
      };
    }
  };
}

function getOrderFilters(request) {
  const url = new URL(request.url);
  return {
    bookName: url.searchParams.get("bookName") ?? "",
    startDate: url.searchParams.get("startDate") ?? "",
    endDate: url.searchParams.get("endDate") ?? "",
  };
}

function getDateFilters(request) {
  const url = new URL(request.url);
  return {
    startDate: url.searchParams.get("startDate") ?? "",
    endDate: url.searchParams.get("endDate") ?? "",
  };
}
