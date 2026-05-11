import { Tag } from "antd";
import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <Link
      aria-label={`查看书籍详情：${book.title}`}
      className="book-card"
      state={{ book }}
      to={`/books/${book.id}`}
    >
      <img
        alt={`《${book.title}》封面`}
        className="book-card__cover"
        loading="lazy"
        src={book.cover}
      />
      <div className="book-card__body">
        <h2 className="book-card__name">{book.title}</h2>
        <p className="book-card__author">作者：{book.author}</p>
        <div className="book-card__meta" aria-label="书籍编号和库存">
          <span>ISBN：{book.isbn || "未填写"}</span>
          <span>库存：{book.stock ?? 0}</span>
        </div>
        <p className="book-card__desc">{book.listDesc}</p>
        <div className="book-card__footer" aria-label="价格信息">
          <span className="book-card__price">{book.priceText}</span>
          <Tag className="book-card__badge">{book.tag}</Tag>
        </div>
      </div>
    </Link>
  );
}

