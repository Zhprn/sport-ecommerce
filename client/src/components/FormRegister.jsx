import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";

function FormRegister() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { email, name, password, confirmPassword } = form;
    setIsFilled(
      email.trim() &&
        name.trim() &&
        password.trim() &&
        confirmPassword.trim()
    );
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password tidak cocok",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          username: form.name,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Registrasi berhasil",
          text: "Silakan login untuk melanjutkan",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/login";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registrasi gagal",
          text: data.message || "Terjadi kesalahan",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Kesalahan server",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (name, placeholder, isPassword = false, showToggle = false) => {
    const show = name === "password" ? showPassword : showConfirm;
    const type = isPassword ? (show ? "text" : "password") : "text";

    return (
      <div className="mb-3 position-relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={form[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-control ${!form[name] && touched[name] ? "is-invalid" : ""}`}
        />
        {(!form[name] && touched[name]) && (
          <div className="invalid-feedback">
            {placeholder.split(" ")[1]} harus diisi
          </div>
        )}
        {showToggle && (
          <span
            className="position-absolute top-50 end-0 translate-middle-y me-3"
            style={{ cursor: "pointer" }}
            onClick={() =>
              name === "password"
                ? setShowPassword((prev) => !prev)
                : setShowConfirm((prev) => !prev)
            }
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="container py-5" style={{ maxWidth: 400 }}>
      <h4 className="fw-bold">Selamat Datang!</h4>
      <p className="text-muted mb-4">
        Daftar dulu yuk sebelum belanja!
        <br />
        Tambahin produk ke keranjang, bisa checkout kapan aja!
      </p>

      <form onSubmit={handleSubmit}>
        {renderInput("email", "Masukan email")}
        {renderInput("name", "Masukan nama")}
        {renderInput("password", "Masukan password", true, true)}
        {renderInput("confirmPassword", "Masukan konfirmasi password", true, true)}

        <button
          className="btn btn-secondary w-100 mt-3"
          disabled={!isFilled || loading}
          type="submit"
        >
          {loading ? "Memproses..." : "Daftar"}
        </button>
      </form>

      <p className="text-center mt-3">
        Have an Account?? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default FormRegister;
