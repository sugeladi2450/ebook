import { useLoaderData } from "react-router-dom";
import BannerCarousel from "../../components/books/BannerCarousel";
import BookCard from "../../components/books/BookCard";
import BookSearchForm from "../../components/books/BookSearchForm";
import useBookSearch from "../../hooks/useBookSearch";
import usePageTitle from "../../hooks/usePageTitle";

export default function BookListPage({ banners, pageData, siteName }) {
  const { filteredBooks, keyword } = useLoaderData();
  const search = useBookSearch(keyword);

  usePageTitle(`${siteName} - ${pageData.title}`);

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

        <BookSearchForm
          value={search.inputValue}
          placeholder={pageData.searchPlaceholder}
          buttonText={pageData.searchButtonText}
          onChange={search.handleInputChange}
          onCompositionStart={search.handleCompositionStart}
          onCompositionEnd={search.handleCompositionEnd}
          onSubmit={search.handleSubmit}
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
