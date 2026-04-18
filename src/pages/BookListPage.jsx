import { useEffect, useState } from "react";
import BannerCarousel from "../components/BannerCarousel";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { filterBooksByKeyword } from "../services/bookService";

export default function BookListPage({ banners, books, pageData, siteName }) {
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    document.title = `${siteName} - ${pageData.title}`;
  }, [pageData.title, siteName]);

  const filteredBooks = filterBooksByKeyword(books, keyword);

  return (
    <section className="books" aria-label="书籍列表">
      <div className="site-card">
        <header className="books__header">
          <div className="books__heading">
            <h1 className="books__title">{pageData.title}</h1>
            <p className="books__subtitle">{pageData.subtitle}</p>
          </div>

          <div className="books__meta" aria-label="列表信息">
            <span className="books__chip">共 {filteredBooks.length} 本</span>
            <span className="books__chip">{pageData.gridChipText}</span>
          </div>
        </header>

        <SearchBar
          keyword={inputValue}
          onKeywordChange={setInputValue}
          onSearch={setKeyword}
          placeholder={pageData.searchPlaceholder}
          buttonText={pageData.searchButtonText}
        />

        <BannerCarousel banners={banners} />

        <div className="site-divider books__divider" role="separator" aria-hidden="true"></div>

        <div className="books__grid" aria-label="书籍网格">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
