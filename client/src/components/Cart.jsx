import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Transfer Bank");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user_id = localStorage.getItem("id_user");
        if (!user_id) return navigate("/login");

        const res = await axios.get(`http://localhost:8000/api/cart/${user_id}`);
        setCartItems(res.data);
      } catch (error) {
        Swal.fire("Error", "Gagal mengambil data keranjang: " + error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const handleQuantityChange = async (id_cart, delta) => {
    try {
      const item = cartItems.find((item) => item.id_cart === id_cart);
      if (!item) return;

      const newQty = item.quantity + delta;

      if (newQty < 1) {
        const result = await Swal.fire({
          title: "Hapus Produk?",
          text: `Apakah Anda yakin ingin menghapus "${item.product.nama_product}" dari keranjang?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, hapus",
          cancelButtonText: "Batal",
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
        });

        if (result.isConfirmed) {
          await axios.post(`http://localhost:8000/api/cart/${id_cart}`);
          setCartItems((prev) => prev.filter((i) => i.id_cart !== id_cart));
          Swal.fire("Dihapus!", "Produk berhasil dihapus dari keranjang.", "success");
        }
        return;
      }

      await axios.put(`http://localhost:8000/api/cart/${id_cart}`, { quantity: newQty });
      setCartItems((prev) =>
        prev.map((i) => (i.id_cart === id_cart ? { ...i, quantity: newQty } : i))
      );
    } catch (error) {
      Swal.fire("Error", "Gagal update keranjang: " + error.message, "error");
    }
  };

  const totalProduk = cartItems.reduce(
    (total, item) => total + item.product.harga_produk * item.quantity,
    0
  );
  const ongkir = Math.floor(totalProduk * 0.1);
  const totalBayar = totalProduk + ongkir;

  const handleCheckout = async () => {
    if (!address) {
      Swal.fire("Error", "Alamat pengiriman wajib diisi!", "error");
      return;
    }

    Swal.fire({
      title: "Memproses Pesanan...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const id_user = localStorage.getItem("id_user");
      if (!id_user) return navigate("/login");

      const payload = {
        id_user,
        address,
        notes,
        totalBayar,
        items: cartItems.map((i) => ({
          id_product: i.product.id_product,
          quantity: i.quantity,
        })),
      };

      await axios.post("http://localhost:8000/api/orders", payload);

      Swal.fire({
        title: "Pesanan Dibuat!",
        text: "Pesanan Anda berhasil dibuat.",
        icon: "success",
      });

      setCartItems([]);
    } catch (error) {
      Swal.fire("Error", "Gagal membuat pesanan: " + error.message, "error");
    }
  };

  if (loading) return <div className="container py-5 text-center">Loading...</div>;
  if (cartItems.length === 0)
    return <div className="container py-5 text-center">Keranjang kosong.</div>;

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-8">
          <div className="d-flex align-items-center mb-4">
            <ShoppingCart className="me-2" size={24} />
            <h4 className="m-0">Keranjang Belanja</h4>
          </div>

          {cartItems.map((item) => (
            <div className="card border-0 shadow-sm mb-3 rounded-4" key={item.id_cart}>
              <div className="card-body d-flex flex-wrap align-items-center gap-3">
                <img
                  src={`http://localhost:8000/uploads/products/${item.product.image}`}
                  alt={item.product.nama_product}
                  className="rounded-4"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <div className="flex-grow-1">
                  <h6 className="mb-1">{item.product.nama_product}</h6>
                  <div className="text-muted small">
                    Rp {item.product.harga_produk.toLocaleString()}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-outline-secondary rounded-circle p-1"
                    onClick={() => handleQuantityChange(item.id_cart, -1)}
                  >
                    <Minus size={20} />
                  </button>
                  <span className="fs-4">{item.quantity}</span>
                  <button
                    className="btn btn-outline-secondary rounded-circle p-1"
                    onClick={() => handleQuantityChange(item.id_cart, +1)}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body">
              <h5 className="mb-3">Informasi Pembayaran</h5>

              <div className="mb-2 d-flex justify-content-between">
                <span>Total Produk</span>
                <span>Rp {totalProduk.toLocaleString()}</span>
              </div>
              <div className="mb-2 d-flex justify-content-between">
                <span>Ongkir (10%)</span>
                <span>Rp {ongkir.toLocaleString()}</span>
              </div>
              <div className="mb-3 d-flex justify-content-between fw-bold">
                <span>Total Bayar</span>
                <span className="text-primary">Rp {totalBayar.toLocaleString()}</span>
              </div>

              <div className="mb-3">
                <label className="form-label">Alamat Pengiriman</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Metode Pembayaran</label>
                <select
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option>Transfer Bank</option>
                  <option>COD</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Catatan</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <button className="btn btn-primary w-100" onClick={handleCheckout}>
                Buat Pesanan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
