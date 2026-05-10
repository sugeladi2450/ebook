import { Button, Input, message } from "antd";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import { registerUser } from "../../services/auth/authService";

const initialTouched = {
  username: false,
  password: false,
  confirmPassword: false,
};

export default function RegisterPage({ pageData, siteName }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState(initialTouched);
  const [submitting, setSubmitting] = useState(false);

  usePageTitle(`${siteName} - 注册`);

  const errors = useMemo(() => {
    const usernameError = username.trim() ? "" : "请输入账号";
    let passwordError = "";
    if (!password) {
      passwordError = "请输入登录密码";
    } else if (password.length < 6) {
      passwordError = "密码至少 6 位";
    }

    let confirmPasswordError = "";
    if (!confirmPassword) {
      confirmPasswordError = "请再次输入登录密码";
    } else if (confirmPassword !== password) {
      confirmPasswordError = "两次输入的密码不一致";
    }

    return {
      username: usernameError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    };
  }, [username, password, confirmPassword]);

  const canSubmit = !errors.username && !errors.password && !errors.confirmPassword;

  function markTouched(field) {
    setTouched((current) => ({
      ...current,
      [field]: true,
    }));
  }

  function visibleError(field) {
    return touched[field] ? errors[field] : "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setTouched({
      username: true,
      password: true,
      confirmPassword: true,
    });

    if (!canSubmit) {
      return;
    }

    setSubmitting(true);
    try {
      await registerUser(username.trim(), password);
      message.success("注册成功，请登录");
      navigate("/login");
    } catch (error) {
      message.error(error.message || "注册失败，请检查参数");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="login" aria-label="注册">
      <div className="login__grid">
        <div className="login__intro">
          <h1 className="login__title">{pageData.title}</h1>
          <p className="login__subtitle">{pageData.subtitle}</p>

          <ul className="login__tips" aria-label="注册提示">
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
              <label className="login__label" htmlFor="register-username">
                {pageData.usernameLabel}
              </label>
              <Input
                className="login__input"
                id="register-username"
                name="username"
                placeholder={pageData.usernamePlaceholder}
                status={visibleError("username") ? "error" : undefined}
                value={username}
                onBlur={() => markTouched("username")}
                onChange={(event) => {
                  markTouched("username");
                  setUsername(event.target.value);
                }}
              />
              <p className={visibleError("username") ? "login__error" : "login__hint"}>
                {visibleError("username") || pageData.usernameHint}
              </p>
            </div>

            <div className="login__field">
              <label className="login__label" htmlFor="register-password">
                {pageData.passwordLabel}
              </label>
              <Input.Password
                className="login__input"
                id="register-password"
                name="password"
                placeholder={pageData.passwordPlaceholder}
                status={visibleError("password") ? "error" : undefined}
                value={password}
                onBlur={() => markTouched("password")}
                onChange={(event) => {
                  markTouched("password");
                  setPassword(event.target.value);
                }}
              />
              <p className={visibleError("password") ? "login__error" : "login__hint"}>
                {visibleError("password") || pageData.passwordHint}
              </p>
            </div>

            <div className="login__field">
              <label className="login__label" htmlFor="register-confirm-password">
                {pageData.confirmPasswordLabel}
              </label>
              <Input.Password
                className="login__input"
                id="register-confirm-password"
                name="confirmPassword"
                placeholder={pageData.confirmPasswordPlaceholder}
                status={visibleError("confirmPassword") ? "error" : undefined}
                value={confirmPassword}
                onBlur={() => markTouched("confirmPassword")}
                onChange={(event) => {
                  markTouched("confirmPassword");
                  setConfirmPassword(event.target.value);
                }}
              />
              <p className={visibleError("confirmPassword") ? "login__error" : "login__hint"}>
                {visibleError("confirmPassword") || pageData.confirmPasswordHint}
              </p>
            </div>

            <Button
              className="login__button"
              disabled={!canSubmit}
              htmlType="submit"
              loading={submitting}
              type="primary"
            >
              {pageData.buttonText}
            </Button>

            <div className="login__links" aria-label="辅助链接">
              <Link className="login__link" to="/login">
                {pageData.loginLinkText}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
