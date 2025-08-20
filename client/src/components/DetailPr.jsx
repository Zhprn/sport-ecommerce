import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Untuk ambil id dari URL
import axios from "axios";
import { Star } from "lucide-react";
import Swal from "sweetalert2";

const IMAGE_BASE_URL = "http://localhost:8000/uploads/products/";

export default function DetailPr() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8000/api/product/${id}`);
        setProduct(res.data);
        setError(null);
      } catch (err) {
        setError("Produk tidak ditemukan atau gagal memuat data.", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const formatPrice = (price) =>
    Number(price).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });

  const renderStars = (rating) => {
    const fullStars = Math.floor(Number(rating));
    return (
      <>
        {[...Array(5)].map((_, i) => {
          const filled = i < fullStars;
          return (
            <Star
              key={i}
              size={20}
              fill={filled ? "orange" : "none"}
              stroke={filled ? "orange" : "#ccc"}
              style={{ marginRight: 2 }}
            />
          );
        })}
      </>
    );
  };

const handleAddToCart = async () => {
  if (!product) return;
  if (quantity < 1) {
    Swal.fire("Peringatan", "Quantity minimal 1", "warning");
    return;
  }

  const id_user = localStorage.getItem("id_user");
  if (!id_user) {
    Swal.fire("Error", "User belum login", "error");
    return;
  }


  setAddingToCart(true);
  try {
    await axios.post("http://localhost:8000/api/cart", {
      user_id : id_user,
      product_id: product.id_product,
      quantity: quantity,
    });
    Swal.fire("Sukses", "Produk berhasil ditambahkan ke keranjang", "success");
  } catch (err) {
    Swal.fire("Gagal", err.response?.data?.message || err.message, "error");
  } finally {
    setAddingToCart(false);
  }
};


  if (loading) return <div style={{ padding: 20 }}>Loading produk...</div>;
  if (error) return <div style={{ padding: 20, color: "red" }}>{error}</div>;
  if (!product) return <div style={{ padding: 20 }}>Produk tidak ditemukan.</div>;

  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        maxWidth: 900,
        margin: "40px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Gambar kiri */}
      <div style={{ flex: "0 0 300px" }}>
        {product.image ? (
          <img
            src={IMAGE_BASE_URL + product.image}
            alt={product.nama_product}
            style={{ width: "100%", borderRadius: 12, objectFit: "contain" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: 300,
              backgroundColor: "#eee",
              borderRadius: 12,
            }}
          />
        )}
      </div>

      {/* Detail kanan */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 style={{ margin: 0 }}>{product.nama_product}</h2>
        <p style={{ color: "#666", fontStyle: "italic", margin: 0 }}>
          Kategori: {product.Category?.name_category || "-"}
        </p>
        <p style={{ fontWeight: "700", fontSize: 24, margin: "8px 0" }}>
          {formatPrice(product.harga_produk)}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {renderStars(product.rating_produk)}
          <span style={{ color: "#999", fontSize: 14 }}>
            ({product.rating_produk || 0})
          </span>
        </div>
        <p style={{ marginTop: 16, lineHeight: 1.5, color: "#444" }}>
          {product.description || "Tidak ada deskripsi produk."}
        </p>

        {/* Quantity */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20 }}>
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            style={{
              padding: "6px 12px",
              fontSize: 18,
              cursor: "pointer",
              borderRadius: 6,
              border: "1px solid #ccc",
              backgroundColor: "white",
            }}
          >
            -
          </button>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= 1) setQuantity(val);
            }}
            style={{
              width: 60,
              padding: "6px 12px",
              fontSize: 16,
              textAlign: "center",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={() => setQuantity(q => q + 1)}
            style={{
              padding: "6px 12px",
              fontSize: 18,
              cursor: "pointer",
              borderRadius: 6,
              border: "1px solid #ccc",
              backgroundColor: "white",
            }}
          >
            +
          </button>
        </div>

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          disabled={addingToCart}
          style={{
            marginTop: "auto",
            padding: "12px 24px",
            backgroundColor: "#0d6efd",
            color: "white",
            fontWeight: "600",
            fontSize: 16,
            border: "none",
            borderRadius: 8,
            cursor: addingToCart ? "not-allowed" : "pointer",
            boxShadow: "0 4px 12px rgb(13 110 253 / 0.4)",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => !addingToCart && (e.currentTarget.style.backgroundColor = "#0b5ed7")}
          onMouseLeave={(e) => !addingToCart && (e.currentTarget.style.backgroundColor = "#0d6efd")}
        >
          {addingToCart ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
