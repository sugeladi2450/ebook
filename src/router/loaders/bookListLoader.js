import { filterBooksByKeyword } from "../../services/books/bookQueryService";

export function createBookListLoader(appData) {
  return function bookListLoader({ request }) {
    const url = new URL(request.url);
    const keyword = url.searchParams.get("q") ?? "";

    return {
      keyword,
      filteredBooks: filterBooksByKeyword(appData.books, keyword),
    };
  };
}
