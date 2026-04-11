import { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import CartRow from "../components/CartRow";

function formatPrice(price) {
  return `¥ ${price.toFixed(2)}`;
}

export default function CartPage({ initialItems, pageData, siteName }) {
  const navigate = useNavigate();
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
            <Checkbox
              checked={selectedAll}
              className="cart__selectall"
              onChange={(event) => setSelectedAll(event.target.checked)}
            >
              {pageData.selectAllText}
            </Checkbox>
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

          <Button
            className="cart__checkout"
            htmlType="button"
            type="primary"
            onClick={() => navigate("/orders")}
          >
            {pageData.checkoutText}
          </Button>
        </footer>
      </div>
    </section>
  );
}
