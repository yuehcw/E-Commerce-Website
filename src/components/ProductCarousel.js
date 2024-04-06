import React from "react";
import "./ProductCarousel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const ProductCarousel = ({ id, products, onProductClick }) => {
  const productsPerSlide = 4;
  const groupedProducts = [];

  for (let i = 0; i < products.length; i += productsPerSlide) {
    groupedProducts.push(products.slice(i, i + productsPerSlide));
  }

  const isProductOnSale = (productId) => productId >= 1 && productId <= 12;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div id={id} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {groupedProducts.map((productGroup, groupIndex) => (
                <div
                  className={`carousel-item ${groupIndex === 0 ? "active" : ""}`}
                  key={groupIndex}
                >
                  <div className="row">
                    {productGroup.map((product) => (
                      <div
                        className="col-md-3"
                        key={product.id}
                        onClick={() => onProductClick(product.id)}
                      >
                        <div className="card">
                          <img
                            src={product.images[0]}
                            className="card-img-top"
                            alt={product.title}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{product.title}</h5>
                            <div className="price-details-carousel">
                              {isProductOnSale(product.id) ? (
                                <>
                                  <div className="original-details-carousel">
                                    <span className="original-price-carousel">
                                      ${product.price.toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="sale-details-carousel">
                                    <span className="sale-price-carousel">
                                      $
                                      {(
                                        product.price -
                                        product.price *
                                          (product.discountPercentage / 100)
                                      ).toFixed(2)}
                                    </span>
                                    <span className="discount-carousel">
                                      ({product.discountPercentage.toFixed(2)}%
                                      Off)
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <span className="product-price-carousel">
                                  ${product.price.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <a
              className="carousel-control-prev"
              href={`#${id}`}
              role="button"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href={`#${id}`}
              role="button"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
