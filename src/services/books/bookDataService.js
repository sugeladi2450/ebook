import { formatPrice } from "../../utils/formatters";

export function buildBooks(rawBooks, assets) {
  return rawBooks.map((book) => ({
    ...book,
    cover: assets[book.coverKey],
    priceText: formatPrice(book.price),
  }));
}

export function buildBanners(rawBanners, assets) {
  return rawBanners.map((banner) => ({
    ...banner,
    image: assets[banner.imageKey],
  }));
}
