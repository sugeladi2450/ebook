import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

export default function BookDetailPage({ book, pageData, siteName }) {
  useEffect(() => {
    document.title = book ? `${siteName} - ${book.title}` : `${siteName} - 书籍详情`;
  }, [book, siteName]);

  if (!book) {
    return <Navigate replace to="/" />;
  }

  return (
    <article className="book-detail" aria-label="书籍详情">
      <div className="book-detail__layout">
        <section className="book-detail__cover-card site-card" aria-label="书籍封面">
          <img
            className="book-detail__cover"
            src={book.cover}
            alt={`《${book.title}》封面`}
            loading="lazy"
          />
          <p className="book-detail__cover-hint">{pageData.coverHint}</p>
          <Link className="book-detail__back" to="/">
            {pageData.backText}
          </Link>
        </section>

        <section className="book-detail__info site-card" aria-label="书籍信息">
          <header className="book-detail__header">
            <h1 className="book-detail__title">{book.title}</h1>

            <div className="book-detail__meta" aria-label="基础信息">
              <div className="book-detail__meta-row">
                <div className="book-detail__kv">
                  <span className="book-detail__k">作者</span>
                  <span className="book-detail__v">{book.author}</span>
                </div>

                <span className="book-detail__tag" aria-label="分类">
                  {book.tag}
                </span>
              </div>

              <div className="book-detail__meta-row">
                <div className="book-detail__kv">
                  <span className="book-detail__k">译者</span>
                  <span className="book-detail__v">{book.translator}</span>
                </div>

                <div className="book-detail__kv">
                  <span className="book-detail__k">ISBN</span>
                  <span className="book-detail__v">{book.isbn}</span>
                </div>
              </div>
            </div>

            <div className="book-detail__price" aria-label="价格">
              <span className="book-detail__price-label">{pageData.priceLabel}</span>
              <span className="book-detail__price-value">{book.priceText}</span>
            </div>

            <p className="book-detail__stock">{book.publishLine}</p>

            <div className="book-detail__actions" aria-label="操作按钮">
              <Link className="book-detail__button book-detail__button--cart" to="/cart">
                {pageData.addToCartText}
              </Link>
              <Link className="book-detail__button book-detail__button--buy" to="/orders">
                {pageData.buyNowText}
              </Link>
            </div>
          </header>

          <section className="book-detail__section" aria-label="书籍详情介绍">
            <h2 className="book-detail__section-title">{pageData.summaryTitle}</h2>
            <p className="book-detail__section-text">{book.intro}</p>
            <p className="book-detail__section-text">{book.intro2}</p>
          </section>
        </section>
      </div>
    </article>
  );
}

