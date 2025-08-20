import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/category");
        setCategories(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (error) {
        alert("Error fetching categories: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      Swal.fire("Peringatan", "Nama kategori tidak boleh kosong", "warning");
      return;
    }
    setAdding(true);
    try {
      const res = await axios.post("http://localhost:8000/api/category", {
        name_category: newCategoryName.trim(),
      });
      const addedCategory = res.data.data || {
        id_category: Date.now(),
        name_category: newCategoryName.trim(),
      };
      setCategories((prev) => [...prev, addedCategory]);
      setNewCategoryName("");
      setShowAddModal(false);
      Swal.fire("Berhasil", "Kategori berhasil ditambahkan", "success");
    } catch (error) {
      Swal.fire(
        "Gagal",
        error.response?.data?.message || error.message || "Gagal menambah kategori",
        "error"
      );
    } finally {
      setAdding(false);
    }
  };

  const handleEdit = (category) => {
    setEditCategory({
      id_category: category.id_category,
      name_category: category.name_category || "",
    });
    setOpenDropdownId(null);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id_category, name_category } = editCategory;
      await axios.put(
        `http://localhost:8000/api/category/${id_category}`,
        { name_category }
      );
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id_category === id_category
            ? { ...cat, name_category }
            : cat
        )
      );
      setEditCategory(null);
      Swal.fire("Berhasil", "Kategori berhasil diperbarui", "success");
    } catch (error) {
      Swal.fire("Gagal", "Gagal memperbarui kategori", error.message || error);
    }
  };

  const handleDelete = (category) => {
    Swal.fire({
      title: "Yakin ingin menghapus kategori ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:8000/api/category/${category.id_category}`
          );
          Swal.fire("Terhapus!", "Kategori berhasil dihapus.", "success");
          setCategories((prev) =>
            prev.filter((c) => c.id_category !== category.id_category)
          );
        } catch (error) {
          Swal.fire("Gagal!", "Gagal menghapus kategori.", error.message || error);
        }
      }
      setOpenDropdownId(null);
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: "8px 16px",
            fontWeight: "600",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#0d6efd",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Add Category
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSize: 14,
            color: "#495057",
            minWidth: 500,
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
              <th style={{ padding: "12px 15px", minWidth: 200 }}>
                CATEGORY NAME
              </th>
              <th
                style={{
                  padding: "12px 15px",
                  minWidth: 90,
                  textAlign: "center",
                }}
              >
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 && (
              <tr>
                <td colSpan={2} style={{ padding: 20, textAlign: "center" }}>
                  No categories found.
                </td>
              </tr>
            )}
            {categories.map((category) => (
              <tr
                key={category.id_category ?? category.name_category}
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
                    fontWeight: "600",
                    color: "#212529",
                  }}
                >
                  {category.name_category || "-"}
                </td>
                <td
                  style={{
                    padding: "12px 15px",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <button
                      onClick={() =>
                        setOpenDropdownId(
                          openDropdownId === category.id_category
                            ? null
                            : category.id_category
                        )
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
                    {openDropdownId === category.id_category && (
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
                            onClick={() => handleEdit(category)}
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
                            onClick={() => handleDelete(category)}
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

      {editCategory && (
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
          onClick={() => setEditCategory(null)}
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
            <h3
              style={{ margin: 0, fontWeight: "700", fontSize: 20, color: "#333" }}
            >
              Edit Category
            </h3>
            <label style={{ fontWeight: "600", color: "#555" }}>
              Category Name:
              <input
                type="text"
                required
                value={editCategory.name_category || ""}
                onChange={(e) =>
                  setEditCategory((prev) => ({
                    ...prev,
                    name_category: e.target.value,
                  }))
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
                onClick={() => setEditCategory(null)}
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

      {showAddModal && (
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
          onClick={() => setShowAddModal(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleAddSubmit}
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
            <h3
              style={{ margin: 0, fontWeight: "700", fontSize: 20, color: "#333" }}
            >
              Add Category
            </h3>
            <label style={{ fontWeight: "600", color: "#555" }}>
              Category Name:
              <input
                type="text"
                required
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                disabled={adding}
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
                onClick={() => setShowAddModal(false)}
                disabled={adding}
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
                disabled={adding}
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
                {adding ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
