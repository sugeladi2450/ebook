import rawData from "../data/Data.json";
import { assetMap } from "../data/assets";
import { buildBooks, buildBanners } from "./books/bookDataService";
import { buildCartItems } from "./cart/cartDataService";
import { buildOrders } from "./orders/orderDataService";

// 把原始的 rawData 加工成页面能直接使用的完整数据
export function getAppData() {
  const books = buildBooks(rawData.books, assetMap);
  // 构建图书 ID 到图书对象的映射，方便后续根据 ID 快速查找图书信息
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
