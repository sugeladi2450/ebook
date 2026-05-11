import { Tag } from "antd";

function formatCreatedAt(value) {
  if (!value) {
    return "未知时间";
  }

  return String(value).replace("T", " ").slice(0, 16);
}

export default function OrderRow({ admin = false, order }) {
  const bookTitle =
    order.book?.title ?? order.items?.map((item) => item.book.title).join(" / ") ?? "未知书籍";
  const statusClassName =
    order.status === "pending"
      ? "order-row__status order-row__status--pending"
      : "order-row__status order-row__status--done";

  return (
    <article className="order-row" aria-label={`订单：${order.statusText}`}>
      <div className="order-row__no">
        <span>订单号：{order.id}</span>
        <span className="order-row__time">{formatCreatedAt(order.createdAt)}</span>
      </div>
      <div className="order-row__book">
        <span>书籍：{bookTitle}</span>
        {admin ? <span className="order-row__user">用户ID：{order.userId}</span> : null}
      </div>
      <div className="order-row__amount">{order.amountText}</div>
      <Tag className={statusClassName}>{order.statusText}</Tag>
    </article>
  );
}

