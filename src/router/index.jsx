import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import BookListPage from "../pages/BookListPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import OrdersPage from "../pages/OrdersPage";
import ProfilePage from "../pages/ProfilePage";
import BookDetailRoute from "./BookDetailRoute";

export default function AppRouter({ appData }) {
  return (
    <Routes>
      <Route element={<AppLayout navigation={appData.navigation} site={appData.site} />}>
        <Route
          index
          element={
            <BookListPage
              banners={appData.banners}
              books={appData.books}
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
      </Route>
    </Routes>
  );
}
