import React from "react";
import { Card, Tag } from "antd";
import "./ProductList.css";
const { Meta } = Card;

const Product = ({ product, onProductClick }) => {
  const isDiscounted = product.id >= 1 && product.id <= 12;

  return (
    <Card
      className="product-card"
      hoverable
      onClick={() => onProductClick(product.id)}
      cover={
        <img
          alt={product.title}
          src={product.images[0]}
          className="productList-image"
        />
      }
    >
      <div className="card-content">
        <div className="product-categories">
          <Tag color="blue">{product.category}</Tag>
        </div>
        <Meta
          title={product.title}
          description={product.description}
          className="product-description-container"
        />
        <div className="product-price-details">
          {isDiscounted ? (
            <>
              <span className="original-price-productlist">{`$${product.price}`}</span>
              <span className="sale-price-productlist">{`$${(product.price - product.price * (product.discountPercentage * 0.01)).toFixed(2)}`}</span>
              <span className="discount-productlist">{`(${product.discountPercentage.toFixed(2)}% Off)`}</span>
            </>
          ) : (
            <span className="product-price-productlist">{`$${product.price}`}</span>
          )}
        </div>
      </div>
    </Card>
  );
};

// ProductList component to display a list of products
const ProductList = ({ products, onProductClick }) => (
  <div className="product-list-container">
    {/* Iterate over each product and render Product component */}
    {products.map((product) => (
      <Product
        key={product.id}
        product={product}
        onProductClick={onProductClick}
      />
    ))}
  </div>
);

export default ProductList;
