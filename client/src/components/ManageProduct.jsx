import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const IMAGE_BASE_URL = "http://localhost:8000/uploads/products/";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/product");
        setProducts(res.data);
      } catch (error) {
        alert("Error fetching products: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(Number(rating));
    return (
      <>
        {[...Array(5)].map((_, i) => {
          const filled = i < fullStars;
          return (
            <Star
              key={i}
              size={16}
              fill={filled ? "orange" : "none"}
              stroke={filled ? "orange" : "#ccc"}
            />
          );
        })}
      </>
    );
  };

  const formatPrice = (price) => {
    return Number(price).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  const handleEdit = (product) => {
    setEditProduct({
      id_product: product.id_product,
      nama_product: product.nama_product,
      harga_produk: product.harga_produk,
      rating_produk: product.rating_produk,
      category_name: product.Category?.name_category || "",
      image: null,
      currentImage: product.image || null,
    });
    setImagePreview(null);
    setOpenDropdownId(null);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        id_product,
        nama_product,
        harga_produk,
        rating_produk,
        category_name,
        image,
      } = editProduct;

      const formData = new FormData();
      formData.append("nama_product", nama_product);
      formData.append("harga_produk", harga_produk);
      formData.append("rating_produk", rating_produk);
      formData.append("category_name", category_name);
      if (image) {
        formData.append("image", image);
      }

      await axios.put(`http://localhost:8000/api/product/${id_product}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id_product === id_product
            ? {
                ...p,
                nama_product,
                harga_produk,
                rating_produk,
                Category: { name_category: category_name },
                image: image ? imagePreview : p.image,
              }
            : p
        )
      );

      setEditProduct(null);
      setImagePreview(null);
      Swal.fire("Berhasil", "Produk berhasil diperbarui", "success");
    } catch (error) {
      Swal.fire("Gagal", "Gagal memperbarui produk", error);
    }
  };

  const handleDelete = (product) => {
    Swal.fire({
      title: "Yakin ingin menghapus produk ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8000/api/product/${product.id_product}`);
          Swal.fire("Terhapus!", "Produk berhasil dihapus.", "success");
          setProducts((prev) => prev.filter((p) => p.id_product !== product.id_product));
        } catch (error) {
          Swal.fire("Gagal!", "Gagal menghapus produk.", error);
        }
      }
      setOpenDropdownId(null);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditProduct((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSize: 14,
            color: "#495057",
            minWidth: 700,
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f8f9fa",
                textAlign: "left",
                fontWeight: "600",
                fontSize: 13,
                color: "#6c757d",
              }}
            >
              <th style={{ padding: "12px 15px", minWidth: 180 }}>PRODUCT</th>
              <th style={{ padding: "12px 15px", minWidth: 130 }}>CATEGORY</th>
              <th style={{ padding: "12px 15px", minWidth: 90 }}>PRICE</th>
              <th style={{ padding: "12px 15px", minWidth: 110 }}>RATING</th>
              <th style={{ padding: "12px 15px", minWidth: 90, textAlign: "center" }}>
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: 20, textAlign: "center" }}>
                  No products found.
                </td>
              </tr>
            )}

            {products.map((product) => (
              <tr
                key={product.id_product}
                style={{
                  borderTop: "1px solid #e9ecef",
                  verticalAlign: "middle",
                  backgroundColor: "#fff",
                  transition: "background-color 0.3s",
                }}
              >
                <td
                  style={{
                    padding: "12px 15px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontWeight: "600",
                    color: "#212529",
                  }}
                >
                  {product.image ? (
                    <img
                      src={IMAGE_BASE_URL + product.image}
                      alt={product.nama_product}
                      style={{ height: 40, width: 40, objectFit: "contain", borderRadius: 6 }}
                    />
                  ) : (
                    <div
                      style={{
                        height: 40,
                        width: 40,
                        backgroundColor: "#dee2e6",
                        borderRadius: 6,
                      }}
                    />
                  )}
                  {product.nama_product}
                </td>
                <td style={{ padding: "12px 15px", color: "#6c757d" }}>
                  {product.Category?.name_category || "-"}
                </td>
                <td style={{ padding: "12px 15px" }}>{formatPrice(product.harga_produk)}</td>
                <td style={{ padding: "12px 15px", color: "#f59e0b" }}>
                  {renderStars(product.rating_produk)}
                </td>
                <td style={{ padding: "12px 15px", textAlign: "center", position: "relative" }}>
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <button
                      onClick={() =>
                        setOpenDropdownId(openDropdownId === product.id_product ? null : product.id_product)
                      }
                      style={{
                        padding: "4px 10px",
                        fontSize: 12,
                        cursor: "pointer",
                        borderRadius: 4,
                        border: "1px solid #6c757d",
                        backgroundColor: "white",
                        color: "#495057",
                      }}
                    >
                      Actions ▼
                    </button>

                    {openDropdownId === product.id_product && (
                      <ul
                        style={{
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          backgroundColor: "white",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          borderRadius: 6,
                          marginTop: 4,
                          listStyle: "none",
                          padding: 0,
                          minWidth: 100,
                          zIndex: 1000,
                        }}
                      >
                        <li>
                          <button
                            onClick={() => handleEdit(product)}
                            style={{
                              width: "100%",
                              padding: "6px 12px",
                              textAlign: "left",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleDelete(product)}
                            style={{
                              width: "100%",
                              padding: "6px 12px",
                              textAlign: "left",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "red",
                            }}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editProduct && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
            padding: 20,
          }}
          onClick={() => {
            setEditProduct(null);
            setImagePreview(null);
          }}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleUpdateSubmit}
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 24,
              width: 360,
              maxWidth: "100%",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            <h3 style={{ margin: 0, fontWeight: "700", fontSize: 20, color: "#333" }}>
              Edit Product
            </h3>

            <label style={{ fontWeight: "600", color: "#555" }}>
              Nama Product:
              <input
                type="text"
                required
                value={editProduct.nama_product}
                onChange={(e) =>
                  setEditProduct((prev) => ({ ...prev, nama_product: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  marginTop: 6,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  fontSize: 14,
                }}
              />
            </label>

            <label style={{ fontWeight: "600", color: "#555" }}>
              Harga Produk:
              <input
                type="number"
                required
                min={0}
                value={editProduct.harga_produk}
                onChange={(e) =>
                  setEditProduct((prev) => ({ ...prev, harga_produk: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  marginTop: 6,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  fontSize: 14,
                }}
              />
            </label>

            <label style={{ fontWeight: "600", color: "#555" }}>
              Rating Produk (0-5):
              <input
                type="number"
                required
                min={0}
                max={5}
                step={0.1}
                value={editProduct.rating_produk}
                onChange={(e) =>
                  setEditProduct((prev) => ({ ...prev, rating_produk: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  marginTop: 6,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  fontSize: 14,
                }}
              />
            </label>

            <label style={{ fontWeight: "600", color: "#555" }}>
              Category Name:
              <input
                type="text"
                value={editProduct.category_name}
                onChange={(e) =>
                  setEditProduct((prev) => ({ ...prev, category_name: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  marginTop: 6,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  fontSize: 14,
                }}
              />
            </label>

            <label style={{ fontWeight: "600", color: "#555" }}>
              Ganti Gambar Produk:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginTop: 6 }}
              />
            </label>

            {(imagePreview || editProduct.currentImage) && (
              <div
                style={{
                  marginTop: 6,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={imagePreview || IMAGE_BASE_URL + editProduct.currentImage}
                  alt="Preview"
                  style={{
                    maxHeight: 100,
                    borderRadius: 8,
                    objectFit: "contain",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
                marginTop: 16,
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setEditProduct(null);
                  setImagePreview(null);
                }}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#ccc",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#0d6efd",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
