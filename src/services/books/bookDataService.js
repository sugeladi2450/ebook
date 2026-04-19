import { formatPrice } from "../../utils/formatters";

// 构建图书数据：将原始数据与资源进行结合，生成包含封面和格式化价格的图书对象
export function buildBooks(rawBooks, assets) {
  return rawBooks.map((book) => ({
    ...book,
    cover: assets[book.coverKey],
    priceText: formatPrice(book.price),
  }));
}

// 构建横幅数据：将原始数据与资源进行结合，生成包含图片的横幅对象
export function buildBanners(rawBanners, assets) {
  return rawBanners.map((banner) => ({
    ...banner,
    image: assets[banner.imageKey],
  }));
}
