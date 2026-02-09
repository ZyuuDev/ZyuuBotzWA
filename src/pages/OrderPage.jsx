import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { Rocket, Info, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import styles from "./OrderPage.module.css";

export default function OrderPage() {
  const navigate = useNavigate();
  const location = useLocation(); // Initialize location
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Get package details from navigation state or default
  const { packageName, price } = location.state || {
    packageName: "Sewa Bot",
    price: 7000,
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    groupLink: "",
    isAdmin: false,
  });

  useEffect(() => {
    if (!user) {
      // Ideally show a toast or message here
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) {
        navigate("/login");
        return;
      }

      // Create Order
      const { data, error } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user.id,
            service_type: packageName, // Use dynamic package name
            duration: "Permanen", // Updated to Permanen per user request context
            price: price, // Use dynamic price
            status: "pending",
          },
        ])
        .select()
        .single();

      if (error) throw error;

      navigate("/payment", {
        state: {
          orderId: data.id,
          orderAmount: data.price,
          packageName: packageName,
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Gagal membuat pesanan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.orderPage}>
      <div className="container">
        <h1 className={styles.title}>Detail Penyewaan Bot</h1>
        <p className={styles.subtitle}>
          Lengkapi data di bawah ini untuk mengaktifkan layanan bot Anda secara
          otomatis.
        </p>

        <form onSubmit={handleSubmit} className={styles.grid}>
          {/* Form Section */}
          <div className={styles.card}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nama Lengkap (Opsional)</label>
              <input
                type="text"
                name="name"
                className={styles.input}
                placeholder="Contoh: Budi Santoso"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Nomor WhatsApp</label>
              <input
                type="tel"
                name="phone"
                className={styles.input}
                placeholder="+62 812xxxxxxx"
                required
                value={formData.phone}
                onChange={handleChange}
              />
              <small
                style={{
                  color: "var(--text-secondary)",
                  marginTop: "0.5rem",
                  display: "block",
                }}
              >
                Nomor ini akan digunakan untuk pengiriman notifikasi bot.
              </small>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Link Grup WhatsApp</label>
              <input
                type="url"
                name="groupLink"
                className={styles.input}
                placeholder="https://chat.whatsapp.com/xxxxx"
                required
                value={formData.groupLink}
                onChange={handleChange}
              />
            </div>

            <div className={styles.infoBox}>
              <Info size={24} style={{ flexShrink: 0 }} />
              <span>
                Pastikan Bot sudah diundang ke grup dan dijadikan{" "}
                <strong>Admin</strong> agar fitur otomatisasi dapat berjalan
                langsung setelah pembayaran berhasil diverifikasi.
              </span>
            </div>

            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="isAdmin"
                name="isAdmin"
                className={styles.checkbox}
                checked={formData.isAdmin}
                onChange={handleChange}
                required
              />
              <label htmlFor="isAdmin">
                Saya sudah menjadikan nomor Bot sebagai Admin di grup.
              </label>
            </div>
          </div>

          {/* Summary Section */}
          <div className={styles.card}>
            <h3 className={styles.summaryTitle}>Ringkasan Pesanan</h3>

            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <Rocket size={24} />
              </div>
              <div className={styles.itemDetails}>
                <h4>{packageName}</h4>
                <p>Akses fitur premium lengkap</p>
              </div>
            </div>

            <div className={styles.row}>
              <span>Harga Paket</span>
              <span>Rp {price.toLocaleString("id-ID")}</span>
            </div>
            {/* Admin fee removed */}

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total Bayar</span>
              <span className={styles.totalValue}>
                Rp {price.toLocaleString("id-ID")}
              </span>
            </div>

            <button type="submit" className={styles.payBtn} disabled={loading}>
              {loading ? (
                <Loader2 className={styles.spinner} />
              ) : (
                <>
                  Lanjut ke Pembayaran <ArrowRight size={20} />
                </>
              )}
            </button>

            <div
              style={{ textAlign: "center", marginTop: "1.5rem", opacity: 0.6 }}
            >
              <small>METODE PEMBAYARAN TERSEDIA</small>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "center",
                  marginTop: "0.5rem",
                }}
              >
                {/* Placeholders for payment icons */}
                <span className="icon-placeholder">QRIS</span>
                <span className="icon-placeholder">E-Wallet</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
