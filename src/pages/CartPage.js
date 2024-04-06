// CartPage.js
import React from "react";
import { Row, Col, List, InputNumber, Button, Card } from "antd";
import { useCart } from "../context/CartContext";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import SummaryComponent from "../components/Summary";

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

  const handleCheckOutClick = (productId) => {
    navigate(`/checkout`);
  };

  return (
    <div className="cart-page-container">
      <Row gutter={[20, 20]} justify="center" className="cart-row">
        <Col xs={24} sm={24} md={18} lg={16} xl={12}>
          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item) => (
              <Card className="product-card-container">
                <Row
                  gutter={16}
                  wrap={false}
                  align="middle"
                  className="product-row"
                >
                  <Col className="product-image-col" flex="none">
                    <img
                      className="product-image"
                      alt="product"
                      src={item.thumbnail}
                    />
                  </Col>
                  <Col className="product-info-col" flex="auto">
                    <h3>{item.title}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                    <div className="quantity-and-remove">
                      <InputNumber
                        min={1}
                        value={item.quantity}
                        onChange={(value) => handleQuantityChange(item, value)}
                        onKeyDown={(e) => e.preventDefault()}
                      />
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleDeleteItem(item)}
                      >
                        Remove
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            )}
          />
        </Col>

        <Col xs={24} sm={24} md={18} lg={8} xl={6}>
          <Card className="summary-card">
            <SummaryComponent />
            <Button
              type="primary"
              block
              onClick={handleCheckOutClick}
              className="checkout-button"
            >
              Checkout
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
