import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../components/ProductList";
import fetchProducts from "../services/productService";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchPage = () => {
  const query = useQuery();
  const searchQuery = query.get("q");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((allProducts) => {
      const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setProducts(filteredProducts);
    });
  }, [searchQuery]);

  return (
    <div>
      <h2>Search Results for "{searchQuery}"</h2>
      <ProductList products={products} />
    </div>
  );
};

export default SearchPage;
