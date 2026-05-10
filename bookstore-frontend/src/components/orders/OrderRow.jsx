import { Tag } from "antd";

export default function OrderRow({ order }) {
  const bookTitle =
    order.book?.title ?? order.items?.map((item) => item.book.title).join(" / ") ?? "未知书籍";
  const statusClassName =
    order.status === "pending"
      ? "order-row__status order-row__status--pending"
      : "order-row__status order-row__status--done";

  return (
    <article className="order-row" aria-label={`订单：${order.statusText}`}>
      <div className="order-row__no">订单号：{order.id}</div>
      <div className="order-row__book">书籍：{bookTitle}</div>
      <div className="order-row__amount">{order.amountText}</div>
      <Tag className={statusClassName}>{order.statusText}</Tag>
    </article>
  );
}
