import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h2 className="text-center text-danger">Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const limit = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:8000/api/product", {
          params: { page, limit },
        });

        const data = response.data.data || response.data;
        const total = response.data.totalPages || 1;

        setTotalPages(total);
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

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

  const handleDetailClick = (productId) => {
    navigate(`/detailproduct/${productId}`);
  };

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-4">OUR PRODUCT</h2>
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-5" id="newArrival">
      <h2 className="fw-bold mb-4 text-center">OUR PRODUCT</h2>

      <div className="row g-4">
        {products.length === 0 && !loading && (
          <p className="text-center">No products found.</p>
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
              <p className="fw-semibold mb-1 flex-grow-1">{product.nama_product}</p>
              <div className="d-flex justify-content-center align-items-center gap-1 small text-warning mb-2">
                {renderStars(product.rating_produk)}
              </div>
              <div>
                <strong>Rp {product.harga_produk.toLocaleString()}</strong>
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

      {/* Pagination */}
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

export default function WrappedNewArrivals() {
  return (
    <ErrorBoundary>
      <NewArrivals />
    </ErrorBoundary>
  );
}
