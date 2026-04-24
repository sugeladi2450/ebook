import { useLocation, useParams } from "react-router-dom";
import BookDetailPage from "../../pages/books/BookDetailPage";
import { findBookById } from "../../services/books/bookQueryService";

export default function BookDetailRoute({ books, pageData, siteName }) {
  const { bookId } = useParams();
  const location = useLocation();
  const bookFromState = location.state?.book;
  const book = bookFromState || findBookById(books, bookId);

  return <BookDetailPage book={book} pageData={pageData} siteName={siteName} />;
}
