import { useState } from "react";
import { Button, Checkbox, message } from "antd";
import { useLoaderData, useNavigate } from "react-router-dom";
import CartRow from "../../components/cart/CartRow";
import usePageTitle from "../../hooks/usePageTitle";
import { calculateSelectedCartTotal, removeCartItem } from "../../services/cart/cartService";
import { deleteCartItem } from "../../services/cart/cartApiService";
import { checkoutCart } from "../../services/orders/orderApiService";
import { formatPrice } from "../../utils/formatters";

export default function CartPage({ pageData, siteName }) {
  const { cartItems, user } = useLoaderData();
  const navigate = useNavigate();
  const [items, setItems] = useState(cartItems);
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [checkingOut, setCheckingOut] = useState(false);

  usePageTitle(`${siteName} - ${pageData.title}`);

  const selectedCount = selectedIds.size;
  const selectedAll = items.length > 0 && selectedCount === items.length;
  const selectedSome = selectedCount > 0 && !selectedAll;
  const total = calculateSelectedCartTotal(items, selectedIds);
  const totalText = formatPrice(total);

  function handleSelectAll(checked) {
    setSelectedIds(checked ? new Set(items.map((item) => String(item.id))) : new Set());
  }

  function handleSelectItem(itemId, checked) {
    setSelectedIds((currentIds) => {
      const nextIds = new Set(currentIds);
      const normalizedId = String(itemId);

      if (checked) {
        nextIds.add(normalizedId);
      } else {
        nextIds.delete(normalizedId);
      }

      return nextIds;
    });
  }

  async function handleDelete(itemId) {
    try {
      await deleteCartItem(user.id, itemId);
      setItems((currentItems) => removeCartItem(currentItems, itemId));
      setSelectedIds((currentIds) => {
        const nextIds = new Set(currentIds);
        nextIds.delete(String(itemId));
        return nextIds;
      });
      message.success("已从购物车删除");
    } catch (error) {
      message.error(error.message || "删除失败");
    }
  }

  async function handleCheckout() {
    setCheckingOut(true);

    try {
      const cartItemIds = Array.from(selectedIds).map((itemId) => Number(itemId));
      await checkoutCart(user.id, cartItemIds);
      message.success("下单成功");
      setItems((currentItems) => currentItems.filter((item) => !selectedIds.has(String(item.id))));
      setSelectedIds(new Set());
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
              disabled={items.length === 0}
              indeterminate={selectedSome}
              onChange={(event) => handleSelectAll(event.target.checked)}
            >
              {pageData.selectAllText}
            </Checkbox>
          </div>
        </header>

        <div className="site-divider cart__divider" role="separator" aria-hidden="true"></div>

        <div className="cart__list" aria-label="购物车列表">
          {items.length > 0 ? (
            items.map((item) => (
              <CartRow
                key={item.id}
                checked={selectedIds.has(String(item.id))}
                item={item}
                onDelete={handleDelete}
                onSelect={handleSelectItem}
              />
            ))
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
            disabled={selectedCount === 0}
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
