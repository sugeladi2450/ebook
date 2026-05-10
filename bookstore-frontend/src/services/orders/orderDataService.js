import { formatPrice } from "../../utils/formatters";
import { buildBookFromApi } from "../books/bookDataService";

function normalizeApiAmount(amount) {
  const numericAmount = Number(amount ?? 0);

  if (!Number.isFinite(numericAmount)) {
    return 0;
  }

  return numericAmount >= 1000 ? numericAmount / 100 : numericAmount;
}

// 构建订单数据：将原始订单数据与图书数据进行结合，生成包含图书对象和格式化价格的订单对象
export function buildOrders(rawOrders, bookMap) {
  return rawOrders.map((order) => ({
    ...order,
    book: bookMap[order.bookId],
    amountText: formatPrice(order.amount),
  }));
}

export function buildOrderFromApi(rawOrder) {
  const items = (rawOrder.items ?? []).map((item) => ({
    id: String(item.id),
    book: buildBookFromApi(item.book),
    number: item.number ?? 1,
    price: normalizeApiAmount(item.price),
    subtotal: normalizeApiAmount(item.subtotal),
    subtotalText: formatPrice(normalizeApiAmount(item.subtotal)),
  }));
  const amount = normalizeApiAmount(rawOrder.amount);

  return {
    id: String(rawOrder.id),
    userId: String(rawOrder.userId),
    createdAt: rawOrder.createdAt,
    amount,
    amountText: formatPrice(amount),
    status: rawOrder.status ?? "done",
    statusText: rawOrder.statusText ?? "已完成",
    items,
    book: items[0]?.book,
  };
}

export function buildOrdersFromApi(rawOrders) {
  return rawOrders.map((order) => buildOrderFromApi(order));
}
