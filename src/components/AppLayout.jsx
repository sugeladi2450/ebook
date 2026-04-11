import { Link, NavLink, Outlet } from "react-router-dom";

function isHomePath(path) {
  return path === "/";
}

export default function AppLayout({ navigation, site }) {
  return (
    <div className="site-page">
      <header className="site-header">
        <div className="site-container">
          <nav className="site-nav" aria-label="主导航">
            <Link className="site-brand" to="/" aria-label="进入书籍列表">
              <img className="site-brand__logo" src={site.logo} alt={`${site.name} Logo`} />
              <span className="site-brand__name">{site.name}</span>
            </Link>

            <ul className="site-nav__list">
              {navigation.map((item) => (
                <li key={item.path}>
                  <NavLink
                    className="site-nav__link"
                    end={isHomePath(item.path)}
                    to={item.path}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="site-main">
        <div className="site-container">
          <Outlet />
        </div>
      </main>

      <footer className="site-footer">
        <div className="site-container">
          <p className="site-footer__text">{site.footerText}</p>
        </div>
      </footer>
    </div>
  );
}
