import { useEffect } from "react";
import { Button, Tag } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";

// 书籍详情页面组件：接收 book、pageData 和 siteName 作为 props，展示书籍的详细信息，包括封面、标题、作者、价格等，同时提供加入购物车和立即购买的按钮。页面还会根据书籍信息动态设置文档标题，并且如果没有找到对应的书籍，则自动跳转回首页。
export default function BookDetailPage({ book, pageData, siteName }) {
  const navigate = useNavigate();

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

                <Tag className="book-detail__tag" aria-label="分类">
                  {book.tag}
                </Tag>
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
              <Button
                className="book-detail__button book-detail__button--cart"
                htmlType="button"
                onClick={() => navigate("/cart")}
              >
                {pageData.addToCartText}
              </Button>
              <Button
                className="book-detail__button book-detail__button--buy"
                htmlType="button"
                type="primary"
                onClick={() => navigate("/orders")}
              >
                {pageData.buyNowText}
              </Button>
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
