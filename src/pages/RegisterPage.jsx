import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import {
  Bot,
  User,
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  MailCheck,
} from "lucide-react";
import styles from "./LoginPage.module.css"; // Reuse login styles for consistency

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // New success state
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!fullName || !email || !password) {
      setError("Mohon lengkapi semua data");
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await signUp(email, password, {
        data: { full_name: fullName },
      });

      if (authError) throw authError;

      if (data.user) {
        // Create profile entry
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            full_name: fullName,
            email: email,
          },
        ]);

        if (profileError) {
          console.error("Profile Error:", profileError);
          // Verify if profile actually exists (race condition with trigger?)
          if (profileError.code !== "23505") {
            // Ignore unique violation if it happens
            throw profileError;
          }
        }

        // Show success message instead of redirecting immediately
        setSuccess(true);
      }
    } catch (err) {
      console.error("Registration failed:", err);
      let msg = "Gagal mendaftar.";

      if (err?.message) {
        msg = err.message;
      } else if (typeof err === "string") {
        msg = err;
      } else {
        msg = JSON.stringify(err);
      }

      if (!msg || msg === "{}" || msg === "[]") {
        msg =
          "Error: Objek Kosong. Kemungkinan masalah koneksi atau konfigurasi.";
      }

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.container}>
        <div
          className={styles.card}
          style={{ textAlign: "center", padding: "3rem 2rem" }}
        >
          <div
            style={{
              display: "inline-flex",
              padding: "1rem",
              borderRadius: "50%",
              background: "rgba(255, 184, 0, 0.1)",
              color: "var(--primary-color)",
              marginBottom: "1.5rem",
            }}
          >
            <MailCheck size={48} />
          </div>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            Verifikasi Email Anda
          </h1>
          <p
            style={{
              marginBottom: "2rem",
              color: "var(--text-secondary)",
              lineHeight: "1.6",
            }}
          >
            Kami telah mengirimkan tautan verifikasi ke <strong>{email}</strong>
            .<br />
            Silakan cek kotak masuk atau folder spam Anda untuk mengaktifkan
            akun sebelum login.
          </p>

          <Link
            to="/login"
            style={{ textDecoration: "none", width: "100%", display: "block" }}
          >
            <button className={styles.submitBtn}>Kembali ke Login</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Link to="/" className={styles.logo}>
            <Bot size={40} className={styles.logoIcon} />
          </Link>
          <h1>Buat Akun Baru</h1>
          <p>Mulai perjalanan otomasi anda bersama kami</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="fullname">Nama Lengkap</label>
            <div className={styles.inputWrapper}>
              <User className={styles.icon} size={20} />
              <input
                id="fullname"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

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
            {loading ? (
              <Loader2 className={styles.spinner} />
            ) : (
              "Daftar Sekarang"
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Sudah punya akun?{" "}
            <Link to="/login">
              Masuk <ArrowRight size={16} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
