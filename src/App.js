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

const App = () => {
  return (
    <CartProvider>
      <SearchProvider>
        <Router>
          <div className="app">
            <AppHeader />
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
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
            <div className="app-footer">
              <AppFooter />
            </div>
          </div>
        </Router>
      </SearchProvider>
    </CartProvider>
  );
};

export default App;
