import { formatPrice } from "../../utils/formatters";

// 构建购物车项数据：将原始购物车项数据与图书数据进行结合，生成包含图书对象和格式化价格的购物车项对象
export function buildCartItems(rawCartItems, bookMap) {
  return rawCartItems.map((item) => ({
    ...item,
    book: bookMap[item.bookId],
    priceText: formatPrice(bookMap[item.bookId].price),
  }));
}
