import { fetchBookById, fetchBooks } from "../../services/books/bookApiService";
import { filterBooksByKeyword, findBookById } from "../../services/books/bookQueryService";

export function createBookListLoader(appData) {
  return async function bookListLoader({ request }) {
    const url = new URL(request.url);
    const keyword = url.searchParams.get("q") ?? "";
    let books = appData.books;

    try {
      books = await fetchBooks();
    } catch (error) {
      console.warn("Failed to load books from backend, falling back to local data.", error);
    }

    return {
      keyword,
      filteredBooks: filterBooksByKeyword(books, keyword),
    };
  };
}

export function createBookDetailLoader(appData) {
  return async function bookDetailLoader({ params }) {
    const fallbackBook = findBookById(appData.books, params.bookId);

    try {
      return {
        book: await fetchBookById(params.bookId),
      };
    } catch (error) {
      console.warn("Failed to load book detail from backend, falling back to local data.", error);
      return {
        book: fallbackBook,
      };
    }
  };
}
