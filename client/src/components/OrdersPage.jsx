import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipboardList } from "lucide-react";
import Swal from "sweetalert2";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const id_user = localStorage.getItem("id_user");
        if (!id_user) throw new Error("User belum login");

        const res = await axios.get(`http://localhost:8000/api/orders/user/${id_user}`);
        setOrders(res.data);
      } catch (error) {
        Swal.fire("Error", "Gagal mengambil data pesanan: " + error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="container py-5 text-center">Loading...</div>;
  if (orders.length === 0) return <div className="container py-5 text-center">Belum ada pesanan.</div>;

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
      <h4 className="mb-4">
        <ClipboardList className="me-2" />Pesanan Saya
      </h4>

      {orders.map((order, orderIndex) => (
        <div
          className="card border-0 shadow-sm mb-3 rounded-4"
          key={order.id_order || orderIndex} 
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="m-0">Order #{order.id_order || orderIndex + 1}</h6>
              <span className={`badge ${getBadgeClass(order.status)}`}>
                {order.status || "pending"}
              </span>
            </div>
            <div className="text-muted mb-2">
              Tanggal: {new Date(order.createdAt || order.updatedAt).toLocaleString()}
            </div>

            {order.items?.length > 0 && (
              <div className="mb-2">
                {order.items.map((item, itemIndex) => (
                  <div
                    key={item.id_order_item || itemIndex}
                    className="d-flex align-items-center gap-2 mb-1"
                  >
                    <img
                      src={`http://localhost:8000/uploads/products/${item.Product?.image}`}
                      alt={item.Product?.nama_product}
                      className="rounded-3"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                    <div>
                      <div>{item.Product?.nama_product || "Produk tidak tersedia"}</div>
                      <small className="text-muted">
                        {item.quantity || 0} x Rp {item.harga_satuan?.toLocaleString() || 0}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="d-flex justify-content-between fw-bold mt-2">
              <span>Total Bayar:</span>
              <span>Rp {order.total_harga?.toLocaleString() || 0}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
