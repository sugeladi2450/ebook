import { formatPrice } from "../../utils/formatters";

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
  const listDesc = rawBook.listDesc ?? description;
  const intro = rawBook.intro ?? description;

  return {
    id: String(rawBook.id),
    title: rawBook.title ?? "",
    author: rawBook.author ?? "",
    translator: rawBook.translator ?? "暂无",
    isbn: rawBook.isbn ?? String(rawBook.id),
    price,
    tag: rawBook.tag ?? "图书",
    cover: rawBook.cover ?? "",
    publishLine: rawBook.publishLine ?? `销量：${rawBook.sales ?? 0}`,
    listDesc,
    intro,
    intro2: rawBook.intro2 ?? "",
    description,
    sales: rawBook.sales ?? 0,
    priceText: formatPrice(price),
  };
}

export function buildBooksFromApi(rawBooks) {
  return rawBooks.map((book) => buildBookFromApi(book));
}
