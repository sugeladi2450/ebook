import { Button, Popconfirm, Tag } from "antd";

export default function AddressItem({ address, deleting, onDelete, onEdit }) {
  const fullDetail = [address.province, address.city, address.district, address.detail]
    .filter(Boolean)
    .join(" ");

  return (
    <li className="address-item" aria-label={`地址 ${address.receiver ?? address.name}`}>
      <div className="address-item__top">
        <span className="address-item__name">{address.receiver ?? address.name}</span>
        <span className="address-item__phone">{address.phone}</span>
        {address.defaultAddress || address.tag ? (
          <Tag className="address-item__tag">{address.tag ?? "默认"}</Tag>
        ) : null}
      </div>
      <div className="address-item__detail">{fullDetail}</div>
      <div className="address-item__actions" aria-label="地址操作">
        <Button className="profile-link" htmlType="button" type="text" onClick={() => onEdit(address)}>
          编辑
        </Button>
        <Popconfirm
          title="删除收货地址"
          description="确认删除这条收货地址吗？"
          okText="删除"
          cancelText="取消"
          okButtonProps={{ danger: true, loading: deleting }}
          onConfirm={() => onDelete(address.id)}
        >
          <Button
            className="profile-link profile-link--danger"
            danger
            htmlType="button"
            loading={deleting}
            type="text"
          >
            删除
          </Button>
        </Popconfirm>
      </div>
    </li>
  );
}
