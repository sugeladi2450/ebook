import { Button, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import { loginUser, saveCurrentUser } from "../../services/auth/authService";

export default function LoginPage({ pageData, siteName }) {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  usePageTitle(`${siteName} - 登录`);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    try {
      const user = await loginUser(account, password);
      saveCurrentUser(user);
      message.success("登录成功");
      navigate("/profile");
    } catch (error) {
      message.error(error.message || "登录失败");
    } finally {
      setSubmitting(false);
    }
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
              <Input
                className="login__input"
                id="login-account"
                name="account"
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
              <Input.Password
                className="login__input"
                id="login-password"
                name="password"
                placeholder={pageData.passwordPlaceholder}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <p className="login__hint">{pageData.passwordHint}</p>
            </div>

            <Button className="login__button" htmlType="submit" loading={submitting} type="primary">
              {pageData.buttonText}
            </Button>

            <div className="login__links" aria-label="辅助链接">
              <Link className="login__link" to="/register">
                {pageData.linkText}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
