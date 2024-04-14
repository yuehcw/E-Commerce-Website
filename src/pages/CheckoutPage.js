import React from "react";
import { Card, List, Button, Form, Input, Select, Checkbox } from "antd";
import { useCart } from "../context/CartContext";
import SummaryComponent from "../components/Summary";
import "./CheckOutPage.css";
import { useForm } from "antd/lib/form/Form";

const CheckoutPage = () => {
  const { items } = useCart();
  const [form] = useForm();

  return (
    <div className="checkout-container">
      <div className="delivery-section">
        <div className="payment-section">
          <Card title="Payment Information">
            <Form form={form} layout="vertical">
              <Form.Item
                name="cardNumber"
                label="Card number"
                rules={[
                  { required: true, message: "Please input your card number!" },
                ]}
              >
                <Input placeholder="Enter your card number" />
              </Form.Item>
              <Form.Item
                name="nameOnCard"
                label="Name on card"
                rules={[
                  { required: true, message: "Please input the name on card!" },
                ]}
              >
                <Input placeholder="Enter the name on card" />
              </Form.Item>
              <Form.Item label="Expiration date" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="expirationMonth"
                  rules={[{ required: true, message: "Month is required" }]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginRight: "8px",
                  }}
                >
                  <Select placeholder="Month">
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {String(i + 1).padStart(2, "0")}
                      </option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="expirationYear"
                  rules={[{ required: true, message: "Year is required" }]}
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                >
                  <Select placeholder="Year">
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={new Date().getFullYear() + i}>
                        {new Date().getFullYear() + i}
                      </option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>
              <Form.Item
                name="securityCode"
                label="Security Code (CVV/CVC)"
                rules={[
                  { required: true, message: "Security code is required" },
                ]}
              >
                <Input placeholder="Security code" />
              </Form.Item>
              <Form.Item>
                <Checkbox>Set as default payment method.</Checkbox>
              </Form.Item>
            </Form>
          </Card>
        </div>
        <div className="delivery-section1">
          <Card title="Delivery Options">
            <Form form={form} layout="vertical">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input placeholder="Enter your first name" />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
              >
                <Input placeholder="Enter your last name" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <Input placeholder="Start typing address" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
      <div className="summary-section">
        <div className="product-inbag">
          <Card title="In Your Bag" className="card-title-checkout">
            <List
              dataSource={items}
              renderItem={(item) => (
                <div className="cart-item">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="cart-item-image"
                  />
                  <div>
                    <h5>{item.title}</h5>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: {item.price}</p>
                  </div>
                </div>
              )}
            />
          </Card>
        </div>
        <div className="summary-checkout">
          <SummaryComponent />
          <Button type="primary" className="checkout-button">
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
