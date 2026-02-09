import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Bot, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!email || !password) {
      setError("Mohon isi email dan password");
      setLoading(false);
      return;
    }

    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      navigate("/");
    } catch (err) {
      setError(err.message || "Gagal login. Periksa kembali detail anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Link to="/" className={styles.logo}>
            <Bot size={40} className={styles.logoIcon} />
          </Link>
          <h1>Selamat Datang Kembali</h1>
          <p>Masuk untuk mengelola pesanan Anda</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.icon} size={20} />
              <input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.icon} size={20} />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? <Loader2 className={styles.spinner} /> : "Masuk"}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Belum punya akun?{" "}
            <Link to="/register">
              Daftar Sekarang <ArrowRight size={16} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
