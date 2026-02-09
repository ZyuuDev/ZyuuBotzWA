import React, { useState, useEffect } from "react";
import {
  Check,
  RefreshCw,
  Smartphone,
  Settings,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from "./SuccessPage.module.css";

export default function SuccessPage() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Dalam Antrian");

  useEffect(() => {
    // Simulate deployment progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setStatus("Aktif");
          return 100;
        }
        return prev + 1; // Increment by 1%
      });
    }, 50); // Fast simulation

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.successPage}>
      <div className="container">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={styles.iconContainer}
        >
          <Check size={48} strokeWidth={3} />
        </motion.div>

        <h1 className={styles.title}>Pembayaran Berhasil!</h1>
        <p className={styles.subtitle}>
          Terima kasih! Pesanan Anda telah diterima. Tim teknis kami sedang
          menyiapkan infrastruktur WhatsApp Bot Anda.
        </p>

        {/* Animation Icons */}
        <div className={styles.deploySection}>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className={styles.deployIcon}>
              <Settings size={32} />
            </div>
          </motion.div>
          <div className={styles.deployLine} />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div
              className={styles.deployIcon}
              style={{ background: "#00D06C", color: "white" }}
            >
              <CheckCircle2 size={32} />
            </div>
          </motion.div>
          <div className={styles.deployLine} />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          >
            <div className={styles.deployIcon}>
              <MessageSquare size={32} />
            </div>
          </motion.div>
          <div
            style={{
              position: "absolute",
              bottom: "1.5rem",
              color: "#00D06C",
              fontSize: "0.75rem",
              fontWeight: "700",
              letterSpacing: "0.1em",
            }}
          >
            SYSTEM DEPLOYING
          </div>
        </div>

        {/* Status Card */}
        <div className={styles.statusCard}>
          <div className={styles.statusHeader}>
            <div>
              <div className={styles.statusTitleLabel}>STATUS SAAT INI</div>
              <div className={styles.statusValue}>{status}</div>
              <p
                style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}
              >
                {status === "Aktif"
                  ? "Bot Anda siap digunakan!"
                  : "Server kami sedang mengalokasikan sumber daya untuk Bot Anda."}
              </p>
              <div style={{ marginTop: "0.5rem", fontWeight: "600" }}>
                Estimasi waktu: Maksimal 24 jam.
              </div>
            </div>
            <button className={styles.refreshBtn}>
              <RefreshCw size={20} /> Cek Status
            </button>
          </div>
        </div>

        {/* Connection Progress */}
        <div className={styles.connectionCard}>
          <Smartphone size={24} style={{ color: "#00D06C" }} />
          <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>
            Menghubungkan ke API WhatsApp Bisnis
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={styles.percentage}>{progress}%</div>
        </div>

        <div
          style={{
            marginTop: "1rem",
            fontSize: "0.875rem",
            color: "#9ca3af",
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <span>Mohon tunggu sebentar, jangan tutup halaman ini...</span>
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            <CheckCircle2 size={14} /> Koneksi Aman
          </span>
        </div>
      </div>
    </div>
  );
}
