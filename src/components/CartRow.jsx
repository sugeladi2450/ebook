export default function CartRow({ item, onDelete }) {
  return (
    <article className="cart-row" aria-label={`购物车条目：${item.book.title}`}>
      <div className="cart-row__main">
        <h2 className="cart-row__title">{item.book.title}</h2>
        <p className="cart-row__author">作者：{item.book.author}</p>
      </div>
      <div className="cart-row__author-col" aria-label="作者">
        {item.authorShort}
      </div>
      <div className="cart-row__price" aria-label="单价">
        {item.priceText}
      </div>
      <button className="cart-row__delete" type="button" onClick={() => onDelete(item.id)}>
        删除
      </button>
    </article>
  );
}

