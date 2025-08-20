import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    nama_product: "",
    harga_produk: "",
    rating_produk: "",
    id_category: "",
    description: "",
    image: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/category");
        setCategories(res.data.data || []);
      } catch (error) {
        setErrorMsg("Gagal mengambil kategori: " + error.message);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (
      !form.nama_product ||
      !form.harga_produk ||
      !form.rating_produk ||
      !form.id_category ||
      !form.image
    ) {
      setErrorMsg("Semua field wajib diisi termasuk gambar produk");
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("nama_product", form.nama_product);
      data.append("harga_produk", form.harga_produk);
      data.append("rating_produk", form.rating_produk);
      data.append("id_category", form.id_category);
      data.append("description", form.description);
      data.append("image", form.image);

      await axios.post("http://localhost:8000/api/product", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Produk berhasil ditambahkan!",
        timer: 2000,
        showConfirmButton: false,
      });

      setForm({
        nama_product: "",
        harga_produk: "",
        rating_produk: "",
        id_category: "",
        description: "",
        image: null,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text:
          error.response?.data?.message ||
          error.message ||
          "Gagal menambah produk",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: 24,
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", maxWidth: 600 }}>
        <h2
          style={{
            marginBottom: 24,
            color: "#2a56c6",
            fontWeight: "700",
            fontSize: "1.8rem",
            textAlign: "center",
          }}
        >
          Tambah Produk Baru
        </h2>

        {errorMsg && (
          <div
            role="alert"
            style={{
              marginBottom: 20,
              padding: "12px 20px",
              backgroundColor: "#f8d7da",
              color: "#842029",
              borderRadius: 6,
              border: "1px solid #f5c2c7",
              textAlign: "center",
            }}
          >
            {errorMsg}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          style={{
            backgroundColor: "#fff",
            padding: 24,
            borderRadius: 12,
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.05), 0 0 1px rgba(0,0,0,0.07)",
            boxSizing: "border-box",
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <label
              htmlFor="nama_product"
              style={{
                display: "block",
                marginBottom: 6,
                fontWeight: 600,
                color: "#333",
              }}
            >
              Nama Produk
            </label>
            <input
              type="text"
              id="nama_product"
              name="nama_product"
              value={form.nama_product}
              onChange={handleInputChange}
              required
              disabled={submitting}
              placeholder="Masukkan nama produk"
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: 16,
                borderRadius: 8,
                border: "1.5px solid #ccc",
                outline: "none",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2a56c6")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label
              htmlFor="harga_produk"
              style={{
                display: "block",
                marginBottom: 6,
                fontWeight: 600,
                color: "#333",
              }}
            >
              Harga Produk
            </label>
            <input
              type="number"
              id="harga_produk"
              name="harga_produk"
              value={form.harga_produk}
              onChange={handleInputChange}
              min={0}
              required
              disabled={submitting}
              placeholder="Masukkan harga produk"
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: 16,
                borderRadius: 8,
                border: "1.5px solid #ccc",
                outline: "none",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2a56c6")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label
              htmlFor="rating_produk"
              style={{
                display: "block",
                marginBottom: 6,
                fontWeight: 600,
                color: "#333",
              }}
            >
              Rating Produk (0 - 5)
            </label>
            <input
              type="number"
              id="rating_produk"
              name="rating_produk"
              value={form.rating_produk}
              onChange={handleInputChange}
              min={0}
              max={5}
              step={0.1}
              required
              disabled={submitting}
              placeholder="Masukkan rating produk"
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: 16,
                borderRadius: 8,
                border: "1.5px solid #ccc",
                outline: "none",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2a56c6")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label
              htmlFor="id_category"
              style={{
                display: "block",
                marginBottom: 6,
                fontWeight: 600,
                color: "#333",
              }}
            >
              Kategori
            </label>
            <select
              id="id_category"
              name="id_category"
              value={form.id_category}
              onChange={handleInputChange}
              required
              disabled={submitting}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: 16,
                borderRadius: 8,
                border: "1.5px solid #ccc",
                outline: "none",
                transition: "border-color 0.3s",
                backgroundColor: "#fff",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2a56c6")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.length === 0 && (
                <option disabled>-- Tidak ada kategori --</option>
              )}
              {categories.map((cat) => (
                <option key={cat.id_category} value={cat.id_category}>
                  {cat.name_category}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label
              htmlFor="description"
              style={{
                display: "block",
                marginBottom: 6,
                fontWeight: 600,
                color: "#333",
              }}
            >
              Deskripsi Produk
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleInputChange}
              disabled={submitting}
              placeholder="Masukkan deskripsi produk"
              rows={4}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: 16,
                borderRadius: 8,
                border: "1.5px solid #ccc",
                outline: "none",
                transition: "border-color 0.3s",
                resize: "vertical",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2a56c6")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label
              htmlFor="image"
              style={{
                display: "block",
                marginBottom: 6,
                fontWeight: 600,
                color: "black",
              }}
            >
              Gambar Produk
            </label>

            <label
              htmlFor="image"
              style={{
                display: "inline-block",
                padding: "10px 18px",
                border: "1px solid black",
                color: "black",
                borderRadius: 8,
                cursor: submitting ? "not-allowed" : "pointer",
                userSelect: "none",
                fontWeight: "600",
                fontSize: 16,
                marginBottom: 12,
              }}
              className={submitting ? "disabled" : ""}
            >
              {form.image ? form.image.name : "Pilih Gambar"}
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleInputChange}
              required
              disabled={submitting}
              style={{ display: "none" }}
            />
            {form.image && (
              <div
                style={{
                  maxWidth: 300,
                  maxHeight: 300,
                  overflow: "hidden",
                  borderRadius: 12,
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)",
                }}
              >
                <img
                  src={URL.createObjectURL(form.image)}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "cover",
                  }}
                  onLoad={() => {
                    URL.revokeObjectURL(form.image);
                  }}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary btn"
            style={{
              width: "100%",
              padding: "14px",
              fontWeight: 700,
              fontSize: 18,
              border: "none",
              borderRadius: 10,
              color: "#fff",
              cursor: submitting ? "not-allowed" : "pointer",
              transition: "background 0.3s ease",
            }}
          >
            {submitting ? "Menyimpan..." : "Simpan Produk"}
          </button>
        </form>
      </div>
    </div>
  );
}
