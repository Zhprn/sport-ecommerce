import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function FormLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const { email, password } = form;
    setIsFilled(email.trim() && password.trim());
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
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("id_user", data.user.id_user);
        localStorage.setItem("username", data.user.username);
        Swal.fire({
          icon: "success",
          title: "Login sukses!",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login gagal",
          text: data.message || "Email atau password salah",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Kesalahan server",
        text: "Silakan coba lagi nanti",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (name, placeholder, isPassword = false, showToggle = false) => {
    const type = isPassword ? (showPassword ? "text" : "password") : "text";
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
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="container py-5" style={{ maxWidth: 400 }}>
      <h4 className="fw-bold">Selamat Datang!</h4>
      <p className="text-muted mb-4">Masuk untuk mulai belanja!</p>
      <form onSubmit={handleSubmit}>
        {renderInput("email", "Masukan email")}
        {renderInput("password", "Masukan password", true, true)}
        <button className="btn btn-secondary w-100 mt-3" disabled={!isFilled || loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <p className="text-center mt-3">
        Dont Have an Account?? <a href="/register">Daftar</a>
      </p>
    </div>
  );
}

export default FormLogin;
