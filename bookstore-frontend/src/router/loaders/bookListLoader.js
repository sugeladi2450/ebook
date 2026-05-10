import { fetchBookById, fetchBooks } from "../../services/books/bookApiService";
import { filterBooksByKeyword } from "../../services/books/bookQueryService";

export function createBookListLoader() {
  return async function bookListLoader({ request }) {
    const url = new URL(request.url);
    const keyword = url.searchParams.get("q") ?? "";
    let books = [];

    try {
      books = await fetchBooks();
    } catch (error) {
      console.warn("Failed to load books from backend.", error);
    }

    return {
      keyword,
      filteredBooks: filterBooksByKeyword(books, keyword),
    };
  };
}

export function createBookDetailLoader() {
  return async function bookDetailLoader({ params }) {
    try {
      return {
        book: await fetchBookById(params.bookId),
      };
    } catch (error) {
      console.warn("Failed to load book detail from backend.", error);
      return {
        book: null,
      };
    }
  };
}
