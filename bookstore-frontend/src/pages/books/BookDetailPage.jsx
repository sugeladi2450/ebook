import { Button, Tag, message } from "antd";
import { useState } from "react";
import { Link, Navigate, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import { getCurrentUser } from "../../services/auth/authService";
import { addCartItem } from "../../services/cart/cartApiService";

export default function BookDetailPage({ pageData, siteName }) {
  const { book: loadedBook } = useLoaderData();
  const location = useLocation();
  const bookFromState = location.state?.book;
  const book = bookFromState || loadedBook;
  const [adding, setAdding] = useState(false);

  const navigate = useNavigate();

  const pageTitle = book ? `${siteName} - ${book.title}` : `${siteName} - 书籍详情`;
  usePageTitle(pageTitle);

  if (!book) {
    return <Navigate replace to="/" />;
  }

  async function handleAddToCart() {
    const user = getCurrentUser();

    if (!user) {
      message.warning("请先登录");
      navigate("/login");
      return;
    }

    setAdding(true);
    try {
      await addCartItem(user.id, book.id, 1);
      message.success("已加入购物车");
      navigate("/cart");
    } catch (error) {
      message.error(error.message || "加入购物车失败");
    } finally {
      setAdding(false);
    }
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
                loading={adding}
                onClick={handleAddToCart}
              >
                {pageData.addToCartText}
              </Button>
              <Button
                className="book-detail__button book-detail__button--buy"
                htmlType="button"
                type="primary"
                onClick={handleAddToCart}
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
