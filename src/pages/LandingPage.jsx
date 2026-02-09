import React from "react";
import { Link } from "react-router-dom";
import { Check, Bot, Gamepad2, Shield, Zap } from "lucide-react";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <span className={styles.tagline}>Solusi WhatsApp No. 1</span>
            <h1 className={styles.heroTitle}>
              Kelola WhatsApp Anda Secara{" "}
              <span className={styles.highlight}>Otomatis</span>
            </h1>
            <p className={styles.heroDescription}>
              Sewa Bot WhatsApp terbaik untuk grup atau penggunaan pribadi.
              Tanpa perlu coding, aktif dalam hitungan detik.
            </p>
            <div className={styles.heroActions}>
              <a
                href="#pricing"
                className="btn btn-primary"
                style={{ textDecoration: "none" }}
              >
                Sewa Sekarang
              </a>
              <button className="btn btn-outline">Lihat Demo</button>
            </div>
          </div>

          <div className={styles.heroImage}>
            {/* CSS Mockup Dashboard */}
            <div
              style={{
                background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
                borderRadius: "2rem",
                padding: "2rem",
                aspectRatio: "4/3",
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                color: "white",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "4rem", fontWeight: "bold" }}>0</div>
                <div style={{ color: "#9ca3af", marginBottom: "1rem" }}>
                  Active Bots
                </div>
                <div
                  style={{
                    background: "white",
                    color: "black",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "999px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontWeight: "600",
                  }}
                >
                  <Zap size={16} fill="#00D06C" stroke="#00D06C" /> Status:
                  Aktif
                </div>
              </div>

              {/* Decorative circles */}
              <div
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: "-50px",
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  background: "rgba(0, 208, 108, 0.2)",
                  filter: "blur(40px)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={`container ${styles.statsGrid}`}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Bot Aktif</div>
            <div className={styles.statValue}>1,240+</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Komunitas</div>
            <div className={styles.statValue}>500+</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Kepuasan</div>
            <div className={styles.statValue}>99.9%</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features} id="features">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Fitur Unggulan Bot Kami</h2>
            <p className={styles.sectionSubtitle}>
              Solusi cerdas untuk manajemen grup dan hiburan anggota secara
              otomatis dalam satu dashboard.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Bot />
              </div>
              <h3 className={styles.featureTitle}>Otomasi Grup</h3>
              <p className={styles.featureText}>
                Respon otomatis, welcome message kustom, dan manajemen admin
                tanpa ribet 24/7.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Gamepad2 />
              </div>
              <h3 className={styles.featureTitle}>Fitur Hiburan</h3>
              <p className={styles.featureText}>
                Game RPG, tebak-tebakan, dan download media otomatis untuk
                mencairkan suasana grup.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Shield />
              </div>
              <h3 className={styles.featureTitle}>Anti-Spam & Link</h3>
              <p className={styles.featureText}>
                Lindungi grup Anda dari spammer dan link mencurigakan secara
                otomatis dengan filter pintar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Simplified for MVP) */}
      <section style={{ padding: "6rem 0", textAlign: "center" }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ marginBottom: "4rem" }}>
            Cara Kerja: 3 Langkah Mudah
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                step: 1,
                title: "Pilih Paket",
                text: "Sesuaikan dengan kebutuhan grup atau pribadi Anda.",
              },
              {
                step: 2,
                title: "Scan QR Code",
                text: "Hubungkan nomor WhatsApp Anda dalam hitungan detik.",
              },
              {
                step: 3,
                title: "Bot Aktif",
                text: "Nikmati fitur otomatis dan gaming tanpa gangguan.",
              },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "#00D06C",
                    color: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "1.5rem",
                  }}
                >
                  {item.step}
                </div>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                  {item.title}
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.pricing} id="pricing">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Pilih Paket Sewa</h2>
            <p className={styles.sectionSubtitle}>
              Harga transparan tanpa biaya tersembunyi.
            </p>
          </div>

          <div className={styles.pricingGrid}>
            {/* Plan 1: Sewa Bot */}
            <div className={styles.pricingCard}>
              <h3 className={styles.planName}>Sewa Bot</h3>
              <div className={styles.planPrice}>
                Rp 7k <span>/permanen</span>
              </div>
              <ul className={styles.featureList}>
                <li>
                  <Check className={styles.checkIcon} size={18} />
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "var(--primary-color)",
                    }}
                  >
                    1000+ FEATURE
                  </span>
                </li>
                <li>
                  <Check className={styles.checkIcon} size={18} /> Fitur Store
                  (Add - Update - Hapus list)
                </li>
                <li>
                  <Check className={styles.checkIcon} size={18} /> 20+ Fitur
                  Games
                </li>
                <li>
                  <Check className={styles.checkIcon} size={18} /> 5+ Fitur AI
                </li>
                <li>
                  <Check className={styles.checkIcon} size={18} /> 10+ Fitur
                  Sticker (brat, bratvid, iqc, qc, sticker, dll)
                </li>
                <li>
                  <Check className={styles.checkIcon} size={18} /> 15+ Fitur FUN
                </li>
                <li>
                  <Check className={styles.checkIcon} size={18} /> Fitur
                  Lainnya? Sewa Sekarang dengan Klik Tombol Dibawah!
                </li>
              </ul>
              <Link
                to="/order"
                state={{ packageName: "Sewa Bot", price: 7000 }}
                className="btn btn-outline"
                style={{ width: "100%", textDecoration: "none" }}
              >
                Pilih Paket
              </Link>
            </div>

            {/* Plan 2: Sewabot + Premium */}
            <div className={`${styles.pricingCard} ${styles.popular}`}>
              <div className={styles.popularTag}>Terpopuler</div>
              <h3 className={styles.planName}>Sewabot + Premium</h3>
              <div className={styles.planPrice}>
                Rp 12k <span>/permanen</span>
              </div>
              <ul className={styles.featureList}>
                <li>
                  <Check className={styles.checkIcon} size={18} />
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "var(--primary-color)",
                      padding: "0 4px",
                      borderRadius: "4px",
                    }}
                  >
                    Unlimited Limit & 1200+ FEATURE
                  </span>
                </li>
                <li>
                  <Check className={styles.checkIcon} size={18} /> Unlimited
                  Limit
                </li>
                <li>
                  <Check className={styles.checkIcon} size={18} /> Membuka Fitur
                  Yang Terkunci (NSFW, HD Video, NHentai, dll)
                </li>
                <li>
                  <Check className={styles.checkIcon} size={18} /> Fitur Store
                  (Add - Update - Hapus list)
                </li>
                <li>
                  <Check className={styles.checkIcon} size={18} /> 20+ Fitur
                  Games
                </li>
                <li>
                  <Check className={styles.checkIcon} size={18} /> 5+ Fitur AI
                </li>
                <li>
                  <Check className={styles.checkIcon} size={18} /> 10+ Fitur
                  Sticker
                </li>
                <li>
                  <Check className={styles.checkIcon} size={18} /> 5+ Fitur NSFW
                </li>
              </ul>
              <Link
                to="/order"
                state={{ packageName: "Sewabot + Premium", price: 12000 }}
                className="btn btn-primary"
                style={{ width: "100%", textDecoration: "none" }}
              >
                Sewa Sekarang
              </Link>
            </div>

            {/* Plan 3: Premium Nomor */}
            <div className={styles.pricingCard}>
              <h3 className={styles.planName}>Premium Nomor</h3>
              <div className={styles.planPrice}>
                Rp 5k <span>/permanen</span>
              </div>
              <ul className={styles.featureList}>
                <li>
                  <Check className={styles.checkIcon} size={18} />
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "var(--primary-color)",
                    }}
                  >
                    Unlimited Limit & 1200+ FEATURE
                  </span>
                </li>
                <li>
                  <Check className={styles.checkIcon} size={18} /> Unlimited
                  Limit
                </li>
                <li>
                  <Check className={styles.checkIcon} size={18} /> Membuka Fitur
                  Yang Terkunci (NSFW, HD Video, NHentai, dll)
                </li>
              </ul>
              <Link
                to="/order"
                state={{ packageName: "Premium Nomor", price: 5000 }}
                className="btn btn-outline"
                style={{ width: "100%", textDecoration: "none" }}
              >
                Pilih Paket
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
