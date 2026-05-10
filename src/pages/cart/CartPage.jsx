import { useState } from "react";
import { Button, Checkbox, message } from "antd";
import { useLoaderData, useNavigate } from "react-router-dom";
import CartRow from "../../components/cart/CartRow";
import usePageTitle from "../../hooks/usePageTitle";
import { calculateCartTotal, removeCartItem } from "../../services/cart/cartService";
import { deleteCartItem } from "../../services/cart/cartApiService";
import { checkoutCart } from "../../services/orders/orderApiService";
import { formatPrice } from "../../utils/formatters";

export default function CartPage({ pageData, siteName }) {
  const { cartItems, user } = useLoaderData();
  const navigate = useNavigate();
  const [items, setItems] = useState(cartItems);
  const [selectedAll, setSelectedAll] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  usePageTitle(`${siteName} - ${pageData.title}`);

  const total = calculateCartTotal(items);
  const totalText = formatPrice(total);

  async function handleDelete(itemId) {
    try {
      await deleteCartItem(user.id, itemId);
      setItems((currentItems) => removeCartItem(currentItems, itemId));
      message.success("已从购物车删除");
    } catch (error) {
      message.error(error.message || "删除失败");
    }
  }

  async function handleCheckout() {
    setCheckingOut(true);

    try {
      await checkoutCart(user.id);
      message.success("下单成功");
      setItems([]);
      navigate("/orders");
    } catch (error) {
      message.error(error.message || "下单失败");
    } finally {
      setCheckingOut(false);
    }
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
          {items.length > 0 ? (
            items.map((item) => <CartRow key={item.id} item={item} onDelete={handleDelete} />)
          ) : (
            <p className="cart__empty">购物车暂无书籍</p>
          )}
        </div>

        <footer className="cart__footer" aria-label="结算区">
          <div className="cart__total" aria-label="总计金额">
            <span className="cart__total-label">{pageData.totalLabel}</span>
            <span className="cart__total-value">{totalText}</span>
          </div>

          <Button
            className="cart__checkout"
            htmlType="button"
            disabled={items.length === 0}
            loading={checkingOut}
            type="primary"
            onClick={handleCheckout}
          >
            {pageData.checkoutText}
          </Button>
        </footer>
      </div>
    </section>
  );
}
