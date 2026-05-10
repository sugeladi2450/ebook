export function findBookById(books, bookId) {
  return books.find((book) => String(book.id) === String(bookId));
}

export function matchesBookKeyword(book, keyword) {
  if (!keyword.trim()) {
    return true;
  }

  const normalizedKeyword = keyword.trim().toLowerCase();

  return [book.title, book.author, book.isbn]
    .join(" ")
    .toLowerCase()
    .includes(normalizedKeyword);
}

export function filterBooksByKeyword(books, keyword) {
  return books.filter((book) => matchesBookKeyword(book, keyword));
}
