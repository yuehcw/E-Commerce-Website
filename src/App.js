import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <CartProvider>
      <CategoryProvider>
        <SearchProvider>
          <Router>
            <div className="app">
              <AppHeader />
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
                </Routes>
              </div>
              <AppFooter />
            </div>
          </Router>
        </SearchProvider>
      </CategoryProvider>
    </CartProvider>
  );
};

export default App;
