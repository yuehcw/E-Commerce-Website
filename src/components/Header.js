import React, { useContext, useEffect, useState } from "react";
import { Badge, Layout, Menu, Drawer } from "antd";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { fetchProducts } from "../services/productService";
import { CategoryContext } from "../context/CategoryContext";
import SearchBar from "./SearchBar";
import "./Header.css";

const { Header } = Layout;

const AppHeader = () => {
  const [products, setProducts] = useState([]);
  const [activeMenu, setActiveMenu] = useContext(CategoryContext);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { resetSearchTerm } = useSearch();
  const { items } = useCart();
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

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    handleSideBar();
    resetSearchTerm();
    navigate(`/category/${categories[categoryName]}`);
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
          <Menu.Item key="signin">Sign In</Menu.Item>
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
