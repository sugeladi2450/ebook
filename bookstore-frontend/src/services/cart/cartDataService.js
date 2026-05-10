import { formatPrice } from "../../utils/formatters";
import { buildBookFromApi } from "../books/bookDataService";

export function buildCartItems(rawCartItems, bookMap) {
  return rawCartItems.map((item) => ({
    ...item,
    book: bookMap[item.bookId],
    number: item.number ?? 1,
    priceText: formatPrice(bookMap[item.bookId].price),
  }));
}

export function buildCartItemFromApi(rawItem) {
  const book = buildBookFromApi(rawItem.book);

  return {
    id: String(rawItem.id),
    userId: String(rawItem.userId),
    book,
    number: rawItem.number ?? 1,
    authorShort: book.author,
    priceText: formatPrice(book.price),
    subtotalText: formatPrice(book.price * (rawItem.number ?? 1)),
  };
}

export function buildCartItemsFromApi(rawItems) {
  return rawItems.map((item) => buildCartItemFromApi(item));
}
