import { formatPrice } from "../../utils/formatters";

// 构建订单数据：将原始订单数据与图书数据进行结合，生成包含图书对象和格式化价格的订单对象
export function buildOrders(rawOrders, bookMap) {
  return rawOrders.map((order) => ({
    ...order,
    book: bookMap[order.bookId],
    amountText: formatPrice(order.amount),
  }));
}
