import { formatPrice } from "../../utils/formatters";

export function buildCartItems(rawCartItems, bookMap) {
  return rawCartItems.map((item) => ({
    ...item,
    book: bookMap[item.bookId],
    priceText: formatPrice(bookMap[item.bookId].price),
  }));
}
