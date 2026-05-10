import { Link } from "react-router-dom";
import { clearCurrentUser } from "../../services/auth/authService";

export default function SettingsItem({ item }) {
  const className = item.danger
    ? "settings-item__link settings-item__link--danger"
    : "settings-item__link";
  const isLogout = item.id === "logout";

  function handleClick() {
    if (isLogout) {
      clearCurrentUser();
    }
  }

  return (
    <li className="settings-item">
      <Link className={className} to={item.path} onClick={handleClick}>
        <span className="settings-item__label">{item.label}</span>
        <span className="settings-item__hint">{item.hint}</span>
        <span className="settings-item__arrow" aria-hidden="true">
          ›
        </span>
      </Link>
    </li>
  );
}
