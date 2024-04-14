import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  Layout,
  Menu,
  Drawer,
  Form,
  Button,
  Input,
  message,
} from "antd";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { useUser } from "../context/UserContext";
import { fetchProducts } from "../services/productService";
import { CategoryContext } from "../context/CategoryContext";
import SearchBar from "./SearchBar";
import "./Header.css";

const { Header } = Layout;

const AppHeader = () => {
  const [products, setProducts] = useState([]);
  const [activeMenu, setActiveMenu] = useContext(CategoryContext);
  const { users, loginUser, currentUser, isAuthenticated } = useUser();
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isSignInDrawerOpen, setIsSignInDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { resetSearchTerm } = useSearch();
  const { items, setItemsEmpty } = useCart();
  const totalItemsInCart =
    Array.isArray(items) && items.length > 0
      ? items.reduce((total, item) => total + item.quantity, 0)
      : 0;
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsList = await fetchProducts();
        setProducts(productsList);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    loadProducts();
  }, []);

  const handleHomeClick = () => {
    setActiveCategory(null);
    resetSearchTerm();
    navigate("/");
  };

  const handleSignUpClick = () => {
    setIsSignInDrawerOpen(false);
    setActiveCategory(null);
    resetSearchTerm();
    navigate("/sign-up");
  };

  const handleCartClick = () => {
    setActiveCategory(null);
    resetSearchTerm();
    navigate("/cart");
  };

  const handleClick = (e) => {
    if (
      e.key === "home" ||
      e.key === "signin" ||
      e.key === "cart" ||
      e.key === "sidebar"
    ) {
      setActiveMenu("");
    } else {
      setActiveMenu(e.key);
    }
  };

  const handleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleSignInClick = () => {
    setIsSignInDrawerOpen(!isSignInDrawerOpen);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    handleSideBar();
    resetSearchTerm();
    navigate(`/category/${categories[categoryName]}`);
  };

  const handleSignIn = ({ username, password }) => {
    const foundUser = users.find(
      (user) => user.username === username && user.password === password,
    );
    if (foundUser) {
      message.success(
        "Sign in successful. Welcome back, " + foundUser.username + "!",
      );
      loginUser(foundUser);
      setItemsEmpty();
      navigate("/");
    } else {
      message.error("User not found. Please check your username and password.");
    }
    setIsSignInDrawerOpen(false);
    form.resetFields();
  };

  const displaycategories = [
    "Smartphones",
    "Laptops",
    "Fragrances",
    "Skincare",
    "Groceries",
    "Home Decoration",
    "Furniture",
    "Tops",
    "Womens Dresses",
    "Womens Shoes",
    "Mens Shirts",
    "Mens Shoes",
    "Mens Watches",
    "Womens Watches",
    "Womens Bags",
    "Womens Jewellery",
    "Sunglasses",
    "Automotive",
    "Motorcycle",
    "Lighting",
  ];

  const categories = {
    Smartphones: "smartphones",
    Laptops: "laptops",
    Fragrances: "fragrances",
    Skincare: "skincare",
    Groceries: "groceries",
    "Home Decoration": "home-decoration",
    Furniture: "furniture",
    Tops: "tops",
    "Womens Dresses": "womens-dresses",
    "Womens Shoes": "womens-shoes",
    "Mens Shirts": "mens-shirts",
    "Mens Shoes": "mens-shoes",
    "Mens Watches": "mens-watches",
    "Womens Watches": "womens-watches",
    "Womens Bags": "womens-bags",
    "Womens Jewellery": "womens-jewellery",
    Sunglasses: "sunglasses",
    Automotive: "automotive",
    Motorcycle: "motorcycle",
    Lighting: "lighting",
  };

  return (
    <Header className="header">
      <div className="menu-container">
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={handleClick}
          selectedKeys={[activeMenu]}
          className="menu-left"
        >
          <Menu.Item key="sidebar" onClick={handleSideBar}>
            <MenuOutlined style={{ fontSize: "24px" }} />
          </Menu.Item>
          <Menu.Item key="home" onClick={handleHomeClick}>
            <HomeOutlined
              style={{
                fontSize: "24px",
              }}
            />
          </Menu.Item>
        </Menu>
        <Menu theme="dark" mode="horizontal" className="menu-middle">
          <SearchBar products={products} />
        </Menu>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeMenu]}
          className="menu-right"
        >
          {!isAuthenticated && (
            <Menu.Item key="signin" onClick={handleSignInClick}>
              Sign In
            </Menu.Item>
          )}
          {isAuthenticated && (
            <Menu.Item className={"user-menu-item"}>
              Hi, {currentUser.username}
            </Menu.Item>
          )}
          <Menu.Item key="cart" onClick={handleCartClick}>
            {totalItemsInCart > 0 ? (
              <Badge count={totalItemsInCart}>
                <ShoppingCartOutlined
                  style={{ fontSize: "24px", color: "white" }}
                />
              </Badge>
            ) : (
              <ShoppingCartOutlined
                style={{ fontSize: "24px", color: "white" }}
              />
            )}
          </Menu.Item>
        </Menu>
      </div>
      <Drawer
        title="Sign In"
        placement="right"
        closable={true}
        onClose={() => setIsSignInDrawerOpen(false)}
        visible={isSignInDrawerOpen}
        width={300}
      >
        <Form form={form} name="signin" onFinish={handleSignIn}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
          <Form.Item>
            <span className="drawer-sign-up" onClick={handleSignUpClick}>
              New user? Register now.
            </span>
          </Form.Item>
        </Form>
      </Drawer>
      <Drawer
        title="ALL CATEGORIES"
        placement="left"
        closable={true}
        onClose={handleSideBar}
        visible={isSideBarOpen}
        width={300}
      >
        <Menu
          theme="light"
          mode="vertical"
          selectedKeys={activeCategory ? [activeCategory] : []}
        >
          {displaycategories.map((category, index) => (
            <Menu.Item
              key={category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </Header>
  );
};

export default AppHeader;
