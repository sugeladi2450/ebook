import OrderRow from "../../components/orders/OrderRow";
import usePageTitle from "../../hooks/usePageTitle";

export default function OrdersPage({ orders, pageData, siteName }) {
  usePageTitle(`${siteName} - ${pageData.title}`);

  return (
    <section className="orders" aria-label="订单列表">
      <div className="site-card">
        <header className="orders__header">
          <div className="orders__heading">
            <h1 className="orders__title">{pageData.title}</h1>
            <p className="orders__subtitle">{pageData.subtitle}</p>
          </div>
        </header>

        <div className="site-divider orders__divider" role="separator" aria-hidden="true"></div>

        <div className="orders__list" aria-label="订单列表">
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </div>
      </div>
    </section>
  );
}
