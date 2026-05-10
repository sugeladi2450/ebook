import { Button, Checkbox } from "antd";

export default function CartRow({ checked, item, onDelete, onSelect }) {
  return (
    <article className="cart-row" aria-label={`购物车条目：${item.book.title}`}>
      <Checkbox
        checked={checked}
        className="cart-row__check"
        aria-label={`选择《${item.book.title}》`}
        onChange={(event) => onSelect(item.id, event.target.checked)}
      />
      <div className="cart-row__main">
        <h2 className="cart-row__title">{item.book.title}</h2>
        <p className="cart-row__author">作者：{item.book.author}</p>
      </div>
      <div className="cart-row__author-col" aria-label="作者">
        数量：{item.number ?? 1}
      </div>
      <div className="cart-row__price" aria-label="单价">
        {item.subtotalText ?? item.priceText}
      </div>
      <Button className="cart-row__delete" danger htmlType="button" onClick={() => onDelete(item.id)}>
        删除
      </Button>
    </article>
  );
}
