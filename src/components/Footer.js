import React from "react";
import { Layout, Typography, Space, Divider } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "./Footer.css"; // Make sure to import the CSS file

const { Footer } = Layout;
const { Text, Link } = Typography;

const AppFooter = () => {
  return (
    <Footer className="footer">
      <div className="footer-content">
        <Space
          className="footer-links"
          size={[10, 10]}
          split={<Divider type="vertical" />}
        >
          <Link href="#" className="footer-link">
            Terms & Conditions
          </Link>
          <Link href="#" className="footer-link">
            Privacy Policy
          </Link>
        </Space>
        <Text className="footer-text">
          &copy;2024 Created for E-Commerce Platform.
        </Text>
        <Space className="footer-icons" size="middle">
          <FacebookOutlined />
          <TwitterOutlined />
          <InstagramOutlined />
          <LinkedinOutlined />
        </Space>
      </div>
    </Footer>
  );
};

export default AppFooter;
