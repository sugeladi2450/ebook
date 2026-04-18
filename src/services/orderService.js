import { formatPrice } from "../utils/formatters";

export function buildOrders(rawOrders, bookMap) {
  return rawOrders.map((order) => ({
    ...order,
    book: bookMap[order.bookId],
    amountText: formatPrice(order.amount),
  }));
}
