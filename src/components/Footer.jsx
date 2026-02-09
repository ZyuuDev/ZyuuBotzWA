import React from "react";
import { Bot, MessageCircle } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Bot className={styles.logoIcon} />
              <span>SewaBot</span>
            </div>
            <p>
              Platform penyedia layanan bot WhatsApp otomatis terbaik di
              Indonesia. Membantu komunitas Anda menjadi lebih aktif dan
              terkelola dengan baik.
            </p>
          </div>

          <div className={styles.section}>
            <h4>Navigasi</h4>
            <div className={styles.links}>
              <a href="#">Beranda</a>
              <a href="#features">Fitur</a>
              <a href="#pricing">Harga</a>
              <a href="#">Syarat & Ketentuan</a>
            </div>
          </div>

          <div className={styles.section}>
            <h4>Hubungi Kami</h4>
            <div className={styles.links}>
              <a href="#">support@sewabot.id</a>
              <a href="#">WhatsApp Support</a>
              <a href="#">Komunitas Telegram</a>
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          © 2024 SewaBot WhatsApp Indonesia. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
