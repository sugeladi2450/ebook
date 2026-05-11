import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { getCurrentUser } from "../../services/auth/authService";
import { isAdminUser } from "../../utils/userRole";

function isHomePath(path) {
  return path === "/";
}

export default function AppLayout({ navigation, site }) {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, [location.pathname]);

  useEffect(() => {
    function refreshCurrentUser() {
      setCurrentUser(getCurrentUser());
    }

    window.addEventListener("storage", refreshCurrentUser);
    window.addEventListener("focus", refreshCurrentUser);
    return () => {
      window.removeEventListener("storage", refreshCurrentUser);
      window.removeEventListener("focus", refreshCurrentUser);
    };
  }, []);

  const visibleNavigation = useMemo(
    () => navigation.filter((item) => {
      if (item.adminOnly && !isAdminUser(currentUser)) {
        return false;
      }
      if (item.customerOnly && (!currentUser || isAdminUser(currentUser))) {
        return false;
      }
      if (item.authOnly && !currentUser) {
        return false;
      }
      if (item.guestOnly && currentUser) {
        return false;
      }
      return true;
    }),
    [currentUser, navigation],
  );

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
              {visibleNavigation.map((item) => (
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
