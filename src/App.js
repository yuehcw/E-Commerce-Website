import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/HomePage";
import ProductSinglePage from "./pages/ProductSinglePage";
import AppHeader from "./components/Header";
import AppFooter from "./components/Footer";
import { ToastContainer } from "react-toastify";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import { SearchProvider } from "./context/SearchContext";
import "./App.css";
import CheckoutPage from "./pages/CheckoutPage";
import { CategoryProvider } from "./context/CategoryContext";
import SearchPageResultPage from "./pages/SearchPageResultPage";
import SignUpPage from "./pages/SignUpPage";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <CartProvider>
      <CategoryProvider>
        <SearchProvider>
          <UserProvider>
            <Router>
              <div className="app">
                <div className="app-header">
                  <AppHeader />
                </div>
                <div className="content">
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                      path="/product/:productId"
                      element={<ProductSinglePage />}
                    />
                    <Route path="/cart" element={<CartPage />} />
                    <Route
                      path="/category/:category"
                      element={<CategoryPage />}
                    />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route
                      path="/search-result"
                      element={<SearchPageResultPage />}
                    />
                    <Route path="/sign-up" element={<SignUpPage />} />
                  </Routes>
                </div>
                <div className="app-footer">
                  <AppFooter />
                </div>
              </div>
            </Router>
          </UserProvider>
        </SearchProvider>
      </CategoryProvider>
    </CartProvider>
  );
};

export default App;
