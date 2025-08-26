import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/orders");
      setOrders(res.data);
    } catch (err) {
      Swal.fire("Error", "Gagal mengambil data orders: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id_order, newStatus) => {
    try {
      await axios.patch(`http://localhost:8000/api/orders/${id_order}/status`, { status: newStatus });
      Swal.fire("Success", `Status berhasil diubah menjadi ${newStatus}`, "success");
      fetchOrders(); // refresh data
    } catch (err) {
      Swal.fire("Error", "Gagal update status: " + err.message, "error");
    }
  };

  if (loading) return <div className="container py-5 text-center">Loading...</div>;
  if (orders.length === 0) return <div className="container py-5 text-center">Belum ada order.</div>;

  const getBadgeClass = (status) => {
    switch (status) {
      case "paid": return "bg-success";
      case "cancelled": return "bg-danger";
      case "arrived": return "bg-primary";
      default: return "bg-warning text-dark"; // pending
    }
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4">Admin Orders</h3>
      {orders.map((order) => (
        <div key={order.id_order} className="card shadow-sm mb-3 rounded-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6>Order #{order.id_order} - {order.User?.username || "Unknown"}</h6>
              <span className={`badge ${getBadgeClass(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="text-muted mb-2">Tanggal: {new Date(order.createdAt).toLocaleString()}</div>

            {/* List products */}
            {order.items?.length > 0 && (
              <div className="mb-2">
                {order.items.map((item) => (
                  <div key={item.id_item} className="d-flex align-items-center gap-2 mb-1">
                    <img
                      src={`http://localhost:8000/uploads/products/${item.Product?.image}`}
                      alt={item.Product?.nama_product}
                      className="rounded-3"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                    <div>
                      <div>{item.Product?.nama_product || "Produk tidak tersedia"}</div>
                      <small className="text-muted">
                        {item.quantity} x Rp {item.harga_satuan?.toLocaleString() || 0}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="d-flex justify-content-between fw-bold mt-2">
              <span>Total Bayar:</span>
              <span>Rp {order.total_harga?.toLocaleString()}</span>
            </div>
            
            <div className="mt-3">
              <label className="me-2">Update Status:</label>
              {["pending", "paid", "cancelled", "arrived"].map((status) => (
                <button
                  key={status}
                  className={`btn btn-sm me-2 ${status === "paid" ? "btn-success" : status === "cancelled" ? "btn-danger" : status === "arrived" ? "btn-primary" : "btn-warning text-dark"}`}
                  onClick={() => updateStatus(order.id_order, status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
