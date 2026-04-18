import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../pages/auth/LoginPage";
import BookListPage from "../pages/books/BookListPage";
import CartPage from "../pages/cart/CartPage";
import OrdersPage from "../pages/orders/OrdersPage";
import ProfilePage from "../pages/profile/ProfilePage";
import BookDetailRoute from "./routes/BookDetailRoute";
import { createBookListLoader } from "./loaders/bookListLoader";

export function createAppRouter(appData) {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout navigation={appData.navigation} site={appData.site} />}>
        <Route
          index
          loader={createBookListLoader(appData)}
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
          element={
            <BookDetailRoute
              books={appData.books}
              pageData={appData.detailPage}
              siteName={appData.site.name}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              initialItems={appData.cartItems}
              pageData={appData.cartPage}
              siteName={appData.site.name}
            />
          }
        />
        <Route
          path="/orders"
          element={
            <OrdersPage
              orders={appData.orders}
              pageData={appData.ordersPage}
              siteName={appData.site.name}
            />
          }
        />
        <Route
          path="/profile"
          element={<ProfilePage pageData={appData.profilePage} siteName={appData.site.name} />}
        />
        <Route
          path="/login"
          element={<LoginPage pageData={appData.loginPage} siteName={appData.site.name} />}
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>,
    ),
  );
}
