import React, { useState } from "react";
import { Bot, User, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logoAndToggle}>
          <Link to="/" className={styles.logo}>
            <Bot className={styles.logoIcon} size={28} />
            <span>SewaBot</span>
          </Link>

          <button
            className={styles.mobileToggle}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Links */}
        <div className={styles.desktopNav}>
          <a href="#features">Fitur</a>
          <a href="#pricing">Harga</a>
          <a href="#tutorial">Tutorial</a>
        </div>

        {/* Desktop Actions */}
        <div className={styles.desktopActions}>
          {user ? (
            <>
              <span className={styles.userEmail}>{user.email}</span>
              <button onClick={handleLogout} className={styles.loginBtn}>
                <LogOut size={18} style={{ marginRight: "0.5rem" }} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className={styles.loginBtn}>Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-primary">Daftar</button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ""}`}
        >
          <div className={styles.mobileLinks}>
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>
              Fitur
            </a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>
              Harga
            </a>
            <a href="#tutorial" onClick={() => setIsMobileMenuOpen(false)}>
              Tutorial
            </a>
          </div>

          <div className={styles.mobileActions}>
            {user ? (
              <div className={styles.mobileUser}>
                <span className={styles.userEmail}>{user.email}</span>
                <button onClick={handleLogout} className={styles.loginBtn}>
                  <LogOut size={18} style={{ marginRight: "0.5rem" }} /> Logout
                </button>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className={styles.loginBtn} style={{ width: "100%" }}>
                    Login
                  </button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="btn btn-primary" style={{ width: "100%" }}>
                    Daftar
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
