import React, { useState } from "react";
import { Star } from "lucide-react";

import brand1 from "../assets/brand1.png";
import brand2 from "../assets/sepatu4.png";
import brand3 from "../assets/brand3.png";
import brand4 from "../assets/brand4.png";
import brand5 from "../assets/sepatu3.png";
import brand6 from "../assets/brand6.png";
import brand7 from "../assets/brand7.png";
import brand8 from "../assets/brand8.png";

function NewArrivals() {
  const [showAll, setShowAll] = useState(false);

  const products = [
    {
      id: 1,
      name: "T-shirt with Tape Details",
      price: 120,
      rating: 4.5,
      image: brand1,
    },
    {
      id: 2,
      name: "Puma Fit",
      price: 240,
      originalPrice: 260,
      discount: 20,
      rating: 3.5,
      image: brand2,
    },
    {
      id: 3,
      name: "Checkered Shirt",
      price: 180,
      rating: 4.5,
      image: brand3,
    },
    {
      id: 4,
      name: "Sleeve Striped T-shirt",
      price: 130,
      originalPrice: 160,
      discount: 30,
      rating: 4.5,
      image: brand4,
    },
    {
      id: 5,
      name: "Nike Running",
      price: 250,
      rating: 4.2,
      image: brand5,
    },
    {
      id: 6,
      name: "Formal Pants",
      price: 300,
      rating: 4.1,
      image: brand6,
    },
    {
      id: 7,
      name: "Summer Shorts",
      price: 90,
      rating: 4.0,
      image: brand7,
    },
    {
      id: 8,
      name: "Basic White T-shirt",
      price: 100,
      rating: 4.4,
      image: brand8,
    },
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={14} fill="orange" stroke="orange" />
        ))}
        <span className="text-muted ms-1">{rating}/5</span>
      </>
    );
  };

  return (
    <div className="container py-5" id="newArrifal">
      <h2 className="fw-bold mb-4">NEW ARRIVALS</h2>
      <div className="row g-4">
        {(showAll ? products : products.slice(0, 4)).map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-3">
            <div className="text-center p-3 bg-light rounded shadow-sm h-100">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid mb-3"
                style={{ maxHeight: 200, objectFit: "contain" }}
              />
              <p className="fw-semibold mb-1">{product.name}</p>
              <div className="d-flex justify-content-center align-items-center gap-1 small text-warning">
                {renderStars(product.rating)}
              </div>
              <div className="mt-2">
                <strong>${product.price}</strong>
                {product.originalPrice && (
                  <>
                    <span className="text-muted text-decoration-line-through ms-2">
                      ${product.originalPrice}
                    </span>
                    <span className="badge bg-light text-danger border ms-2">
                      -{product.discount}%
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button
          className="btn btn-outline-dark rounded-pill px-4"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>
    </div>
  );
}

export default NewArrivals;
