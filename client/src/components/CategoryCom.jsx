import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CategoryProducts() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const limit = 8;

  const categoryMap = {
    all: null,
    jacket: 4,
    accessories: 5,
    shoes: 7,
    clothes: 8,
    bag: 9,
  };

  const categories = ["all", "jacket", "accessories", "shoes", "clothes", "bag"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = "";
        if (selectedCategory === "all") {
          url = "http://localhost:8000/api/product";
        } else {
          const categoryId = categoryMap[selectedCategory];
          url = `http://localhost:8000/api/product/by-category/${categoryId}`;
        }

        const response = await axios.get(url, { params: { page, limit } });
        setProducts(response.data.data || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (err) {
        console.error(err);
        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, page]);

  const renderStars = (rating) => {
    const numRating = Number(rating) || 0;
    const fullStars = Math.floor(numRating);
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={14} fill="orange" stroke="orange" />
        ))}
        <span className="text-muted ms-1">{numRating.toFixed(1)}/5</span>
      </>
    );
  };

  const handleDetailClick = (id_product) => {
    navigate(`/detailproduct/${id_product}`);
  };

  return (
    <div className="container py-5" id="categoryPage">
      <h2 className="fw-bold mb-4">PRODUCTS</h2>

      <div className="mb-4 text-left">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn me-2 rounded-pill px-3 ${
              selectedCategory === cat ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => {
              setSelectedCategory(cat);
              setPage(1);
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {products.length === 0 && !loading && (
          <div className="col-12 text-center py-5">
            <h5 className="text-muted">Product Not Found</h5>
          </div>
        )}

        {products.map((product) => (
          <div key={product.id_product} className="col-12 col-sm-6 col-md-3">
            <div className="text-center p-3 bg-light rounded shadow-sm h-100 d-flex flex-column">
              <img
                src={`http://localhost:8000/uploads/products/${product.image}`}
                alt={product.nama_product}
                className="img-fluid mb-3"
                style={{ maxHeight: 200, objectFit: "contain" }}
              />
              <p className="fw-semibold mb-1">{product.nama_product}</p>
              <div className="d-flex justify-content-center align-items-center gap-1 small text-warning">
                {renderStars(product.rating_produk)}
              </div>
              <div className="mt-2">
                <strong>Rp {Number(product.harga_produk).toLocaleString()}</strong>
              </div>
              <button
                className="btn btn-outline-dark rounded-pill mt-3"
                onClick={() => handleDetailClick(product.id_product)}
              >
                Detail Product
              </button>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center mt-3">
          <p>Loading...</p>
        </div>
      )}

      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
        <button
          className="btn btn-outline-dark rounded-pill px-4"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1 || loading}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-outline-dark rounded-pill px-4"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CategoryProducts;
