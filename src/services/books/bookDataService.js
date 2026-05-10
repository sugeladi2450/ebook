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

function normalizeApiPrice(price) {
  const numericPrice = Number(price ?? 0);

  if (!Number.isFinite(numericPrice)) {
    return 0;
  }

  return numericPrice >= 1000 ? numericPrice / 100 : numericPrice;
}

export function buildBookFromApi(rawBook) {
  const price = normalizeApiPrice(rawBook.price);
  const description = rawBook.description ?? "";

  return {
    id: String(rawBook.id),
    title: rawBook.title ?? "",
    author: rawBook.author ?? "",
    translator: rawBook.translator ?? "暂无",
    isbn: rawBook.isbn ?? String(rawBook.id),
    price,
    tag: rawBook.tag ?? "图书",
    cover: rawBook.cover ?? "",
    publishLine: `销量：${rawBook.sales ?? 0}`,
    listDesc: description,
    intro: description,
    intro2: "",
    sales: rawBook.sales ?? 0,
    priceText: formatPrice(price),
  };
}

export function buildBooksFromApi(rawBooks) {
  return rawBooks.map((book) => buildBookFromApi(book));
}
