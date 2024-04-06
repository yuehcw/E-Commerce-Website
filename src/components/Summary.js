import React from "react";
import { Col, Card } from "antd";
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
    <Col xs={24} sm={24} md={12} lg={8} xl={6} className="summary-card">
      <Card>
        <h2>Summary</h2>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Shipping: ${shippingCost.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <h3>Total: ${total.toFixed(2)}</h3>
      </Card>
    </Col>
  );
};

export default SummaryComponent;
