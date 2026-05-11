import { Button, Empty, Modal, Radio, Spin, Tag } from "antd";
import { useEffect, useMemo, useState } from "react";
import { formatPrice } from "../../utils/formatters";

function getItemSubtotal(item) {
  return Number(item.book?.price ?? 0) * Number(item.number ?? 1);
}

function buildAddressText(address) {
  return [address.province, address.city, address.district, address.detail].filter(Boolean).join(" ");
}

export default function CheckoutModal({
  addresses = [],
  items = [],
  loadingAddresses = false,
  onCancel,
  onManageAddresses,
  onSubmit,
  open,
  submitting = false,
}) {
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const total = useMemo(() => items.reduce((sum, item) => sum + getItemSubtotal(item), 0), [items]);
  const hasAddress = addresses.length > 0;

  useEffect(() => {
    if (!open) {
      setSelectedAddressId(null);
      return;
    }

    const defaultAddress = addresses.find((address) => address.defaultAddress);
    setSelectedAddressId(defaultAddress?.id ?? addresses[0]?.id ?? null);
  }, [addresses, open]);

  function handleSubmit() {
    if (!selectedAddressId) {
      return;
    }
    onSubmit?.(selectedAddressId);
  }

  return (
    <Modal
      centered
      className="checkout-modal"
      confirmLoading={submitting}
      okButtonProps={{ disabled: !hasAddress || !selectedAddressId || items.length === 0 }}
      okText="提交订单"
      open={open}
      title="确认订单"
      width={760}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <div className="checkout-modal__body">
        <section className="checkout-modal__section" aria-label="确认商品">
          <h3 className="checkout-modal__section-title">确认商品</h3>
          <div className="checkout-modal__items">
            {items.map((item) => (
              <article className="checkout-modal__item" key={`${item.id}-${item.book?.id}`}>
                <img
                  alt={`${item.book?.title ?? "书籍"}封面`}
                  className="checkout-modal__cover"
                  src={item.book?.cover}
                />
                <div className="checkout-modal__item-main">
                  <div className="checkout-modal__book-title">{item.book?.title}</div>
                  <div className="checkout-modal__book-meta">
                    <span>{item.book?.author}</span>
                    <span>数量 x {item.number ?? 1}</span>
                  </div>
                </div>
                <div className="checkout-modal__subtotal">{formatPrice(getItemSubtotal(item))}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="checkout-modal__section" aria-label="选择地址">
          <div className="checkout-modal__section-head">
            <h3 className="checkout-modal__section-title">选择地址</h3>
            <Button htmlType="button" type="link" onClick={onManageAddresses}>
              管理地址
            </Button>
          </div>

          <Spin spinning={loadingAddresses}>
            {hasAddress ? (
              <Radio.Group
                className="checkout-modal__address-list"
                value={selectedAddressId}
                onChange={(event) => setSelectedAddressId(event.target.value)}
              >
                {addresses.map((address) => (
                  <Radio className="checkout-modal__address" key={address.id} value={address.id}>
                    <span className="checkout-modal__address-main">
                      <span className="checkout-modal__address-top">
                        <strong>{address.receiver ?? address.name}</strong>
                        <span>{address.phone}</span>
                        {address.defaultAddress ? <Tag color="green">默认</Tag> : null}
                      </span>
                      <span className="checkout-modal__address-detail">{buildAddressText(address)}</span>
                    </span>
                  </Radio>
                ))}
              </Radio.Group>
            ) : (
              <Empty
                description="暂无收货地址，请先新增地址后再提交订单"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              >
                <Button htmlType="button" type="primary" onClick={onManageAddresses}>
                  去新增地址
                </Button>
              </Empty>
            )}
          </Spin>
        </section>

        <section className="checkout-modal__summary" aria-label="确认金额">
          <span>确认金额</span>
          <strong>{formatPrice(total)}</strong>
        </section>
      </div>
    </Modal>
  );
}
