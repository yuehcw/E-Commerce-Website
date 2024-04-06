import React from "react";
import { Row, Col, Card, List, Button, Form, Input } from "antd";
import { useCart } from "../context/CartContext";
import SummaryComponent from "../components/Summary";
import "./CheckOutPage.css";
import { useForm } from "antd/es/form/Form";

const CheckoutPage = () => {
  const { items } = useCart();
  const [form] = useForm();

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

  return (
    <Row gutter={24} className="checkout-page">
      <Col span={14} className="delivery-options">
        <Card title="Delivery Options">
          <Form {...formItemLayout} form={form}>
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
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={10} className="order-summary">
        <Card title="In Your Bag">
          <List
            dataSource={items}
            renderItem={(item) => (
              <List.Item>
                <Row className="cart-item">
                  <Col span={4}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="cart-item-image"
                    />
                  </Col>
                  <Col span={10}>
                    <div className="cart-item-details">
                      <h5>{item.title}</h5>
                      <p>
                        Qty: {item.quantity} <br />
                      </p>
                    </div>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Card>
        <SummaryComponent />
        <Form.Item>
          <Button type="primary" className="checkout-button" htmlType="submit">
            Proceed to Payment
          </Button>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default CheckoutPage;
