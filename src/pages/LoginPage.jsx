import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage({ pageData, siteName }) {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = `${siteName} - 登录`;
  }, [siteName]);

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/profile", {
      state: {
        account,
      },
    });
  }

  return (
    <section className="login" aria-label="登录">
      <div className="login__grid">
        <div className="login__intro">
          <h1 className="login__title">{pageData.title}</h1>
          <p className="login__subtitle">{pageData.subtitle}</p>

          <ul className="login__tips" aria-label="登录提示">
            {pageData.tips.map((tip) => (
              <li key={tip} className="login__tip">
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="login__panel site-card">
          <header className="login__panel-header">
            <h2 className="login__panel-title">{pageData.panelTitle}</h2>
            <p className="login__panel-desc">{pageData.panelDesc}</p>
          </header>

          <form className="login__form" onSubmit={handleSubmit}>
            <div className="login__field">
              <label className="login__label" htmlFor="login-account">
                {pageData.accountLabel}
              </label>
              <input
                className="login__input"
                id="login-account"
                name="account"
                type="text"
                autoComplete="username"
                placeholder={pageData.accountPlaceholder}
                required
                value={account}
                onChange={(event) => setAccount(event.target.value)}
              />
              <p className="login__hint">{pageData.accountHint}</p>
            </div>

            <div className="login__field">
              <label className="login__label" htmlFor="login-password">
                {pageData.passwordLabel}
              </label>
              <input
                className="login__input"
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder={pageData.passwordPlaceholder}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <p className="login__hint">{pageData.passwordHint}</p>
            </div>

            <button className="login__button" type="submit">
              {pageData.buttonText}
            </button>

            <div className="login__links" aria-label="辅助链接">
              <Link className="login__link" to="/profile">
                {pageData.linkText}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
