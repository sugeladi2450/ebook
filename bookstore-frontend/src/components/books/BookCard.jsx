import { Tag } from "antd";
import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <Link
      className="book-card"
      to={`/books/${book.id}`}
      state={{ book }}
      aria-label={`查看书籍详情：${book.title}`}
    >
      <img
        className="book-card__cover"
        src={book.cover}
        alt={`《${book.title}》封面`}
        loading="lazy"
      />
      <div className="book-card__body">
        <h2 className="book-card__name">{book.title}</h2>
        <p className="book-card__author">作者：{book.author}</p>
        <p className="book-card__desc">{book.listDesc}</p>
        <div className="book-card__footer" aria-label="价格信息">
          <span className="book-card__price">{book.priceText}</span>
          <Tag className="book-card__badge">{book.tag}</Tag>
        </div>
      </div>
    </Link>
  );
}
