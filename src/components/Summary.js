import React from "react";
import { Card } from "antd";
import { useCart } from "../context/CartContext";
import "./Summary.css";

const SummaryComponent = () => {
  const { items } = useCart();

  const subtotal =
    items.length > 0
      ? items.reduce((total, item) => total + item.quantity * item.price, 0)
      : 0;

  const shippingCost = items.length > 0 ? 7 : 0;
  const TAX_RATE = 0.0725;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shippingCost + tax;

  return (
    <Card className="summary-card">
      <h2 className="summary">Summary</h2>
      <p className="subtotal">Subtotal: ${subtotal.toFixed(2)}</p>
      <p className="shipping">Shipping: ${shippingCost.toFixed(2)}</p>
      <p className="tax">Tax: ${tax.toFixed(2)}</p>
      <h3 className="total">Total: ${total.toFixed(2)}</h3>
    </Card>
  );
};

export default SummaryComponent;
