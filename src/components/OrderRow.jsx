export default function OrderRow({ order }) {
  const statusClassName =
    order.status === "pending"
      ? "order-row__status order-row__status--pending"
      : "order-row__status order-row__status--done";

  return (
    <article className="order-row" aria-label={`订单：${order.statusText}`}>
      <div className="order-row__no">订单号：{order.id}</div>
      <div className="order-row__book">书籍：{order.book.title}</div>
      <div className="order-row__amount">{order.amountText}</div>
      <div className={statusClassName}>{order.statusText}</div>
    </article>
  );
}

