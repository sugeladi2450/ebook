import rawData from "../data/Data.json";
import { assetMap } from "../data/assets";
import { buildBooks, buildBanners } from "./books/bookDataService";
import { buildCartItems } from "./cart/cartDataService";
import { buildOrders } from "./orders/orderDataService";

export function getAppData() {
  const books = buildBooks(rawData.books, assetMap);
  const bookMap = Object.fromEntries(books.map((book) => [book.id, book]));
  const banners = buildBanners(rawData.banners, assetMap);
  const cartItems = buildCartItems(rawData.cartItems, bookMap);
  const orders = buildOrders(rawData.orders, bookMap);

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
