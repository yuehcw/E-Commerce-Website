import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../services/productService";
import { useSearch } from "../context/SearchContext";
import ProductCarousel from "../components/ProductCarousel";
import Slider from "../components/Slider";
import Loader from "../components/Loader";
import "./HomePage.css";
import { Typography } from "antd";
import { TagOutlined } from "@ant-design/icons";

const { Title } = Typography;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { resetSearchTerm } = useSearch();

  useEffect(() => {
    // Function to load products and store them in state
    const loadProducts = async () => {
      try {
        const productsList = await fetchProducts();
        setProducts(productsList);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const productsInRange1 = products.filter(
    (product) => product.id >= 1 && product.id <= 12,
  );
  const productsInRange2 = products.filter(
    (product) => product.id >= 13 && product.id <= 24,
  );

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    resetSearchTerm();
  };

  return (
    <div className="home-page">
      <div className="slider-container">
        <Slider />
      </div>
      <div className="sale-container">
        <div className="sale-title">
          <TagOutlined style={{ fontSize: "24px" }} />
          <h1>Top deals</h1>
        </div>
        {loading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <div className="product-list-container">
            <ProductCarousel
              id="topDealsCarousel"
              products={productsInRange1}
              onProductClick={handleProductClick}
            />
          </div>
        )}
      </div>
      <div className="trending-container">
        <div className="trending-title">
          <TagOutlined style={{ fontSize: "24px" }} />
          <h1>Trending deals</h1>
        </div>
        {loading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <div className="product-list-container">
            <ProductCarousel
              id="trendingDealsCarousel"
              products={productsInRange2}
              onProductClick={handleProductClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
