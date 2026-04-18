import { formatPrice } from "../utils/formatters";

export function buildCartItems(rawCartItems, bookMap) {
  return rawCartItems.map((item) => ({
    ...item,
    book: bookMap[item.bookId],
    priceText: formatPrice(bookMap[item.bookId].price),
  }));
}

export function calculateCartTotal(items) {
  return items.reduce((sum, item) => sum + Number(item.book.price), 0);
}

export function removeCartItem(items, itemId) {
  return items.filter((item) => item.id !== itemId);
}
