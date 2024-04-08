import React from "react";
import { Layout, Row, Col, Typography, Space, Divider } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  PinterestOutlined,
  YoutubeOutlined,
  SoundOutlined,
  WeiboOutlined,
  TikTokOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Text, Link } = Typography;

const AppFooter = () => {
  return (
    <Footer style={{ background: "#001529", padding: "20px 50px" }}>
      <Row justify="space-between" align="middle">
        <Col className="footer-link">
          <Space size={[10, 10]} split={<Divider type="vertical" />}>
            <Link href="#" style={{ color: "white" }} type="secondary">
              Terms & Conditions
            </Link>
            <Link href="#" style={{ color: "white" }} type="secondary">
              Privacy Policy
            </Link>
            <Link href="#" style={{ color: "white" }} type="secondary">
              Cookie Preferences
            </Link>
          </Space>
        </Col>
        <Col>
          <Text style={{ color: "white" }} type="secondary">
            &copy;2024 Created for E-Commerce Platform.
          </Text>
        </Col>
        <Col>
          <Space size="middle">
            <FacebookOutlined style={{ fontSize: "24px", color: "white" }} />
            <TwitterOutlined style={{ fontSize: "24px", color: "white" }} />
            <InstagramOutlined style={{ fontSize: "24px", color: "white" }} />
            <LinkedinOutlined style={{ fontSize: "24px", color: "white" }} />
            <PinterestOutlined style={{ fontSize: "24px", color: "white" }} />
            <YoutubeOutlined style={{ fontSize: "24px", color: "white" }} />
            <SoundOutlined style={{ fontSize: "24px", color: "white" }} />
            <WeiboOutlined style={{ fontSize: "24px", color: "white" }} />
            <TikTokOutlined style={{ fontSize: "24px", color: "white" }} />
          </Space>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;
