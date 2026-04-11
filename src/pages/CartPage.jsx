import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartRow from "../components/CartRow";

function formatPrice(price) {
  return `¥ ${price.toFixed(2)}`;
}

export default function CartPage({ initialItems, pageData, siteName }) {
  const [items, setItems] = useState(initialItems);
  const [selectedAll, setSelectedAll] = useState(false);

  useEffect(() => {
    document.title = `${siteName} - ${pageData.title}`;
  }, [pageData.title, siteName]);

  const total = items.reduce((sum, item) => sum + Number(item.book.price), 0);
  const totalText = formatPrice(total);

  function handleDelete(itemId) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  }

  return (
    <section className="cart" aria-label="购物车">
      <div className="site-card">
        <header className="cart__header">
          <div className="cart__heading">
            <h1 className="cart__title">{pageData.title}</h1>
            <p className="cart__subtitle">{pageData.subtitle}</p>
          </div>

          <div className="cart__toolbar" aria-label="操作栏">
            <label className="cart__selectall" aria-label="全选">
              <input
                className="cart__checkbox"
                type="checkbox"
                name="selectAll"
                checked={selectedAll}
                onChange={(event) => setSelectedAll(event.target.checked)}
              />
              <span className="cart__selectall-text">{pageData.selectAllText}</span>
            </label>
          </div>
        </header>

        <div className="site-divider cart__divider" role="separator" aria-hidden="true"></div>

        <div className="cart__list" aria-label="购物车列表">
          {items.map((item) => (
            <CartRow key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </div>

        <footer className="cart__footer" aria-label="结算区">
          <div className="cart__total" aria-label="总计金额">
            <span className="cart__total-label">{pageData.totalLabel}</span>
            <span className="cart__total-value">{totalText}</span>
          </div>

          <Link className="cart__checkout" to="/orders" aria-label="去结算并跳转到订单页">
            {pageData.checkoutText}
          </Link>
        </footer>
      </div>
    </section>
  );
}
