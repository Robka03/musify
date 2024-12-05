import React from "react";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.leftMenu}>
        <a href="/" style={styles.navLink}>
          Főoldal
        </a>
        <a href="/rendeles" style={styles.navLink}>
          Rendelés
        </a>
        <a href="/szallitas" style={styles.navLink}>
          Szállítási lehetőségek
        </a>
      </div>
      <div style={styles.rightMenu}>
        <a href="/bejelentkezes" style={styles.navLink}>
          Bejelentkezés
        </a>
        <a href="/regisztracio" style={styles.navLink}>
          Regisztráció
        </a>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  leftMenu: {
    display: "flex",
    alignItems: "center",
  },
  rightMenu: {
    display: "flex",
    alignItems: "center",
  },
  navLink: {
    marginLeft: "15px",
    marginRight: "15px",
    textDecoration: "none",
    fontSize: "16px",
    color: "#007bff",
    fontWeight: "500",
  },
};

export default Navbar;
