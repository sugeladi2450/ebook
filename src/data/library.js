import rawData from "./Data.json";
import { assetMap } from "./assets";

function formatPrice(price) {
  return `¥ ${Number(price).toFixed(2)}`;
}

export function getAppData() {
  const books = rawData.books.map((book) => ({
    ...book,
    cover: assetMap[book.coverKey],
    priceText: formatPrice(book.price),
  }));

  const bookMap = Object.fromEntries(books.map((book) => [book.id, book]));

  const banners = rawData.banners.map((banner) => ({
    ...banner,
    image: assetMap[banner.imageKey],
  }));

  const cartItems = rawData.cartItems.map((item) => ({
    ...item,
    book: bookMap[item.bookId],
    priceText: formatPrice(bookMap[item.bookId].price),
  }));

  const orders = rawData.orders.map((order) => ({
    ...order,
    book: bookMap[order.bookId],
    amountText: formatPrice(order.amount),
  }));

  return {
    ...rawData,
    site: {
      ...rawData.site,
      logo: assetMap.logo,
    },
    banners,
    books,
    cartItems,
    orders,
  };
}

export function findBookById(books, bookId) {
  return books.find((book) => book.id === bookId);
}
