import React from "react";
import { useCart } from "../context/CartContext";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import SummaryComponent from "../components/Summary";
import { ShoppingCartOutlined } from "@ant-design/icons";

const CartPage = () => {
  const { items, updateItem } = useCart();
  const navigate = useNavigate();

  const handleDeleteItem = (item) => {
    Modal.confirm({
      title: "Are you sure you want to remove this item?",
      content: item.title,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        updateItem(item, 0);
      },
    });
  };

  const handleQuantityChange = (item, newQuantity) => {
    updateItem(item, newQuantity - item.quantity);
  };

  const handleCheckOutClick = () => {
    navigate(`/checkout`);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="cart-page-container">
      {items.length === 0 ? (
        <div className="empty-cart-container">
          <div>
            <ShoppingCartOutlined className="empty-cart-icon" />
            <div className="empty-cart-message">Your cart is empty</div>
          </div>
        </div>
      ) : (
        <div className="product-list">
          {items.map((item) => (
            <div className="product-card-container" key={item.id}>
              <div className="product-image-col">
                <img
                  className="product-image"
                  alt="product"
                  src={item.thumbnail}
                  onClick={() => handleProductClick(item.id)}
                />
              </div>
              <div className="product-info-col">
                <h3>{item.title}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
                <div className="quantity-and-remove">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    className="cart-input"
                    onChange={(e) =>
                      handleQuantityChange(item, parseInt(e.target.value))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {items.length > 0 && (
        <div className="summary-section">
          <SummaryComponent />
          <button
            type="button"
            onClick={handleCheckOutClick}
            className="checkout-button"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
