import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Download, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import styles from "./PaymentPage.module.css";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  const orderId = location.state?.orderId;
  const orderAmount = location.state?.orderAmount || 0;
  const packageName = location.state?.packageName || "Paket Bot";

  // Random unique code for demo purposes (last 3 digits)
  // In a real app, this would come from the backend/order data
  const uniqueCode = 123;
  const totalAmount = orderAmount + uniqueCode;

  useEffect(() => {
    if (!orderId || !user) {
      // redirect if accessed directly without an order or user
      navigate("/order");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate auto-check for payment success
    const successTimer = setTimeout(async () => {
      try {
        // 1. Update order status
        const { error: orderError } = await supabase
          .from("orders")
          .update({ status: "paid" })
          .eq("id", orderId);

        if (orderError) throw orderError;

        // 2. Create payment record
        const { error: paymentError } = await supabase.from("payments").insert([
          {
            order_id: orderId,
            user_id: user.id,
            amount: totalAmount,
            payment_method: "QRIS", // Hardcoded for demo
            status: "completed",
          },
        ]);

        if (paymentError) throw paymentError;

        navigate("/success");
      } catch (error) {
        console.error("Payment recording failed:", error);
        // In real app, show error or retry
      }
    }, 10000); // Redirect to success after 10 seconds for demo

    return () => {
      clearInterval(timer);
      clearTimeout(successTimer);
    };
  }, [navigate, orderId, user, orderAmount, totalAmount]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className={styles.paymentPage}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Selesaikan Pembayaran Kamu</h1>
          <p className={styles.subtitle}>
            Buka aplikasi e-wallet atau Mobile Banking, lalu scan QRIS di bawah
            ini untuk aktivasi instan.
          </p>
        </div>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div className={styles.timerCard}>
            <div className={styles.timerLabel}>SISA WAKTU PEMBAYARAN</div>
            <div className={styles.timer}>{formatTime(timeLeft)}</div>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Main QR Card */}
          <div className={styles.card}>
            <div className={styles.qrContainer}>
              <div className={styles.qrImage}>
                {/* Mock QR */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "2px",
                  }}
                >
                  {[...Array(25)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        background: Math.random() > 0.5 ? "black" : "white",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <span className={styles.totalLabel}>Total Pembayaran</span>
            <div className={styles.totalValue}>
              Rp {totalAmount.toLocaleString("id-ID")}
            </div>

            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
                marginBottom: "1.5rem",
                maxWidth: "400px",
                marginInline: "auto",
              }}
            >
              Pindai kode QR di atas melalui GoPay, ShopeePay, OVO, Dana,
              LinkAja, atau aplikasi Bank apapun.
            </p>

            <button className={styles.saveBtn}>
              <Download size={18} /> Simpan QR Code
            </button>

            <div className={styles.verifyBox}>
              <ShieldCheck size={24} style={{ flexShrink: 0 }} />
              <span>
                Verifikasi Otomatis: Halaman akan diperbarui sendiri setelah
                pembayaran diterima. Jangan tutup jendela ini.
              </span>
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Ringkasan Pesanan</h3>

              <div className={styles.row}>
                <span>{packageName}</span>
                <span>Rp {orderAmount.toLocaleString("id-ID")}</span>
              </div>
              <div className={styles.row}>
                <span>Subtotal</span>
                <span>Rp {orderAmount.toLocaleString("id-ID")}</span>
              </div>
              <div className={styles.row}>
                <span>Kode Unik</span>
                <span style={{ color: "var(--primary-color)" }}>
                  + Rp {uniqueCode}
                </span>
              </div>

              <div className={styles.totalRow}>
                <span>Total Tagihan</span>
                <span>Rp {totalAmount.toLocaleString("id-ID")}</span>
              </div>

              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  fontStyle: "italic",
                  marginTop: "1rem",
                }}
              >
                *Gunakan jumlah yang sesuai sampai 3 digit terakhir agar sistem
                kami dapat memproses pesanan Anda secara otomatis.
              </p>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <div
                style={{
                  background: "#E5E7EB",
                  padding: "1rem",
                  borderRadius: "1rem",
                  textAlign: "center",
                  marginBottom: "2rem",
                  color: "var(--text-secondary)",
                }}
              >
                Menunggu Pembayaran...
              </div>

              <h4
                style={{
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  marginBottom: "1rem",
                  letterSpacing: "0.05em",
                }}
              >
                Cara Membayar:
              </h4>

              <div className={styles.instructionStep}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepText}>
                  Buka aplikasi e-wallet atau bank favoritmu.
                </div>
              </div>
              <div className={styles.instructionStep}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepText}>
                  Pilih menu "Scan" atau "Pay" dan arahkan kamera ke kode QR.
                </div>
              </div>
              <div className={styles.instructionStep}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepText}>
                  Masukkan PIN dan konfirmasi pembayaran. Selesai!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
