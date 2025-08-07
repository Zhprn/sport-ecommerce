import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

function FormLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

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
      <p className="text-muted mb-4">
        Masuk untuk mulai belanja!
      </p>

      {renderInput("email", "Masukan email")}
      {renderInput("password", "Masukan password", true, true)}

      <button className="btn btn-secondary w-100 mt-3" disabled={!isFilled}>
        Login
      </button>

      <p className="text-center mt-3">
        Dont Have an Account?? <a href="/register">Daftar</a>
      </p>
    </div>
  );
}

export default FormLogin;
