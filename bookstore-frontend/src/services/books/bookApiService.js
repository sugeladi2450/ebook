import { buildBookFromApi, buildBooksFromApi } from "./bookDataService";
import { requestJson } from "../apiClient";

export async function fetchBooks() {
  const books = await requestJson("/api/v1/books");
  return buildBooksFromApi(books);
}

export async function fetchBookById(bookId) {
  const book = await requestJson(`/api/v1/book/${encodeURIComponent(bookId)}`);
  return buildBookFromApi(book);
}
