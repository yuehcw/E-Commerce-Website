import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";
import "./SignUpPage.css";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";

const { Title } = Typography;

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const { addUser } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values:", values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleAddUser = async () => {
    try {
      await addUser(firstName, lastName, email, username, password);
      toast.success("User registered successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to register user:", error);
      toast.error("Failed to register user.");
    }
  };

  return (
    <div className="sign-up-page">
      <Title level={2}>Sign Up</Title>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
      </Form>
      <div>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          onClick={handleAddUser}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
