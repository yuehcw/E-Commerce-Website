import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductById,
  fetchProductsByCategory,
} from "../services/productService";
import Loader from "../components/Loader";
import ProductList from "../components/ProductList";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { toast } from "react-toastify";
import "./ProductSinglePage.css";

const ProductSinglePage = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { updateItem } = useCart();
  const { resetSearchTerm } = useSearch();

  useEffect(() => {
    setQuantity(1);
    setLoading(true);
    fetchProductById(productId).then((data) => {
      const firstImage = data.images[0];

      const additionalImages = new Set(data.images.slice(1));

      const uniqueImagesToShow = [firstImage, ...additionalImages].slice(1, 4);

      setSelectedImage(firstImage);
      setProduct({ ...data, images: uniqueImagesToShow });
      setLoading(false);

      if (data.category) {
        fetchProductsByCategory(data.category).then((related) => {
          const filteredRelatedProducts = related.filter(
            (p) => p.id.toString() !== productId.toString(),
          );
          setRelatedProducts(filteredRelatedProducts);
        });
      }
    });
    window.scrollTo(0, 0);
  }, [productId]);

  const handleQuantityChange = (event) => {
    const newValue = event.target.value;

    if (newValue === "") {
      setQuantity(newValue);
    } else {
      const quantityNumber = Number(newValue);

      if (!isNaN(quantityNumber) && quantityNumber > 0) {
        setQuantity(quantityNumber);
      }
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    resetSearchTerm();
  };

  const handleBuyNowClick = async () => {
    await handleAddToCart();
    navigate("/cart");
    resetSearchTerm();
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity === "" ? 1 : prevQuantity + 1));
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity === "") {
        return "";
      } else {
        return prevQuantity > 1 ? prevQuantity - 1 : 1;
      }
    });
  };

  const handleAddToCart = async () => {
    try {
      await updateItem(product, quantity);
      toast.success("Item added to cart successfully!");
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Failed to add item to cart.");
    }
  };

  const isDiscountedProduct = (id, discountPercentage) => {
    return id >= 1 && id <= 12 && discountPercentage > 0;
  };

  if (loading) return <Loader />;

  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-page">
      <div className="product-info-container">
        <div className="product-details">
          <div className="image-gallery">
            <div className="image-container">
              <img src={selectedImage} alt={product.title} />
            </div>
            <div className="thumbnail-container">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product Thumbnail ${index}`}
                  className={`thumbnail ${selectedImage === image ? "selected" : ""}`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>
          <div className="product-info">
            <h1>{product.title}</h1>
            <div className="product-rating">{`⭐️ ${product.rating}`}</div>
            <p className="product-description">{product.description}</p>
            {isDiscountedProduct(product.id, product.discountPercentage) ? (
              <div className="price-details-single">
                <span className="original-price-single">
                  ${product.price.toFixed(2)}
                </span>
                <span className="sale-price-single">
                  $
                  {(
                    product.price -
                    product.price * (product.discountPercentage * 0.01)
                  ).toFixed(2)}
                </span>
                <span className="discount-single">
                  ({product.discountPercentage.toFixed(2)}% Off)
                </span>
              </div>
            ) : (
              <p className="product-price">${product.price.toFixed(2)}</p>
            )}
            <div className="quantity-button">
              <div className="quantity-selector input-group mb-3">
                <div className="input-group-prepend">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="button-container">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleBuyNowClick}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="related-products">
        <div className="header-title">
          <h2 className="alsoLike">You May Also Like</h2>
        </div>
        <ProductList
          products={relatedProducts}
          onProductClick={handleProductClick}
        />
      </div>
    </div>
  );
};

export default ProductSinglePage;
