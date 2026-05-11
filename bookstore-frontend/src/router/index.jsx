import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import AdminBooksPage from "../pages/admin/AdminBooksPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import BookListPage from "../pages/books/BookListPage";
import CartPage from "../pages/cart/CartPage";
import OrdersPage from "../pages/orders/OrdersPage";
import ProfilePage from "../pages/profile/ProfilePage";
import BookDetailPage from "../pages/books/BookDetailPage";
import { createBookDetailLoader, createBookListLoader } from "./loaders/bookListLoader";
import {
  createAdminLoader,
  createAdminOrdersLoader,
  createCartLoader,
  createOrdersLoader,
  createProfileLoader,
} from "./loaders/accountLoaders";

// 创建应用路由：定义整个应用的路由结构，包括每个页面对应的路径、组件和数据加载器等信息
export function createAppRouter(appData) {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout navigation={appData.navigation} site={appData.site} />}>
        <Route
          // 默认子路由，用户访问 / 根路径时，渲染这个页面（首页）
          index
          loader={createBookListLoader()}
          element={
            <BookListPage
              banners={appData.banners}
              pageData={appData.homePage}
              siteName={appData.site.name}
            />
          }
        />
        <Route
          path="/books/:bookId"
          loader={createBookDetailLoader()}
          element={
            <BookDetailPage
              pageData={appData.detailPage}
              siteName={appData.site.name}
            />
          }
        />
        <Route
          path="/cart"
          loader={createCartLoader()}
          element={
            <CartPage
              pageData={appData.cartPage}
              siteName={appData.site.name}
            />
          }
        />
        <Route
          path="/orders"
          loader={createOrdersLoader()}
          element={
            <OrdersPage
              pageData={appData.ordersPage}
              siteName={appData.site.name}
            />
          }
        />
        <Route
          path="/profile"
          loader={createProfileLoader()}
          element={<ProfilePage pageData={appData.profilePage} siteName={appData.site.name} />}
        />
        <Route
          path="/admin/users"
          loader={createAdminLoader()}
          element={<AdminUsersPage siteName={appData.site.name} />}
        />
        <Route
          path="/admin/books"
          loader={createAdminLoader()}
          element={<AdminBooksPage siteName={appData.site.name} />}
        />
        <Route
          path="/admin/orders"
          loader={createAdminOrdersLoader()}
          element={
            <OrdersPage
              admin
              pageData={appData.ordersPage}
              siteName={appData.site.name}
            />
          }
        />
        <Route
          path="/login"
          element={<LoginPage pageData={appData.loginPage} siteName={appData.site.name} />}
        />
        <Route
          path="/register"
          element={<RegisterPage pageData={appData.registerPage} siteName={appData.site.name} />}
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>,
    ),
  );
}
