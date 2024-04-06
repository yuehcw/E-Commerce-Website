import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import fetchProducts from "../services/productService";

const CategoryProduct = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((allProducts) => {
      const filteredProducts = allProducts.filter(
        (product) => product.category === category,
      );
      setProducts(filteredProducts);
    });
  }, [category]);

  return (
    <div>
      <h2>Category: {category}</h2>
      <ProductList products={products} />
    </div>
  );
};

export default CategoryProduct;
