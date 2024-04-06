import React, { useState, useEffect } from "react";
import { fetchProductsByCategory } from "../services/productService";
import ProductList from "../components/ProductList";
import { useNavigate, useParams } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { resetSearchTerm } = useSearch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProductsByCategory(category);
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };

    fetchData();
  }, [category]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    resetSearchTerm();
  };

  const categories = {
    smartphones: "Smartphones",
    laptops: "Laptops",
    fragrances: "Fragrances",
    skincare: "Skincare",
    groceries: "Groceries",
    "home-decoration": "Home Decoration",
    furniture: "Furniture",
    tops: "Tops",
    "womens-dresses": "Womens Dresses",
    "womens-shoes": "Womens Shoes",
    "mens-shirts": "Mens Shirts",
    "mens-shoes": "Mens Shoes",
    "mens-watches": "Mens Watches",
    "womens-watches": "Womens Watches",
    "womens-bags": "Womens Bags",
    "womens-jewellery": "Womens Jewellery",
    sunglasses: "Sunglasses",
    automotive: "Automotive",
    motorcycle: "Motorcycle",
    lighting: "Lighting",
  };

  return (
    <div>
      <div className="category-header">
        <h1>EXPLORE OUR {categories[category]?.toUpperCase()}</h1>
      </div>
      <div>
        {/* Render ProductList component passing products and click handler */}
        <ProductList products={products} onProductClick={handleProductClick} />
      </div>
    </div>
  );
};

export default CategoryPage;
