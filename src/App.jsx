import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import { findBookById, getAppData } from "./data/library";
import BookDetailPage from "./pages/BookDetailPage";
import BookListPage from "./pages/BookListPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";

const appData = getAppData();

function BookDetailRoute() {
  const { bookId } = useParams();
  const location = useLocation();
  const bookFromState = location.state?.book;
  const book =
    bookFromState?.id === bookId ? bookFromState : findBookById(appData.books, bookId);

  return (
    <BookDetailPage
      book={book}
      pageData={appData.detailPage}
      siteName={appData.site.name}
    />
  );
}

export default function App() {
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
        <Route path="/books/:bookId" element={<BookDetailRoute />} />
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
          element={
            <ProfilePage
              pageData={appData.profilePage}
              siteName={appData.site.name}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage
              pageData={appData.loginPage}
              siteName={appData.site.name}
            />
          }
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  );
}
