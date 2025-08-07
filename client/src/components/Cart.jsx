import React from "react";
import img1 from "../assets/brand2.png";
import img2 from "../assets/sepatu3.png";
import { ShoppingCart, Minus, Plus } from "lucide-react";

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      name: "Baju Keren",
      price: 100000,
      discount: 10,
      quantity: 1,
      image: img1,
    },
    {
      id: 1,
      name: "Sepatu Salamon",
      price: 200000,
      discount: 10,
      quantity: 1,
      image: img2,
    },
  ];

  const totalProduk = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const ongkir = 10000;
  const totalBayar = totalProduk + ongkir;

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-8">
          <div className="d-flex align-items-center mb-4">
            <ShoppingCart className="me-2" size={24} />
            <h4 className="m-0">Keranjang Belanja</h4>
          </div>

          {cartItems.map((item) => (
            <div className="card border-0 shadow-sm mb-3 rounded-4" key={item.id}>
              <div className="card-body d-flex flex-wrap align-items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-4"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <div className="flex-grow-1">
                  <h6 className="mb-1">{item.name}</h6>
                  <div className="text-muted small">Rp {item.price.toLocaleString()}</div>
                  <div className="text-danger small">Diskon {item.discount}%</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-outline-secondary rounded-circle p-1">
                    <Minus size={20} />
                  </button>
                  <span className="fs-4">{item.quantity}</span>
                  <button className="btn btn-outline-secondary rounded-circle p-1">
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
                <span>Ongkir</span>
                <span>Rp {ongkir.toLocaleString()}</span>
              </div>
              <div className="mb-3 d-flex justify-content-between fw-bold">
                <span>Total Bayar</span>
                <span className="text-primary">Rp {totalBayar.toLocaleString()}</span>
              </div>

              <div className="mb-3">
                <label className="form-label">Alamat Pengiriman</label>
                <textarea className="form-control" rows="2"></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Kode Voucher</label>
                <input type="text" className="form-control" placeholder="Masukkan kode" />
              </div>

              <div className="mb-3">
                <label className="form-label">Pengiriman</label>
                <select className="form-select">
                  <option>Reguler</option>
                  <option>Express</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Metode Pembayaran</label>
                <select className="form-select">
                  <option>Transfer Bank</option>
                  <option>COD</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Catatan</label>
                <textarea className="form-control" rows="2"></textarea>
              </div>

              <button className="btn btn-primary w-100" disabled>
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
