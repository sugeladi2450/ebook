import { Link } from "react-router-dom";

export default function AddressItem({ address }) {
  return (
    <li className="address-item" aria-label={`地址 ${address.name}`}>
      <div className="address-item__top">
        <span className="address-item__name">{address.name}</span>
        <span className="address-item__phone">{address.phone}</span>
        {address.tag ? <span className="address-item__tag">{address.tag}</span> : null}
      </div>
      <div className="address-item__detail">{address.detail}</div>
      <div className="address-item__actions" aria-label="地址操作">
        <Link className="profile-link" to="/profile">
          编辑
        </Link>
        <Link className="profile-link profile-link--danger" to="/profile">
          删除
        </Link>
      </div>
    </li>
  );
}

