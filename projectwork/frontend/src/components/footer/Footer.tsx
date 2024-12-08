import React from "react";
import "./Footer.css"; // Add this for styles, you can customize it

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container py-3">
        <div className="footer-contact">
          <p><i className="fas fa-map-marker-alt"></i>Musify</p>
          <p><strong>Debrecen, Hungary</strong></p>
          <p><i className="fas fa-phone"></i> +11 420 1111</p>
          <p><i className="fas fa-envelope"></i> musify@company.com</p>
        </div>

        <div className="footer-about">
          <h4>About the company</h4>
          <p>
            Our company produces unique decoration items for all music lovers
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/Robka03/musify" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>

        <div className="footer-policy">
          <p>Data Policy</p>
          <p>Warranty and cancellation</p>
          <p>Company Informations</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
