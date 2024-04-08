import React from "react";
import ProductList from "../components/ProductList";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
// import "./SearchPageResultPage.css";

const SearchPageResultPage = () => {
  const location = useLocation();
  const { filteredProducts } = location.state || {};
  const navigate = useNavigate();
  const { resetSearchTerm } = useSearch();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    resetSearchTerm();
  };

  return (
    <div>
      <div className="category-header">
        <h1>SEARCH RESULT</h1>
      </div>
      <div>
        {/* Render ProductList component passing products and click handler */}
        {filteredProducts && (
          <ProductList
            products={filteredProducts}
            onProductClick={handleProductClick}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPageResultPage;
